/* =========================================================
   A1 COMPUTER — NOTIFICATION & NOTICE SYSTEM
   ========================================================= */

"use strict";

/* =========================================================
   1. CONFIGURATION
   ========================================================= */

const A1_NOTIFICATION_CONFIG = {
  maxNotifications: 50,
  storageKey: "a1_notifications",
  readKey: "a1_read_notifications"
};

/* =========================================================
   2. DEFAULT NOTICES
   ========================================================= */

const A1_DEFAULT_NOTIFICATIONS = [

  {
    id: "welcome-001",
    title: "Welcome to A1 Computer",
    message:
      "Study, government and citizen services — all in one place.",
    category: "General",
    date: new Date().toISOString(),
    priority: "normal",
    link: "",
    active: true
  },

  {
    id: "student-001",
    title: "Student Services Available",
    message:
      "Explore exams, admissions, results, scholarships and study services.",
    category: "Student",
    date: new Date().toISOString(),
    priority: "normal",
    link: "pages/student.html",
    active: true
  },

  {
    id: "government-001",
    title: "Government Services",
    message:
      "Find important government and citizen service information in one place.",
    category: "Government",
    date: new Date().toISOString(),
    priority: "normal",
    link: "pages/government.html",
    active: true
  }

];

/* =========================================================
   3. NOTIFICATION STATE
   ========================================================= */

const A1_NOTIFICATION_STATE = {
  notifications: [],
  unreadCount: 0,
  isOpen: false
};

/* =========================================================
   4. LOAD NOTIFICATIONS
   ========================================================= */

function loadA1Notifications() {

  try {

    const saved =
      localStorage.getItem(
        A1_NOTIFICATION_CONFIG.storageKey
      );

    if (saved) {

      const parsed =
        JSON.parse(saved);

      if (Array.isArray(parsed)) {

        A1_NOTIFICATION_STATE.notifications =
          parsed;

        updateUnreadCount();

        return parsed;

      }

    }

  } catch (error) {

    console.warn(
      "A1 notifications could not be loaded.",
      error
    );

  }

  A1_NOTIFICATION_STATE.notifications =
    [...A1_DEFAULT_NOTIFICATIONS];

  saveA1Notifications();

  updateUnreadCount();

  return A1_NOTIFICATION_STATE.notifications;
}

/* =========================================================
   5. SAVE NOTIFICATIONS
   ========================================================= */

function saveA1Notifications() {

  try {

    localStorage.setItem(
      A1_NOTIFICATION_CONFIG.storageKey,
      JSON.stringify(
        A1_NOTIFICATION_STATE
          .notifications
      )
    );

  } catch (error) {

    console.warn(
      "A1 notifications could not be saved.",
      error
    );

  }
}

/* =========================================================
   6. READ NOTIFICATION IDS
   ========================================================= */

function getReadNotificationIds() {

  try {

    const saved =
      localStorage.getItem(
        A1_NOTIFICATION_CONFIG.readKey
      );

    if (!saved) return [];

    const parsed =
      JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed
      : [];

  } catch (error) {

    return [];

  }
}

/* =========================================================
   7. SAVE READ IDS
   ========================================================= */

function saveReadNotificationIds(
  ids
) {

  try {

    localStorage.setItem(
      A1_NOTIFICATION_CONFIG.readKey,
      JSON.stringify(ids)
    );

  } catch (error) {

    console.warn(
      "Read notification state could not be saved.",
      error
    );

  }
}

/* =========================================================
   8. CHECK READ STATUS
   ========================================================= */

function isNotificationRead(
  id
) {

  const readIds =
    getReadNotificationIds();

  return readIds.includes(id);
}

/* =========================================================
   9. MARK AS READ
   ========================================================= */

function markNotificationAsRead(
  id
) {

  const readIds =
    getReadNotificationIds();

  if (!readIds.includes(id)) {

    readIds.push(id);

    saveReadNotificationIds(
      readIds
    );

  }

  updateUnreadCount();

}

/* =========================================================
   10. MARK ALL AS READ
   ========================================================= */

function markAllNotificationsAsRead() {

  const ids =
    A1_NOTIFICATION_STATE
      .notifications
      .map(
        (notification) =>
          notification.id
      );

  saveReadNotificationIds(
    ids
  );

  updateUnreadCount();

  renderNotifications();

}

/* =========================================================
   11. UPDATE UNREAD COUNT
   ========================================================= */

function updateUnreadCount() {

  const unread =
    A1_NOTIFICATION_STATE
      .notifications
      .filter(
        (notification) =>
          notification.active &&
          !isNotificationRead(
            notification.id
          )
      );

  A1_NOTIFICATION_STATE.unreadCount =
    unread.length;

  updateNotificationBadges();

}

/* =========================================================
   12. UPDATE BADGES
   ========================================================= */

