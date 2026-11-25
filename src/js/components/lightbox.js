// ===================================================
// AXIS ▪︎ LIGHTBOX COMPONENT
// Controls the project gallery image viewer.
// ===================================================

// ===================================================
// INITIALIZATION
// ===================================================
export const initLightbox = () => {
  const galleryImages = document.querySelectorAll(".projects__gallery img");
  const lightbox = document.getElementById("projects-lightbox");

  if (!galleryImages.length || !lightbox) return;

  // Element References
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const btnPrev = document.getElementById("lightbox-prev");
  const btnNext = document.getElementById("lightbox-next");
  const closeElements = lightbox.querySelectorAll("[data-close]");

  if (!lightboxImg || !lightboxCaption || !btnPrev || !btnNext) return;

  // Gallery State
  const imagesArray = Array.from(galleryImages);
  let currentIndex = 0;

  // Lightbox Controls
  const updateLightbox = () => {
    const currentImg = imagesArray[currentIndex];

    lightboxImg.src = currentImg.src;
    lightboxImg.alt = currentImg.alt;
    lightboxCaption.textContent = currentImg.alt;
  };

  const openLightbox = (index) => {
    currentIndex = index;
    updateLightbox();

    lightbox.classList.add("is-active");

    // Trava o scroll do body enquanto a imagem está aberta.
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-active");
    document.body.style.overflow = "";
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

  // ===================================================
  // EVENT LISTENERS
  // ===================================================

  // Gallery Images
  imagesArray.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  // Navigation Buttons
  btnPrev.addEventListener("click", prevImage);
  btnNext.addEventListener("click", nextImage);

  // Close Actions
  closeElements.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  // Keyboard Navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
  });
};
