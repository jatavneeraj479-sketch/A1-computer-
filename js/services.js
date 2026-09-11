/* =========================================================
   A1 COMPUTER — SERVICES CONTROLLER
   Public Services / Categories / Details
   ========================================================= */

"use strict";

/* =========================================================
   1. SERVICE DATA
   ========================================================= */

const A1_SERVICES = [

  {
    id: "aadhaar",
    title: "Aadhaar Services",
    category: "documents",
    icon: "🪪",
    description: "Aadhaar related information and services.",
    keywords: "aadhaar aadhar uidai update correction",
    info: {
      eligibility: "Service requirement depends on the selected Aadhaar service.",
      documents: "Valid identity and supporting documents as required.",
      process: "Select the required service and follow the official process.",
      fee: "Applicable fee depends on the official service.",
      official: "https://uidai.gov.in/"
    }
  },

  {
    id: "pan",
    title: "PAN Card",
    category: "documents",
    icon: "💳",
    description: "PAN application, correction and related information.",
    keywords: "pan card income tax pan application correction",
    info: {
      eligibility: "Applicants must meet the applicable PAN requirements.",
      documents: "Identity, address and date-of-birth proof as applicable.",
      process: "Complete the official PAN application process.",
      fee: "As applicable on the official portal.",
      official: "https://www.incometax.gov.in/"
    }
  },

  {
    id: "voter",
    title: "Voter ID",
    category: "documents",
    icon: "🗳️",
    description: "Voter registration and voter service information.",
    keywords: "voter id election epic registration",
    info: {
      eligibility: "Eligibility depends on applicable election rules.",
      documents: "Required identity and address proof.",
      process: "Use the official election services portal.",
      fee: "Depends on the selected service.",
      official: "https://voters.eci.gov.in/"
    }
  },

  {
    id: "driving-license",
    title: "Driving Licence",
    category: "documents",
    icon: "🚗",
    description: "Driving licence application and service information.",
    keywords: "dl driving licence license learner permanent",
    info: {
      eligibility: "As prescribed by transport authorities.",
      documents: "Identity, address and other required documents.",
      process: "Apply through the official transport portal.",
      fee: "As applicable.",
      official: "https://parivahan.gov.in/"
    }
  },

  {
    id: "passport",
    title: "Passport",
    category: "documents",
    icon: "🛂",
    description: "Passport application and appointment information.",
    keywords: "passport seva appointment renewal",
    info: {
      eligibility: "As per Passport Seva requirements.",
      documents: "Documents depend on the application type.",
      process: "Apply through the official Passport Seva portal.",
      fee: "As displayed on the official portal.",
      official: "https://www.passportindia.gov.in/"
    }
  },

  {
    id: "mp-online",
    title: "MPOnline",
    category: "government",
    icon: "🏛️",
    description: "Information and access to MPOnline services.",
    keywords: "mponline madhya pradesh online services",
    info: {
      eligibility: "Depends on the selected service.",
      documents: "Depends on the application.",
      process: "Open the official portal and select the required service.",
      fee: "Service specific.",
      official: "https://www.mponline.gov.in/"
    }
  },

  {
    id: "samagra",
    title: "Samagra",
    category: "government",
    icon: "👨‍👩‍👧",
    description: "Samagra related information and services.",
    keywords: "samagra id samagra portal mp",
    info: {
      eligibility: "Depends on the selected Samagra service.",
      documents: "Required documents depend on the service.",
      process: "Use the official Madhya Pradesh Samagra portal.",
      fee: "As applicable.",
      official: "https://samagra.gov.in/"
    }
  },

  {
    id: "income-certificate",
    title: "Income Certificate",
    category: "government",
    icon: "📄",
    description: "Income certificate application information.",
    keywords: "income certificate aay praman patra mp",
    info: {
      eligibility: "As per applicable state rules.",
      documents: "Identity, address and income-related supporting documents.",
      process: "Apply through the applicable official government service.",
      fee: "As applicable.",
      official: "https://www.mponline.gov.in/"
    }
  },

  {
    id: "caste-certificate",
    title: "Caste Certificate",
    category: "government",
    icon: "📜",
    description: "Caste certificate service information.",
    keywords: "caste certificate jati praman patra mp",
    info: {
      eligibility: "As per applicable government rules.",
      documents: "Required caste, identity and supporting documents.",
      process: "Use the applicable official government service.",
      fee: "As applicable.",
      official: "https://www.mponline.gov.in/"
    }
  },

  {
    id: "domicile",
    title: "Residence / Domicile",
    category: "government",
    icon: "🏠",
    description: "Residence and domicile certificate information.",
    keywords: "domicile residence niwas praman patra mp",
    info: {
      eligibility: "As prescribed by the relevant authority.",
      documents: "Identity and residence proof.",
      process: "Apply through the applicable official portal.",
      fee: "As applicable.",
      official: "https://www.mponline.gov.in/"
    }
  },

  {
    id: "khasra",
    title: "Khasra / Land Record",
    category: "land",
    icon: "🗺️",
    description: "Land record and Khasra information.",
    keywords: "khasra land record bhulekh mp",
    info: {
      eligibility: "Land-record access depends on the available public service.",
      documents: "Khasra number or other required land details.",
      process: "Search using the official land-record system.",
      fee: "Depends on the requested service.",
      official: "https://mpbhulekh.gov.in/"
    }
  },

  {
    id: "b1",
    title: "B-1 / Khatauni",
    category: "land",
    icon: "📑",
    description: "B-1 and land ownership record information.",
    keywords: "b1 khatauni land record mp",
    info: {
      eligibility: "Depends on the land-record service.",
      documents: "Relevant land details.",
      process: "Use the official land-record portal.",
      fee: "As applicable.",
      official: "https://mpbhulekh.gov.in/"
    }
  },

  {
    id: "naksha",
    title: "Land Map / Naksha",
    category: "land",
    icon: "📍",
    description: "Land map and parcel information.",
    keywords: "naksha bhu naksha land map mp",
    info: {
      eligibility: "Depends on the available land-record service.",
      documents: "Relevant location or land details.",
      process: "Search using the official land information system.",
      fee: "As applicable.",
      official: "https://mpbhulekh.gov.in/"
    }
  },

  {
    id: "mutation",
    title: "Namantaran / Mutation",
    category: "land",
    icon: "🔄",
    description: "Land mutation and transfer information.",
    keywords: "mutation namantaran land transfer mp",
    info: {
      eligibility: "As per applicable land rules.",
      documents: "Relevant ownership and supporting documents.",
      process: "Follow the official mutation process.",
      fee: "As applicable.",
      official: "https://mpbhulekh.gov.in/"
    }
  },

  {
    id: "jee",
    title: "JEE",
    category: "student",
    icon: "🎓",
    description: "JEE exam information, updates and resources.",
    keywords: "jee mains advanced engineering entrance exam",
    info: {
      eligibility: "Refer to the current official examination rules.",
      documents: "As required in the current application notification.",
      process: "Check the official examination portal.",
      fee: "As announced officially.",
      official: "https://jeemain.nta.nic.in/"
    }
  },

  {
    id: "neet",
    title: "NEET",
    category: "student",
    icon: "🩺",
    description: "NEET examination information and resources.",
    keywords: "neet medical entrance nta exam",
    info: {
      eligibility: "Refer to the current official notification.",
      documents: "As required by the current application process.",
      process: "Check the official NTA examination portal.",
      fee: "As announced officially.",
      official: "https://neet.nta.nic.in/"
    }
  },

  {
    id: "cuet",
    title: "CUET",
    category: "student",
    icon: "📚",
    description: "CUET admission and examination information.",
    keywords: "cuet ug pg university entrance nta",
    info: {
      eligibility: "Refer to the current official notification.",
      documents: "As required by the application.",
      process: "Use the official CUET portal.",
      fee: "As announced officially.",
      official: "https://cuet.nta.nic.in/"
    }
  },

  {
    id: "scholarship",
    title: "Scholarship",
    category: "student",
    icon: "🏆",
    description: "Scholarship information and application guidance.",
    keywords: "scholarship student education scholarship form",
    info: {
      eligibility: "Depends on the individual scholarship.",
      documents: "Usually academic, identity and bank-related documents as applicable.",
      process: "Check the official scholarship notification.",
      fee: "Usually scholarship-specific.",
      official: "https://scholarships.gov.in/"
    }
  },

  {
    id: "jobs",
    title: "Government Jobs",
    category: "jobs",
    icon: "💼",
    description: "Government job information and application guidance.",
    keywords: "government job vacancy sarkari naukri recruitment",
    info: {
      eligibility: "Depends on the recruitment notification.",
      documents: "As listed in the official notification.",
      process: "Apply only through the official recruitment portal.",
      fee: "Recruitment-specific.",
      official: "https://www.ssc.gov.in/"
    }
  },

  {
    id: "ssc",
    title: "SSC",
    category: "jobs",
    icon: "📝",
    description: "SSC examination and recruitment information.",
    keywords: "ssc cgl chsl mts government exam",
    info: {
      eligibility: "Depends on the individual SSC examination.",
      documents: "As required in the official notification.",
      process: "Use the official SSC website.",
      fee: "As announced officially.",
      official: "https://www.ssc.gov.in/"
    }
  },

  {
    id: "upsc",
    title: "UPSC",
    category: "jobs",
    icon: "🏛️",
    description: "UPSC examination and recruitment information.",
    keywords: "upsc civil services government exam ias",
    info: {
      eligibility: "Depends on the current UPSC notification.",
      documents: "As required by the official application.",
      process: "Apply through the official UPSC website.",
      fee: "As announced officially.",
      official: "https://upsc.gov.in/"
    }
  },

  {
    id: "railway",
    title: "Railway Jobs",
    category: "jobs",
    icon: "🚆",
    description: "Railway recruitment and examination information.",
    keywords: "railway rrb recruitment government job",
    info: {
      eligibility: "Depends on the specific RRB recruitment.",
      documents: "As required by the official notification.",
      process: "Use the official RRB recruitment portal.",
      fee: "Recruitment-specific.",
      official: "https://www.rrbapply.gov.in/"
    }
  },

  {
    id: "railway-ticket",
    title: "Railway Information",
    category: "travel",
    icon: "🚉",
    description: "Railway and ticket-related information.",
    keywords: "train railway ticket irctc pnr",
    info: {
      eligibility: "Depends on the selected railway service.",
      documents: "Usually booking details or passenger information.",
      process: "Use the official railway service.",
      fee: "Service-specific.",
      official: "https://www.irctc.co.in/"
    }
  },

  {
    id: "pnr",
    title: "PNR Status",
    category: "travel",
    icon: "🎫",
    description: "Quick access to railway PNR information.",
    keywords: "pnr status train ticket",
    info: {
      eligibility: "Requires a valid PNR.",
      documents: "PNR number.",
      process: "Check the current official railway service.",
      fee: "No fee for checking status through official services.",
      official: "https://www.irctc.co.in/"
    }
  },

  {
    id: "ayushman",
    title: "Ayushman Card",
    category: "citizen",
    icon: "💚",
    description: "Ayushman Bharat information and services.",
    keywords: "ayushman card health pmjay",
    info: {
      eligibility: "Depends on the applicable scheme eligibility.",
      documents: "Required identity and scheme-related documents.",
      process: "Use the official Ayushman Bharat portal.",
      fee: "As applicable.",
      official: "https://pmjay.gov.in/"
    }
  },

  {
    id: "eshram",
    title: "e-Shram",
    category: "citizen",
    icon: "👷",
    description: "e-Shram registration and information.",
    keywords: "eshram labour worker card",
    info: {
      eligibility: "Depends on e-Shram eligibility rules.",
      documents: "As required by the official registration process.",
      process: "Use the official e-Shram portal.",
      fee: "Official registration information applies.",
      official: "https://eshram.gov.in/"
    }
  },

  {
    id: "pension",
    title: "Pension Services",
    category: "schemes",
    icon: "💰",
    description: "Pension scheme information and guidance.",
    keywords: "pension old age widow disability government scheme",
    info: {
      eligibility: "Depends on the individual pension scheme.",
      documents: "Scheme-specific documents.",
      process: "Check the official government scheme details.",
      fee: "Depends on the service.",
      official: "https://www.myscheme.gov.in/"
    }
  },

  {
    id: "government-schemes",
    title: "Government Schemes",
    category: "schemes",
    icon: "🏅",
    description: "Explore government schemes and eligibility information.",
    keywords: "government scheme yojana benefits subsidy",
    info: {
      eligibility: "Every scheme has different eligibility criteria.",
      documents: "Scheme-specific.",
      process: "Check the official scheme information before applying.",
      fee: "Depends on the service.",
      official: "https://www.myscheme.gov.in/"
    }
  },

  {
    id: "cyber-crime",
    title: "Cyber Crime Help",
    category: "citizen",
    icon: "🛡️",
    description: "Cyber crime reporting information.",
    keywords: "cyber crime online fraud complaint 1930",
    info: {
      eligibility: "Anyone affected by a cyber incident can use the official reporting system.",
      documents: "Keep relevant transaction and incident details ready.",
      process: "Use the official cyber crime reporting system.",
      fee: "Official reporting is subject to the government service rules.",
      official: "https://cybercrime.gov.in/"
    }
  },

  {
    id: "emergency",
    title: "Emergency Services",
    category: "citizen",
    icon: "🚨",
    description: "Important emergency contact information.",
    keywords: "emergency police ambulance fire help",
    info: {
      eligibility: "Emergency services are for urgent situations.",
      documents: "Not normally required for immediate emergency assistance.",
      process: "Contact the appropriate emergency service immediately.",
      fee: "Depends on the service.",
      official: "https://112.gov.in/"
    }
  }

];

