/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "Adhitamzar@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",
    menuIndex: 0,
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (the 5 original projects) ----
  featured: [
    {
      title: "Library Management System",
      tag: "Laravel Backend", color: "#ff2d20",
      url: "#", cta: "Demo",
      img: "img/Databuku.png",
      desc: "Backend system for managing book data, users, and database records. Built with Laravel, MySQL, and clean MVC architecture.",
    },
    {
      title: "API Integration Project",
      tag: "REST API", color: "#00c896",
      url: "http://103.186.167.18:8002/rpl2/laravel/kaggleAdhitama_2/", cta: "Visit Site \u2192",
      img: "img/kaggle web.png",
      desc: "Backend API integration with data processing and server-side logic. Connects external data sources via RESTful endpoints.",
    },
    {
      title: "Batik Website",
      tag: "Web Development", color: "#f1e05a",
      url: "https://adhitamaazar.github.io/batik/", cta: "Visit Site \u2192",
      img: "img/batik.png",
      desc: "A cultural website project showcasing Indonesian Batik heritage with structured content and clean responsive interface.",
    },
    {
      title: "Web Topup",
      tag: "Web Topup", color: "#3178c6",
      url: "https://nexus-topup-tan.vercel.app/", cta: "Visit Site \u2192",
      img: "img/game-project.png",
      desc: "A topup website for purchasing game vouchers and digital products. Modern UI with payment integration flow.",
    },
    {
      title: "Developer Portfolio",
      tag: "Personal Website", color: "#a78bfa",
      url: "porto2.html", cta: "Open \u2192",
      img: "img/porto2.png",
      desc: "Modern personal portfolio for showcasing backend and game development projects. Clean design, responsive layout.",
    },
  ],

  // No GitHub feed - we show only manual projects
  featuredRepoNames: [],

  langColors: {
    JavaScript: "#f1e05a", PHP: "#4F5D95", CSS: "#663399",
    HTML: "#e34c26", Python: "#3572A5", Java: "#b07219",
  },

  // ---- Skills screen (values kept in 26%-49% range as requested) ----
  skills: [
    { group: "Backend Development", items: [
      ["PHP & Native", 46], ["Laravel Framework", 38],
      ["MySQL & Database", 47], ["REST API", 41],
    ]},
    { group: "Frontend & Game Dev", items: [
      ["JavaScript", 33], ["Python", 36],
      ["Game Logic & Mechanics", 44], ["UI/UX Design", 48],
    ]},
    { group: "Tools & Workflow", items: [
      ["Git & Version Control", 39], ["Figma & Prototyping", 28],
      ["Linux Server", 31], ["Problem Solving", 45],
    ]},
  ],

  // No GitHub API fetch needed - projects are all manual
  async fetchRepos() {
    return { repos: [], live: false };
  },
};