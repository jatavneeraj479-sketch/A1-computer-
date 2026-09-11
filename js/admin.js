/* =========================================================
   A1 COMPUTER — ADMIN CONTROL SYSTEM
   ========================================================= */

"use strict";

/* =========================================================
   1. ADMIN CONFIGURATION
   ========================================================= */

const A1_ADMIN_CONFIG = {
  sessionKey: "a1_admin_session",
  settingsKey: "a1_admin_settings",
  defaultAdminName: "A1 Computer Admin"
};

/* =========================================================
   2. ADMIN STATE
   ========================================================= */

const A1_ADMIN_STATE = {
  loggedIn: false,
  adminName: A1_ADMIN_CONFIG.defaultAdminName,
  lastActivity: null
};

/* =========================================================
   3. LOAD ADMIN SESSION
   ========================================================= */

function loadA1AdminSession() {

  try {

    const saved =
      localStorage.getItem(
        A1_ADMIN_CONFIG.sessionKey
      );

    if (!saved) {
      return false;
    }

    const session =
      JSON.parse(saved);

    if (
      session &&
      session.loggedIn === true
    ) {

      A1_ADMIN_STATE.loggedIn =
        true;

      A1_ADMIN_STATE.adminName =
        session.adminName ||
        A1_ADMIN_CONFIG.defaultAdminName;

      A1_ADMIN_STATE.lastActivity =
        session.lastActivity ||
        new Date().toISOString();

      return true;

    }

  } catch (error) {

    console.warn(
      "A1 admin session could not be loaded.",
      error
    );

  }

  return false;
}

/* =========================================================
   4. SAVE ADMIN SESSION
   ========================================================= */

function saveA1AdminSession() {

  const session = {

    loggedIn:
      A1_ADMIN_STATE.loggedIn,

    adminName:
      A1_ADMIN_STATE.adminName,

    lastActivity:
      new Date().toISOString()

  };

  A1_ADMIN_STATE.lastActivity =
    session.lastActivity;

  localStorage.setItem(
    A1_ADMIN_CONFIG.sessionKey,
    JSON.stringify(session)
  );

}

/* =========================================================
   5. ADMIN LOGIN
   ========================================================= */

function a1AdminLogin(
  username,
  password
) {

  /*
   * Frontend demo session only.
   * Production authentication must be
   * handled by a secure backend.
   */

  const cleanUsername =
    String(
      username || ""
    ).trim();

  const cleanPassword =
    String(
      password || ""
    );

  if (
    !cleanUsername ||
    !cleanPassword
  ) {

    return {
      success: false,
      message:
        "Username and password are required."
    };

  }

  /*
   * Temporary development login.
   * Replace with secure backend authentication
   * before production use.
   */

  if (
    cleanUsername === "admin" &&
    cleanPassword === "admin123"
  ) {

    A1_ADMIN_STATE.loggedIn =
      true;

    A1_ADMIN_STATE.adminName =
      "A1 Computer Admin";

    saveA1AdminSession();

    updateAdminInterface();

    return {
      success: true,
      message:
        "Login successful."
    };

  }

  return {
    success: false,
    message:
      "Invalid login details."
  };

}

/* =========================================================
   6. ADMIN LOGOUT
   ========================================================= */

function a1AdminLogout() {

  A1_ADMIN_STATE.loggedIn =
    false;

  A1_ADMIN_STATE.lastActivity =
    null;

  localStorage.removeItem(
    A1_ADMIN_CONFIG.sessionKey
  );

  updateAdminInterface();

  return true;

}

/* =========================================================
   7. CHECK LOGIN
   ========================================================= */

function isA1AdminLoggedIn() {

  return (
    A1_ADMIN_STATE.loggedIn ===
    true
  );

}

/* =========================================================
   8. REQUIRE ADMIN
   ========================================================= */

function requireA1Admin() {

  if (
    isA1AdminLoggedIn()
  ) {

    return true;

  }

  redirectToAdminLogin();

  return false;

}

/* =========================================================
   9. REDIRECT TO LOGIN
   ========================================================= */

function redirectToAdminLogin() {

  const currentPath =
    window.location.pathname;

  if (
    currentPath.includes(
      "/admin/"
    )
  ) {

    const loginPath =
      "login.html";

    if (
      !currentPath.endsWith(
        loginPath
      )
    ) {

      window.location.href =
        loginPath;

    }

  }

}

