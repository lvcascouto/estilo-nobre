// ===================================================
// AXIS ▪︎ COOKIE CONSENT MODULE
// Controls the cookie banner and preference feedback.
// ===================================================

import { getConsent, saveConsent } from "../core/consent.js";

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
export const initCookieConsent = () => {
  const banner = document.querySelector(".cookie-consent");
  const consentButtons = document.querySelectorAll("[data-cookie-consent]");
  const feedback = document.querySelector(".cookies__preferences-feedback");

  // Initial State
  const savedConsent = getConsent();

  if (savedConsent && banner) {
    banner.classList.add("is-hidden");
    banner.setAttribute("aria-hidden", "true");
  }

  renderPreference(savedConsent, feedback);

  // Update Preference
  const updateConsent = (status) => {
    const consent = saveConsent(status);

    if (!consent) return;

    if (banner) {
      banner.classList.add("is-hidden");
      banner.setAttribute("aria-hidden", "true");
    }

    renderPreference(consent, feedback);
  };

  // Button Events
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
