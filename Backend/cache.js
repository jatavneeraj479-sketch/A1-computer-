"use strict";

/* =========================================================
   A1 COMPUTER — CACHE MANAGER
   Temporary client-side cache
   ========================================================= */

const A1_CACHE = {

  prefix: "a1_cache_",

  defaultTTL: 10 * 60 * 1000, // 10 minutes


  /* -------------------------------------------------------
     CREATE KEY
     ------------------------------------------------------- */

  makeKey(key) {

    return (
      this.prefix +
      String(key)
    );
  },


  /* -------------------------------------------------------
     SET
     ------------------------------------------------------- */

  set(
    key,
    value,
    ttl = this.defaultTTL
  ) {

    if (!key) {
      return false;
    }

    try {

      const item = {

        value,

        createdAt:
          Date.now(),

        expiresAt:
          Date.now() +
          Number(ttl)

      };

      localStorage.setItem(
        this.makeKey(key),
        JSON.stringify(item)
      );

      return true;

    } catch (error) {

      console.error(
        "A1 Cache Set Error:",
        error
      );

      return false;
    }
  },


  /* -------------------------------------------------------
     GET
     ------------------------------------------------------- */

  get(
    key,
    fallback = null
  ) {

    if (!key) {
      return fallback;
    }

    try {

      const raw =
        localStorage.getItem(
          this.makeKey(key)
        );

      if (!raw) {
        return fallback;
      }

      const item =
        JSON.parse(raw);

      if (
        !item ||
        typeof item !== "object"
      ) {

        this.remove(key);

        return fallback;
      }


      /* Expired */

      if (
        Date.now() >
        Number(item.expiresAt)
      ) {

        this.remove(key);

        return fallback;
      }


      return item.value;

    } catch (error) {

      console.error(
        "A1 Cache Get Error:",
        error
      );

      return fallback;
    }
  },


  /* -------------------------------------------------------
     HAS
     ------------------------------------------------------- */

  has(key) {

    const value =
      this.get(
        key,
        undefined
      );

    return value !== undefined;
  },


  /* -------------------------------------------------------
     REMOVE
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
        "A1 Cache Remove Error:",
        error
      );

      return false;
    }
  },


  /* -------------------------------------------------------
     CLEAR CACHE
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
          key.startsWith(
            this.prefix
          )
        ) {

          keys.push(key);
        }
      }


      keys.forEach(
        key =>
          localStorage.removeItem(key)
      );


      return true;

    } catch (error) {

      console.error(
        "A1 Cache Clear Error:",
        error
      );

      return false;
    }
  },


  /* -------------------------------------------------------
     CLEAN EXPIRED
     ------------------------------------------------------- */

  cleanExpired() {

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
          key.startsWith(
            this.prefix
          )
        ) {

          keys.push(key);
        }
      }


      let removed = 0;


      keys.forEach(key => {

        try {

          const raw =
            localStorage.getItem(key);

          const item =
            JSON.parse(raw);

          if (
            !item ||
            Date.now() >
            Number(item.expiresAt)
          ) {

            localStorage.removeItem(
              key
            );

            removed++;
          }

        } catch {

          localStorage.removeItem(
            key
          );

          removed++;
        }

      });


      return removed;

    } catch (error) {

      console.error(
        "A1 Cache Cleanup Error:",
        error
      );

      return 0;
    }
  },


  /* -------------------------------------------------------
     GET OR CREATE
     ------------------------------------------------------- */

  async getOrCreate(
    key,
    callback,
    ttl = this.defaultTTL
  ) {

    const cached =
      this.get(
        key,
        undefined
      );


    if (cached !== undefined) {
      return cached;
    }


    if (
      typeof callback !==
      "function"
    ) {
      return null;
    }


    try {

      const value =
        await callback();


      this.set(
        key,
        value,
        ttl
      );


      return value;

    } catch (error) {

      console.error(
        "A1 Cache Callback Error:",
        error
      );

      return null;
    }
  },


  /* -------------------------------------------------------
     GET CACHE INFORMATION
     ------------------------------------------------------- */

  info() {

    const items = [];

    try {

      for (
        let index = 0;
        index < localStorage.length;
        index++
      ) {

        const key =
          localStorage.key(index);

        if (
          !key ||
          !key.startsWith(
            this.prefix
          )
        ) {
          continue;
        }


        const raw =
          localStorage.getItem(key);


        try {

          const item =
            JSON.parse(raw);


          items.push({

            key:
              key.replace(
                this.prefix,
                ""
              ),

            createdAt:
              item.createdAt,

            expiresAt:
              item.expiresAt,

            expired:
              Date.now() >
              Number(
                item.expiresAt
              )

          });

        } catch {

          items.push({

            key:
              key.replace(
                this.prefix,
                ""
              ),

            expired: true

          });
        }
      }

    } catch (error) {

      console.error(
        "A1 Cache Info Error:",
        error
      );
    }


    return items;
  }

};


/* =========================================================
   GLOBAL EXPORT
   ========================================================= */

if (typeof window !== "undefined") {

  window.A1_CACHE =
    A1_CACHE;
}


/* =========================================================
   NODE / COMMONJS EXPORT
   ========================================================= */

if (
  typeof module !== "undefined" &&
  module.exports
) {

  module.exports =
    A1_CACHE;
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

console.log(
  "A1 Computer — Cache manager loaded."
);