/* =========================================================
   10. ADMIN DATA STORE
   ========================================================= */

const A1_ADMIN_STORAGE = {

  get(key) {

    try {

      const value =
        localStorage.getItem(
          `a1_admin_${key}`
        );

      return value
        ? JSON.parse(value)
        : null;

    } catch (error) {

      console.warn(
        "A1 admin data read error.",
        error
      );

      return null;

    }

  },

  set(key, value) {

    try {

      localStorage.setItem(
        `a1_admin_${key}`,
        JSON.stringify(value)
      );

      return true;

    } catch (error) {

      console.warn(
        "A1 admin data save error.",
        error
      );

      return false;

    }

  },

  remove(key) {

    localStorage.removeItem(
      `a1_admin_${key}`
    );

  }

};

/* =========================================================
   11. GET SETTINGS
   ========================================================= */

function getA1AdminSettings() {

  const saved =
    A1_ADMIN_STORAGE.get(
      "settings"
    );

  if (saved) {
    return saved;
  }

  return {

    shopName:
      "A1 Computer",

    address:
      "New Bus Stand, Ajaigarh",

    phone:
      "9993831755",

    email:
      "jatavneeraj479@gmail.com",

    whatsapp:
      "919993831755",

    aiStatus:
      "OFF",

    maintenanceMode:
      false,

    notificationsEnabled:
      true

  };

}

/* =========================================================
   12. SAVE SETTINGS
   ========================================================= */

function saveA1AdminSettings(
  settings
) {

  if (
    !settings ||
    typeof settings !==
      "object"
  ) {

    return false;

  }

  const current =
    getA1AdminSettings();

  const updated = {

    ...current,
    ...settings

  };

  const saved =
    A1_ADMIN_STORAGE.set(
      "settings",
      updated
    );

  if (saved) {

    updateAdminInterface();

  }

  return saved;

}

/* =========================================================
   13. UPDATE ADMIN INTERFACE
   ========================================================= */

function updateAdminInterface() {

  const loggedIn =
    isA1AdminLoggedIn();

  document
    .querySelectorAll(
      "[data-admin-name]"
    )
    .forEach(
      (element) => {

        element.textContent =
          A1_ADMIN_STATE.adminName;

      }
    );

  document
    .querySelectorAll(
      "[data-admin-status]"
    )
    .forEach(
      (element) => {

        element.textContent =
          loggedIn
            ? "Logged In"
            : "Logged Out";

        element.classList.toggle(
          "active",
          loggedIn
        );

      }
    );

  document
    .querySelectorAll(
      "[data-admin-login]"
    )
    .forEach(
      (element) => {

        element.style.display =
          loggedIn
            ? "none"
            : "";

      }
    );

  document
    .querySelectorAll(
      "[data-admin-content]"
    )
    .forEach(
      (element) => {

        element.style.display =
          loggedIn
            ? ""
            : "none";

      }
    );

  document
    .querySelectorAll(
      "[data-admin-logout]"
    )
    .forEach(
      (element) => {

        element.style.display =
          loggedIn
            ? ""
            : "none";

      }
    );

}

/* =========================================================
   14. LOGIN FORM
   ========================================================= */

function initAdminLoginForm() {

  const form =
    document.querySelector(
      "#adminLoginForm, [data-admin-login-form]"
    );

  if (!form) {
    return;
  }

  form.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      const username =
        form.querySelector(
          "[name='username'], #adminUsername"
        );

      const password =
        form.querySelector(
          "[name='password'], #adminPassword"
        );

      const message =
        form.querySelector(
          "[data-admin-login-message]"
        );

      const result =
        a1AdminLogin(
          username
            ? username.value
            : "",
          password
            ? password.value
            : ""
        );

      if (message) {

        message.textContent =
          result.message;

        message.classList.toggle(
          "success",
          result.success
        );

        message.classList.toggle(
          "error",
          !result.success
        );

      }

      if (result.success) {

        setTimeout(
          () => {

            window.location.href =
              "dashboard.html";

          },
          400
        );

      }

    }
  );

}

/* =========================================================
   15. LOGOUT BUTTON
   ========================================================= */

