/* =========================================================
   A1 COMPUTER — TEMPORARY AI ASSISTANT SYSTEM
   ========================================================= */

"use strict";

/* =========================================================
   1. AI CONFIGURATION
   ========================================================= */

const A1_AI_CONFIG = {
  storageKey: "a1_ai_status",
  defaultStatus: "OFF",
  maxHistory: 50,
  typingDelay: 450
};

/* =========================================================
   2. AI STATE
   ========================================================= */

const A1_AI_STATE = {
  status: "OFF",
  isOpen: false,
  isTyping: false,
  history: []
};

/* =========================================================
   3. BASIC KNOWLEDGE BASE
   ========================================================= */

const A1_AI_KNOWLEDGE = [

  {
    keywords: [
      "aadhaar",
      "aadhar",
      "आधार"
    ],
    answer:
      "Aadhaar से संबंधित जानकारी और official service link A1 Computer के Documents section में उपलब्ध रहेगा।"
  },

  {
    keywords: [
      "pan",
      "पैन"
    ],
    answer:
      "PAN card से संबंधित जानकारी Documents section में मिलेगी। आवेदन के लिए official portal का उपयोग करें।"
  },

  {
    keywords: [
      "khasra",
      "खसरा"
    ],
    answer:
      "Khasra और land record से संबंधित जानकारी Land & Property section में उपलब्ध रहेगी।"
  },

  {
    keywords: [
      "scholarship",
      "छात्रवृत्ति",
      "स्कॉलरशिप"
    ],
    answer:
      "Scholarship की eligibility, documents और important dates देखने के लिए Student Hub और Schemes section देखें।"
  },

  {
    keywords: [
      "job",
      "jobs",
      "नौकरी",
      "जॉब"
    ],
    answer:
      "Latest government jobs, eligibility, age limit, syllabus और official links Jobs & Career section में मिलेंगे।"
  },

  {
    keywords: [
      "result",
      "रिजल्ट",
      "परिणाम"
    ],
    answer:
      "Exam result से संबंधित information Student Hub में उपलब्ध होगी। हमेशा result देखने के लिए official website का उपयोग करें।"
  },

  {
    keywords: [
      "admit",
      "admit card",
      "प्रवेश पत्र"
    ],
    answer:
      "Admit card की जानकारी Jobs, Student और Exam sections में उपलब्ध रहेगी।"
  },

  {
    keywords: [
      "railway",
      "train",
      "रेलवे",
      "ट्रेन"
    ],
    answer:
      "Railway और train-related services Travel section में उपलब्ध रहेंगी।"
  },

  {
    keywords: [
      "scheme",
      "schemes",
      "योजना",
      "योजनाएं"
    ],
    answer:
      "Government schemes की जानकारी Schemes section में category और eligibility के साथ उपलब्ध रहेगी।"
  },

  {
    keywords: [
      "certificate",
      "प्रमाण पत्र",
      "सर्टिफिकेट"
    ],
    answer:
      "Income, caste, domicile और अन्य certificates की जानकारी Government Services और Documents section में मिलेगी।"
  },

  {
    keywords: [
      "contact",
      "contact number",
      "संपर्क",
      "मोबाइल"
    ],
    answer:
      "A1 Computer, New Bus Stand, Ajaigarh से संपर्क करने के लिए 9993831755 पर कॉल कर सकते हैं।"
  }

];

/* =========================================================
   4. LOAD AI STATUS
   ========================================================= */

function loadA1AIStatus() {

  const saved =
    localStorage.getItem(
      A1_AI_CONFIG.storageKey
    );

  if (
    saved === "ON" ||
    saved === "OFF"
  ) {

    A1_AI_STATE.status =
      saved;

  } else {

    A1_AI_STATE.status =
      A1_AI_CONFIG.defaultStatus;

  }

  updateAIInterface();

  return A1_AI_STATE.status;
}

/* =========================================================
   5. SAVE AI STATUS
   ========================================================= */

function saveA1AIStatus() {

  localStorage.setItem(
    A1_AI_CONFIG.storageKey,
    A1_AI_STATE.status
  );

}

/* =========================================================
   6. SET AI STATUS
   ========================================================= */

