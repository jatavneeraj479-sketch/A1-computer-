/* =========================================================
   A1 COMPUTER — MULTI LANGUAGE SYSTEM
   ========================================================= */

"use strict";

/* =========================================================
   1. LANGUAGE CONFIGURATION
   ========================================================= */

const A1_LANGUAGES = {
  hi: {
    name: "हिन्दी",
    nativeName: "हिन्दी",
    flag: "🇮🇳"
  },

  en: {
    name: "English",
    nativeName: "English",
    flag: "🇬🇧"
  },

  mr: {
    name: "मराठी",
    nativeName: "मराठी",
    flag: "🇮🇳"
  },

  gu: {
    name: "ગુજરાતી",
    nativeName: "ગુજરાતી",
    flag: "🇮🇳"
  },

  bn: {
    name: "বাংলা",
    nativeName: "বাংলা",
    flag: "🇮🇳"
  },

  ta: {
    name: "தமிழ்",
    nativeName: "தமிழ்",
    flag: "🇮🇳"
  },

  te: {
    name: "తెలుగు",
    nativeName: "తెలుగు",
    flag: "🇮🇳"
  }
};

/* =========================================================
   2. DEFAULT LANGUAGE
   ========================================================= */

const A1_DEFAULT_LANGUAGE = "hi";

let A1_CURRENT_LANGUAGE =
  localStorage.getItem(
    "a1_language"
  ) || A1_DEFAULT_LANGUAGE;

/* =========================================================
   3. TRANSLATION DATA
   ========================================================= */