function initAdminLogoutButtons() {

  document
    .querySelectorAll(
      "[data-admin-logout], #adminLogout"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          (event) => {

            event.preventDefault();

            a1AdminLogout();

            window.location.href =
              "login.html";

          }
        );

      }
    );

}

/* =========================================================
   16. AI ADMIN CONTROL
   ========================================================= */

function setAdminAIStatus(
  status
) {

  const normalized =
    String(
      status || ""
    ).toUpperCase();

  if (
    normalized !== "ON" &&
    normalized !== "OFF"
  ) {

    return false;

  }

  saveA1AdminSettings({

    aiStatus:
      normalized

  });

  /*
   * Connect with ai.js when available.
   */

  if (
    window.A1AI &&
    typeof window.A1AI.enable ===
      "function"
  ) {

    if (
      normalized === "ON"
    ) {

      window.A1AI.enable();

    } else {

      window.A1AI.disable();

    }

  }

  updateAIAdminControls();

  return true;

}

/* =========================================================
   17. AI ADMIN CONTROLS
   ========================================================= */

function updateAIAdminControls() {

  const settings =
    getA1AdminSettings();

  let status =
    settings.aiStatus ||
    "OFF";

  if (
    window.A1AI &&
    window.A1AI.state
  ) {

    status =
      window.A1AI.state.status;

  }

  document
    .querySelectorAll(
      "[data-ai-status]"
    )
    .forEach(
      (element) => {

        element.textContent =
          status;

        element.classList.toggle(
          "ai-on",
          status === "ON"
        );

        element.classList.toggle(
          "ai-off",
          status === "OFF"
        );

      }
    );

  document
    .querySelectorAll(
      "[data-admin-ai-on]"
    )
    .forEach(
      (button) => {

        button.classList.toggle(
          "active",
          status === "ON"
        );

      }
    );

  document
    .querySelectorAll(
      "[data-admin-ai-off]"
    )
    .forEach(
      (button) => {

        button.classList.toggle(
          "active",
          status === "OFF"
        );

      }
    );

}

/* =========================================================
   18. INITIALIZE AI ADMIN CONTROLS
   ========================================================= */

function initAIAdminControls() {

  document
    .querySelectorAll(
      "[data-admin-ai-on]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            setAdminAIStatus(
              "ON"
            );

          }
        );

      }
    );

  document
    .querySelectorAll(
      "[data-admin-ai-off]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            setAdminAIStatus(
              "OFF"
            );

          }
        );

      }
    );

  updateAIAdminControls();

}

/* =========================================================
   19. SERVICE MANAGEMENT
   ========================================================= */

function getAdminServices() {

  return (
    A1_ADMIN_STORAGE.get(
      "services"
    ) || []
  );

}

function saveAdminServices(
  services
) {

  return A1_ADMIN_STORAGE.set(
    "services",
    Array.isArray(services)
      ? services
      : []
  );

}

function addAdminService(
  service
) {

  if (
    !service ||
    !service.title
  ) {

    return null;

  }

  const services =
    getAdminServices();

  const newService = {

    id:
      service.id ||
      `service-${Date.now()}`,

    title:
      service.title,

    category:
      service.category ||
      "General",

    description:
      service.description ||
      "",

    link:
      service.link ||
      "",

    icon:
      service.icon ||
      "📌",

    active:
      service.active !== false,

    createdAt:
      new Date().toISOString()

  };

  services.unshift(
    newService
  );

  saveAdminServices(
    services
  );

  return newService;

}

/* =========================================================
   20. JOB MANAGEMENT
   ========================================================= */

function getAdminJobs() {

  return (
    A1_ADMIN_STORAGE.get(
      "jobs"
    ) || []
  );

}

function saveAdminJobs(
  jobs
) {

  return A1_ADMIN_STORAGE.set(
    "jobs",
    Array.isArray(jobs)
      ? jobs
      : []
  );

}

function addAdminJob(
  job
) {

  if (
    !job ||
    !job.title
  ) {

    return null;

  }

  const jobs =
    getAdminJobs();

  const newJob = {

    id:
      job.id ||
      `job-${Date.now()}`,

    title:
      job.title,

    organization:
      job.organization ||
      "",

    eligibility:
      job.eligibility ||
      "",

    age:
      job.age ||
      "",

    lastDate:
      job.lastDate ||
      "",

    officialLink:
      job.officialLink ||
      "",

    active:
      job.active !== false,

    createdAt:
      new Date().toISOString()

  };

  jobs.unshift(
    newJob
  );

  saveAdminJobs(
    jobs
  );

  return newJob;

}

