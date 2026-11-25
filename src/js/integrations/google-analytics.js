// ===================================================
// AXIS ▪︎ GOOGLE ANALYTICS
// Loads GA4 only after the visitor accepts analytics cookies.
// ===================================================

import { getConsent } from "../core/consent.js";

const MEASUREMENT_ID = "G-B8LQ4NK9EZ";
const GA_DISABLE_KEY = `ga-disable-${MEASUREMENT_ID}`;
const SCRIPT_ID = "google-analytics-script";
const CONSENT_EVENT = "cookie-consent-change";

let scriptRequested = false;
let scriptLoaded = false;
let analyticsInitialized = false;

// ===================================================
// COOKIE MANAGEMENT
// ===================================================

const clearAnalyticsCookies = () => {
  const cookies = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));

  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  cookies.forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${secure}`;
  });
};

// ===================================================
// GOOGLE TAG
// ===================================================

const configureAnalytics = () => {
  if (analyticsInitialized) return;

  window.gtag("js", new Date());

  window.gtag("config", MEASUREMENT_ID, {
    send_page_view: false,
    cookie_domain: "none",
    cookie_flags: "SameSite=Lax;Secure",
  });

  analyticsInitialized = true;
};

// ===================================================
// ACTIVATION
// ===================================================

const getConsentStatus = () => getConsent()?.status ?? null;

const activateAnalytics = () => {
  window[GA_DISABLE_KEY] = false;

  if (scriptLoaded) {
    configureAnalytics();
    return;
  }

  if (scriptRequested) return;

  // Data Layer
  window.dataLayer = window.dataLayer || [];

  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };

  // Script Loading
  const script = document.createElement("script");

  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;

  scriptRequested = true;

  script.addEventListener("load", () => {
    scriptLoaded = true;
    scriptRequested = false;

    if (getConsentStatus() === "accepted") {
      configureAnalytics();
    }
  });

  script.addEventListener("error", () => {
    scriptRequested = false;
    script.remove();
  });

  document.head.appendChild(script);
};

// ===================================================
// CONSENT STATUS
// ===================================================

const handleConsentChange = (event) => {
  const status = event.detail?.status;

  if (status === "accepted") {
    activateAnalytics();
    return;
  }

  if (status === "rejected") {
    window[GA_DISABLE_KEY] = true;
    clearAnalyticsCookies();
  }
};

// ===================================================
// INITIALIZATION
// ===================================================

export const initGoogleAnalytics = () => {
  // Blocks collection by default.
  window[GA_DISABLE_KEY] = true;

  // Reacts to changes made through the banner or policy page.
  window.addEventListener(CONSENT_EVENT, handleConsentChange);

  // Checks whether a preference is already saved.
  if (getConsentStatus() === "accepted") {
    activateAnalytics();
  } else {
    clearAnalyticsCookies();
  }
};