function setA1AIStatus(
  status
) {

  const normalized =
    String(status)
      .toUpperCase();

  if (
    normalized !== "ON" &&
    normalized !== "OFF"
  ) {
    return false;
  }

  A1_AI_STATE.status =
    normalized;

  saveA1AIStatus();

  updateAIInterface();

  document.dispatchEvent(
    new CustomEvent(
      "a1AIStatusChanged",
      {
        detail: {
          status: normalized
        }
      }
    )
  );

  return true;
}

/* =========================================================
   7. TOGGLE AI
   ========================================================= */

function toggleA1AI() {

  const nextStatus =
    A1_AI_STATE.status === "ON"
      ? "OFF"
      : "ON";

  setA1AIStatus(
    nextStatus
  );

}

/* =========================================================
   8. CHECK AI STATUS
   ========================================================= */

function isA1AIEnabled() {

  return (
    A1_AI_STATE.status ===
    "ON"
  );

}

/* =========================================================
   9. UPDATE AI INTERFACE
   ========================================================= */

function updateAIInterface() {

  const enabled =
    isA1AIEnabled();

  /* AI buttons */

  document
    .querySelectorAll(
      "[data-ai-button], #aiButton, .ai-button"
    )
    .forEach((button) => {

      button.classList.toggle(
        "active",
        enabled
      );

      button.setAttribute(
        "aria-hidden",
        String(!enabled)
      );

      if (!enabled) {

        button.style.display =
          "none";

      } else {

        button.style.display =
          "";

      }

    });

  /* AI panels */

  document
    .querySelectorAll(
      "[data-ai-panel], #aiPanel, .ai-panel"
    )
    .forEach((panel) => {

      panel.classList.toggle(
        "disabled",
        !enabled
      );

      if (!enabled) {

        panel.style.display =
          "none";

      } else if (
        A1_AI_STATE.isOpen
      ) {

        panel.style.display =
          "";

      }

    });

  /* Admin controls */

  document
    .querySelectorAll(
      "[data-ai-status]"
    )
    .forEach((element) => {

      element.textContent =
        A1_AI_STATE.status;

      element.classList.toggle(
        "ai-on",
        enabled
      );

      element.classList.toggle(
        "ai-off",
        !enabled
      );

    });

  document
    .querySelectorAll(
      "[data-ai-toggle]"
    )
    .forEach((button) => {

      button.textContent =
        enabled
          ? "AI ON"
          : "AI OFF";

      button.classList.toggle(
        "active",
        enabled
      );

    });

}

/* =========================================================
   10. OPEN AI PANEL
   ========================================================= */

function openA1AI() {

  if (!isA1AIEnabled()) {
    return;
  }

  const panel =
    document.querySelector(
      "[data-ai-panel], #aiPanel, .ai-panel"
    );

  if (!panel) {
    return;
  }

  panel.style.display =
    "";

  panel.classList.add(
    "active"
  );

  panel.classList.add(
    "open"
  );

  A1_AI_STATE.isOpen =
    true;

  focusAIInput();

}

/* =========================================================
   11. CLOSE AI PANEL
   ========================================================= */

function closeA1AI() {

  const panel =
    document.querySelector(
      "[data-ai-panel], #aiPanel, .ai-panel"
    );

  if (!panel) {
    return;
  }

  panel.classList.remove(
    "active"
  );

  panel.classList.remove(
    "open"
  );

  A1_AI_STATE.isOpen =
    false;

}

/* =========================================================
   12. TOGGLE AI PANEL
   ========================================================= */

function toggleA1AIPanel() {

  if (!isA1AIEnabled()) {
    return;
  }

  if (
    A1_AI_STATE.isOpen
  ) {

    closeA1AI();

  } else {

    openA1AI();

  }

}

/* =========================================================
   13. FOCUS AI INPUT
   ========================================================= */

function focusAIInput() {

  const input =
    document.querySelector(
      "[data-ai-input], #aiInput, .ai-input"
    );

  if (input) {

    setTimeout(
      () => input.focus(),
      100
    );

  }

}

/* =========================================================
   14. NORMALIZE QUESTION
   ========================================================= */

function normalizeAIText(
  text
) {

  return String(text || "")
    .toLowerCase()
    .trim()
    .normalize(
      "NFD"
    )
    .replace(
      /[\u0300-\u036f]/g,
      ""
    );

}