/* =========================================================
   21. SCHEME MANAGEMENT
   ========================================================= */

function getAdminSchemes() {

  return (
    A1_ADMIN_STORAGE.get(
      "schemes"
    ) || []
  );

}

function saveAdminSchemes(
  schemes
) {

  return A1_ADMIN_STORAGE.set(
    "schemes",
    Array.isArray(schemes)
      ? schemes
      : []
  );

}

function addAdminScheme(
  scheme
) {

  if (
    !scheme ||
    !scheme.title
  ) {

    return null;

  }

  const schemes =
    getAdminSchemes();

  const newScheme = {

    id:
      scheme.id ||
      `scheme-${Date.now()}`,

    title:
      scheme.title,

    category:
      scheme.category ||
      "General",

    eligibility:
      scheme.eligibility ||
      "",

    benefits:
      scheme.benefits ||
      "",

    documents:
      scheme.documents ||
      "",

    officialLink:
      scheme.officialLink ||
      "",

    active:
      scheme.active !== false,

    createdAt:
      new Date().toISOString()

  };

  schemes.unshift(
    newScheme
  );

  saveAdminSchemes(
    schemes
  );

  return newScheme;

}

/* =========================================================
   22. NOTICE MANAGEMENT
   ========================================================= */

function getAdminNotices() {

  return (
    A1_ADMIN_STORAGE.get(
      "notices"
    ) || []
  );

}

function saveAdminNotices(
  notices
) {

  return A1_ADMIN_STORAGE.set(
    "notices",
    Array.isArray(notices)
      ? notices
      : []
  );

}

function addAdminNotice(
  notice
) {

  if (
    !notice ||
    !notice.title
  ) {

    return null;

  }

  const notices =
    getAdminNotices();

  const newNotice = {

    id:
      notice.id ||
      `notice-${Date.now()}`,

    title:
      notice.title,

    description:
      notice.description ||
      "",

    category:
      notice.category ||
      "General",

    date:
      notice.date ||
      new Date().toISOString(),

    link:
      notice.link ||
      "",

    active:
      notice.active !== false,

    createdAt:
      new Date().toISOString()

  };

  notices.unshift(
    newNotice
  );

  saveAdminNotices(
    notices
  );

  if (
    window.A1Notifications &&
    typeof window.A1Notifications.add ===
      "function"
  ) {

    window.A1Notifications.add({

      id:
        newNotice.id,

      title:
        newNotice.title,

      message:
        newNotice.description,

      category:
        newNotice.category,

      date:
        newNotice.date,

      link:
        newNotice.link,

      active:
        newNotice.active

    });

  }

  return newNotice;

}

/* =========================================================
   23. BANNER MANAGEMENT
   ========================================================= */

function getAdminBanners() {

  return (
    A1_ADMIN_STORAGE.get(
      "banners"
    ) || []
  );

}

function saveAdminBanners(
  banners
) {

  return A1_ADMIN_STORAGE.set(
    "banners",
    Array.isArray(banners)
      ? banners
      : []
  );

}

function addAdminBanner(
  banner
) {

  if (
    !banner ||
    !banner.title
  ) {

    return null;

  }

  const banners =
    getAdminBanners();

  const newBanner = {

    id:
      banner.id ||
      `banner-${Date.now()}`,

    title:
      banner.title,

    description:
      banner.description ||
      "",

    image:
      banner.image ||
      "",

    buttonText:
      banner.buttonText ||
      "",

    buttonLink:
      banner.buttonLink ||
      "",

    startDate:
      banner.startDate ||
      "",

    endDate:
      banner.endDate ||
      "",

    active:
      banner.active !== false,

    createdAt:
      new Date().toISOString()

  };

  banners.unshift(
    newBanner
  );

  saveAdminBanners(
    banners
  );

  return newBanner;

}

/* =========================================================
   24. DASHBOARD COUNTERS
   ========================================================= */

