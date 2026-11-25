// ===================================================
// AXIS ▪︎ POLICY TABLE OF CONTENTS
// Controls the mobile behavior of the policy navigation.
// ===================================================

// ===================================================
// INITIALIZATION
// ===================================================
export const initPolicyToc = () => {
  const tocDetails = document.querySelector(".privacy__toc");

  if (!tocDetails) return;

  // Responsive Configuration
  const mobileQuery = window.matchMedia("(max-width: 768px)");

  // Navigation Events
  // ---------------------------------------------------
  // Fecha o acordeão automaticamente ao tocar em um link no mobile
  // ---------------------------------------------------
  tocDetails.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileQuery.matches) {
        tocDetails.removeAttribute("open");
      }
    });
  });
};