/* =========================================================
   2. CATEGORY NAMES
   ========================================================= */

const A1_SERVICE_CATEGORIES = {
  all: "All Services",
  student: "Student",
  government: "Government",
  land: "Land & Property",
  documents: "Documents",
  jobs: "Jobs & Career",
  schemes: "Schemes",
  travel: "Travel",
  citizen: "Citizen Help"
};

/* =========================================================
   3. GET SERVICES
   ========================================================= */

function getA1Services() {
  return [...A1_SERVICES];
}

window.A1Services = {
  data: A1_SERVICES,
  categories: A1_SERVICE_CATEGORIES,
  getAll: getA1Services
};

/* =========================================================
   4. SERVICE CARD
   ========================================================= */

function createServiceCard(service) {

  const card =
    document.createElement("article");

  card.className =
    "service-card";

  card.dataset.serviceId =
    service.id;

  card.dataset.category =
    service.category;

  card.dataset.search =
    `${service.title} ${service.description} ${service.keywords}`;

  card.innerHTML = `
    <button
      class="service-card-button"
      type="button"
      data-service-id="${escapeHTML(service.id)}"
      aria-label="Open ${escapeHTML(service.title)}"
    >

      <span class="service-card-icon">
        ${service.icon}
      </span>

      <span class="service-card-content">

        <strong>
          ${escapeHTML(service.title)}
        </strong>

        <span>
          ${escapeHTML(service.description)}
        </span>

      </span>

      <span class="service-card-arrow">
        →
      </span>

    </button>
  `;

  return card;
}

