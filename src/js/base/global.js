// ===================================================
// AXIS ▪︎ GLOBAL SCRIPTS
// Global helpers and utility functions
// ===================================================

// == Scroll Reveal ==
const REVEAL_SELECTORS = [".u-eyebrow"];

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

const initScrollAnimations = () => {
  const elements = document.querySelectorAll(REVEAL_SELECTORS.join(","));

  if (elements.length === 0) return;

  // Safety net: without IntersectionObserver nothing would ever be revealed
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

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
