"use strict";

/* =========================================================
   A1 COMPUTER — EVENT BUS
   Central communication system between portal modules
   ========================================================= */

const A1_EVENTS = {

  listeners: {},


  /* -------------------------------------------------------
     CREATE EVENT LISTENER
     ------------------------------------------------------- */

  on(eventName, callback) {

    if (
      !eventName ||
      typeof callback !== "function"
    ) {
      return false;
    }

    if (
      !this.listeners[eventName]
    ) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(
      callback
    );

    return true;
  },


  /* -------------------------------------------------------
     REMOVE EVENT LISTENER
     ------------------------------------------------------- */

  off(eventName, callback) {

    if (
      !eventName ||
      !this.listeners[eventName]
    ) {
      return false;
    }

    if (
      typeof callback !== "function"
    ) {
      return false;
    }

    this.listeners[eventName] =
      this.listeners[eventName]
        .filter(
          listener =>
            listener !== callback
        );

    return true;
  },


  /* -------------------------------------------------------
     EMIT EVENT
     ------------------------------------------------------- */

  emit(eventName, data = null) {

    if (
      !eventName ||
      !this.listeners[eventName]
    ) {
      return false;
    }

    this.listeners[eventName]
      .forEach(
        callback => {

          try {

            callback(data);

          } catch (error) {

            console.error(
              `A1 Event Error: ${eventName}`,
              error
            );

          }

        }
      );

    return true;
  },


  /* -------------------------------------------------------
     REMOVE ALL LISTENERS
     ------------------------------------------------------- */

  removeAll(eventName = null) {

    if (eventName) {

      delete this.listeners[
        eventName
      ];

      return true;
    }

    this.listeners = {};

    return true;
  },


  /* -------------------------------------------------------
     CHECK LISTENER
     ------------------------------------------------------- */

  has(eventName) {

    return Boolean(
      this.listeners[eventName] &&
      this.listeners[eventName].length
    );
  },


  /* -------------------------------------------------------
     LIST EVENTS
     ------------------------------------------------------- */

  list() {

    return Object.keys(
      this.listeners
    );
  },


  /* -------------------------------------------------------
     SERVICE EVENTS
     ------------------------------------------------------- */

  serviceOpened(service) {

    return this.emit(
      "service:opened",
      service
    );
  },


  serviceSelected(service) {

    return this.emit(
      "service:selected",
      service
    );
  },


  /* -------------------------------------------------------
     SEARCH EVENTS
     ------------------------------------------------------- */

  searchStarted(query) {

    return this.emit(
      "search:started",
      {
        query
      }
    );
  },


  searchCompleted(
    query,
    results = []
  ) {

    return this.emit(
      "search:completed",
      {
        query,
        results,
        count:
          Array.isArray(results)
            ? results.length
            : 0
      }
    );
  },


  /* -------------------------------------------------------
     LANGUAGE EVENTS
     ------------------------------------------------------- */

  languageChanged(
    language
  ) {

    return this.emit(
      "language:changed",
      {
        language
      }
    );
  },


  /* -------------------------------------------------------
     NOTIFICATION EVENTS
     ------------------------------------------------------- */

  notificationAdded(
    notification
  ) {

    return this.emit(
      "notification:added",
      notification
    );
  },


  notificationRead(
    notification
  ) {

    return this.emit(
      "notification:read",
      notification
    );
  },


  /* -------------------------------------------------------
     AUTH EVENTS
     ------------------------------------------------------- */

  login(user) {

    return this.emit(
      "auth:login",
      user
    );
  },


  logout(user = null) {

    return this.emit(
      "auth:logout",
      user
    );
  },


  /* -------------------------------------------------------
     PAGE EVENTS
     ------------------------------------------------------- */

  pageLoaded(page) {

    return this.emit(
      "page:loaded",
      {
        page
      }
    );
  },


  pageChanged(page) {

    return this.emit(
      "page:changed",
      {
        page
      }
    );
  },


  /* -------------------------------------------------------
     ADMIN EVENTS
     ------------------------------------------------------- */

  adminAction(
    action,
    data = null
  ) {

    return this.emit(
      "admin:action",
      {
        action,
        data
      }
    );
  },


  /* -------------------------------------------------------
     GENERIC EVENT
     ------------------------------------------------------- */

  trigger(
    eventName,
    data = null
  ) {

    return this.emit(
      eventName,
      data
    );
  }

};


/* =========================================================
   GLOBAL EXPORT
   ========================================================= */

if (typeof window !== "undefined") {

  window.A1_EVENTS =
    A1_EVENTS;
}


/* =========================================================
   NODE / COMMONJS EXPORT
   ========================================================= */

if (
  typeof module !== "undefined" &&
  module.exports
) {

  module.exports =
    A1_EVENTS;
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

console.log(
  "A1 Computer — Event bus loaded."
);
