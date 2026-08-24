import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ts from "typescript";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));

async function parse(relativePath) {
  const filename = path.join(projectRoot, relativePath);
  const source = await readFile(filename, "utf8");
  return ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

function variableDeclaration(sourceFile, name) {
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    const declaration = statement.declarationList.declarations.find(
      (candidate) => ts.isIdentifier(candidate.name) && candidate.name.text === name,
    );
    if (declaration) return declaration;
  }
  assert.fail(`missing ${name} variable declaration`);
}

function property(object, name) {
  assert.ok(ts.isObjectLiteralExpression(object), `${name} parent must be an object literal`);
  const match = object.properties.find((candidate) => {
    if (!ts.isPropertyAssignment(candidate)) return false;
    return (ts.isIdentifier(candidate.name) || ts.isStringLiteral(candidate.name))
      && candidate.name.text === name;
  });
  assert.ok(match, `missing ${name} property`);
  return match;
}

test("registered locale dictionaries are exhaustive and fail closed", async () => {
  const sourceFile = await parse("src/i18n/index.ts");
  const dictionaries = variableDeclaration(sourceFile, "dictionaries");

  assert.equal(
    dictionaries.type?.getText(sourceFile),
    "Record<Locale, Dictionary>",
    "registered locales must require a dictionary at compile time",
  );

  const getDictionary = sourceFile.statements.find(
    (statement) => ts.isFunctionDeclaration(statement) && statement.name?.text === "getDictionary",
  );
  assert.ok(getDictionary && ts.isFunctionDeclaration(getDictionary), "missing getDictionary function");
  const returns = getDictionary.body?.statements.filter(ts.isReturnStatement) ?? [];
  assert.equal(returns.length, 1, "getDictionary must have one direct return");
  assert.equal(
    returns[0].expression?.getText(sourceFile),
    "dictionaries[lang]",
    "a registered locale must never silently receive the English dictionary",
  );
});

test("all Korean core venue cards own concise summaries", async () => {
  const sourceFile = await parse("src/i18n/locales/ko.ts");
  const dictionary = variableDeclaration(sourceFile, "ko").initializer;
  assert.ok(dictionary && ts.isObjectLiteralExpression(dictionary), "ko must be an object literal");
  const spas = property(dictionary, "spas").initializer;
  const venues = property(spas, "venues").initializer;
  assert.ok(ts.isObjectLiteralExpression(venues), "venues must be an object literal");
  assert.equal(venues.properties.length, 14, "Korean core dictionary must retain all 14 venue cards");

  for (const venue of venues.properties) {
    assert.ok(ts.isPropertyAssignment(venue), "each venue must be a property assignment");
    const slug = venue.name.getText(sourceFile).replaceAll(/["']/g, "");
    const summary = property(venue.initializer, "summary").initializer;
    assert.ok(
      ts.isStringLiteral(summary) || ts.isNoSubstitutionTemplateLiteral(summary),
      `${slug} summary must be a static string`,
    );
    assert.match(summary.text, /[\uac00-\ud7a3]/, `${slug} summary must contain Korean copy`);
    assert.ok(summary.text.length <= 200, `${slug} summary must stay concise`);
  }
});
