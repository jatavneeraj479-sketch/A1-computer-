/* =========================================================
   A1 COMPUTER — MAIN APP CONTROLLER
   Public Website Common JavaScript
   ========================================================= */

"use strict";

/* =========================================================
   1. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initSmoothNavigation();
  initActiveNavigation();
  initBackToTop();
  initCurrentYear();
  initPageLoader();
  initRevealAnimations();
  initKeyboardNavigation();
  initExternalLinks();
  initScrollHeader();
});

/* =========================================================
   2. MOBILE MENU
   ========================================================= */

function initMobileMenu() {
  const menuButton =
    document.querySelector(
      "#menuToggle, .menu-toggle, [data-menu-toggle]"
    );

  const mobileMenu =
    document.querySelector(
      "#mobileMenu, .mobile-menu, [data-mobile-menu]"
    );

  const overlay =
    document.querySelector(
      "#menuOverlay, .menu-overlay, [data-menu-overlay]"
    );

  if (!menuButton || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add("active");
    mobileMenu.classList.add("open");

    menuButton.classList.add("active");
    document.body.classList.add("menu-open");

    if (overlay) {
      overlay.classList.add("active");
    }

    menuButton.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    mobileMenu.classList.remove("active");
    mobileMenu.classList.remove("open");

    menuButton.classList.remove("active");
    document.body.classList.remove("menu-open");

    if (overlay) {
      overlay.classList.remove("active");
    }

    menuButton.setAttribute("aria-expanded", "false");
  }

  menuButton.addEventListener("click", () => {
    const isOpen =
      mobileMenu.classList.contains("active") ||
      mobileMenu.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  mobileMenu
    .querySelectorAll("a")
    .forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

/* =========================================================
   3. SMOOTH NAVIGATION
   ========================================================= */

function initSmoothNavigation() {
  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#" ||
          targetId.length < 2
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        history.replaceState(
          null,
          "",
          targetId
        );
      });
    });
}

/* =========================================================
   4. ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {
  const currentPath =
    window.location.pathname
      .split("/")
      .pop()
      .toLowerCase();

  const links =
    document.querySelectorAll(
      "nav a, .nav-link, .mobile-nav-link"
    );

  links.forEach((link) => {
    const href =
      link.getAttribute("href");

    if (!href) return;

    const cleanHref =
      href
        .split("/")
        .pop()
        .split("#")[0]
        .split("?")[0]
        .toLowerCase();

    if (
      cleanHref &&
      cleanHref === currentPath
    ) {
      link.classList.add("active");

      link.setAttribute(
        "aria-current",
        "page"
      );
    }

    if (
      currentPath === "" &&
      (cleanHref === "index.html" ||
        cleanHref === "")
    ) {
      link.classList.add("active");

      link.setAttribute(
        "aria-current",
        "page"
      );
    }
  });
}

/* =========================================================
   5. BACK TO TOP
   ========================================================= */

function initBackToTop() {
  const button =
    document.querySelector(
      "#backToTop, .back-to-top, [data-back-to-top]"
    );

  if (!button) return;

  function updateButton() {
    if (window.scrollY > 450) {
      button.classList.add("show");
      button.classList.add("visible");
    } else {
      button.classList.remove("show");
      button.classList.remove("visible");
    }
  }

  window.addEventListener(
    "scroll",
    updateButton,
    { passive: true }
  );

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  updateButton();
}

/* =========================================================
   6. CURRENT YEAR
   ========================================================= */

function initCurrentYear() {
  const year =
    new Date().getFullYear();

  document
    .querySelectorAll(
      "#currentYear, .current-year, [data-current-year]"
    )
    .forEach((element) => {
      element.textContent = year;
    });
}

/* =========================================================
   7. PAGE LOADER
   ========================================================= */

function initPageLoader() {
  const loader =
    document.querySelector(
      "#pageLoader, .page-loader, [data-page-loader]"
    );

  if (!loader) return;

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("loaded");
      loader.classList.add("hidden");

      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }, 250);
  });
}

/* =========================================================
   8. REVEAL ANIMATIONS
   ========================================================= */

function initRevealAnimations() {
  const elements =
    document.querySelectorAll(
      ".reveal, [data-reveal]"
    );

  if (!elements.length) return;

  if (
    !("IntersectionObserver" in window)
  ) {
    elements.forEach((element) => {
      element.classList.add("visible");
      element.classList.add("show");
    });

    return;
  }

  const observer =
    new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add(
            "visible"
          );

          entry.target.classList.add(
            "show"
          );

          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

/* =========================================================
   9. KEYBOARD NAVIGATION
   ========================================================= */

function initKeyboardNavigation() {
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "/") {
        const active =
          document.activeElement;

        const isTyping =
          active &&
          (
            active.tagName === "INPUT" ||
            active.tagName === "TEXTAREA" ||
            active.tagName === "SELECT"
          );

        if (isTyping) return;

        const search =
          document.querySelector(
            "#searchInput, .search-input, [data-search-input]"
          );

        if (search) {
          event.preventDefault();
          search.focus();
        }
      }
    }
  );
}

/* =========================================================
   10. EXTERNAL LINKS
   ========================================================= */

