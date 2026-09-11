"use strict";

/* =========================================================
   A1 COMPUTER — API / SERVICE LAYER
   Central helper for portal data and service operations
   ========================================================= */

const A1_API = {

  /* -------------------------------------------------------
     CONFIG
     ------------------------------------------------------- */

  config: {
    version: "1.0.0",
    mode: "static",
    timeout: 10000
  },


  /* -------------------------------------------------------
     RESPONSE HELPERS
     ------------------------------------------------------- */

  success(data = null, message = "Success") {
    return {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    };
  },

  error(message = "Something went wrong", data = null) {
    return {
      success: false,
      message,
      data,
      timestamp: new Date().toISOString()
    };
  },


  /* -------------------------------------------------------
     DATA ACCESS
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


  getCategories() {
    const data = this.getData();

    if (!data || !Array.isArray(data.categories)) {
      return this.error(
        "Categories are not available."
      );
    }

    return this.success(
      data.categories
    );
  },


  getQuickServices() {
    const data = this.getData();

    if (
      !data ||
      !Array.isArray(data.quickServices)
    ) {
      return this.error(
        "Quick services are not available."
      );
    }

    return this.success(
      data.quickServices
    );
  },


  getStudentServices() {
    const data = this.getData();

    if (
      !data ||
      !Array.isArray(data.studentServices)
    ) {
      return this.error(
        "Student services are not available."
      );
    }

    return this.success(
      data.studentServices
    );
  },


  getGovernmentServices() {
    const data = this.getData();

    if (
      !data ||
      !Array.isArray(data.governmentServices)
    ) {
      return this.error(
        "Government services are not available."
      );
    }

    return this.success(
      data.governmentServices
    );
  },


  getJobServices() {
    const data = this.getData();

    if (
      !data ||
      !Array.isArray(data.jobServices)
    ) {
      return this.error(
        "Job services are not available."
      );
    }

    return this.success(
      data.jobServices
    );
  },


  getDocumentServices() {
    const data = this.getData();

    if (
      !data ||
      !Array.isArray(data.documentServices)
    ) {
      return this.error(
        "Document services are not available."
      );
    }

    return this.success(
      data.documentServices
    );
  },


  getLandServices() {
    const data = this.getData();

    if (
      !data ||
      !Array.isArray(data.landServices)
    ) {
      return this.error(
        "Land services are not available."
      );
    }

    return this.success(
      data.landServices
    );
  },


  getSchemes() {
    const data = this.getData();

    if (
      !data ||
      !Array.isArray(data.schemes)
    ) {
      return this.error(
        "Schemes are not available."
      );
    }

    return this.success(
      data.schemes
    );
  },


  getNavigation() {
    const data = this.getData();

    if (
      !data ||
      !Array.isArray(data.navigation)
    ) {
      return this.error(
        "Navigation data is not available."
      );
    }

    return this.success(
      data.navigation
    );
  },


  /* -------------------------------------------------------
     FIND SERVICE
     ------------------------------------------------------- */

  findService(id) {

    if (!id) {
      return this.error(
        "Service ID is required."
      );
    }

    const data = this.getData();

    if (!data) {
      return this.error(
        "Portal data is not loaded."
      );
    }

    const collections = [
      data.quickServices,
      data.studentServices,
      data.governmentServices,
      data.jobServices,
      data.documentServices,
      data.landServices,
      data.schemes
    ];

    for (const collection of collections) {

      if (!Array.isArray(collection)) {
        continue;
      }

      const result =
        collection.find(
          item => item && item.id === id
        );

      if (result) {
        return this.success(result);
      }
    }

    return this.error(
      "Service not found."
    );
  },


  /* -------------------------------------------------------
     SEARCH
     ------------------------------------------------------- */

  search(query) {

    const searchText =
      String(query || "")
        .trim()
        .toLowerCase();

    if (!searchText) {
      return this.success([]);
    }

    const data = this.getData();

    if (!data) {
      return this.error(
        "Portal data is not loaded."
      );
    }

    const results = [];

    const collections = [
      data.categories,
      data.quickServices,
      data.studentServices,
      data.governmentServices,
      data.jobServices,
      data.documentServices,
      data.landServices,
      data.schemes
    ];

    collections.forEach(
      collection => {

        if (!Array.isArray(collection)) {
          return;
        }

        collection.forEach(item => {

          if (!item) {
            return;
          }

          const searchableText =
            [
              item.id,
              item.title,
              item.description,
              item.category,
              item.type
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

          if (
            searchableText.includes(
              searchText
            )
          ) {
            results.push(item);
          }
        });
      }
    );

    return this.success(
      results,
      `${results.length} result(s) found`
    );
  },


  /* -------------------------------------------------------
     CONTACT
     ------------------------------------------------------- */

  getContact() {

    const data = this.getData();

    if (!data || !data.contactActions) {
      return this.error(
        "Contact information is not available."
      );
    }

    return this.success(
      data.contactActions
    );
  },


  /* -------------------------------------------------------
     HEALTH CHECK
     ------------------------------------------------------- */

  healthCheck() {

    const data = this.getData();

    return this.success(
      {
        api: "online",
        data: Boolean(data),
        version: this.config.version,
        mode: this.config.mode
      },
      "A1 Computer API is ready."
    );
  }

};


/* =========================================================
   GLOBAL EXPORT
   ========================================================= */

if (typeof window !== "undefined") {
  window.A1_API = A1_API;
}


/* =========================================================
   NODE / COMMONJS EXPORT
   ========================================================= */

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = A1_API;
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

console.log(
  "A1 Computer — API layer loaded."
);
