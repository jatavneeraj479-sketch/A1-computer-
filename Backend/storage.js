"use strict";

/* =========================================================
   A1 COMPUTER — STORAGE MANAGER
   Safe localStorage wrapper for portal data
   ========================================================= */

const A1_STORAGE = {

  prefix: "a1_portal_",

  /* -------------------------------------------------------
     CREATE KEY
     ------------------------------------------------------- */

  makeKey(key) {
    return `${this.prefix}${String(key)}`;
  },


  /* -------------------------------------------------------
     SAVE DATA
     ------------------------------------------------------- */

  set(key, value) {

    if (!key) {
      return false;
    }

    try {

      const storageKey =
        this.makeKey(key);

      localStorage.setItem(
        storageKey,
        JSON.stringify(value)
      );

      return true;

    } catch (error) {

      console.error(
        "A1 Storage Set Error:",
        error
      );

      return false;
    }
  },


  /* -------------------------------------------------------
     GET DATA
     ------------------------------------------------------- */

  get(key, fallback = null) {

    if (!key) {
      return fallback;
    }

    try {

      const storageKey =
        this.makeKey(key);

      const value =
        localStorage.getItem(
          storageKey
        );

      if (value === null) {
        return fallback;
      }

      return JSON.parse(value);

    } catch (error) {

      console.error(
        "A1 Storage Get Error:",
        error
      );

      return fallback;
    }
  },


  /* -------------------------------------------------------
     CHECK KEY
     ------------------------------------------------------- */

  has(key) {

    if (!key) {
      return false;
    }

    try {

      return (
        localStorage.getItem(
          this.makeKey(key)
        ) !== null
      );

    } catch {

      return false;
    }
  },


  /* -------------------------------------------------------
     REMOVE DATA
     ------------------------------------------------------- */

  remove(key) {

    if (!key) {
      return false;
    }

    try {

      localStorage.removeItem(
        this.makeKey(key)
      );

      return true;

    } catch (error) {

      console.error(
        "A1 Storage Remove Error:",
        error
      );

      return false;
    }
  },


  /* -------------------------------------------------------
     CLEAR A1 DATA ONLY
     ------------------------------------------------------- */

  clear() {

    try {

      const keys = [];

      for (
        let index = 0;
        index < localStorage.length;
        index++
      ) {

        const key =
          localStorage.key(index);

        if (
          key &&
          key.startsWith(this.prefix)
        ) {
          keys.push(key);
        }
      }

      keys.forEach(key => {
        localStorage.removeItem(key);
      });

      return true;

    } catch (error) {

      console.error(
        "A1 Storage Clear Error:",
        error
      );

      return false;
    }
  },


  /* -------------------------------------------------------
     GET ALL A1 DATA
     ------------------------------------------------------- */

  getAll() {

    const result = {};

    try {

      for (
        let index = 0;
        index < localStorage.length;
        index++
      ) {

        const storageKey =
          localStorage.key(index);

        if (
          !storageKey ||
          !storageKey.startsWith(
            this.prefix
          )
        ) {
          continue;
        }

        const key =
          storageKey.replace(
            this.prefix,
            ""
          );

        const value =
          localStorage.getItem(
            storageKey
          );

        try {

          result[key] =
            JSON.parse(value);

        } catch {

          result[key] = value;
        }
      }

    } catch (error) {

      console.error(
        "A1 Storage Read Error:",
        error
      );
    }

    return result;
  },


  /* -------------------------------------------------------
     UPDATE OBJECT
     ------------------------------------------------------- */

  update(key, updates = {}) {

    if (!key) {
      return false;
    }

    const existing =
      this.get(key, {});

    if (
      typeof existing !== "object" ||
      existing === null ||
      Array.isArray(existing)
    ) {
      return this.set(
        key,
        updates
      );
    }

    const updated = {
      ...existing,
      ...updates
    };

    return this.set(
      key,
      updated
    );
  },


  /* -------------------------------------------------------
     ADD ITEM TO ARRAY
     ------------------------------------------------------- */

  push(key, item) {

    const existing =
      this.get(key, []);

    if (!Array.isArray(existing)) {
      return false;
    }

    existing.push(item);

    return this.set(
      key,
      existing
    );
  },


  /* -------------------------------------------------------
     REMOVE ITEM FROM ARRAY
     ------------------------------------------------------- */

  removeItem(key, predicate) {

    const existing =
      this.get(key, []);

    if (!Array.isArray(existing)) {
      return false;
    }

    if (
      typeof predicate !== "function"
    ) {
      return false;
    }

    const filtered =
      existing.filter(
        item => !predicate(item)
      );

    return this.set(
      key,
      filtered
    );
  },


  /* -------------------------------------------------------
     STORAGE TEST
     ------------------------------------------------------- */

  test() {

    const testKey =
      "__storage_test__";

    const testValue = {
      status: "ok",
      time: new Date().toISOString()
    };

    const saved =
      this.set(
        testKey,
        testValue
      );

    const loaded =
      this.get(
        testKey,
        null
      );

    this.remove(testKey);

    return (
      saved &&
      loaded !== null &&
      loaded.status === "ok"
    );
  }

};


/* =========================================================
   GLOBAL EXPORT
   ========================================================= */

if (typeof window !== "undefined") {

  window.A1_STORAGE =
    A1_STORAGE;
}


/* =========================================================
   NODE / COMMONJS EXPORT
   ========================================================= */

if (
  typeof module !== "undefined" &&
  module.exports
) {

  module.exports =
    A1_STORAGE;
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

console.log(
  "A1 Computer — Storage manager loaded."
);
