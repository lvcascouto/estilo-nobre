// ===================================================
// ESTILO NOBRE ▪︎ COOKIE CONSENT
// ===================================================

const CONSENT_KEY = "estilo-nobre-cookie-consent";
const CONSENT_VERSION = 1;

// ===================================================
// STORAGE
// ===================================================

const getConsent = () => {
  try {
    const storedConsent = localStorage.getItem(CONSENT_KEY);

    if (!storedConsent) return null;

    const consent = JSON.parse(storedConsent);

    if (consent.version !== CONSENT_VERSION) return null;

    if (!["accepted", "rejected"].includes(consent.status)) {
      return null;
    }

    return consent;
  } catch (error) {
    console.warn("Não foi possível recuperar o consentimento:", error);
    return null;
  }
};

const saveConsent = (status) => {
  const consent = {
    status,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch (error) {
    console.warn("Não foi possível salvar o consentimento:", error);
  }

  return consent;
};

// ===================================================
// COOKIE CONSENT
// ===================================================

const initCookieConsent = () => {
  const banner = document.querySelector(".cookie-consent");

  if (!banner) return;

  const consentButtons = document.querySelectorAll("[data-cookie-consent]");

  const feedback = document.querySelector(".cookies__preferences-feedback");

  // == Initial state ==

  const savedConsent = getConsent();

  if (savedConsent) {
    banner.classList.add("is-hidden");
    banner.setAttribute("aria-hidden", "true");
  }

  // == Update preference ==

  const updateConsent = (status) => {
    const consent = saveConsent(status);

    banner.classList.add("is-hidden");
    banner.setAttribute("aria-hidden", "true");

    if (feedback) {
      feedback.hidden = false;

      feedback.textContent =
        status === "accepted"
          ? "Sua preferência foi atualizada. Os cookies opcionais foram aceitos."
          : "Sua preferência foi atualizada. Os cookies opcionais foram rejeitados.";
    }

    return consent;
  };

  // == Button events ==

  consentButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.cookieConsent;

      if (action === "accept") {
        updateConsent("accepted");
      }

      if (action === "reject") {
        updateConsent("rejected");
      }
    });
  });
};

// ===================================================
// INITIALIZATION
// ===================================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCookieConsent);
} else {
  initCookieConsent();
}
