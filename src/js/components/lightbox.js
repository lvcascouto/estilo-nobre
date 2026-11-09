// ===================================================
// ESTILO NOBRE ▪︎ LIGHTBOX COMPONENT
// ===================================================

document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".projects__gallery img");
  const lightbox = document.getElementById("projects-lightbox");

  if (!galleryImages.length || !lightbox) return;

  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const btnPrev = document.getElementById("lightbox-prev");
  const btnNext = document.getElementById("lightbox-next");
  const closeElements = document.querySelectorAll("[data-close]");

  // Transforma as imagens capturadas em um Array para facilitar a manipulação de índice
  const imagesArray = Array.from(galleryImages);
  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("is-active");
    // Trava o scroll do body para a pessoa não rolar a página enquanto vê a foto
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-active");
    document.body.style.overflow = "";
  };

  const updateLightbox = () => {
    const currentImg = imagesArray[currentIndex];
    lightboxImg.src = currentImg.src;
    lightboxImg.alt = currentImg.alt;
    // O texto do alt é injetado diretamente como a descrição da imagem
    lightboxCaption.textContent = currentImg.alt;
  };

  const prevImage = () => {
    currentIndex =
      currentIndex === 0 ? imagesArray.length - 1 : currentIndex - 1;
    updateLightbox();
  };

  const nextImage = () => {
    currentIndex =
      currentIndex === imagesArray.length - 1 ? 0 : currentIndex + 1;
    updateLightbox();
  };

  // Adiciona o evento de clique em cada imagem da galeria
  imagesArray.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  // Eventos de clique nos botões
  btnPrev.addEventListener("click", prevImage);
  btnNext.addEventListener("click", nextImage);

  // Fecha o lightbox ao clicar no X ou na camada de fundo escurecida
  closeElements.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  // Acessibilidade: Navegação por teclado
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
  });
});