/* =========================================================
   5. RENDER SERVICES
   ========================================================= */

function renderServices(
  services = A1_SERVICES,
  containerSelector = null
) {

  const container =
    containerSelector
      ? document.querySelector(
          containerSelector
        )
      : document.querySelector(
          "#servicesGrid, .services-grid, [data-services-grid]"
        );

  if (!container) return;

  container.innerHTML = "";

  if (!services.length) {

    container.innerHTML = `
      <div class="services-empty">
        <div class="services-empty-icon">
          🔎
        </div>

        <h3>
          No service found
        </h3>

        <p>
          Try another keyword or category.
        </p>
      </div>
    `;

    return;
  }

  const fragment =
    document.createDocumentFragment();

  services.forEach((service) => {
    fragment.appendChild(
      createServiceCard(service)
    );
  });

  container.appendChild(fragment);

  bindServiceButtons(container);
}

/* =========================================================
   6. CATEGORY FILTER
   ========================================================= */

function filterServices(category) {

  if (
    !category ||
    category === "all"
  ) {
    return A1_SERVICES;
  }

  return A1_SERVICES.filter(
    (service) =>
      service.category === category
  );
}

function initServiceFilters() {

  const filters =
    document.querySelectorAll(
      "[data-service-filter]"
    );

  if (!filters.length) return;

  filters.forEach((filter) => {

    filter.addEventListener(
      "click",
      () => {

        const category =
          filter.dataset.serviceFilter ||
          "all";

        filters.forEach((item) => {
          item.classList.remove(
            "active"
          );
        });

        filter.classList.add(
          "active"
        );

        const services =
          filterServices(category);

        renderServices(services);
      }
    );

  });
}

