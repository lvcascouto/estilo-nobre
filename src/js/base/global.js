// ===================================================
// AXIS ▪︎ GLOBAL SCRIPTS
// ===================================================

// Elements that receive `.is-visible` when they enter the screen
const REVEAL_SELECTORS = [
  ".u-eyebrow",
  ".u-reveal-fade",
  ".u-reveal-up",
  ".u-reveal-left",
  ".u-reveal-right",
];

// rootMargin must stay 0: a negative margin leaves elements at the very end of
// the page stuck hidden. threshold 0.15 does not fit blocks taller than ~6 screens.
const REVEAL_OPTIONS = {
  root: null,
  rootMargin: "0px 0px -5% 0px",
  threshold: 0,
};

// Entrances wait for the fonts (max FONT_WAIT_MAX) so text never swaps mid-animation
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

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  await whenFontsReady();

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, REVEAL_OPTIONS);

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
