// ===================================================
// AXIS ▪︎ GLOBAL SCRIPTS
// ===================================================

const REVEAL_SELECTORS = [".u-eyebrow", ".u-reveal-fade", ".u-reveal-up"];

const REVEAL_OPTIONS = {
  root: null,
  rootMargin: "0px 0px -5% 0px",
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
// AXIS ▪︎ FLOATING ACTIONS
// ===================================================

const initFloatingActions = () => {
  const floatingActions = document.querySelector(".floating-actions");
  const contactSection = document.querySelector("#contato");

  if (!floatingActions) return;
  if (!("IntersectionObserver" in window)) return;

  // == Observation targets ==

  const policySections = document.querySelectorAll(".privacy, .cookies");

  const pageEndTargets = [...policySections]
    .map((page) => {
      const lastContentSection = page.querySelector(
        "article section:last-of-type",
      );

      return lastContentSection?.lastElementChild;
    })
    .filter(Boolean);

  const targets = [contactSection, ...pageEndTargets].filter(Boolean);

  if (targets.length === 0) return;

  // == Visibility tracking ==

  const visibleTargets = new Set();

  const floatingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleTargets.add(entry.target);
        } else {
          visibleTargets.delete(entry.target);
        }
      });

      floatingActions.classList.toggle(
        "is-contact-visible",
        visibleTargets.size > 0,
      );
    },
    {
      root: null,
      rootMargin: "-15% 0px -15% 0px",
      threshold: 0,
    },
  );

  targets.forEach((target) => floatingObserver.observe(target));
};

// ===================================================
// INITIALIZATION
// ===================================================

const initGlobalScripts = () => {
  initScrollAnimations();
  initFloatingActions();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGlobalScripts);
} else {
  initGlobalScripts();
}