const A1_TRANSLATIONS = {

  hi: {

    home: "होम",
    services: "सभी सेवाएँ",
    student: "Student Hub",
    government: "सरकारी सेवाएँ",
    land: "भूमि एवं संपत्ति",
    documents: "दस्तावेज़",
    jobs: "नौकरी एवं करियर",
    schemes: "सरकारी योजनाएँ",
    travel: "यात्रा",
    citizen: "Citizen Help",
    notices: "नोटिस / अपडेट",
    contact: "संपर्क",

    searchPlaceholder:
      "कुछ भी खोजें...",

    search:
      "खोजें",

    exploreServices:
      "सभी सेवाएँ देखें",

    askAI:
      "AI से पूछें",

    quickServices:
      "Quick Services",

    latestUpdates:
      "Latest Updates",

    importantNotice:
      "महत्वपूर्ण सूचना",

    viewDetails:
      "विवरण देखें",

    officialWebsite:
      "Official Website",

    documentsRequired:
      "आवश्यक दस्तावेज़",

    eligibility:
      "पात्रता",

    process:
      "प्रक्रिया",

    fees:
      "फीस",

    close:
      "बंद करें",

    back:
      "वापस",

    noResults:
      "कोई परिणाम नहीं मिला",

    tryAnother:
      "कोई दूसरा keyword आज़माएँ",

    callNow:
      "अभी कॉल करें",

    whatsapp:
      "WhatsApp",

    email:
      "ईमेल",

    menu:
      "मेनू",

    language:
      "भाषा",

    notifications:
      "सूचनाएँ",

    aiAssistant:
      "AI Assistant",

    allServices:
      "सभी सेवाएँ",

    studentServices:
      "Student Services",

    governmentServices:
      "Government Services",

    landServices:
      "Land Services",

    documentServices:
      "Document Services",

    jobServices:
      "Job & Career Services",

    schemeServices:
      "Scheme Services",

    travelServices:
      "Travel Services",

    citizenServices:
      "Citizen Help",

    loading:
      "लोड हो रहा है...",

    online:
      "Online",

    offline:
      "Offline",

    copyright:
      "सर्वाधिकार सुरक्षित।",

    address:
      "New Bus Stand, Ajaigarh",

    tagline:
      "पढ़ाई, परीक्षा और सरकारी सेवाएँ — एक ही जगह"
  },

  en: {

    home: "Home",
    services: "All Services",
    student: "Student Hub",
    government: "Government Services",
    land: "Land & Property",
    documents: "Documents",
    jobs: "Jobs & Career",
    schemes: "Government Schemes",
    travel: "Travel",
    citizen: "Citizen Help",
    notices: "Notices / Updates",
    contact: "Contact",

    searchPlaceholder:
      "Search anything...",

    search:
      "Search",

    exploreServices:
      "Explore Services",

    askAI:
      "Ask AI",

    quickServices:
      "Quick Services",

    latestUpdates:
      "Latest Updates",

    importantNotice:
      "Important Notice",

    viewDetails:
      "View Details",

    officialWebsite:
      "Official Website",

    documentsRequired:
      "Required Documents",

    eligibility:
      "Eligibility",

    process:
      "Process",

    fees:
      "Fees",

    close:
      "Close",

    back:
      "Back",

    noResults:
      "No results found",

    tryAnother:
      "Try another keyword",

    callNow:
      "Call Now",

    whatsapp:
      "WhatsApp",

    email:
      "Email",

    menu:
      "Menu",

    language:
      "Language",

    notifications:
      "Notifications",

    aiAssistant:
      "AI Assistant",

    allServices:
      "All Services",

    studentServices:
      "Student Services",

    governmentServices:
      "Government Services",

    landServices:
      "Land Services",

    documentServices:
      "Document Services",

    jobServices:
      "Job & Career Services",

    schemeServices:
      "Scheme Services",

    travelServices:
      "Travel Services",

    citizenServices:
      "Citizen Help",

    loading:
      "Loading...",

    online:
      "Online",

    offline:
      "Offline",

    copyright:
      "All rights reserved.",

    address:
      "New Bus Stand, Ajaigarh",

    tagline:
      "Study, exams and government services — all in one place"
  },

  mr: {

    home: "मुख्यपृष्ठ",
    services: "सर्व सेवा",
    student: "विद्यार्थी केंद्र",
    government: "सरकारी सेवा",
    land: "जमीन आणि मालमत्ता",
    documents: "कागदपत्रे",
    jobs: "नोकरी आणि करिअर",
    schemes: "सरकारी योजना",
    travel: "प्रवास",
    citizen: "नागरिक मदत",
    notices: "सूचना / अपडेट",
    contact: "संपर्क",

    searchPlaceholder:
      "काहीही शोधा...",

    search: "शोधा",

    exploreServices:
      "सेवा पहा",

    askAI:
      "AI ला विचारा",

    viewDetails:
      "तपशील पहा",

    officialWebsite:
      "अधिकृत वेबसाइट",

    eligibility:
      "पात्रता",

    process:
      "प्रक्रिया",

    fees:
      "शुल्क",

    close:
      "बंद करा",

    noResults:
      "कोणतेही परिणाम सापडले नाहीत",

    callNow:
      "आत्ता कॉल करा",

    whatsapp:
      "WhatsApp",

    email:
      "ईमेल",

    menu:
      "मेनू",

    language:
      "भाषा",

    notifications:
      "सूचना",

    aiAssistant:
      "AI सहाय्यक"
  },

  gu: {

    home: "હોમ",
    services: "બધી સેવાઓ",
    student: "વિદ્યાર્થી કેન્દ્ર",
    government: "સરકારી સેવાઓ",
    land: "જમીન અને મિલકત",
    documents: "દસ્તાવેજો",
    jobs: "નોકરી અને કારકિર્દી",
    schemes: "સરકારી યોજનાઓ",
    travel: "પ્રવાસ",
    citizen: "નાગરિક સહાય",
    notices: "નોટિસ / અપડેટ",
    contact: "સંપર્ક",

    searchPlaceholder:
      "કંઈપણ શોધો...",

    search:
      "શોધો",

    exploreServices:
      "સેવાઓ જુઓ",

    askAI:
      "AI ને પૂછો",

    viewDetails:
      "વિગતો જુઓ",

    officialWebsite:
      "સત્તાવાર વેબસાઇટ",

    eligibility:
      "પાત્રતા",

    process:
      "પ્રક્રિયા",

    fees:
      "ફી",

    close:
      "બંધ કરો",

    noResults:
      "કોઈ પરિણામ મળ્યું નથી",

    callNow:
      "હમણાં કૉલ કરો",

    whatsapp:
      "WhatsApp",

    email:
      "ઈમેલ",

    menu:
      "મેનૂ",

    language:
      "ભાષા",

    notifications:
      "સૂચનાઓ",

    aiAssistant:
      "AI સહાયક"
  },

  bn: {

    home: "হোম",
    services: "সব পরিষেবা",
    student: "শিক্ষার্থী কেন্দ্র",
    government: "সরকারি পরিষেবা",
    land: "জমি ও সম্পত্তি",
    documents: "নথিপত্র",
    jobs: "চাকরি ও ক্যারিয়ার",
    schemes: "সরকারি প্রকল্প",
    travel: "ভ্রমণ",
    citizen: "নাগরিক সহায়তা",
    notices: "নোটিশ / আপডেট",
    contact: "যোগাযোগ",

    searchPlaceholder:
      "যেকোনো কিছু খুঁজুন...",

    search:
      "অনুসন্ধান",

    exploreServices:
      "পরিষেবা দেখুন",

    askAI:
      "AI-কে জিজ্ঞাসা করুন",

    viewDetails:
      "বিস্তারিত দেখুন",

    officialWebsite:
      "অফিসিয়াল ওয়েবসাইট",

    eligibility:
      "যোগ্যতা",

    process:
      "প্রক্রিয়া",

    fees:
      "ফি",

    close:
      "বন্ধ করুন",

    noResults:
      "কোনো ফলাফল পাওয়া যায়নি",

    callNow:
      "এখনই কল করুন",

    whatsapp:
      "WhatsApp",

    email:
      "ইমেল",

    menu:
      "মেনু",

    language:
      "ভাষা",

    notifications:
      "বিজ্ঞপ্তি",

    aiAssistant:
      "AI সহায়ক"
  },

  ta: {

    home: "முகப்பு",
    services: "அனைத்து சேவைகள்",
    student: "மாணவர் மையம்",
    government: "அரசு சேவைகள்",
    land: "நிலம் மற்றும் சொத்து",
    documents: "ஆவணங்கள்",
    jobs: "வேலை மற்றும் தொழில்",
    schemes: "அரசு திட்டங்கள்",
    travel: "பயணம்",
    citizen: "குடிமக்கள் உதவி",
    notices: "அறிவிப்புகள் / புதுப்பிப்புகள்",
    contact: "தொடர்பு",

    searchPlaceholder:
      "எதையும் தேடுங்கள்...",

    search:
      "தேடல்",

    exploreServices:
      "சேவைகளைப் பார்க்கவும்",

    askAI:
      "AI-யிடம் கேளுங்கள்",

    viewDetails:
      "விவரங்களைப் பார்க்கவும்",

    officialWebsite:
      "அதிகாரப்பூர்வ இணையதளம்",

    eligibility:
      "தகுதி",

    process:
      "செயல்முறை",

    fees:
      "கட்டணம்",

    close:
      "மூடு",

    noResults:
      "முடிவுகள் எதுவும் இல்லை",

    callNow:
      "இப்போது அழைக்கவும்",

    whatsapp:
      "WhatsApp",

    email:
      "மின்னஞ்சல்",

    menu:
      "மெனு",

    language:
      "மொழி",

    notifications:
      "அறிவிப்புகள்",

    aiAssistant:
      "AI உதவியாளர்"
  },

  te: {

    home: "హోమ్",
    services: "అన్ని సేవలు",
    student: "విద్యార్థి కేంద్రం",
    government: "ప్రభుత్వ సేవలు",
    land: "భూమి & ఆస్తి",
    documents: "పత్రాలు",
    jobs: "ఉద్యోగాలు & కెరీర్",
    schemes: "ప్రభుత్వ పథకాలు",
    travel: "ప్రయాణం",
    citizen: "పౌర సహాయం",
    notices: "నోటీసులు / అప్‌డేట్లు",
    contact: "సంప్రదించండి",

    searchPlaceholder:
      "ఏదైనా శోధించండి...",

    search:
      "శోధించండి",

    exploreServices:
      "సేవలను చూడండి",

    askAI:
      "AIని అడగండి",

    viewDetails:
      "వివరాలు చూడండి",

    officialWebsite:
      "అధికారిక వెబ్‌సైట్",

    eligibility:
      "అర్హత",

    process:
      "ప్రక్రియ",

    fees:
      "ఫీజు",

    close:
      "మూసివేయండి",

    noResults:
      "ఫలితాలు ఏవీ కనుగొనబడలేదు",

    callNow:
      "ఇప్పుడే కాల్ చేయండి",

    whatsapp:
      "WhatsApp",

    email:
      "ఇమెయిల్",

    menu:
      "మెను",

    language:
      "భాష",

    notifications:
      "నోటిఫికేషన్లు",

    aiAssistant:
      "AI సహాయకుడు"
  }

};

