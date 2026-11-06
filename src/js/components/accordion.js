// ===================================================
// AXIS ▪︎ SERVICES ACCORDION
// ===================================================

document.addEventListener("DOMContentLoaded", () => {
  const accordionItems = document.querySelectorAll(".services__item");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!accordionItems.length) return;

  function getElements(item) {
    return {
      trigger: item.querySelector(".services__item-trigger"),
      content: item.querySelector(".services__item-content"),
    };
  }

  function closeItem(item) {
    const { trigger, content } = getElements(item);

    if (!trigger || !content) return;

    item.classList.remove("active");
    trigger.setAttribute("aria-expanded", "false");

    content.inert = true;
    content.setAttribute("aria-hidden", "true");

    if (reduceMotion.matches || content.hidden) {
      content.hidden = true;
    }
  }

  function openItem(item) {
    const { trigger, content } = getElements(item);

    if (!trigger || !content) return;

    content.hidden = false;
    content.inert = false;
    content.removeAttribute("aria-hidden");

    // Registra o estado fechado antes de iniciar a transição.
    if (!item.classList.contains("active")) {
      void content.offsetHeight;
    }

    item.classList.add("active");
    trigger.setAttribute("aria-expanded", "true");
  }

  accordionItems.forEach((item) => {
    const { trigger, content } = getElements(item);

    if (!trigger || !content) return;

    const isActive = item.classList.contains("active");

    trigger.setAttribute("aria-expanded", String(isActive));
    content.hidden = !isActive;
    content.inert = !isActive;

    if (isActive) {
      content.removeAttribute("aria-hidden");
    } else {
      content.setAttribute("aria-hidden", "true");
    }

    content.addEventListener("transitionend", (event) => {
      if (
        event.target === content &&
        event.propertyName === "grid-template-rows" &&
        !item.classList.contains("active")
      ) {
        content.hidden = true;
      }
    });

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          closeItem(otherItem);
        }
      });

      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });
});
