// ===================================================
// ESTILO NOBRE ▪︎ HEADER COMPONENT (SCROLL EFFECT)
// ===================================================
const header = document.querySelector(".header");

if (header) {
  const SCROLL_OFFSET = 40; // px de scroll antes de ativar o efeito

  const sentinel = document.createElement("div");
  sentinel.setAttribute("aria-hidden", "true");
  sentinel.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: ${SCROLL_OFFSET}px;
    pointer-events: none;
    visibility: hidden;
  `;
  document.body.prepend(sentinel);

  const observer = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle("is-scrolled", !entry.isIntersecting);
    },
    { threshold: 0 },
  );

  observer.observe(sentinel);
}