/* =========================================================
   4. GET TRANSLATION
   ========================================================= */

function a1Translate(
  key,
  language = A1_CURRENT_LANGUAGE
) {

  const current =
    A1_TRANSLATIONS[language] ||
    A1_TRANSLATIONS[A1_DEFAULT_LANGUAGE];

  const fallback =
    A1_TRANSLATIONS[A1_DEFAULT_LANGUAGE];

  return (
    current[key] ||
    fallback[key] ||
    key
  );
}

/* =========================================================
   5. APPLY LANGUAGE
   ========================================================= */

function applyA1Language(
  language
) {

  if (
    !A1_LANGUAGES[language]
  ) {
    language =
      A1_DEFAULT_LANGUAGE;
  }

  A1_CURRENT_LANGUAGE =
    language;

  localStorage.setItem(
    "a1_language",
    language
  );

  document.documentElement
    .setAttribute(
      "lang",
      language
    );

  /* Text */

  document
    .querySelectorAll(
      "[data-i18n]"
    )
    .forEach((element) => {

      const key =
        element.dataset.i18n;

      element.textContent =
        a1Translate(
          key,
          language
        );

    });

  /* Placeholder */

  document
    .querySelectorAll(
      "[data-i18n-placeholder]"
    )
    .forEach((element) => {

      const key =
        element.dataset
          .i18nPlaceholder;

      element.placeholder =
        a1Translate(
          key,
          language
        );

    });

  /* Title */

  document
    .querySelectorAll(
      "[data-i18n-title]"
    )
    .forEach((element) => {

      const key =
        element.dataset.i18nTitle;

      element.title =
        a1Translate(
          key,
          language
        );

    });

  /* ARIA label */

  document
    .querySelectorAll(
      "[data-i18n-aria]"
    )
    .forEach((element) => {

      const key =
        element.dataset.i18nAria;

      element.setAttribute(
        "aria-label",
        a1Translate(
          key,
          language
        )
      );

    });

  updateLanguageControls();

  document.dispatchEvent(
    new CustomEvent(
      "a1LanguageChanged",
      {
        detail: {
          language
        }
      }
    )
  );
}

