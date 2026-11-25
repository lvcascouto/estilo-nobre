// ===================================================
// AXIS ▪︎ MAIN JS ENTRY POINT
// Centralizes the application imports and initialization.
// ===================================================

import "../sass/main.scss";

// == 1. Base ==
import { initScrollAnimations } from "./base/animations.js";
import { initFloatingActions } from "./base/floating-actions.js";

// == 2. Components ==
import { initAccordion } from "./components/accordion.js";
import { initHeader } from "./components/header.js";
import { initLightbox } from "./components/lightbox.js";
import { initPolicyToc } from "./components/policy-toc.js";

// == 3. modules ==
import { initCookieConsent } from "./modules/cookie-consent.js";

// == 4. Integrations ==
import { initGoogleAnalytics } from "./integrations/google-analytics.js";

// ===================================================
// INITIALIZATION
// ===================================================

const initApp = () => {
  initScrollAnimations();
  initFloatingActions();

  initAccordion();
  initHeader();
  initLightbox();
  initPolicyToc();

  initCookieConsent();

  initGoogleAnalytics();
};

// ===================================================
// DOM READY
// ===================================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
