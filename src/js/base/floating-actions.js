// ===================================================
// AXIS ▪︎ FLOATING ACTIONS
// Controls the visibility of floating actions near page endings.
// ===================================================

// ===================================================
// INITIALIZATION
// ===================================================
export const initFloatingActions = () => {
  const floatingActions = document.querySelector(".floating-actions");
  const contactSection = document.querySelector("#contato");

  if (!floatingActions) return;
  if (!("IntersectionObserver" in window)) return;

  // Observation Targets
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

  // Visibility Tracking
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