function updateNotificationBadges() {

  document
    .querySelectorAll(
      "#notificationBadge, .notification-badge, [data-notification-badge]"
    )
    .forEach((badge) => {

      const count =
        A1_NOTIFICATION_STATE
          .unreadCount;

      badge.textContent =
        count > 99
          ? "99+"
          : String(count);

      badge.classList.toggle(
        "active",
        count > 0
      );

      badge.classList.toggle(
        "has-notifications",
        count > 0
      );

      badge.setAttribute(
        "aria-label",
        `${count} unread notifications`
      );

    });

}

/* =========================================================
   13. GET ACTIVE NOTIFICATIONS
   ========================================================= */

function getActiveNotifications() {

  return A1_NOTIFICATION_STATE
    .notifications
    .filter(
      (notification) =>
        notification.active !== false
    )
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    )
    .slice(
      0,
      A1_NOTIFICATION_CONFIG
        .maxNotifications
    );

}

/* =========================================================
   14. FORMAT DATE
   ========================================================= */

function formatNotificationDate(
  date
) {

  const parsed =
    new Date(date);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return "";
  }

  return parsed.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric"
    }
  );

}

/* =========================================================
   15. PRIORITY ICON
   ========================================================= */

function getPriorityIcon(
  priority
) {

  switch (
    String(priority || "")
      .toLowerCase()
  ) {

    case "urgent":
      return "🚨";

    case "high":
      return "⚠️";

    case "important":
      return "📢";

    default:
      return "🔔";

  }

}

/* =========================================================
   16. CREATE NOTIFICATION ITEM
   ========================================================= */

function createNotificationElement(
  notification
) {

  const item =
    document.createElement(
      "div"
    );

  const read =
    isNotificationRead(
      notification.id
    );

  item.className =
    `notification-item ${
      read ? "read" : "unread"
    }`;

  item.dataset.notificationId =
    notification.id;

  const safeTitle =
    escapeNotificationHTML(
      notification.title
    );

  const safeMessage =
    escapeNotificationHTML(
      notification.message
    );

  const safeCategory =
    escapeNotificationHTML(
      notification.category ||
      "General"
    );

  item.innerHTML = `

    <div class="notification-icon">
      ${getPriorityIcon(
        notification.priority
      )}
    </div>

    <div class="notification-content">

      <div class="notification-top">

        <strong>
          ${safeTitle}
        </strong>

        ${
          !read
            ? `
              <span class="notification-new">
                NEW
              </span>
            `
            : ""
        }

      </div>

      <p>
        ${safeMessage}
      </p>

      <div class="notification-meta">

        <span>
          ${safeCategory}
        </span>

        <span>
          ${formatNotificationDate(
            notification.date
          )}
        </span>

      </div>

      <div class="notification-actions">

        ${
          notification.link
            ? `
              <button
                type="button"
                class="notification-view-btn"
                data-notification-link="${escapeNotificationHTML(
                  notification.id
                )}"
              >
                View
              </button>
            `
            : ""
        }

        ${
          !read
            ? `
              <button
                type="button"
                class="notification-read-btn"
                data-notification-read="${escapeNotificationHTML(
                  notification.id
                )}"
              >
                Mark as read
              </button>
            `
            : ""
        }

      </div>

    </div>
  `;

  return item;
}

/* =========================================================
   17. RENDER NOTIFICATIONS
   ========================================================= */

function renderNotifications() {

  const containers =
    document.querySelectorAll(
      "#notificationList, .notification-list, [data-notification-list]"
    );

  if (!containers.length) return;

  const notifications =
    getActiveNotifications();

  containers.forEach(
    (container) => {

      container.innerHTML = "";

      if (!notifications.length) {

        container.innerHTML = `

          <div class="notifications-empty">

            <div class="notifications-empty-icon">
              🔔
            </div>

            <strong>
              No notifications
            </strong>

            <span>
              You're all caught up.
            </span>

          </div>

        `;

        return;

      }

      const fragment =
        document.createDocumentFragment();

      notifications.forEach(
        (notification) => {

          fragment.appendChild(
            createNotificationElement(
              notification
            )
          );

        }
      );

      container.appendChild(
        fragment
      );

    }
  );

  bindNotificationActions();

}

/* =========================================================
   18. OPEN NOTIFICATION PANEL
   ========================================================= */

function openNotificationPanel() {

  const panel =
    document.querySelector(
      "#notificationPanel, .notification-panel, [data-notification-panel]"
    );

  if (!panel) return;

  renderNotifications();

  panel.classList.add(
    "active"
  );

  panel.classList.add(
    "open"
  );

  A1_NOTIFICATION_STATE.isOpen =
    true;

}

/* =========================================================
   19. CLOSE NOTIFICATION PANEL
   ========================================================= */

function closeNotificationPanel() {

  const panel =
    document.querySelector(
      "#notificationPanel, .notification-panel, [data-notification-panel]"
    );

  if (!panel) return;

  panel.classList.remove(
    "active"
  );

  panel.classList.remove(
    "open"
  );

  A1_NOTIFICATION_STATE.isOpen =
    false;

}

