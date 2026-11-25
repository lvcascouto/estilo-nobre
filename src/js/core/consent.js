// ===================================================
// AXIS ▪︎ COOKIE CONSENT CORE
// Handles consent storage and preference management.
// ===================================================

const CONSENT_KEY = "estilo-nobre-cookie-consent";
const CONSENT_VERSION = 1;

// ===================================================
// STORAGE
// ===================================================
export const getConsent = () => {
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

// ===================================================
// PREFERENCE MANAGEMENT
// ===================================================
export const saveConsent = (status) => {
  if (!["accepted", "rejected"].includes(status)) {
    return null;
  }

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

  // Notifica os módulos que dependem da preferência atualizada.
  window.dispatchEvent(
    new CustomEvent("cookie-consent-change", {
      detail: consent,
    }),
  );

  return consent;
};
