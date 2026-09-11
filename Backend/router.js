"use strict";

/* =========================================================
   A1 COMPUTER — ROUTER
   Central navigation and page routing helper
   ========================================================= */

const A1_ROUTER = {

  /* -------------------------------------------------------
     PAGE MAP
     ------------------------------------------------------- */

  pages: {
    home: "index.html",
    services: "Pages/Service.html",
    student: "Pages/Student.html",
    government: "Pages/Government.html",
    jobs: "Pages/Jobs.html",
    land: "Pages/Land.html",
    documents: "Pages/Document.html",
    schemes: "Pages/Scheme.html",
    citizen: "Pages/Citizen.html",
    notices: "Pages/Notices.html",
    travel: "Pages/Travel.html",
    contact: "Pages/Contact.html"
  },


  /* -------------------------------------------------------
     GET PAGE
     ------------------------------------------------------- */

  getPage(name) {

    if (!name) {
      return this.pages.home;
    }

    const key =
      String(name)
        .toLowerCase()
        .trim();

    return (
      this.pages[key] ||
      this.pages.home
    );
  },


  /* -------------------------------------------------------
     GO TO PAGE
     ------------------------------------------------------- */

  go(name) {

    if (
      typeof window === "undefined"
    ) {
      return false;
    }

    const page =
      this.getPage(name);

    window.location.href =
      page;

    return true;
  },


  /* -------------------------------------------------------
     OPEN SERVICE
     ------------------------------------------------------- */

  openService(service) {

    if (!service) {
      return false;
    }

    if (service.page) {

      if (
        typeof window !== "undefined"
      ) {

        window.location.href =
          service.page;

        return true;
      }

      return false;
    }

    if (
      service.category
    ) {

      return this.go(
        service.category
      );
    }

    return false;
  },


  /* -------------------------------------------------------
     BACK
     ------------------------------------------------------- */

  back() {

    if (
      typeof window !== "undefined" &&
      window.history
    ) {

      window.history.back();

      return true;
    }

    return false;
  },


  /* -------------------------------------------------------
     HOME
     ------------------------------------------------------- */

  home() {
    return this.go("home");
  },


  /* -------------------------------------------------------
     SERVICE PAGE
     ------------------------------------------------------- */

  services() {
    return this.go("services");
  },


  /* -------------------------------------------------------
     STUDENT
     ------------------------------------------------------- */

  student() {
    return this.go("student");
  },


  /* -------------------------------------------------------
     GOVERNMENT
     ------------------------------------------------------- */

  government() {
    return this.go("government");
  },


  /* -------------------------------------------------------
     JOBS
     ------------------------------------------------------- */

  jobs() {
    return this.go("jobs");
  },


  /* -------------------------------------------------------
     LAND
     ------------------------------------------------------- */

  land() {
    return this.go("land");
  },


  /* -------------------------------------------------------
     DOCUMENTS
     ------------------------------------------------------- */

  documents() {
    return this.go("documents");
  },


  /* -------------------------------------------------------
     SCHEMES
     ------------------------------------------------------- */

  schemes() {
    return this.go("schemes");
  },


  /* -------------------------------------------------------
     CITIZEN
     ------------------------------------------------------- */

  citizen() {
    return this.go("citizen");
  },


  /* -------------------------------------------------------
     NOTICES
     ------------------------------------------------------- */

  notices() {
    return this.go("notices");
  },


  /* -------------------------------------------------------
     TRAVEL
     ------------------------------------------------------- */

  travel() {
    return this.go("travel");
  },


  /* -------------------------------------------------------
     CONTACT
     ------------------------------------------------------- */

  contact() {
    return this.go("contact");
  },


  /* -------------------------------------------------------
     GET ALL ROUTES
     ------------------------------------------------------- */

  getRoutes() {

    return {
      ...this.pages
    };
  },


  /* -------------------------------------------------------
     CHECK ROUTE
     ------------------------------------------------------- */

  exists(name) {

    if (!name) {
      return false;
    }

    const key =
      String(name)
        .toLowerCase()
        .trim();

    return Boolean(
      this.pages[key]
    );
  }

};


/* =========================================================
   GLOBAL EXPORT
   ========================================================= */

if (typeof window !== "undefined") {
  window.A1_ROUTER = A1_ROUTER;
}


/* =========================================================
   NODE / COMMONJS EXPORT
   ========================================================= */

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = A1_ROUTER;
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

console.log(
  "A1 Computer — Router loaded."
);
