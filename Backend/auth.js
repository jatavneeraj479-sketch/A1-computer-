"use strict";

/* =========================================================
   A1 COMPUTER — AUTHENTICATION MANAGER
   Admin session helper
   ========================================================= */

const A1_AUTH = {

  sessionKey: "admin_session",

  /* -------------------------------------------------------
     LOGIN
     ------------------------------------------------------- */

  login(username, password) {

    if (!username || !password) {
      return {
        success: false,
        message: "Username and password are required."
      };
    }

    /*
     IMPORTANT:
     Real production authentication should be handled
     by a secure server/database.

     This static GitHub Pages version only creates a
     temporary local admin session.
    */

    const session = {
      username: String(username),
      loggedIn: true,
      loginTime: new Date().toISOString()
    };

    try {

      localStorage.setItem(
        this.sessionKey,
        JSON.stringify(session)
      );

      return {
        success: true,
        message: "Login session created.",
        data: session
      };

    } catch (error) {

      console.error(
        "A1 Auth Login Error:",
        error
      );

      return {
        success: false,
        message: "Unable to create login session."
      };
    }
  },


  /* -------------------------------------------------------
     LOGOUT
     ------------------------------------------------------- */

  logout() {

    try {

      localStorage.removeItem(
        this.sessionKey
      );

      return {
        success: true,
        message: "Logged out successfully."
      };

    } catch (error) {

      console.error(
        "A1 Auth Logout Error:",
        error
      );

      return {
        success: false,
        message: "Unable to logout."
      };
    }
  },


  /* -------------------------------------------------------
     GET SESSION
     ------------------------------------------------------- */

  getSession() {

    try {

      const value =
        localStorage.getItem(
          this.sessionKey
        );

      if (!value) {
        return null;
      }

      return JSON.parse(value);

    } catch (error) {

      console.error(
        "A1 Auth Session Error:",
        error
      );

      return null;
    }
  },


  /* -------------------------------------------------------
     CHECK LOGIN
     ------------------------------------------------------- */

  isLoggedIn() {

    const session =
      this.getSession();

    return Boolean(
      session &&
      session.loggedIn === true
    );
  },


  /* -------------------------------------------------------
     CURRENT USER
     ------------------------------------------------------- */

  currentUser() {

    const session =
      this.getSession();

    if (!session) {
      return null;
    }

    return session.username || null;
  },


  /* -------------------------------------------------------
     REQUIRE LOGIN
     ------------------------------------------------------- */

  requireLogin(redirect = null) {

    if (this.isLoggedIn()) {
      return true;
    }

    if (
      redirect &&
      typeof window !== "undefined"
    ) {
      window.location.href =
        redirect;
    }

    return false;
  },


  /* -------------------------------------------------------
     SESSION EXPIRY CHECK
     ------------------------------------------------------- */

  isSessionValid(maxAgeHours = 24) {

    const session =
      this.getSession();

    if (!session || !session.loginTime) {
      return false;
    }

    const loginTime =
      new Date(
        session.loginTime
      ).getTime();

    const now =
      Date.now();

    const maxAge =
      maxAgeHours *
      60 *
      60 *
      1000;

    if (
      now - loginTime >
      maxAge
    ) {

      this.logout();

      return false;
    }

    return true;
  }

};


/* =========================================================
   GLOBAL EXPORT
   ========================================================= */

if (typeof window !== "undefined") {
  window.A1_AUTH = A1_AUTH;
}


/* =========================================================
   NODE / COMMONJS EXPORT
   ========================================================= */

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = A1_AUTH;
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

console.log(
  "A1 Computer — Authentication manager loaded."
);