function initExternalLinks() {
  document
    .querySelectorAll(
      'a[href^="http://"], a[href^="https://"]'
    )
    .forEach((link) => {
      const host =
        window.location.hostname;

      let linkHost = "";

      try {
        linkHost =
          new URL(link.href).hostname;
      } catch {
        return;
      }

      if (
        linkHost &&
        host &&
        linkHost !== host
      ) {
        link.setAttribute(
          "target",
          "_blank"
        );

        link.setAttribute(
          "rel",
          "noopener noreferrer"
        );
      }
    });
}

/* =========================================================
   11. SCROLL HEADER EFFECT
   ========================================================= */

function initScrollHeader() {
  const header =
    document.querySelector(
      "header, .site-header, .main-header"
    );

  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 20) {
      header.classList.add(
        "scrolled"
      );
    } else {
      header.classList.remove(
        "scrolled"
      );
    }
  }

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();
}

/* =========================================================
   12. GLOBAL TOAST
   ========================================================= */

window.A1Toast = function (
  message,
  type = "info"
) {
  let container =
    document.querySelector(
      "#a1ToastContainer"
    );

  if (!container) {
    container =
      document.createElement("div");

    container.id =
      "a1ToastContainer";

    container.className =
      "a1-toast-container";

    document.body.appendChild(
      container
    );
  }

  const toast =
    document.createElement("div");

  toast.className =
    `a1-toast a1-toast-${type}`;

  toast.setAttribute(
    "role",
    "status"
  );

  toast.textContent = message;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
};

/* =========================================================
   13. GLOBAL MODAL HELPERS
   ========================================================= */

window.A1Modal = {

  open(selector) {
    const modal =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;

    if (!modal) return;

    modal.classList.add("open");
    modal.classList.add("active");

    document.body.classList.add(
      "modal-open"
    );

    modal.setAttribute(
      "aria-hidden",
      "false"
    );
  },

  close(selector) {
    const modal =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;

    if (!modal) return;

    modal.classList.remove("open");
    modal.classList.remove("active");

    document.body.classList.remove(
      "modal-open"
    );

    modal.setAttribute(
      "aria-hidden",
      "true"
    );
  }
};

/* =========================================================
   14. GLOBAL NAVIGATION HELPER
   ========================================================= */

window.A1Navigate = function (
  url,
  newTab = false
) {
  if (!url) return;

  if (newTab) {
    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  } else {
    window.location.href = url;
  }
};

/* =========================================================
   15. SAFE STORAGE
   ========================================================= */

window.A1Storage = {

  set(key, value) {
    try {
      localStorage.setItem(
        `a1_${key}`,
        JSON.stringify(value)
      );

      return true;
    } catch {
      return false;
    }
  },

  get(key, fallback = null) {
    try {
      const value =
        localStorage.getItem(
          `a1_${key}`
        );

      return value === null
        ? fallback
        : JSON.parse(value);
    } catch {
      return fallback;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(
        `a1_${key}`
      );

      return true;
    } catch {
      return false;
    }
  }
};

/* =========================================================
   16. ONLINE / OFFLINE STATUS
   ========================================================= */

function updateConnectionStatus() {
  const status =
    document.querySelector(
      "[data-connection-status]"
    );

  if (!status) return;

  if (navigator.onLine) {
    status.textContent =
      "Online";

    status.classList.add(
      "online"
    );

    status.classList.remove(
      "offline"
    );
  } else {
    status.textContent =
      "Offline";

    status.classList.add(
      "offline"
    );

    status.classList.remove(
      "online"
    );
  }
}

window.addEventListener(
  "online",
  updateConnectionStatus
);

window.addEventListener(
  "offline",
  updateConnectionStatus
);

document.addEventListener(
  "DOMContentLoaded",
  updateConnectionStatus
);

/* =========================================================
   17. IMAGE ERROR HANDLING
   ========================================================= */

document.addEventListener(
  "error",
  (event) => {
    const element =
      event.target;

    if (
      element &&
      element.tagName === "IMG"
    ) {
      element.classList.add(
        "image-error"
      );

      element.setAttribute(
        "data-image-error",
        "true"
      );
    }
  },
  true
);

/* =========================================================
   18. CONFIRM ACTIONS
   ========================================================= */

document.addEventListener(
  "click",
  (event) => {
    const button =
      event.target.closest(
        "[data-confirm]"
      );

    if (!button) return;

    const message =
      button.getAttribute(
        "data-confirm"
      );

    if (
      message &&
      !window.confirm(message)
    ) {
      event.preventDefault();
    }
  }
);

/* =========================================================
   19. MOBILE VIEWPORT HEIGHT
   ========================================================= */

function setViewportHeight() {
  const height =
    window.innerHeight * 0.01;

  document.documentElement.style.setProperty(
    "--a1-vh",
    `${height}px`
  );
}

setViewportHeight();

window.addEventListener(
  "resize",
  setViewportHeight
);

/* =========================================================
   20. PUBLIC API
   ========================================================= */

window.A1Computer = {

  version: "1.0.0",

  toast: window.A1Toast,

  modal: window.A1Modal,

  navigate: window.A1Navigate,

  storage: window.A1Storage

};

/* =========================================================
   A1 COMPUTER APP INITIALIZED
   ========================================================= */

console.log(
  "A1 Computer Portal — App initialized."
);
