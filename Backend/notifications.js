"use strict";

/* =========================================================
   A1 COMPUTER — NOTIFICATION MANAGER
   Central notification storage and management
   ========================================================= */

const A1_NOTIFICATIONS = {

  storageKey: "notifications",

  /* -------------------------------------------------------
     GET ALL
     ------------------------------------------------------- */

  getAll() {

    try {

      const data =
        localStorage.getItem(
          this.storageKey
        );

      if (!data) {
        return [];
      }

      const notifications =
        JSON.parse(data);

      return Array.isArray(notifications)
        ? notifications
        : [];

    } catch (error) {

      console.error(
        "A1 Notifications Read Error:",
        error
      );

      return [];
    }
  },


  /* -------------------------------------------------------
     SAVE ALL
     ------------------------------------------------------- */

  saveAll(notifications) {

    if (!Array.isArray(notifications)) {
      return false;
    }

    try {

      localStorage.setItem(
        this.storageKey,
        JSON.stringify(notifications)
      );

      return true;

    } catch (error) {

      console.error(
        "A1 Notifications Save Error:",
        error
      );

      return false;
    }
  },


  /* -------------------------------------------------------
     ADD
     ------------------------------------------------------- */

  add(notification = {}) {

    const notifications =
      this.getAll();

    const item = {

      id:
        notification.id ||
        `notice_${Date.now()}`,

      title:
        notification.title ||
        "New Notification",

      message:
        notification.message ||
        "",

      type:
        notification.type ||
        "info",

      link:
        notification.link ||
        "",

      read: false,

      createdAt:
        notification.createdAt ||
        new Date().toISOString()
    };

    notifications.unshift(item);

    this.saveAll(notifications);

    return item;
  },


  /* -------------------------------------------------------
     FIND
     ------------------------------------------------------- */

  find(id) {

    if (!id) {
      return null;
    }

    return this
      .getAll()
      .find(
        notification =>
          notification.id === id
      ) || null;
  },


  /* -------------------------------------------------------
     MARK AS READ
     ------------------------------------------------------- */

  markAsRead(id) {

    const notifications =
      this.getAll();

    let changed = false;

    const updated =
      notifications.map(
        notification => {

          if (
            notification.id === id &&
            notification.read === false
          ) {

            changed = true;

            return {
              ...notification,
              read: true
            };
          }

          return notification;
        }
      );

    if (changed) {
      this.saveAll(updated);
    }

    return changed;
  },


  /* -------------------------------------------------------
     MARK ALL AS READ
     ------------------------------------------------------- */

  markAllAsRead() {

    const notifications =
      this.getAll();

    const updated =
      notifications.map(
        notification => ({
          ...notification,
          read: true
        })
      );

    return this.saveAll(updated);
  },


  /* -------------------------------------------------------
     UNREAD
     ------------------------------------------------------- */

  getUnread() {

    return this
      .getAll()
      .filter(
        notification =>
          notification.read === false
      );
  },


  /* -------------------------------------------------------
     UNREAD COUNT
     ------------------------------------------------------- */

  getUnreadCount() {

    return this
      .getUnread()
      .length;
  },


  /* -------------------------------------------------------
     DELETE
     ------------------------------------------------------- */

  remove(id) {

    if (!id) {
      return false;
    }

    const notifications =
      this.getAll();

    const filtered =
      notifications.filter(
        notification =>
          notification.id !== id
      );

    if (
      filtered.length ===
      notifications.length
    ) {
      return false;
    }

    return this.saveAll(filtered);
  },


  /* -------------------------------------------------------
     CLEAR ALL
     ------------------------------------------------------- */

  clear() {

    try {

      localStorage.removeItem(
        this.storageKey
      );

      return true;

    } catch (error) {

      console.error(
        "A1 Notifications Clear Error:",
        error
      );

      return false;
    }
  },


  /* -------------------------------------------------------
     DEFAULT NOTIFICATION
     ------------------------------------------------------- */

  createDefault() {

    return this.add({

      title: "A1 Computer",

      message:
        "Welcome to A1 Computer Digital Portal.",

      type: "welcome",

      link: "index.html"

    });
  }

};


/* =========================================================
   GLOBAL EXPORT
   ========================================================= */

if (typeof window !== "undefined") {

  window.A1_NOTIFICATIONS =
    A1_NOTIFICATIONS;
}


/* =========================================================
   NODE / COMMONJS EXPORT
   ========================================================= */

if (
  typeof module !== "undefined" &&
  module.exports
) {

  module.exports =
    A1_NOTIFICATIONS;
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

console.log(
  "A1 Computer — Notification manager loaded."
);
