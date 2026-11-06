// ===================================================
// AXIS ▪︎ GLOBAL SCRIPTS
// ===================================================

const REVEAL_SELECTORS = [".u-eyebrow", ".u-reveal-fade", ".u-reveal-up"];

const REVEAL_OPTIONS = {
  root: null,
  rootMargin: "0px 0px -10% 0px",
  threshold: 0,
};

const initScrollAnimations = async () => {
  const elements = document.querySelectorAll(REVEAL_SELECTORS.join(","));

  if (elements.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  if (document.fonts && document.fonts.ready) {
    await Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 800)),
    ]);
  }

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
