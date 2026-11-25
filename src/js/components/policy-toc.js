// ===================================================
// AXIS ▪︎ POLICY TABLE OF CONTENTS
// Controls the mobile behavior of the policy navigation.
// ===================================================

// ===================================================
// INITIALIZATION
// ===================================================
export const initPolicyToc = () => {
  const tocDetails = document.querySelectorAll(".privacy__toc, .cookies__toc");

  if (!tocDetails.length) return;

  // Responsive Configuration
  const mobileQuery = window.matchMedia("(max-width: 768px)");

  // Navigation Events
  // ---------------------------------------------------
  // Fecha o acordeão automaticamente ao tocar em um link no mobile
  // ---------------------------------------------------
  tocDetails.forEach((toc) => {
    toc.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (mobileQuery.matches) {
          toc.removeAttribute("open");
        }
      });
    });
  });
};
