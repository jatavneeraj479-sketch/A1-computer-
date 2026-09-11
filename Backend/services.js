"use strict";

/* =========================================================
   A1 COMPUTER — SERVICE MANAGER
   Central service management layer
   ========================================================= */

const A1_SERVICES = {

  /* -------------------------------------------------------
     GET DATA
     ------------------------------------------------------- */

  getData() {
    if (
      typeof window !== "undefined" &&
      window.A1_DATA
    ) {
      return window.A1_DATA;
    }

    return null;
  },


  /* -------------------------------------------------------
     CATEGORY MAP
     ------------------------------------------------------- */

  categoryMap: {
    student: "studentServices",
    government: "governmentServices",
    jobs: "jobServices",
    documents: "documentServices",
    land: "landServices",
    schemes: "schemes"
  },


  /* -------------------------------------------------------
     GET SERVICES BY CATEGORY
     ------------------------------------------------------- */

  getByCategory(category) {

    const data = this.getData();

    if (!data || !category) {
      return [];
    }

    const key =
      this.categoryMap[
        String(category).toLowerCase()
      ];

    if (!key) {
      return [];
    }

    return Array.isArray(data[key])
      ? data[key]
      : [];
  },


  /* -------------------------------------------------------
     GET ALL SERVICES
     ------------------------------------------------------- */

  getAll() {

    const data = this.getData();

    if (!data) {
      return [];
    }

    const result = [];

    Object.keys(
      this.categoryMap
    ).forEach(category => {

      const services =
        this.getByCategory(
          category
        );

      services.forEach(service => {

        result.push({
          ...service,
          category
        });

      });

    });

    return result;
  },


  /* -------------------------------------------------------
     FIND SERVICE
     ------------------------------------------------------- */

  find(id) {

    if (!id) {
      return null;
    }

    const target =
      String(id)
        .toLowerCase()
        .trim();

    return (
      this.getAll().find(
        service =>
          String(service.id || "")
            .toLowerCase()
            .trim() === target
      ) || null
    );
  },


  /* -------------------------------------------------------
     SEARCH SERVICES
     ------------------------------------------------------- */

  search(query) {

    const text =
      String(query || "")
        .toLowerCase()
        .trim();

    if (!text) {
      return [];
    }

    return this
      .getAll()
      .filter(service => {

        const searchable =
          [
            service.id,
            service.title,
            service.description,
            service.type,
            service.category
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return searchable.includes(
          text
        );
      });
  },


  /* -------------------------------------------------------
     GET QUICK SERVICES
     ------------------------------------------------------- */

  getQuickServices() {

    const data =
      this.getData();

    if (
      !data ||
      !Array.isArray(
        data.quickServices
      )
    ) {
      return [];
    }

    return data.quickServices;
  },


  /* -------------------------------------------------------
     GET CATEGORIES
     ------------------------------------------------------- */

  getCategories() {

    const data =
      this.getData();

    if (
      !data ||
      !Array.isArray(
        data.categories
      )
    ) {
      return [];
    }

    return data.categories;
  },


  /* -------------------------------------------------------
     SERVICE COUNT
     ------------------------------------------------------- */

  count(category = null) {

    if (category) {
      return this
        .getByCategory(category)
        .length;
    }

    return this
      .getAll()
      .length;
  },


  /* -------------------------------------------------------
     SERVICE STATISTICS
     ------------------------------------------------------- */

  statistics() {

    const stats = {
      total: 0,
      student: 0,
      government: 0,
      jobs: 0,
      documents: 0,
      land: 0,
      schemes: 0
    };

    Object.keys(
      this.categoryMap
    ).forEach(category => {

      const count =
        this.count(category);

      stats[category] =
        count;

      stats.total +=
        count;
    });

    return stats;
  },


  /* -------------------------------------------------------
     CREATE SERVICE LINK
     ------------------------------------------------------- */

  getLink(service) {

    if (!service) {
      return "";
    }

    if (service.page) {
      return service.page;
    }

    const category =
      service.category;

    const pageMap = {
      student:
        "Pages/Student.html",

      government:
        "Pages/Government.html",

      jobs:
        "Pages/Jobs.html",

      documents:
        "Pages/Document.html",

      land:
        "Pages/Land.html",

      schemes:
        "Pages/Scheme.html"
    };

    return pageMap[category] || "";
  },


  /* -------------------------------------------------------
     OPEN SERVICE
     ------------------------------------------------------- */

  open(service) {

    const link =
      this.getLink(service);

    if (
      !link ||
      typeof window === "undefined"
    ) {
      return false;
    }

    window.location.href =
      link;

    return true;
  },


  /* -------------------------------------------------------
     VALIDATE SERVICE
     ------------------------------------------------------- */

  validate(service) {

    if (
      !service ||
      typeof service !== "object"
    ) {
      return false;
    }

    return Boolean(
      service.id &&
      service.title
    );
  }

};


/* =========================================================
   GLOBAL EXPORT
   ========================================================= */

if (typeof window !== "undefined") {

  window.A1_SERVICES =
    A1_SERVICES;
}


/* =========================================================
   NODE / COMMONJS EXPORT
   ========================================================= */

if (
  typeof module !== "undefined" &&
  module.exports
) {

  module.exports =
    A1_SERVICES;
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

console.log(
  "A1 Computer — Service manager loaded."
);
