// ===================================================
// ESTILO NOBRE ▪︎ HEADER COMPONENT
// 1. Scroll effect → floating header
// 2. Mobile menu   → a11y, keyboard and safety nets
// ===================================================
const header = document.querySelector(".header");

if (header) {
  initScrollEffect(header);
  initMobileMenu(header);
}

// == 1. Scroll Effect ==
// ---------------------------------------------------
function initScrollEffect(header) {
  const SCROLL_OFFSET = 40; // px de scroll antes de ativar o efeito

  const sentinel = document.createElement("div");
  sentinel.setAttribute("aria-hidden", "true");
  sentinel.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 0.0625rem;
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

// == 2. Mobile Menu ==
// ---------------------------------------------------
// O estado de aberto/fechado vive no checkbox (#check-icon): é ele que o CSS
// observa (ícone, header, painel, scroll lock). Aqui fica só o que CSS não faz:
// aria, teclado, foco e as "redes de segurança".
// ---------------------------------------------------
function initMobileMenu(header) {
  const wrapper = header.closest(".header-wrapper");
  const checkbox = header.querySelector("#check-icon");
  const toggle = header.querySelector(".icon-menu");
  const panel = header.querySelector("#header-panel");

  if (!wrapper || !checkbox || !toggle || !panel) return;

  // Mesmo valor do token `md` (48rem) → mix.respond(md) no Sass
  const mobileQuery = window.matchMedia("(width < 48rem)");

  // Tudo que não é o header: enquanto o menu está aberto, vira "inert"
  // (sem foco, sem clique, fora da árvore de acessibilidade → foco preso no menu)
  const getPageContent = () =>
    [...document.body.children].filter(
      (el) => el !== wrapper && !el.matches("script, style, link, template"),
    );

  const sync = () => {
    const isOpen = checkbox.checked;

    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação",
    );

    getPageContent().forEach((el) => {
      el.inert = isOpen;
    });
  };

  const close = ({ restoreFocus = false } = {}) => {
    if (!checkbox.checked) return;

    checkbox.checked = false; // alterar via JS não dispara "change"
    sync();

    if (restoreFocus) toggle.focus();
  };

  // Estado inicial: o navegador pode restaurar o checkbox marcado (reload)
  checkbox.checked = false;
  sync();

  checkbox.addEventListener("change", sync);

  // <label role="button">: Enter e Espaço precisam acionar o toggle
  toggle.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;

    e.preventDefault();
    checkbox.click();
  });

  // Clicou num link do menu (âncora ou WhatsApp) → fecha
  panel.addEventListener("click", (e) => {
    if (e.target.closest("a")) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close({ restoreFocus: true });
  });

  // Passou do breakpoint com o menu aberto → não deixa scroll travado no desktop
  mobileQuery.addEventListener("change", (e) => {
    if (!e.matches) close();
  });

  // Voltar pelo histórico (bfcache) não pode reabrir o menu
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) close();
  });
}