/* =========================================================
   7. SERVICE SEARCH
   ========================================================= */

function searchServices(query) {

  const normalized =
    String(query || "")
      .trim()
      .toLowerCase();

  if (!normalized) {
    return A1_SERVICES;
  }

  return A1_SERVICES.filter(
    (service) => {

      const text =
        `
        ${service.title}
        ${service.description}
        ${service.category}
        ${service.keywords}
        `
          .toLowerCase();

      return text.includes(
        normalized
      );
    }
  );
}

function initServiceSearch() {

  const input =
    document.querySelector(
      "#serviceSearch, [data-service-search]"
    );

  if (!input) return;

  input.addEventListener(
    "input",
    () => {

      const results =
        searchServices(
          input.value
        );

      renderServices(results);
    }
  );
}

/* =========================================================
   8. SERVICE DETAILS
   ========================================================= */

function getServiceById(id) {

  return A1_SERVICES.find(
    (service) =>
      service.id === id
  );
}

function openServiceDetails(id) {

  const service =
    getServiceById(id);

  if (!service) return;

  const modal =
    document.querySelector(
      "#serviceModal, .service-modal, [data-service-modal]"
    );

  if (!modal) {

    window.location.href =
      `service.html?id=${encodeURIComponent(id)}`;

    return;
  }

  const title =
    modal.querySelector(
      "[data-service-title]"
    );

  const icon =
    modal.querySelector(
      "[data-service-icon]"
    );

  const description =
    modal.querySelector(
      "[data-service-description]"
    );

  const eligibility =
    modal.querySelector(
      "[data-service-eligibility]"
    );

  const documents =
    modal.querySelector(
      "[data-service-documents]"
    );

  const process =
    modal.querySelector(
      "[data-service-process]"
    );

  const fee =
    modal.querySelector(
      "[data-service-fee]"
    );

  const official =
    modal.querySelector(
      "[data-service-official]"
    );

  if (title) {
    title.textContent =
      service.title;
  }

  if (icon) {
    icon.textContent =
      service.icon;
  }

  if (description) {
    description.textContent =
      service.description;
  }

  if (eligibility) {
    eligibility.textContent =
      service.info.eligibility;
  }

  if (documents) {
    documents.textContent =
      service.info.documents;
  }

  if (process) {
    process.textContent =
      service.info.process;
  }

  if (fee) {
    fee.textContent =
      service.info.fee;
  }

  if (official) {
    official.href =
      service.info.official;

    official.target =
      "_blank";

    official.rel =
      "noopener noreferrer";
  }

  modal.dataset.currentService =
    service.id;

  modal.classList.add(
    "active"
  );

  modal.classList.add(
    "open"
  );

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modal-open"
  );
}

