export function shouldShowMobileReadingRail({
  isMobile,
  promoBottom,
  headerBottom,
  bodyTop,
  readingEndTop,
  railHeight,
}) {
  return (
    isMobile &&
    promoBottom <= headerBottom + 0.5 &&
    bodyTop <= headerBottom + railHeight + 64 &&
    readingEndTop > headerBottom + railHeight
  );
}

export function getActiveHeadingIndex(headingTops, activationLine) {
  if (!headingTops.length) return -1;

  let activeIndex = 0;
  for (let index = 0; index < headingTops.length; index += 1) {
    if (headingTops[index] <= activationLine) activeIndex = index;
    else break;
  }
  return activeIndex;
}

export function getHorizontalScrollTarget({
  scrollLeft,
  clientWidth,
  scrollWidth,
  trackLeft,
  linkLeft,
  linkRight,
  edgePadding = 16,
}) {
  const safeLeft = trackLeft + edgePadding;
  const safeRight = trackLeft + clientWidth - edgePadding;
  if (linkLeft >= safeLeft && linkRight <= safeRight) return null;

  const linkCenter = (linkLeft + linkRight) / 2;
  const trackCenter = trackLeft + clientWidth / 2;
  const maximum = Math.max(0, scrollWidth - clientWidth);
  return Math.min(maximum, Math.max(0, scrollLeft + linkCenter - trackCenter));
}

export const getReadingRailScrollBehavior = (reduceMotion) =>
  reduceMotion ? "auto" : "smooth";

export function initBlogReadingNavigation(options = {}) {
  const doc = options.document ?? globalThis.document;
  const win = options.window ?? globalThis.window;
  if (!doc || !win) return null;

  const mobileRail = doc.querySelector("[data-blog-toc-mobile]");
  const track = doc.querySelector("[data-blog-toc-track]");
  const siteNav = doc.querySelector("[data-site-nav]");
  const promo = doc.querySelector("#promo-top-bar");
  const body = doc.querySelector("[data-blog-body]");
  const readingEnd = doc.querySelector("[data-blog-reading-end]");
  const allLinks = [...doc.querySelectorAll("[data-blog-toc-link]")];
  const mobileLinks = [...doc.querySelectorAll("[data-blog-toc-mobile-link]")];

  if (!mobileRail || !track || !siteNav || !body || !readingEnd || !mobileLinks.length) return null;
  if (mobileRail.dataset.blogTocReady === "true") return null;
  mobileRail.dataset.blogTocReady = "true";

  const headingEntries = mobileLinks
    .map((link) => {
      const id = link.dataset.tocId ?? "";
      return { id, heading: id ? doc.getElementById(id) : null, link };
    })
    .filter(({ heading }) => heading);
  if (!headingEntries.length) return null;

  const headingIds = headingEntries.map(({ id }) => id);
  const headings = headingEntries.map(({ heading }) => heading);
  const validMobileLinks = headingEntries.map(({ link }) => link);

  const mobileMedia = win.matchMedia("(max-width: 1023px)");
  const reduceMotionMedia = win.matchMedia("(prefers-reduced-motion: reduce)");
  const requestFrame = win.requestAnimationFrame?.bind(win) ?? ((callback) => callback());

  let scheduled = false;
  let currentIndex = -1;
  let railVisible = false;

  const setRailVisibility = (visible) => {
    if (visible === railVisible) return false;
    railVisible = visible;
    mobileRail.classList.toggle("is-visible", visible);
    mobileRail.setAttribute("aria-hidden", String(!visible));
    mobileRail.toggleAttribute("inert", !visible);
    mobileRail.inert = !visible;
    return true;
  };

  const revealActiveMobileLink = (index) => {
    const link = validMobileLinks[index];
    if (!link) return;

    const trackRect = track.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const left = getHorizontalScrollTarget({
      scrollLeft: track.scrollLeft,
      clientWidth: track.clientWidth,
      scrollWidth: track.scrollWidth,
      trackLeft: trackRect.left,
      linkLeft: linkRect.left,
      linkRight: linkRect.right,
    });
    if (left === null) return;

    const behavior = getReadingRailScrollBehavior(reduceMotionMedia.matches);
    if (typeof track.scrollTo === "function") track.scrollTo({ left, behavior });
    else track.scrollLeft = left;
  };

  const setActiveHeading = (index, forceReveal = false) => {
    if (index < 0) return;
    const changed = index !== currentIndex;
    if (changed) {
      currentIndex = index;
      const currentId = headingIds[index];
      allLinks.forEach((link) => {
        if (link.dataset.tocId === currentId) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }
    if (railVisible && (changed || forceReveal)) revealActiveMobileLink(index);
  };

  const update = () => {
    scheduled = false;
    const headerBottom = siteNav.getBoundingClientRect().bottom;
    const railHeight = mobileRail.getBoundingClientRect().height || mobileRail.offsetHeight || 48;
    const promoBottom = promo?.getBoundingClientRect().bottom ?? headerBottom;
    const bodyTop = body.getBoundingClientRect().top;
    const readingEndTop = readingEnd.getBoundingClientRect().top;
    const visible = shouldShowMobileReadingRail({
      isMobile: mobileMedia.matches,
      promoBottom,
      headerBottom,
      bodyTop,
      readingEndTop,
      railHeight,
    });
    const visibilityChanged = setRailVisibility(visible);
    const activationLine = headerBottom + (visible ? railHeight : 0) + 64;
    const activeIndex = getActiveHeadingIndex(
      headings.map((heading) => heading.getBoundingClientRect().top),
      activationLine,
    );
    setActiveHeading(activeIndex, visibilityChanged && visible);
  };

  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestFrame(update);
  };

  const listenToMedia = (media) => {
    if (typeof media.addEventListener === "function") media.addEventListener("change", schedule);
    else media.addListener?.(schedule);
  };

  allLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = event.currentTarget?.dataset?.tocId ?? "";
      const heading = id ? doc.getElementById(id) : null;
      if (!heading) return;

      event.preventDefault();
      heading.scrollIntoView({
        behavior: getReadingRailScrollBehavior(reduceMotionMedia.matches),
        block: "start",
      });
    });
  });

  win.addEventListener("scroll", schedule, { passive: true });
  win.addEventListener("resize", schedule, { passive: true });
  win.addEventListener("orientationchange", schedule, { passive: true });
  win.addEventListener("pageshow", schedule);
  listenToMedia(mobileMedia);
  listenToMedia(reduceMotionMedia);
  update();

  return { update: schedule };
}