/* =========================================================
   6. LANGUAGE SWITCHER
   ========================================================= */

function initLanguageSwitcher() {

  const controls =
    document.querySelectorAll(
      "[data-language]"
    );

  if (!controls.length) return;

  controls.forEach(
    (control) => {

      control.addEventListener(
        "click",
        () => {

          const language =
            control.dataset
              .language;

          if (
            language &&
            A1_LANGUAGES[language]
          ) {

            applyA1Language(
              language
            );

          }

        }
      );

    }
  );
}

/* =========================================================
   7. UPDATE LANGUAGE CONTROLS
   ========================================================= */

function updateLanguageControls() {

  document
    .querySelectorAll(
      "[data-language]"
    )
    .forEach((control) => {

      const language =
        control.dataset.language;

      const isActive =
        language ===
        A1_CURRENT_LANGUAGE;

      control.classList.toggle(
        "active",
        isActive
      );

      control.setAttribute(
        "aria-pressed",
        String(isActive)
      );

    });

  const currentName =
    A1_LANGUAGES[
      A1_CURRENT_LANGUAGE
    ]?.nativeName ||
    A1_LANGUAGES.hi.nativeName;

  document
    .querySelectorAll(
      "[data-current-language]"
    )
    .forEach((element) => {

      element.textContent =
        currentName;

    });
}

/* =========================================================
   8. CREATE LANGUAGE MENU
   ========================================================= */

function createLanguageMenu(
  container
) {

  if (!container) return;

  container.innerHTML = "";

  Object.entries(
    A1_LANGUAGES
  ).forEach(
    ([code, language]) => {

      const button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.className =
        "language-option";

      button.dataset.language =
        code;

      button.innerHTML = `
        <span class="language-flag">
          ${language.flag}
        </span>

        <span class="language-name">
          ${language.nativeName}
        </span>
      `;

      button.addEventListener(
        "click",
        () => {

          applyA1Language(
            code
          );

        }
      );

      container.appendChild(
        button
      );

    }
  );

  updateLanguageControls();
}

/* =========================================================
   9. LANGUAGE DROPDOWN
   ========================================================= */

function initLanguageDropdown() {

  const toggle =
    document.querySelector(
      "#languageToggle, [data-language-toggle]"
    );

  const menu =
    document.querySelector(
      "#languageMenu, [data-language-menu]"
    );

  if (!toggle || !menu) return;

  toggle.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      menu.classList.toggle(
        "active"
      );

      menu.classList.toggle(
        "open"
      );

      const expanded =
        menu.classList.contains(
          "active"
        );

      toggle.setAttribute(
        "aria-expanded",
        String(expanded)
      );

    }
  );

  document.addEventListener(
    "click",
    () => {

      menu.classList.remove(
        "active"
      );

      menu.classList.remove(
        "open"
      );

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

    }
  );

  menu.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();
    }
  );
}

/* =========================================================
   10. LANGUAGE API
   ========================================================= */

window.A1Language = {

  languages:
    A1_LANGUAGES,

  translations:
    A1_TRANSLATIONS,

  getCurrent() {
    return A1_CURRENT_LANGUAGE;
  },

  translate:
    a1Translate,

  set:
    applyA1Language,

  init:
    initLanguageSwitcher

};

/* =========================================================
   11. INITIALIZE
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initLanguageSwitcher();

    initLanguageDropdown();

    applyA1Language(
      A1_CURRENT_LANGUAGE
    );

    console.log(
      "A1 Computer — Language system initialized."
    );

  }
);