/* =========================================================
   15. FIND KNOWLEDGE ANSWER
   ========================================================= */

function findKnowledgeAnswer(
  question
) {

  const normalized =
    normalizeAIText(
      question
    );

  if (!normalized) {
    return null;
  }

  let bestMatch = null;
  let bestScore = 0;

  A1_AI_KNOWLEDGE
    .forEach((item) => {

      let score = 0;

      item.keywords
        .forEach((keyword) => {

          const normalizedKeyword =
            normalizeAIText(
              keyword
            );

          if (
            normalized.includes(
              normalizedKeyword
            )
          ) {

            score +=
              normalizedKeyword.length;

          }

        });

      if (
        score > bestScore
      ) {

        bestScore =
          score;

        bestMatch =
          item;

      }

    });

  return bestMatch
    ? bestMatch.answer
    : null;

}

/* =========================================================
   16. DEFAULT ANSWER
   ========================================================= */

function getDefaultAIAnswer(
  question
) {

  const normalized =
    normalizeAIText(
      question
    );

  if (
    normalized.includes(
      "hello"
    ) ||
    normalized.includes(
      "hi"
    ) ||
    normalized.includes(
      "namaste"
    ) ||
    normalized.includes(
      "नमस्ते"
    )
  ) {

    return "नमस्ते! 👋 मैं A1 Computer Assistant हूँ। आप services, jobs, scholarship, documents, land records या government services के बारे में पूछ सकते हैं।";

  }

  return "अभी मैं A1 Computer की basic information और available services के बारे में सहायता कर सकता हूँ। अपना सवाल थोड़ा अलग तरीके से पूछें या संबंधित service section खोलें।";

}

/* =========================================================
   17. GET AI RESPONSE
   ========================================================= */

function getA1AIResponse(
  question
) {

  const knowledgeAnswer =
    findKnowledgeAnswer(
      question
    );

  if (knowledgeAnswer) {
    return knowledgeAnswer;
  }

  return getDefaultAIAnswer(
    question
  );

}

/* =========================================================
   18. ADD MESSAGE
   ========================================================= */