/* =========================================================
   20. TOGGLE NOTIFICATION PANEL
   ========================================================= */

function toggleNotificationPanel() {

  if (
    A1_NOTIFICATION_STATE
      .isOpen
  ) {

    closeNotificationPanel();

  } else {

    openNotificationPanel();

  }

}

/* =========================================================
   21. NOTIFICATION ACTIONS
   ========================================================= */

function bindNotificationActions() {

  document
    .querySelectorAll(
      "[data-notification-read]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            const id =
              button.dataset
                .notificationRead;

            markNotificationAsRead(
              id
            );

            renderNotifications();

          }
        );

      }
    );

  document
    .querySelectorAll(
      "[data-notification-link]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            const id =
              button.dataset
                .notificationLink;

            const notification =
              A1_NOTIFICATION_STATE
                .notifications
                .find(
                  (item) =>
                    item.id === id
                );

            if (!notification) return;

            markNotificationAsRead(
              id
            );

            if (
              notification.link
            ) {

              window.location.href =
                notification.link;

            }

          }
        );

      }
    );

}

/* =========================================================
   22. INITIALIZE NOTIFICATION BUTTON
   ========================================================= */

function initNotificationButton() {

  const buttons =
    document.querySelectorAll(
      "#notificationButton, .notification-button, [data-notification-toggle]"
    );

  buttons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        (event) => {

          event.stopPropagation();

          toggleNotificationPanel();

        }
      );

    }
  );

}

/* =========================================================
   23. CLOSE ON OUTSIDE CLICK
   ========================================================= */

function initNotificationOutsideClick() {

  document.addEventListener(
    "click",
    (event) => {

      if (
        !A1_NOTIFICATION_STATE
          .isOpen
      ) {
        return;
      }

      const panel =
        event.target.closest(
          "#notificationPanel, .notification-panel, [data-notification-panel]"
        );

      const button =
        event.target.closest(
          "#notificationButton, .notification-button, [data-notification-toggle]"
        );

      if (!panel && !button) {

        closeNotificationPanel();

      }

    }
  );

}

/* =========================================================
   24. ADD NOTIFICATION
   ========================================================= */

function addA1Notification(
  data
) {

  if (
    !data ||
    !data.title
  ) {
    return null;
  }

  const notification = {

    id:
      data.id ||
      `notification-${Date.now()}`,

    title:
      data.title,

    message:
      data.message ||
      "",

    category:
      data.category ||
      "General",

    date:
      data.date ||
      new Date().toISOString(),

    priority:
      data.priority ||
      "normal",

    link:
      data.link ||
      "",

    active:
      data.active !== false

  };

  A1_NOTIFICATION_STATE
    .notifications
    .unshift(
      notification
    );

  A1_NOTIFICATION_STATE
    .notifications =
    A1_NOTIFICATION_STATE
      .notifications
      .slice(
        0,
        A1_NOTIFICATION_CONFIG
          .maxNotifications
      );

  saveA1Notifications();

  updateUnreadCount();

  renderNotifications();

  return notification;

}

/* =========================================================
   25. DELETE NOTIFICATION
   ========================================================= */

function deleteA1Notification(
  id
) {

  A1_NOTIFICATION_STATE
    .notifications =
    A1_NOTIFICATION_STATE
      .notifications
      .filter(
        (notification) =>
          notification.id !== id
      );

  saveA1Notifications();

  updateUnreadCount();

  renderNotifications();

}

/* =========================================================
   26. CLEAR ALL NOTIFICATIONS
   ========================================================= */

function clearA1Notifications() {

  A1_NOTIFICATION_STATE
    .notifications = [];

  saveA1Notifications();

  updateUnreadCount();

  renderNotifications();

}

/* =========================================================
   27. ESCAPE HTML
   ========================================================= */

function escapeNotificationHTML(
  value
) {

  return String(
    value ?? ""
  )
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}

/* =========================================================
   28. GLOBAL A1 NOTIFICATION API
   ========================================================= */

window.A1Notifications = {

  state:
    A1_NOTIFICATION_STATE,

  load:
    loadA1Notifications,

  save:
    saveA1Notifications,

  add:
    addA1Notification,

  delete:
    deleteA1Notification,

  clear:
    clearA1Notifications,

  markRead:
    markNotificationAsRead,

  markAllRead:
    markAllNotificationsAsRead,

  render:
    renderNotifications,

  open:
    openNotificationPanel,

  close:
    closeNotificationPanel,

  toggle:
    toggleNotificationPanel

};

/* =========================================================
   29. START SYSTEM
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadA1Notifications();

    renderNotifications();

    initNotificationButton();

    initNotificationOutsideClick();

    console.log(
      "A1 Computer — Notification system initialized."
    );

  }
);
