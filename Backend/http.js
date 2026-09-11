```javascript
"use strict";

/* =========================================================
   A1 COMPUTER — HTTP CLIENT
   Central HTTP/API request helper
   ========================================================= */

const A1_HTTP = {

  /* -------------------------------------------------------
     DEFAULT SETTINGS
     ------------------------------------------------------- */

  defaults: {
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  },


  /* -------------------------------------------------------
     BUILD URL
     ------------------------------------------------------- */

  buildURL(endpoint) {

    const config =
      typeof window !== "undefined"
        ? window.A1_API_CONFIG
        : null;

    const baseURL =
      config &&
      config.api &&
      config.api.baseURL
        ? String(config.api.baseURL)
            .replace(/\/+$/, "")
        : "";

    const path =
      String(endpoint || "")
        .replace(/^\/+/, "");

    if (!baseURL) {
      return "/" + path;
    }

    return baseURL + "/" + path;
  },


  /* -------------------------------------------------------
     CREATE REQUEST OPTIONS
     ------------------------------------------------------- */

  options(
    method = "GET",
    body = null,
    customHeaders = {}
  ) {

    const options = {

      method:
        String(method)
          .toUpperCase(),

      headers: {
        ...this.defaults.headers,
        ...customHeaders
      },

      credentials:
        "same-origin"
    };


    if (body !== null) {

      options.body =
        JSON.stringify(body);

    }


    return options;
  },


  /* -------------------------------------------------------
     REQUEST
     ------------------------------------------------------- */

  async request(
    endpoint,
    options = {}
  ) {

    const url =
      this.buildURL(endpoint);


    const controller =
      typeof AbortController !==
      "undefined"
        ? new AbortController()
        : null;


    const timeout =
      Number(
        options.timeout ||
        this.defaults.timeout
      );


    let timer = null;


    if (controller) {

      timer =
        setTimeout(
          () => controller.abort(),
          timeout
        );

    }


    try {

      const fetchOptions = {

        method:
          options.method || "GET",

        headers: {
          ...this.defaults.headers,
          ...(options.headers || {})
        },

        credentials:
          options.credentials ||
          "same-origin",

        signal:
          controller
            ? controller.signal
            : undefined

      };


      if (
        options.body !== undefined &&
        options.body !== null
      ) {

        fetchOptions.body =
          typeof options.body === "string"
            ? options.body
            : JSON.stringify(
                options.body
              );

      }


      const response =
        await fetch(
          url,
          fetchOptions
        );


      const contentType =
        response.headers.get(
          "content-type"
        ) || "";


      let data;


      if (
        contentType.includes(
          "application/json"
        )
      ) {

        data =
          await response.json();

      } else {

        data =
          await response.text();

      }


      if (!response.ok) {

        return {

          success: false,

          status:
            response.status,

          statusText:
            response.statusText,

          data,

          message:
            this.getErrorMessage(
              response.status
            )

        };

      }


      return {

        success: true,

        status:
          response.status,

        data,

        message:
          "Request successful."

      };


    } catch (error) {

      if (
        error &&
        error.name ===
        "AbortError"
      ) {

        return {

          success: false,

          status: 408,

          data: null,

          message:
            "Request timed out."

        };

      }


      console.error(
        "A1 HTTP Error:",
        error
      );


      return {

        success: false,

        status: 0,

        data: null,

        message:
          "Unable to connect to the server."

      };


    } finally {

      if (timer) {
        clearTimeout(timer);
      }

    }

  },


  /* -------------------------------------------------------
     GET
     ------------------------------------------------------- */

  get(
    endpoint,
    options = {}
  ) {

    return this.request(
      endpoint,
      {
        ...options,
        method: "GET"
      }
    );
  },


  /* -------------------------------------------------------
     POST
     ------------------------------------------------------- */

  post(
    endpoint,
    body = null,
    options = {}
  ) {

    return this.request(
      endpoint,
      {
        ...options,
        method: "POST",
        body
      }
    );
  },


  /* -------------------------------------------------------
     PUT
     ------------------------------------------------------- */

  put(
    endpoint,
    body = null,
    options = {}
  ) {

    return this.request(
      endpoint,
      {
        ...options,
        method: "PUT",
        body
      }
    );
  },


  /* -------------------------------------------------------
     PATCH
     ------------------------------------------------------- */

  patch(
    endpoint,
    body = null,
    options = {}
  ) {

    return this.request(
      endpoint,
      {
        ...options,
        method: "PATCH",
        body
      }
    );
  },


  /* -------------------------------------------------------
     DELETE
     ------------------------------------------------------- */

  delete(
    endpoint,
    options = {}
  ) {

    return this.request(
      endpoint,
      {
        ...options,
        method: "DELETE"
      }
    );
  },


  /* -------------------------------------------------------
     API ENDPOINT REQUEST
     ------------------------------------------------------- */

  async endpoint(
    name,
    method = "GET",
    body = null
  ) {

    let endpoint = name;


    if (
      typeof window !== "undefined" &&
      window.A1_API_CONFIG &&
      typeof window.A1_API_CONFIG
        .getEndpoint === "function"
    ) {

      const configured =
        window.A1_API_CONFIG
          .getEndpoint(name);

      if (configured) {
        endpoint = configured;
      }

    }


    return this.request(
      endpoint,
      this.options(
        method,
        body
      )
    );
  },


  /* -------------------------------------------------------
     HEALTH CHECK
     ------------------------------------------------------- */

  health() {

    return this.endpoint(
      "health",
      "GET"
    );
  },


  /* -------------------------------------------------------
     ERROR MESSAGES
     ------------------------------------------------------- */

  getErrorMessage(status) {

    const messages = {

      400:
        "Bad request.",

      401:
        "Authentication required.",

      403:
        "Access denied.",

      404:
        "Requested resource was not found.",

      408:
        "Request timed out.",

      429:
        "Too many requests.",

      500:
        "Server error.",

      502:
        "Bad gateway.",

      503:
        "Service unavailable.",

      504:
        "Gateway timeout."

    };


    return (
      messages[status] ||
      "Request failed."
    );
  },


  /* -------------------------------------------------------
     CHECK CONNECTION
     ------------------------------------------------------- */

  async isOnline() {

    if (
      typeof navigator !==
      "undefined" &&
      "onLine" in navigator
    ) {

      return navigator.onLine;

    }

    return true;
  },


  /* -------------------------------------------------------
     GET STATUS
     ------------------------------------------------------- */

  getStatus() {

    return {

      online:
        typeof navigator !==
        "undefined"
          ? navigator.onLine
          : true,

      apiEnabled:
        Boolean(
          typeof window !== "undefined" &&
          window.A1_API_CONFIG &&
          typeof window.A1_API_CONFIG
            .isEnabled === "function" &&
          window.A1_API_CONFIG
            .isEnabled()
        )

    };

  }

};


/* =========================================================
   GLOBAL EXPORT
   ========================================================= */

if (typeof window !== "undefined") {

  window.A1_HTTP =
    A1_HTTP;

}


/* =========================================================
   NODE / COMMONJS EXPORT
   ========================================================= */

if (
  typeof module !== "undefined" &&
  module.exports
) {

  module.exports =
    A1_HTTP;

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

console.log(
  "A1 Computer — HTTP client loaded."
);
```
