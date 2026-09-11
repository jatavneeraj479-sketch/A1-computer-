"use strict";

/* =========================================================
   A1 COMPUTER — CENTRAL PORTAL DATA
   Services, categories, quick links and basic information
   ========================================================= */

const A1_DATA = {

  /* -------------------------------------------------------
     SITE INFORMATION
     ------------------------------------------------------- */

  site: {
    name: "A1 Computer",
    tagline: "Digital Services, Education & Government Solutions",
    address: "New Bus Stand, Ajaygarh",
    phone: "9993831755",
    email: "jatavneeraj479@gmail.com"
  },


  /* -------------------------------------------------------
     SERVICE CATEGORIES
     ------------------------------------------------------- */

  categories: [

    {
      id: "student",
      title: "Student Hub",
      icon: "🎓",
      page: "Pages/Student.html"
    },

    {
      id: "government",
      title: "Government Services",
      icon: "🏛️",
      page: "Pages/Government.html"
    },

    {
      id: "jobs",
      title: "Jobs & Career",
      icon: "💼",
      page: "Pages/Jobs.html"
    },

    {
      id: "land",
      title: "Land & Property",
      icon: "🏠",
      page: "Pages/Land.html"
    },

    {
      id: "documents",
      title: "Documents",
      icon: "📄",
      page: "Pages/Document.html"
    },

    {
      id: "schemes",
      title: "Government Schemes",
      icon: "📋",
      page: "Pages/Scheme.html"
    },

    {
      id: "citizen",
      title: "Citizen Services",
      icon: "👤",
      page: "Pages/Citizen.html"
    },

    {
      id: "travel",
      title: "Travel Services",
      icon: "🚆",
      page: "Pages/Travel.html"
    }

  ],


  /* -------------------------------------------------------
     QUICK SERVICES
     ------------------------------------------------------- */

  quickServices: [

    {
      id: "aadhaar",
      title: "Aadhaar Services",
      category: "documents",
      page: "Pages/Document.html"
    },

    {
      id: "pan",
      title: "PAN Card",
      category: "documents",
      page: "Pages/Document.html"
    },

    {
      id: "jobs",
      title: "Latest Jobs",
      category: "jobs",
      page: "Pages/Jobs.html"
    },

    {
      id: "scholarship",
      title: "Scholarships",
      category: "student",
      page: "Pages/Student.html"
    },

    {
      id: "results",
      title: "Exam Results",
      category: "student",
      page: "Pages/Student.html"
    },

    {
      id: "land-record",
      title: "Land Records",
      category: "land",
      page: "Pages/Land.html"
    },

    {
      id: "schemes",
      title: "Government Schemes",
      category: "schemes",
      page: "Pages/Scheme.html"
    },

    {
      id: "notices",
      title: "Latest Notices",
      category: "notices",
      page: "Pages/Notices.html"
    }

  ],


  /* -------------------------------------------------------
     STUDENT SERVICES
     ------------------------------------------------------- */

  studentServices: [

    {
      id: "jee",
      title: "JEE",
      type: "exam"
    },

    {
      id: "neet",
      title: "NEET",
      type: "exam"
    },

    {
      id: "cuet",
      title: "CUET",
      type: "exam"
    },

    {
      id: "ssc",
      title: "SSC",
      type: "exam"
    },

    {
      id: "upsc",
      title: "UPSC",
      type: "exam"
    },

    {
      id: "admission",
      title: "College Admission",
      type: "education"
    },

    {
      id: "results",
      title: "Results",
      type: "education"
    },

    {
      id: "admit-card",
      title: "Admit Cards",
      type: "education"
    },

    {
      id: "timetable",
      title: "Time Table",
      type: "education"
    },

    {
      id: "syllabus",
      title: "Syllabus",
      type: "education"
    },

    {
      id: "scholarship",
      title: "Scholarships",
      type: "financial"
    }

  ],


  /* -------------------------------------------------------
     GOVERNMENT SERVICES
     ------------------------------------------------------- */

  governmentServices: [

    {
      id: "mp-online",
      title: "MP Online"
    },

    {
      id: "mpesb",
      title: "MPESB"
    },

    {
      id: "income-certificate",
      title: "Income Certificate"
    },

    {
      id: "caste-certificate",
      title: "Caste Certificate"
    },

    {
      id: "domicile",
      title: "Domicile Certificate"
    },

    {
      id: "birth-certificate",
      title: "Birth Certificate"
    },

    {
      id: "death-certificate",
      title: "Death Certificate"
    },

    {
      id: "ration-card",
      title: "Ration Card"
    },

    {
      id: "pension",
      title: "Pension Services"
    }

  ],


  /* -------------------------------------------------------
     JOB SERVICES
     ------------------------------------------------------- */

  jobServices: [

    {
      id: "latest-jobs",
      title: "Latest Government Jobs"
    },

    {
      id: "ssc",
      title: "SSC Recruitment"
    },

    {
      id: "upsc",
      title: "UPSC Recruitment"
    },

    {
      id: "mppsc",
      title: "MPPSC Recruitment"
    },

    {
      id: "mpesb",
      title: "MPESB Recruitment"
    },

    {
      id: "railway",
      title: "Railway Jobs"
    },

    {
      id: "banking",
      title: "Banking Jobs"
    },

    {
      id: "police",
      title: "Police Recruitment"
    },

    {
      id: "defence",
      title: "Defence Jobs"
    },

    {
      id: "teaching",
      title: "Teaching Jobs"
    }

  ],


  /* -------------------------------------------------------
     DOCUMENT SERVICES
     ------------------------------------------------------- */

  documentServices: [

    {
      id: "aadhaar",
      title: "Aadhaar Card"
    },

    {
      id: "pan",
      title: "PAN Card"
    },

    {
      id: "voter-id",
      title: "Voter ID"
    },

    {
      id: "driving-license",
      title: "Driving Licence"
    },

    {
      id: "passport",
      title: "Passport"
    },

    {
      id: "income",
      title: "Income Certificate"
    },

    {
      id: "caste",
      title: "Caste Certificate"
    },

    {
      id: "domicile",
      title: "Domicile Certificate"
    },

    {
      id: "birth",
      title: "Birth Certificate"
    }

  ],


  /* -------------------------------------------------------
     LAND SERVICES
     ------------------------------------------------------- */

  landServices: [

    {
      id: "land-record",
      title: "Land Records"
    },

    {
      id: "khasra",
      title: "Khasra"
    },

    {
      id: "khatauni",
      title: "Khatauni"
    },

    {
      id: "b1",
      title: "B-1"
    },

    {
      id: "land-map",
      title: "Land Map"
    },

    {
      id: "registry",
      title: "Property Registry"
    },

    {
      id: "mutation",
      title: "Mutation"
    }

  ],


  /* -------------------------------------------------------
     GOVERNMENT SCHEMES
     ------------------------------------------------------- */

  schemes: [

    {
      id: "farmer",
      title: "Farmer Schemes"
    },

    {
      id: "student",
      title: "Student Schemes"
    },

    {
      id: "women",
      title: "Women Schemes"
    },

    {
      id: "pension",
      title: "Pension Schemes"
    },

    {
      id: "housing",
      title: "Housing Schemes"
    },

    {
      id: "employment",
      title: "Employment Schemes"
    },

    {
      id: "health",
      title: "Health Schemes"
    },

    {
      id: "education",
      title: "Education Schemes"
    }

  ],


  /* -------------------------------------------------------
     NAVIGATION
     ------------------------------------------------------- */

  navigation: [

    {
      title: "Home",
      page: "index.html"
    },

    {
      title: "Services",
      page: "Pages/Service.html"
    },

    {
      title: "Student",
      page: "Pages/Student.html"
    },

    {
      title: "Government",
      page: "Pages/Government.html"
    },

    {
      title: "Jobs",
      page: "Pages/Jobs.html"
    },

    {
      title: "Land",
      page: "Pages/Land.html"
    },

    {
      title: "Documents",
      page: "Pages/Document.html"
    },

    {
      title: "Schemes",
      page: "Pages/Scheme.html"
    },

    {
      title: "Notices",
      page: "Pages/Notices.html"
    },

    {
      title: "Contact",
      page: "Pages/Contact.html"
    }

  ],


  /* -------------------------------------------------------
     CONTACT ACTIONS
     ------------------------------------------------------- */

  contactActions: {

    phone: "tel:+919993831755",

    whatsapp:
      "https://wa.me/919993831755",

    email:
      "mailto:jatavneeraj479@gmail.com"

  }

};


/* =========================================================
   GLOBAL EXPORT
   ========================================================= */

if (typeof window !== "undefined") {
  window.A1_DATA = A1_DATA;
}


/* =========================================================
   NODE / COMMONJS EXPORT
   ========================================================= */

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = A1_DATA;
}


/* =========================================================
   INITIALIZATION MESSAGE
   ========================================================= */

console.log(
  "A1 Computer — Central data loaded."
);
