"use strict";

/* =========================================================
   A1 COMPUTER — BACKEND CONFIGURATION
   Central configuration for the public portal
   ========================================================= */

const A1_CONFIG = {
  app: {
    name: "A1 Computer",
    version: "1.0.0",
    environment: "production",
    language: "hi"
  },

  business: {
    name: "A1 Computer",
    address: "New Bus Stand, Ajaygarh",
    phone: "9993831755",
    email: "jatavneeraj479@gmail.com"
  },

  paths: {
    pages: "Pages/",
    css: "Css/",
    javascript: "Js/",
    admin: "Admin/",
    languages: "languages/",
    assets: "assets/"
  },

  features: {
    search: true,
    multilingual: true,
    notifications: true,
    aiAssistant: true,
    servicePages: true,
    adminPanel: true,
    responsiveDesign: true
  },

  languages: [
    {
      code: "hi",
      name: "Hindi",
      nativeName: "हिन्दी"
    },
    {
      code: "en",
      name: "English",
      nativeName: "English"
    },
    {
      code: "mr",
      name: "Marathi",
      nativeName: "मराठी"
    },
    {
      code: "gu",
      name: "Gujarati",
      nativeName: "ગુજરાતી"
    },
    {
      code: "bn",
      name: "Bengali",
      nativeName: "বাংলা"
    },
    {
      code: "ta",
      name: "Tamil",
      nativeName: "தமிழ்"
    },
    {
      code: "te",
      name: "Telugu",
      nativeName: "తెలుగు"
    }
  ],

  contact: {
    whatsapp: "https://wa.me/919993831755",
    phoneLink: "tel:+919993831755",
    emailLink: "mailto:jatavneeraj479@gmail.com"
  }
};

/* ---------------------------------------------------------
   Browser-safe export
   --------------------------------------------------------- */

if (typeof window !== "undefined") {
  window.A1_CONFIG = A1_CONFIG;
}

/* ---------------------------------------------------------
   Node/CommonJS export
   --------------------------------------------------------- */

if (typeof module !== "undefined" && module.exports) {
  module.exports = A1_CONFIG;
}
