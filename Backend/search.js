"use strict";

/* =========================================================
   A1 COMPUTER — SEARCH ENGINE
   Central search system for the complete portal
   ========================================================= */

const A1_SEARCH = {

  /* -------------------------------------------------------
     SETTINGS
     ------------------------------------------------------- */

  settings: {
    minQueryLength: 1,
    maxResults: 50
  },


  /* -------------------------------------------------------
     NORMALIZE TEXT
     ------------------------------------------------------- */

  normalize(value) {

    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
  },


  /* -------------------------------------------------------
     GET PORTAL DATA
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
     BUILD SEARCH COLLECTION
     ------------------------------------------------------- */

  getCollection() {

    const data =
      this.getData();

    if (!data) {
      return [];
    }

    const collections = [];

    const addCollection =
      (items, category) => {

        if (!Array.isArray(items)) {
          return;
        }

        items.forEach(item => {

          if (!item) {
            return;
          }

          collections.push({

            ...item,

            searchCategory:
              category,

            searchTitle:
              item.title || "",

            searchDescription:
              item.description || "",

            searchType:
              item.type || "",

            searchCategoryName:
              item.category || category

          });

        });
      };


    addCollection(
      data.categories,
      "category"
    );

    addCollection(
      data.quickServices,
      "quick-service"
    );

    addCollection(
      data.studentServices,
      "student"
    );

    addCollection(
      data.governmentServices,
      "government"
    );

    addCollection(
      data.jobServices,
      "jobs"
    );

    addCollection(
      data.documentServices,
      "documents"
    );

    addCollection(
      data.landServices,
      "land"
    );

    addCollection(
      data.schemes,
      "schemes"
    );


    return collections;
  },


  /* -------------------------------------------------------
     SEARCH
     ------------------------------------------------------- */

  search(query, options = {}) {

    const searchQuery =
      this.normalize(query);

    if (
      searchQuery.length <
      this.settings.minQueryLength
    ) {
      return [];
    }


    const collection =
      this.getCollection();


    const category =
      options.category
        ? this.normalize(
            options.category
          )
        : "";


    const results = [];


    collection.forEach(item => {

      if (
        category &&
        this.normalize(
          item.searchCategory
        ) !== category
      ) {
        return;
      }


      const title =
        this.normalize(
          item.searchTitle
        );

      const description =
        this.normalize(
          item.searchDescription
        );

      const id =
        this.normalize(
          item.id
        );

      const type =
        this.normalize(
          item.searchType
        );

      const itemCategory =
        this.normalize(
          item.searchCategoryName
        );


      const fullText =
        [
          title,
          description,
          id,
          type,
          itemCategory
        ]
          .filter(Boolean)
          .join(" ");


      if (
        !fullText.includes(
          searchQuery
        )
      ) {
        return;
      }


      /* ---------------------------------------------------
         RELEVANCE SCORE
         --------------------------------------------------- */

      let score = 1;


      if (
        title === searchQuery
      ) {
        score += 100;
      }


      if (
        title.startsWith(
          searchQuery
        )
      ) {
        score += 50;
      }


      if (
        title.includes(
          searchQuery
        )
      ) {
        score += 25;
      }


      if (
        id === searchQuery
      ) {
        score += 40;
      }


      if (
        type.includes(
          searchQuery
        )
      ) {
        score += 10;
      }


      if (
        itemCategory.includes(
          searchQuery
        )
      ) {
        score += 8;
      }


      results.push({

        ...item,

        relevanceScore:
          score

      });

    });


    results.sort(
      (a, b) =>
        b.relevanceScore -
        a.relevanceScore
    );


    const limit =
      Number(
        options.limit ||
        this.settings.maxResults
      );


    return results.slice(
      0,
      limit
    );
  },


  /* -------------------------------------------------------
     SEARCH BY CATEGORY
     ------------------------------------------------------- */

  searchCategory(
    query,
    category,
    limit = 20
  ) {

    return this.search(
      query,
      {
        category,
        limit
      }
    );
  },


  /* -------------------------------------------------------
     FIND BY ID
     ------------------------------------------------------- */

  findById(id) {

    const target =
      this.normalize(id);

    if (!target) {
      return null;
    }


    const collection =
      this.getCollection();


    return (
      collection.find(
        item =>
          this.normalize(
            item.id
          ) === target
      ) || null
    );
  },


  /* -------------------------------------------------------
     SUGGESTIONS
     ------------------------------------------------------- */

  suggestions(
    query,
    limit = 8
  ) {

    const results =
      this.search(
        query,
        {
          limit
        }
      );


    return results.map(
      item => ({

        id:
          item.id || "",

        title:
          item.title || "",

        category:
          item.searchCategory || "",

        page:
          item.page || ""

      })
    );
  },


  /* -------------------------------------------------------
     POPULAR SEARCHES
     ------------------------------------------------------- */

  getPopularSearches() {

    return [

      "Aadhaar",

      "PAN Card",

      "Government Jobs",

      "Scholarship",

      "Results",

      "Admit Card",

      "Land Records",

      "Government Schemes"

    ];
  },


  /* -------------------------------------------------------
     RECENT SEARCHES
     ------------------------------------------------------- */

  recentKey:
    "recent_searches",


  getRecentSearches() {

    try {

      const data =
        localStorage.getItem(
          this.recentKey
        );


      if (!data) {
        return [];
      }


      const searches =
        JSON.parse(data);


      return Array.isArray(
        searches
      )
        ? searches
        : [];

    } catch {

      return [];
    }
  },


  saveRecentSearch(query) {

    const value =
      this.normalize(query);


    if (!value) {
      return false;
    }


    let searches =
      this.getRecentSearches();


    searches =
      searches.filter(
        item =>
          item !== value
      );


    searches.unshift(
      value
    );


    searches =
      searches.slice(
        0,
        10
      );


    try {

      localStorage.setItem(
        this.recentKey,
        JSON.stringify(
          searches
        )
      );

      return true;

    } catch {

      return false;
    }
  },


  clearRecentSearches() {

    try {

      localStorage.removeItem(
        this.recentKey
      );

      return true;

    } catch {

      return false;
    }
  },


  /* -------------------------------------------------------
     SEARCH STATISTICS
     ------------------------------------------------------- */

  getStats() {

    const collection =
      this.getCollection();


    const stats = {

      total:
        collection.length,

      categories: 0,

      quickServices: 0,

      student: 0,

      government: 0,

      jobs: 0,

      documents: 0,

      land: 0,

      schemes: 0

    };


    collection.forEach(
      item => {

        switch (
          item.searchCategory
        ) {

          case "category":
            stats.categories++;
            break;

          case "quick-service":
            stats.quickServices++;
            break;

          case "student":
            stats.student++;
            break;

          case "government":
            stats.government++;
            break;

          case "jobs":
            stats.jobs++;
            break;

          case "documents":
            stats.documents++;
            break;

          case "land":
            stats.land++;
            break;

          case "schemes":
            stats.schemes++;
            break;

        }

      }
    );


    return stats;
  }

};


/* =========================================================
   GLOBAL EXPORT
   ========================================================= */

if (typeof window !== "undefined") {

  window.A1_SEARCH =
    A1_SEARCH;
}


/* =========================================================
   NODE / COMMONJS EXPORT
   ========================================================= */

if (
  typeof module !== "undefined" &&
  module.exports
) {

  module.exports =
    A1_SEARCH;
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

console.log(
  "A1 Computer — Search engine loaded."
);
