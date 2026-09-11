"use strict";

/* =========================================================
   A1 COMPUTER — VALIDATOR
   Common validation utilities for the portal
   ========================================================= */

const A1_VALIDATOR = {

  /* -------------------------------------------------------
     BASIC
     ------------------------------------------------------- */

  required(value) {
    return (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    );
  },

  string(value, min = 0, max = Infinity) {
    if (typeof value !== "string") {
      return false;
    }

    const length = value.trim().length;

    return (
      length >= min &&
      length <= max
    );
  },

  number(value, min = -Infinity, max = Infinity) {
    if (
      value === "" ||
      value === null ||
      value === undefined
    ) {
      return false;
    }

    const number = Number(value);

    return (
      Number.isFinite(number) &&
      number >= min &&
      number <= max
    );
  },

  /* -------------------------------------------------------
     EMAIL
     ------------------------------------------------------- */

  email(value) {
    if (!this.required(value)) {
      return false;
    }

    const pattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(
      String(value).trim()
    );
  },

  /* -------------------------------------------------------
     PHONE
     ------------------------------------------------------- */

  phone(value) {
    if (!this.required(value)) {
      return false;
    }

    const cleaned =
      String(value)
        .replace(/\s+/g, "")
        .replace(/[-()]/g, "");

    return /^\+?[0-9]{10,15}$/.test(
      cleaned
    );
  },

  indianMobile(value) {
    if (!this.required(value)) {
      return false;
    }

    return /^[6-9][0-9]{9}$/.test(
      String(value).trim()
    );
  },

  /* -------------------------------------------------------
     URL
     ------------------------------------------------------- */

  url(value) {
    if (!this.required(value)) {
      return false;
    }

    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },

  /* -------------------------------------------------------
     ID
     ------------------------------------------------------- */

  id(value) {
    if (!this.required(value)) {
      return false;
    }

    return /^[a-zA-Z0-9_-]+$/.test(
      String(value).trim()
    );
  },

  /* -------------------------------------------------------
     DATE
     ------------------------------------------------------- */

  date(value) {
    if (!this.required(value)) {
      return false;
    }

    const date =
      new Date(value);

    return !Number.isNaN(
      date.getTime()
    );
  },

  /* -------------------------------------------------------
     ARRAY
     ------------------------------------------------------- */

  array(value) {
    return Array.isArray(value);
  },

  /* -------------------------------------------------------
     OBJECT
     ------------------------------------------------------- */

  object(value) {
    return (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    );
  },

  /* -------------------------------------------------------
     SERVICE
     ------------------------------------------------------- */

  service(service) {
    if (!this.object(service)) {
      return false;
    }

    return (
      this.required(service.id) &&
      this.required(service.title)
    );
  },

  /* -------------------------------------------------------
     NOTIFICATION
     ------------------------------------------------------- */

  notification(notification) {
    if (!this.object(notification)) {
      return false;
    }

    return (
      this.required(notification.title) &&
      this.required(notification.message)
    );
  },

  /* -------------------------------------------------------
     CONTACT FORM
     ------------------------------------------------------- */

  contactForm(data = {}) {

    const errors = {};

    if (!this.required(data.name)) {
      errors.name =
        "Name is required.";
    }

    if (!this.required(data.email)) {
      errors.email =
        "Email is required.";
    } else if (!this.email(data.email)) {
      errors.email =
        "Enter a valid email address.";
    }

    if (data.phone && !this.phone(data.phone)) {
      errors.phone =
        "Enter a valid phone number.";
    }

    if (!this.required(data.message)) {
      errors.message =
        "Message is required.";
    }

    return {
      valid:
        Object.keys(errors).length === 0,

      errors
    };
  },

  /* -------------------------------------------------------
     SEARCH QUERY
     ------------------------------------------------------- */

  searchQuery(value) {

    if (!this.required(value)) {
      return false;
    }

    const length =
      String(value).trim().length;

    return (
      length >= 1 &&
      length <= 100
    );
  },

  /* -------------------------------------------------------
     SANITIZE TEXT
     ------------------------------------------------------- */

  sanitizeText(value) {

    if (value === null || value === undefined) {
      return "";
    }

    return String(value)
      .replace(/[<>]/g, "")
      .trim();
  },

  /* -------------------------------------------------------
     FORM VALIDATION
     ------------------------------------------------------- */

  validateForm(form) {

    if (
      !form ||
      typeof form !== "object"
    ) {
      return {
        valid: false,
        errors: {
          form: "Invalid form."
        }
      };
    }

    const errors = {};

    Object.keys(form).forEach(
      key => {

        const value =
          form[key];

        if (
          value === null ||
          value === undefined
        ) {
          errors[key] =
            `${key} is required.`;
        }

      }
    );

    return {
      valid:
        Object.keys(errors).length === 0,

      errors
    };
  }

};


/* =========================================================
   GLOBAL EXPORT
   ========================================================= */

if (typeof window !== "undefined") {
  window.A1_VALIDATOR =
    A1_VALIDATOR;
}


/* =========================================================
   NODE / COMMONJS EXPORT
   ========================================================= */

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    A1_VALIDATOR;
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

console.log(
  "A1 Computer — Validator loaded."
);
