// ===================================================
// AXIS ▪︎ GLOBAL SCRIPTS
// Global helpers and utility functions
// ===================================================

// == Scroll Reveal ==
// ---------------------------------------------------
// Every selector listed here gets `.is-visible` once it enters the screen.
// The animation itself lives in the Sass (base/_reveal.scss), one utility per
// effect. New entrance? Create the class in the Sass and add it to this list.
// ---------------------------------------------------
const REVEAL_SELECTORS = [".u-eyebrow", ".u-reveal-fade", ".u-reveal-up"];

const REVEAL_OPTIONS = {
  root: null,
  // Keep rootMargin at 0: a negative margin (e.g. "-10%") leaves elements at the
  // very end of the page (footer, last section) stuck hidden, since they never
  // get past the margin even at max scroll.
  rootMargin: "0px",
  // Fires when 15% is visible. Do not use on blocks taller than ~6 screens
  // (they would never reach 15%); use threshold 0 for those.
  threshold: 0.15,
};

// The entrances only start once the fonts are in, so the text does not swap
// typefaces in the middle of the animation. Never waits more than FONT_WAIT_MAX.
const FONTS_TO_WAIT = ['300 1em "Lato"', '1em "Tenor Sans"'];
const FONT_WAIT_MAX = 1000; // ms

const whenFontsReady = () => {
  if (!document.fonts || !document.fonts.load) return Promise.resolve();

  const fonts = Promise.all(
    FONTS_TO_WAIT.map((font) => document.fonts.load(font)),
  ).catch(() => {});
  const timeout = new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MAX));

  return Promise.race([fonts, timeout]);
};

const initScrollAnimations = async () => {
  const elements = document.querySelectorAll(REVEAL_SELECTORS.join(","));

  if (elements.length === 0) return;

  // Safety net: without IntersectionObserver nothing would ever be revealed
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  await whenFontsReady();

  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  };

  const animationObserver = new IntersectionObserver(
    handleIntersection,
    REVEAL_OPTIONS,
  );

  elements.forEach((el) => animationObserver.observe(el));
};

// ===================================================
// INITIALIZATION
// ===================================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initScrollAnimations);
} else {
  initScrollAnimations();
}
