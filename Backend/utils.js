"use strict";

/* =========================================================
   A1 COMPUTER — UTILITY FUNCTIONS
   Common reusable helper functions
   ========================================================= */

const A1_UTILS = {

  /* -------------------------------------------------------
     STRING
     ------------------------------------------------------- */

  text(value, fallback = "") {

    if (
      value === null ||
      value === undefined
    ) {
      return fallback;
    }

    return String(value);
  },


  trim(value) {

    return this
      .text(value)
      .trim();
  },


  capitalize(value) {

    const text =
      this.trim(value);

    if (!text) {
      return "";
    }

    return (
      text.charAt(0).toUpperCase() +
      text.slice(1)
    );
  },


  /* -------------------------------------------------------
     ID
     ------------------------------------------------------- */

  createId(prefix = "a1") {

    return (
      prefix +
      "_" +
      Date.now() +
      "_" +
      Math.random()
        .toString(36)
        .slice(2, 8)
    );
  },


  /* -------------------------------------------------------
     ARRAY
     ------------------------------------------------------- */

  isArray(value) {

    return Array.isArray(value);
  },


  unique(array = []) {

    if (!Array.isArray(array)) {
      return [];
    }

    return [
      ...new Set(array)
    ];
  },


  /* -------------------------------------------------------
     OBJECT
     ------------------------------------------------------- */

  isObject(value) {

    return (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    );
  },


  clone(value) {

    try {

      return JSON.parse(
        JSON.stringify(value)
      );

    } catch {

      return null;
    }
  },


  /* -------------------------------------------------------
     DATE & TIME
     ------------------------------------------------------- */

  now() {

    return new Date();
  },


  isoDate() {

    return new Date()
      .toISOString();
  },


  formatDate(
    value,
    locale = "en-IN"
  ) {

    if (!value) {
      return "";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "";
    }

    return new Intl.DateTimeFormat(
      locale,
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    ).format(date);
  },


  formatDateTime(
    value,
    locale = "en-IN"
  ) {

    if (!value) {
      return "";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "";
    }

    return new Intl.DateTimeFormat(
      locale,
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }
    ).format(date);
  },


  /* -------------------------------------------------------
     NUMBER
     ------------------------------------------------------- */

  number(
    value,
    fallback = 0
  ) {

    const result =
      Number(value);

    return Number.isFinite(result)
      ? result
      : fallback;
  },


  clamp(
    value,
    min,
    max
  ) {

    const number =
      this.number(value);

    return Math.min(
      Math.max(
        number,
        min
      ),
      max
    );
  },


  /* -------------------------------------------------------
     DEBOUNCE
     ------------------------------------------------------- */

  debounce(
    callback,
    delay = 300
  ) {

    let timer = null;

    return function (...args) {

      clearTimeout(timer);

      timer = setTimeout(
        () => {
          callback.apply(
            this,
            args
          );
        },
        delay
      );
    };
  },


  /* -------------------------------------------------------
     THROTTLE
     ------------------------------------------------------- */

  throttle(
    callback,
    delay = 300
  ) {

    let waiting = false;

    return function (...args) {

      if (waiting) {
        return;
      }

      callback.apply(
        this,
        args
      );

      waiting = true;

      setTimeout(
        () => {
          waiting = false;
        },
        delay
      );
    };
  },


  /* -------------------------------------------------------
     URL
     ------------------------------------------------------- */

  getQueryParam(
    name
  ) {

    if (
      typeof window === "undefined"
    ) {
      return null;
    }

    const params =
      new URLSearchParams(
        window.location.search
      );

    return params.get(name);
  },


  /* -------------------------------------------------------
     DOM
     ------------------------------------------------------- */

  $(selector) {

    if (
      typeof document === "undefined"
    ) {
      return null;
    }

    return document.querySelector(
      selector
    );
  },


  $$(selector) {

    if (
      typeof document === "undefined"
    ) {
      return [];
    }

    return [
      ...document.querySelectorAll(
        selector
      )
    ];
  },


  createElement(
    tag,
    className = "",
    textContent = ""
  ) {

    if (
      typeof document === "undefined"
    ) {
      return null;
    }

    const element =
      document.createElement(tag);

    if (className) {
      element.className =
        className;
    }

    if (textContent) {
      element.textContent =
        textContent;
    }

    return element;
  },


  /* -------------------------------------------------------
     SAFE JSON
     ------------------------------------------------------- */

  parseJSON(
    value,
    fallback = null
  ) {

    try {

      return JSON.parse(value);

    } catch {

      return fallback;
    }
  },


  stringifyJSON(
    value,
    fallback = ""
  ) {

    try {

      return JSON.stringify(value);

    } catch {

      return fallback;
    }
  },


  /* -------------------------------------------------------
     COPY TO CLIPBOARD
     ------------------------------------------------------- */

  async copy(
    value
  ) {

    if (
      typeof navigator === "undefined" ||
      !navigator.clipboard
    ) {
      return false;
    }

    try {

      await navigator.clipboard.writeText(
        this.text(value)
      );

      return true;

    } catch {

      return false;
    }
  },


  /* -------------------------------------------------------
     OPEN EXTERNAL LINK
     ------------------------------------------------------- */

  openExternal(
    url
  ) {

    if (!url) {
      return false;
    }

    try {

      const target =
        new URL(
          url,
          window.location.href
        );

      window.open(
        target.href,
        "_blank",
        "noopener,noreferrer"
      );

      return true;

    } catch {

      return false;
    }
  },


  /* -------------------------------------------------------
     WAIT
     ------------------------------------------------------- */

  wait(
    milliseconds = 300
  ) {

    return new Promise(
      resolve =>
        setTimeout(
          resolve,
          milliseconds
        )
    );
  },


  /* -------------------------------------------------------
     DEVICE
     ------------------------------------------------------- */

  isMobile() {

    if (
      typeof window === "undefined"
    ) {
      return false;
    }

    return window.matchMedia(
      "(max-width: 767px)"
    ).matches;
  },


  isTablet() {

    if (
      typeof window === "undefined"
    ) {
      return false;
    }

    return window.matchMedia(
      "(min-width: 768px) and (max-width: 1023px)"
    ).matches;
  },


  isDesktop() {

    if (
      typeof window === "undefined"
    ) {
      return false;
    }

    return window.matchMedia(
      "(min-width: 1024px)"
    ).matches;
  },


  /* -------------------------------------------------------
     SAFE HTML TEXT
     ------------------------------------------------------- */

  escapeHTML(value) {

    const text =
      this.text(value);

    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },


  /* -------------------------------------------------------
     LOG
     ------------------------------------------------------- */

  log(
    message,
    data = null
  ) {

    if (data !== null) {

      console.log(
        `[A1 Computer] ${message}`,
        data
      );

      return;
    }

    console.log(
      `[A1 Computer] ${message}`
    );
  }

};


/* =========================================================
   GLOBAL EXPORT
   ========================================================= */

if (typeof window !== "undefined") {

  window.A1_UTILS =
    A1_UTILS;
}


/* =========================================================
   NODE / COMMONJS EXPORT
   ========================================================= */

if (
  typeof module !== "undefined" &&
  module.exports
) {

  module.exports =
    A1_UTILS;
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

console.log(
  "A1 Computer — Utility functions loaded."
);