function updateAdminDashboardCounters() {

  const counters = {

    services:
      getAdminServices()
        .length,

    jobs:
      getAdminJobs()
        .length,

    schemes:
      getAdminSchemes()
        .length,

    notices:
      getAdminNotices()
        .length,

    banners:
      getAdminBanners()
        .length

  };

  document
    .querySelectorAll(
      "[data-count-services]"
    )
    .forEach(
      (element) =>
        element.textContent =
          counters.services
    );

  document
    .querySelectorAll(
      "[data-count-jobs]"
    )
    .forEach(
      (element) =>
        element.textContent =
          counters.jobs
    );

  document
    .querySelectorAll(
      "[data-count-schemes]"
    )
    .forEach(
      (element) =>
        element.textContent =
          counters.schemes
    );

  document
    .querySelectorAll(
      "[data-count-notices]"
    )
    .forEach(
      (element) =>
        element.textContent =
          counters.notices
    );

  document
    .querySelectorAll(
      "[data-count-banners]"
    )
    .forEach(
      (element) =>
        element.textContent =
          counters.banners
    );

}

/* =========================================================
   25. ADMIN NAVIGATION
   ========================================================= */

function initAdminNavigation() {

  document
    .querySelectorAll(
      "[data-admin-page]"
    )
    .forEach(
      (link) => {

        link.addEventListener(
          "click",
          () => {

            document
              .querySelectorAll(
                "[data-admin-page]"
              )
              .forEach(
                (item) =>
                  item.classList.remove(
                    "active"
                  )
              );

            link.classList.add(
              "active"
            );

          }
        );

      }
    );

}

/* =========================================================
   26. ADMIN SEARCH
   ========================================================= */

function initAdminSearch() {

  const inputs =
    document.querySelectorAll(
      "[data-admin-search], #adminSearch"
    );

  inputs.forEach(
    (input) => {

      input.addEventListener(
        "input",
        () => {

          const query =
            input.value
              .toLowerCase()
              .trim();

          document
            .querySelectorAll(
              "[data-admin-search-item]"
            )
            .forEach(
              (item) => {

                const text =
                  item.textContent
                    .toLowerCase();

                item.style.display =
                  !query ||
                  text.includes(
                    query
                  )
                    ? ""
                    : "none";

              }
            );

        }
      );

    }
  );

}

/* =========================================================
   27. ADMIN MENU
   ========================================================= */

function initAdminMenu() {

  document
    .querySelectorAll(
      "[data-admin-menu-toggle]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            document.body.classList.toggle(
              "admin-menu-open"
            );

          }
        );

      }
    );

}

/* =========================================================
   28. PUBLIC DATA SYNC
   ========================================================= */

function syncPublicData() {

  document.dispatchEvent(
    new CustomEvent(
      "a1AdminDataUpdated",
      {
        detail: {
          services:
            getAdminServices(),

          jobs:
            getAdminJobs(),

          schemes:
            getAdminSchemes(),

          notices:
            getAdminNotices(),

          banners:
            getAdminBanners(),

          settings:
            getA1AdminSettings()

        }
      }
    )
  );

}

/* =========================================================
   29. GLOBAL ADMIN API
   ========================================================= */

window.A1Admin = {

  state:
    A1_ADMIN_STATE,

  login:
    a1AdminLogin,

  logout:
    a1AdminLogout,

  isLoggedIn:
    isA1AdminLoggedIn,

  requireLogin:
    requireA1Admin,

  settings:
    getA1AdminSettings,

  saveSettings:
    saveA1AdminSettings,

  setAI:
    setAdminAIStatus,

  services:
    getAdminServices,

  addService:
    addAdminService,

  jobs:
    getAdminJobs,

  addJob:
    addAdminJob,

  schemes:
    getAdminSchemes,

  addScheme:
    addAdminScheme,

  notices:
    getAdminNotices,

  addNotice:
    addAdminNotice,

  banners:
    getAdminBanners,

  addBanner:
    addAdminBanner,

  dashboard:
    updateAdminDashboardCounters,

  sync:
    syncPublicData

};

/* =========================================================
   30. INITIALIZE ADMIN SYSTEM
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadA1AdminSession();

    updateAdminInterface();

    updateAIAdminControls();

    updateAdminDashboardCounters();

    initAdminLoginForm();

    initAdminLogoutButtons();

    initAIAdminControls();

    initAdminNavigation();

    initAdminSearch();

    initAdminMenu();

    console.log(
      "A1 Computer — Admin system initialized."
    );

  }
);
