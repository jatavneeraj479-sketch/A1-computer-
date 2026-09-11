/* =========================================================
   A1 COMPUTER — UNIVERSAL SEARCH SYSTEM
   ========================================================= */

"use strict";

/* =========================================================
   1. SEARCH CONFIG
   ========================================================= */

const A1_SEARCH_CONFIG = {
  minCharacters: 1,
  maxResults: 30,
  debounceTime: 180
};

/* =========================================================
   2. SEARCH STATE
   ========================================================= */

const A1_SEARCH_STATE = {
  query: "",
  results: [],
  isOpen: false
};

/* =========================================================
   3. SEARCH INPUTS
   ========================================================= */

function getSearchInputs() {
  return document.querySelectorAll(
    "#searchInput, #globalSearch, .search-input, [data-global-search]"
  );
}

/* =========================================================
   4. SEARCH RESULT CONTAINER
   ========================================================= */

function getSearchContainer() {
  return document.querySelector(
    "#searchResults, #globalSearchResults, .search-results, [data-search-results]"
  );
}

/* =========================================================
   5. BUILD SEARCH DATABASE
   ========================================================= */

function buildSearchDatabase() {

  const database = [];

  /* Services */

  if (
    Array.isArray(window.A1Services?.data)
  ) {

    window.A1Services.data.forEach(
      (service) => {

        database.push({
          id: service.id,
          title: service.title,
          description: service.description,
          category: service.category,
          icon: service.icon || "📌",
          keywords: service.keywords || "",
          type: "service",
          url:
            `service.html?id=${encodeURIComponent(service.id)}`
        });

      }
    );

  }

  /* Static page links */

  document
    .querySelectorAll(
      "a[data-search-item]"
    )
    .forEach((link, index) => {

      const title =
        link.dataset.searchTitle ||
        link.textContent.trim();

      if (!title) return;

      database.push({
        id:
          link.dataset.searchId ||
          `page-${index}`,

        title,

        description:
          link.dataset.searchDescription ||
          "",

        category:
          link.dataset.searchCategory ||
          "page",

        icon:
          link.dataset.searchIcon ||
          "📄",

        keywords:
          link.dataset.searchKeywords ||
          "",

        type: "page",

        url:
          link.getAttribute("href") ||
          "#"
      });

    });

  return database;
}

/* =========================================================
   6. NORMALIZE TEXT
   ========================================================= */

function normalizeSearchText(value) {

  return String(value || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    );
}

/* =========================================================
   7. SEARCH SCORING
   ========================================================= */

function calculateSearchScore(
  item,
  query
) {

  const q =
    normalizeSearchText(query);

  const title =
    normalizeSearchText(
      item.title
    );

  const description =
    normalizeSearchText(
      item.description
    );

  const category =
    normalizeSearchText(
      item.category
    );

  const keywords =
    normalizeSearchText(
      item.keywords
    );

  let score = 0;

  /* Exact title */

  if (title === q) {
    score += 100;
  }

  /* Title starts with query */

  if (title.startsWith(q)) {
    score += 70;
  }

  /* Title contains query */

  if (title.includes(q)) {
    score += 50;
  }

  /* Keyword match */

  if (keywords.includes(q)) {
    score += 35;
  }

  /* Description */

  if (description.includes(q)) {
    score += 20;
  }

  /* Category */

  if (category.includes(q)) {
    score += 15;
  }

  /* Individual words */

  const words =
    q.split(/\s+/)
      .filter(Boolean);

  words.forEach((word) => {

    if (title.includes(word)) {
      score += 12;
    }

    if (keywords.includes(word)) {
      score += 8;
    }

    if (description.includes(word)) {
      score += 5;
    }

  });

  return score;
}

/* =========================================================
   8. PERFORM SEARCH
   ========================================================= */

function performUniversalSearch(
  query
) {

  const normalized =
    normalizeSearchText(query);

  A1_SEARCH_STATE.query =
    normalized;

  if (
    normalized.length <
    A1_SEARCH_CONFIG.minCharacters
  ) {

    A1_SEARCH_STATE.results = [];

    return [];

  }

  const database =
    buildSearchDatabase();

  const results =
    database
      .map((item) => ({
        ...item,
        score:
          calculateSearchScore(
            item,
            normalized
          )
      }))
      .filter(
        (item) =>
          item.score > 0
      )
      .sort(
        (a, b) =>
          b.score - a.score
      )
      .slice(
        0,
        A1_SEARCH_CONFIG.maxResults
      );

  A1_SEARCH_STATE.results =
    results;

  return results;
}

/* =========================================================
   9. RESULT HTML
   ========================================================= */

function createSearchResult(item) {

  const wrapper =
    document.createElement("div");

  wrapper.className =
    "search-result-item";

  wrapper.dataset.searchResult =
    item.id;

  wrapper.innerHTML = `
    <button
      type="button"
      class="search-result-button"
      data-search-open="${escapeSearchHTML(item.id)}"
    >

      <span class="search-result-icon">
        ${item.icon}
      </span>

      <span class="search-result-content">

        <strong>
          ${escapeSearchHTML(item.title)}
        </strong>

        <small>
          ${escapeSearchHTML(
            item.description ||
            item.category ||
            ""
          )}
        </small>

      </span>

      <span class="search-result-arrow">
        →
      </span>

    </button>
  `;

  return wrapper;
}