function addAIMessage(
  role,
  message
) {

  const entry = {

    id:
      `ai-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,

    role,

    message,

    time:
      new Date().toISOString()

  };

  A1_AI_STATE.history.push(
    entry
  );

  if (
    A1_AI_STATE.history.length >
    A1_AI_CONFIG.maxHistory
  ) {

    A1_AI_STATE.history =
      A1_AI_STATE.history.slice(
        -A1_AI_CONFIG.maxHistory
      );

  }

  return entry;

}

/* =========================================================
   19. RENDER MESSAGE
   ========================================================= */

function renderAIMessage(
  role,
  message
) {

  const container =
    document.querySelector(
      "[data-ai-messages], #aiMessages, .ai-messages"
    );

  if (!container) {
    return;
  }

  const element =
    document.createElement(
      "div"
    );

  element.className =
    `ai-message ai-message-${role}`;

  element.innerHTML = `

    <div class="ai-message-avatar">
      ${
        role === "user"
          ? "👤"
          : "🤖"
      }
    </div>

    <div class="ai-message-bubble">
      ${escapeAIHTML(message)}
    </div>

  `;

  container.appendChild(
    element
  );

  container.scrollTop =
    container.scrollHeight;

}

/* =========================================================
   20. TYPING INDICATOR
   ========================================================= */

function showAITyping() {

  const container =
    document.querySelector(
      "[data-ai-messages], #aiMessages, .ai-messages"
    );

  if (!container) {
    return;
  }

  if (
    document.querySelector(
      ".ai-typing"
    )
  ) {
    return;
  }

  const typing =
    document.createElement(
      "div"
    );

  typing.className =
    "ai-typing";

  typing.innerHTML = `

    <span>🤖</span>

    <div class="ai-typing-dots">
      <i></i>
      <i></i>
      <i></i>
    </div>

  `;

  container.appendChild(
    typing
  );

  container.scrollTop =
    container.scrollHeight;

  A1_AI_STATE.isTyping =
    true;

}

/* =========================================================
   21. HIDE TYPING INDICATOR
   ========================================================= */

function hideAITyping() {

  document
    .querySelectorAll(
      ".ai-typing"
    )
    .forEach(
      (element) =>
        element.remove()
    );

  A1_AI_STATE.isTyping =
    false;

}

/* =========================================================
   22. ASK AI
   ========================================================= */

async function askA1AI(
  question
) {

  if (!isA1AIEnabled()) {
    return;
  }

  const cleanQuestion =
    String(
      question || ""
    ).trim();

  if (!cleanQuestion) {
    return;
  }

  addAIMessage(
    "user",
    cleanQuestion
  );

  renderAIMessage(
    "user",
    cleanQuestion
  );

  showAITyping();

  await new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        A1_AI_CONFIG
          .typingDelay
      )
  );

  const answer =
    getA1AIResponse(
      cleanQuestion
    );

  hideAITyping();

  addAIMessage(
    "assistant",
    answer
  );

  renderAIMessage(
    "assistant",
    answer
  );

}

/* =========================================================
   23. CLEAR AI CHAT
   ========================================================= */

function clearA1AIChat() {

  A1_AI_STATE.history =
    [];

  const container =
    document.querySelector(
      "[data-ai-messages], #aiMessages, .ai-messages"
    );

  if (container) {

    container.innerHTML = "";

  }

}

/* =========================================================
   24. SEND BUTTON
   ========================================================= */

function initAISendButton() {

  const buttons =
    document.querySelectorAll(
      "[data-ai-send], #aiSend, .ai-send"
    );

  buttons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const input =
            document.querySelector(
              "[data-ai-input], #aiInput, .ai-input"
            );

          if (!input) {
            return;
          }

          const question =
            input.value.trim();

          if (!question) {
            return;
          }

          input.value = "";

          askA1AI(
            question
          );

        }
      );

    }
  );

}

/* =========================================================
   25. ENTER KEY
   ========================================================= */

function initAIInput() {

  const inputs =
    document.querySelectorAll(
      "[data-ai-input], #aiInput, .ai-input"
    );

  inputs.forEach(
    (input) => {

      input.addEventListener(
        "keydown",
        (event) => {

          if (
            event.key ===
              "Enter" &&
            !event.shiftKey
          ) {

            event.preventDefault();

            const question =
              input.value.trim();

            if (!question) {
              return;
            }

            input.value = "";

            askA1AI(
              question
            );

          }

        }
      );

    }
  );

}

/* =========================================================
   26. AI OPEN BUTTON
   ========================================================= */

function initAIOpenButtons() {

  document
    .querySelectorAll(
      "[data-ai-button], #aiButton, .ai-button"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          (event) => {

            event.preventDefault();

            openA1AI();

          }
        );

      }
    );

}

/* =========================================================
   27. AI CLOSE BUTTON
   ========================================================= */

function initAICloseButtons() {

  document
    .querySelectorAll(
      "[data-ai-close], #aiClose, .ai-close"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            closeA1AI();

          }
        );

      }
    );

}

/* =========================================================
   28. ADMIN AI TOGGLE
   ========================================================= */

function initAIToggleButtons() {

  document
    .querySelectorAll(
      "[data-ai-toggle]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            toggleA1AI();

          }
        );

      }
    );

}

/* =========================================================
   29. ESCAPE HTML
   ========================================================= */

function escapeAIHTML(
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
   30. GLOBAL A1 AI API
   ========================================================= */

window.A1AI = {

  state:
    A1_AI_STATE,

  knowledge:
    A1_AI_KNOWLEDGE,

  enable() {
    setA1AIStatus("ON");
  },

  disable() {
    setA1AIStatus("OFF");
  },

  toggle:
    toggleA1AI,

  isEnabled:
    isA1AIEnabled,

  open:
    openA1AI,

  close:
    closeA1AI,

  ask:
    askA1AI,

  clear:
    clearA1AIChat,

  getAnswer:
    getA1AIResponse

};

/* =========================================================
   31. INITIALIZE
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadA1AIStatus();

    initAISendButton();

    initAIInput();

    initAIOpenButtons();

    initAICloseButtons();

    initAIToggleButtons();

    console.log(
      "A1 Computer — AI module initialized."
    );

  }
);