/* =========================================================
   9. CLOSE SERVICE DETAILS
   ========================================================= */

function closeServiceDetails() {

  const modal =
    document.querySelector(
      "#serviceModal, .service-modal, [data-service-modal]"
    );

  if (!modal) return;

  modal.classList.remove(
    "active"
  );

  modal.classList.remove(
    "open"
  );

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "modal-open"
  );
}

/* =========================================================
   10. SERVICE BUTTON EVENTS
   ========================================================= */

function bindServiceButtons(
  container = document
) {

  container
    .querySelectorAll(
      "[data-service-id]"
    )
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const id =
            button.dataset.serviceId;

          openServiceDetails(id);
        }
      );

    });
}

/* =========================================================
   11. MODAL CLOSE EVENTS
   ========================================================= */

function initServiceModal() {

  const modal =
    document.querySelector(
      "#serviceModal, .service-modal, [data-service-modal]"
    );

  if (!modal) return;

  modal
    .querySelectorAll(
      "[data-service-close], .service-modal-close"
    )
    .forEach((button) => {

      button.addEventListener(
        "click",
        closeServiceDetails
      );

    });

  modal.addEventListener(
    "click",
    (event) => {

      if (
        event.target === modal
      ) {
        closeServiceDetails();
      }

    }
  );

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape"
      ) {
        closeServiceDetails();
      }

    }
  );
}

/* =========================================================
   12. SERVICE COUNT
   ========================================================= */

function updateServiceCount() {

  const counters =
    document.querySelectorAll(
      "[data-service-count]"
    );

  counters.forEach((counter) => {

    counter.textContent =
      A1_SERVICES.length;

  });
}

/* =========================================================
   13. CATEGORY COUNT
   ========================================================= */

function updateCategoryCounts() {

  document
    .querySelectorAll(
      "[data-category-count]"
    )
    .forEach((element) => {

      const category =
        element.dataset.categoryCount;

      if (
        category === "all"
      ) {

        element.textContent =
          A1_SERVICES.length;

        return;
      }

      const count =
        A1_SERVICES.filter(
          (service) =>
            service.category ===
            category
        ).length;

      element.textContent =
        count;

    });
}

/* =========================================================
   14. SAFE HTML
   ========================================================= */

function escapeHTML(value) {

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
   15. INITIALIZE
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderServices();

    initServiceFilters();

    initServiceSearch();

    initServiceModal();

    updateServiceCount();

    updateCategoryCounts();

  }
);

/* =========================================================
   16. PUBLIC API
   ========================================================= */

window.A1ServiceSystem = {

  services: A1_SERVICES,

  categories:
    A1_SERVICE_CATEGORIES,

  getById:
    getServiceById,

  search:
    searchServices,

  filter:
    filterServices,

  render:
    renderServices,

  open:
    openServiceDetails,

  close:
    closeServiceDetails

};

console.log(
  `A1 Computer — ${A1_SERVICES.length} services loaded.`
);