/* =========================================================
   10. RENDER RESULTS
   ========================================================= */

function renderSearchResults(
  results
) {

  const container =
    getSearchContainer();

  if (!container) return;

  container.innerHTML = "";

  if (!results.length) {

    container.innerHTML = `
      <div class="search-no-results">

        <div class="search-no-results-icon">
          🔎
        </div>

        <strong>
          No results found
        </strong>

        <span>
          Try another keyword.
        </span>

      </div>
    `;

    openSearchResults();

    return;
  }

  const fragment =
    document.createDocumentFragment();

  results.forEach((item) => {

    fragment.appendChild(
      createSearchResult(item)
    );

  });

  container.appendChild(
    fragment
  );

  bindSearchResultButtons();

  openSearchResults();
}

/* =========================================================
   11. OPEN SEARCH RESULTS
   ========================================================= */

function openSearchResults() {

  const container =
    getSearchContainer();

  if (!container) return;

  container.classList.add(
    "active"
  );

  container.classList.add(
    "open"
  );

  A1_SEARCH_STATE.isOpen =
    true;
}

/* =========================================================
   12. CLOSE SEARCH RESULTS
   ========================================================= */

function closeSearchResults() {

  const container =
    getSearchContainer();

  if (!container) return;

  container.classList.remove(
    "active"
  );

  container.classList.remove(
    "open"
  );

  A1_SEARCH_STATE.isOpen =
    false;
}

/* =========================================================
   13. RESULT BUTTON EVENTS
   ========================================================= */

function bindSearchResultButtons() {

  document
    .querySelectorAll(
      "[data-search-open]"
    )
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const id =
            button.dataset.searchOpen;

          const item =
            A1_SEARCH_STATE.results
              .find(
                (result) =>
                  result.id === id
              );

          if (!item) return;

          closeSearchResults();

          if (
            item.type ===
            "service" &&
            window.A1ServiceSystem
          ) {

            window.A1ServiceSystem.open(
              item.id
            );

            return;
          }

          if (item.url) {

            window.location.href =
              item.url;

          }

        }
      );

    });
}

/* =========================================================
   14. INPUT HANDLER
   ========================================================= */

let searchTimer = null;

function handleSearchInput(
  input
) {

  clearTimeout(
    searchTimer
  );

  searchTimer =
    setTimeout(() => {

      const query =
        input.value;

      if (
        !normalizeSearchText(
          query
        )
      ) {

        closeSearchResults();

        return;

      }

      const results =
        performUniversalSearch(
          query
        );

      renderSearchResults(
        results
      );

    },
    A1_SEARCH_CONFIG.debounceTime
  );
}

/* =========================================================
   15. INITIALIZE SEARCH
   ========================================================= */

function initUniversalSearch() {

  const inputs =
    getSearchInputs();

  if (!inputs.length) return;

  inputs.forEach((input) => {

    input.addEventListener(
      "input",
      () => {
        handleSearchInput(
          input
        );
      }
    );

    input.addEventListener(
      "focus",
      () => {

        if (
          input.value.trim()
        ) {

          const results =
            performUniversalSearch(
              input.value
            );

          renderSearchResults(
            results
          );

        }

      }
    );

    input.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key ===
          "Escape"
        ) {

          closeSearchResults();

          input.blur();

        }

      }
    );

  });

  document.addEventListener(
    "click",
    (event) => {

      const searchArea =
        event.target.closest(
          ".search-wrapper, .global-search, [data-search-area]"
        );

      if (!searchArea) {
        closeSearchResults();
      }

    }
  );

}

/* =========================================================
   16. CLEAR SEARCH
   ========================================================= */

function clearUniversalSearch() {

  getSearchInputs()
    .forEach((input) => {
      input.value = "";
    });

  A1_SEARCH_STATE.query =
    "";

  A1_SEARCH_STATE.results =
    [];

  closeSearchResults();
}

/* =========================================================
   17. SEARCH CATEGORY
   ========================================================= */

function searchByCategory(
  category
) {

  const database =
    buildSearchDatabase();

  const normalizedCategory =
    normalizeSearchText(
      category
    );

  return database.filter(
    (item) =>
      normalizeSearchText(
        item.category
      ).includes(
        normalizedCategory
      )
  );
}

/* =========================================================
   18. ESCAPE HTML
   ========================================================= */

function escapeSearchHTML(
  value
) {

  return String(value)
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
   19. GLOBAL SEARCH API
   ========================================================= */

window.A1Search = {

  search:
    performUniversalSearch,

  render:
    renderSearchResults,

  clear:
    clearUniversalSearch,

  close:
    closeSearchResults,

  open:
    openSearchResults,

  category:
    searchByCategory,

  state:
    A1_SEARCH_STATE

};

/* =========================================================
   20. START
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initUniversalSearch();

    console.log(
      "A1 Computer — Universal Search initialized."
    );

  }
);
