// ===================================================
// AXIS ▪︎ SCROLL ANIMATIONS
// Handles the reveal animations when elements enter the viewport.
// ===================================================

// Animation Selectors
const REVEAL_SELECTORS = [".u-eyebrow", ".u-reveal-fade", ".u-reveal-up"];

// Observer Configuration
const REVEAL_OPTIONS = {
  root: null,
  rootMargin: "0px 0px -3% 0px",
  threshold: 0,
};

// ===================================================
// INITIALIZATION
// ===================================================
export const initScrollAnimations = async () => {
  const elements = document.querySelectorAll(REVEAL_SELECTORS.join(","));

  if (elements.length === 0) return;

  // Fallback
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // Font Loading
  if (document.fonts && document.fonts.ready) {
    await Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 800)),
    ]);
  }

  // Visibility Observer
  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, REVEAL_OPTIONS);

  elements.forEach((el) => animationObserver.observe(el));
};
