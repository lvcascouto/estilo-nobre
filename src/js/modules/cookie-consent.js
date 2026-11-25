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
// PREFERENCE INDICATOR
// ===================================================

const renderPreference = (consent, feedback) => {
  if (!feedback) return;

  feedback.hidden = false;

  if (!consent) {
    feedback.dataset.state = "unset";
    feedback.textContent =
      "Você ainda não definiu sua preferência em relação aos cookies opcionais.";
    return;
  }

  if (consent.status === "accepted") {
    feedback.dataset.state = "accepted";
    feedback.textContent =
      "Preferência atual: cookies opcionais de análise aceitos.";
    return;
  }

  feedback.dataset.state = "rejected";
  feedback.textContent =
    "Preferência atual: cookies opcionais de análise recusados.";
};

// ===================================================
// COOKIE CONSENT
// ===================================================

const initCookieConsent = () => {
  const banner = document.querySelector(".cookie-consent");

  const consentButtons = document.querySelectorAll("[data-cookie-consent]");

  const feedback = document.querySelector(".cookies__preferences-feedback");

  // == Initial state ==

  const savedConsent = getConsent();

  if (savedConsent && banner) {
    banner.classList.add("is-hidden");
    banner.setAttribute("aria-hidden", "true");
  }

  renderPreference(savedConsent, feedback);

  // == Update preference ==

  const updateConsent = (status) => {
    const consent = saveConsent(status);

    if (banner) {
      banner.classList.add("is-hidden");
      banner.setAttribute("aria-hidden", "true");
    }

    renderPreference(consent, feedback);

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
