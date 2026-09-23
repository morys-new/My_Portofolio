const PORTFOLIO = {
  rotatorWords: ["TypeScript", "Python", "SQL", "Excel", "automation", "purpose"],

  trackOrder: ["data", "dev", "support"],

  meta: {
    data: {
      label: "Data Analyst",
      title: ["Data", "Analyst"],
      eyebrow: "/ Primary track",
      sub: "Cleaning messy data and turning it into dashboards people can actually use — from Excel and Google Sheets to full web dashboards — plus statistics in Python and SPSS."
    },
    dev: {
      label: "Developer",
      title: ["Developer", "Programming"],
      eyebrow: "/ Track",
      sub: "Web development end to end — interface, database, and deployment — plus AI-powered apps and workflow automation. Small working systems built from scratch, usually without leaning on heavy libraries."
    },
    support: {
      label: "IT Support",
      title: ["IT", "Support"],
      eyebrow: "/ Track",
      sub: "The practical side: records, documentation, public-facing systems, and everyday hardware/software fixes — built up across three internships."
    }
  },

  dev: [
    {
      year: "2026",
      kind: "Freelance · Product · Web app",
      title: "morika.id — Multi-Company Accounting System",
      desc: "An accounting system built from scratch to replace off-the-shelf vendor software (Jurnal.id, Accurate). It is deployed and runs as a subscription product: customers sign up themselves, billing reminders go out on schedule, and each company receives its own backup by email. It covers the finance side of an ERP rather than bookkeeping alone: double-entry journals and ledger, receivables and payables, inventory movement, fixed assets with depreciation, bank reconciliation, tax (PPN/PPh), period closing, and consolidated reports across a group → company → branch structure. Access is enforced inside the database with row-level security — not hidden buttons — so one branch can never read or edit another's records.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Tailwind", "Netlify"],
      pdf: "projects/data/morika-id-preview.pdf",
      pdfLabel: "View the walkthrough (PDF)",
      shots: [
        "assets/morika/01-daftar-perusahaan.png",
        "assets/morika/02-dasbor-pergerakan-harian.png",
        "assets/morika/03-jurnal-umum.png",
        "assets/morika/04-tren-dan-kontribusi.png",
        "assets/morika/05-profil-dan-backup.png",
      ],
      note: "Screens from the live product. Figures shown are sample data.",
    },
    {
      year: "2026",
      kind: "Personal · AI + Automation",
      title: "Automated Quiz Builder (n8n)",
      desc: "An end-to-end automation: fill in a quiz topic and it uses AI (Claude) to write the questions and answers, drops them straight into a Google Form with no manual typing, then pulls the participant list and emails the quiz link to each person automatically. A hands-on mix of AI and automated workflows in n8n.",
      tags: ["n8n", "Claude AI", "Google Forms", "Automation"],
      link: "assets/quiz-builder-n8n.png",
      linkLabel: "View the workflow"
    },
    {
      year: "2026",
      kind: "Personal · AI (RAG)",
      title: "What Would Lee Kuan Yew Do — Chatbot",
      desc: "A chatbot that answers in Lee Kuan Yew's style of thinking, grounded in his own writings instead of making things up. The texts are split into chunks, turned into embeddings in a vector store, and the AI (Google Gemini) answers from the most relevant pieces — a RAG setup (Retrieval-Augmented Generation). It also keeps conversation memory so the chat stays on thread.",
      tags: ["Flowise", "Google Gemini", "RAG", "Vector DB"],
      view: "https://cloud.flowiseai.com/chatbot/52db0add-d8d7-416b-bfed-d980d19ce9f6",
      linkLabel: "Open the chatbot"
    },
    {
      year: "2026",
      kind: "Personal · in progress",
      title: "Rantau Stories",
      status: "WIP",
      desc: "A full-stack life-simulation web game. I planned the whole roadmap — frontend in Next.js + Phaser.js, backend in Spring Boot + PostgreSQL — and built a smaller standalone prototype (\"Kisah Kampung\") on the side in pure HTML, CSS, and JS, no libraries.",
      tags: ["Next.js", "TypeScript", "Phaser.js", "Spring Boot", "PostgreSQL"],
      link: "projects/kisah-kampung/index.html",
      linkLabel: "Play the prototype",
      note: "Opens \"Kisah Kampung\" — the playable life-sim prototype."
    },
    {
      year: "2026",
      kind: "Personal project",
      title: "Metal Warfare",
      desc: "A run-and-gun sidescroller built from scratch on HTML5 Canvas — own engine, no game libraries. Started in plain JavaScript, then rebuilt it in TypeScript (v2) for cleaner code, with five levels and a custom game loop.",
      tags: ["HTML5 Canvas", "TypeScript", "Game Loop"],
      link: "projects/metal-warfare-v2/play.html",
      linkLabel: "Play the game"
    },
    {
      year: "2025",
      kind: "Freelance · personal",
      title: "Puskesmas Patient System",
      desc: "A frontend patient-records system: dashboard, patient list with full CRUD, registration form, polyclinic queue, and reports. Later rebranded and repackaged as a standalone static deployment (\"Karangan Dalam\") with updated content.",
      tags: ["HTML", "CSS", "Bootstrap 5", "JavaScript"],
      link: "projects/puskesmas/index.html",
      linkLabel: "Open the system",
      note: "Demo login — user: admin · pass: admin123"
    },
    {
      year: "2025 — Present",
      kind: "Freelance",
      title: "Website Development & Data Support",
      desc: "Responsive HTML/CSS websites built from client briefs, plus data clean-up in Excel for reporting. Managed deadlines independently with clear client communication.",
      tags: ["HTML", "CSS", "Responsive", "Client work"]
    }
  ],

  data: [
    {
      year: "2026",
      kind: "Freelance · Web app",
      title: "Finance & Tax Dashboard — Multi-Store Retail",
      desc: "A web dashboard for the finance & tax team of a 33-store retail company, so they can see every store's numbers in one place instead of opening files one by one. The raw data gets cleaned and split per store, then laid out as easy-to-read tables and charts — daily trends, store-to-store comparisons, and variance (selisih) tracking — which speeds up daily reporting and tax prep.",
      tags: ["Google Apps Script", "JavaScript", "Python", "Dashboards"],
      view: "https://script.google.com/macros/s/AKfycbwqmJOYGQZG3czllm5AYzdYcu_Q6RBTGzMRYudQBd7xD9yCQfbUHfuMVjQIhTheWluF/exec",
      linkLabel: "Open the dashboard",
      pdf: "projects/data/Dashboard-Preview-Mourrynes-Pasa.pdf",
      note: "Live web app, plus an anonymized, watermarked PDF preview."
    },
    {
      year: "2025",
      kind: "Academic · Python",
      title: "Coal Production Forecasting",
      desc: "Forecasted coal production from 10+ years of monthly data using ARIMA and Double Exponential Smoothing. Compared models with MAPE, MAE, and RMSE — ARIMA handled the fluctuations better with lower error.",
      tags: ["Python", "ARIMA", "Time Series", "Pandas"]
    },
    {
      year: "2025",
      kind: "Freelance · Puskesmas",
      title: "Medicine Distribution Model",
      desc: "An Excel-based distribution planning model with structured sheets and formulas to estimate medicine allocation across a clinic's needs.",
      tags: ["Excel", "Modeling", "Formulas"]
    },
    {
      year: "2025",
      kind: "Freelance · Excel",
      title: "Tax Withholding Calculator",
      desc: "A reusable withholding-tax template: an instructions tab, a calculator with live tariff lookups, a rate table, and an auto-recap sheet — packaged so a finance team can drop in figures and read results.",
      tags: ["Excel", "Lookup tables", "Templates"],
      // Tombol "Try it online" dibuang: berkas Google Sheets-nya menjawab
      // 410 Gone -- dihapus permanen, bukan sekadar dibatasi aksesnya.
      // Kartu tanpa tombol lebih baik daripada tombol yang mendaratkan
      // pengunjung di halaman mati.
    }
  ],

  support: [
    {
      when: "Jan 2026 — Present",
      role: "Freelance — Web Developer & Data Analyst",
      org: "Self-employed — Remote",
      points: [
        "Build web applications for clients end to end — interface, database, and deployment — with Next.js, TypeScript, and PostgreSQL (Supabase), using Claude Code as a daily development tool.",
        "Process and analyse client data with Python and IBM SPSS, then turn it into reports and dashboards they can read without me explaining them.",
        "Run the whole cycle myself: scoping with the client, building, testing, deploying, and fixing what breaks afterwards."
      ]
    },
    {
      when: "Oct 2024 — Nov 2024",
      role: "HR Division Intern",
      org: "Polresta Malang Kota",
      points: [
        "Organized employee records (digital and physical) so things stayed easy to find.",
        "Recapped attendance, personnel, and admin data in Excel for internal reporting.",
        "Cleaned raw data before it went to supervisors for review.",
        "Built a draft profile website for the institution in WordPress — page layout, menu structure, and content arrangement."
      ]
    },
    {
      when: "May 2024 — Jun 2024",
      role: "IT Division Intern",
      org: "Dinas Komunikasi dan Informatika Kota Malang",
      points: [
        "Joined early discussions on application planning and system development.",
        "Documented system requirements and workflows to keep development organized.",
        "Supported basic user-needs analysis and turned findings into simple documentation.",
        "Mapped system and service workflows into flowcharts with draw.io so the process was agreed on before anything was built.",
        "Sat in on coordination meetings for implementation and digital service upgrades."
      ]
    },
    {
      when: "Feb 2024 — Mar 2024",
      role: "Public Service Intern",
      org: "Kantor Kecamatan Klojen, Malang",
      points: [
        "Handled day-to-day admin documents and citizen requests.",
        "Organized records so staff could pull up information faster.",
        "Checked office equipment and flagged small workflow issues with practical fixes."
      ]
    }
  ],

  chips: {
    // Disamakan dengan CV: satu jalur saja, web, dan bahasanya sedikit.
    // Daftar panjang berisi bahasa yang jarang dipakai membuat yang benar-
    // benar dikuasai ikut diragukan.
    dev: [
      ["HTML & CSS", "BEG"], ["JavaScript / TypeScript", "BEG"], ["React (Next.js)", "BEG"],
      ["Tailwind CSS", "BEG"], ["Node.js / REST API", "BEG"], ["PostgreSQL (Supabase)", "BEG"],
      ["Git & GitHub", "BEG"], ["Netlify / Vercel", ""], ["Claude Code", ""],
      ["n8n", "BEG"], ["Figma", ""], ["Postman", ""]
    ],
    data: [
      ["Microsoft Excel", "INT"], ["IBM SPSS", "INT"], ["Python + Pandas", "BEG"],
      ["SQL (MySQL/PG/SQL Server)", "BEG"], ["Google Sheets", "BEG"], ["Looker Studio", "BEG"],
      ["Statistics", "BEG"], ["Apps Script", "BEG"], ["Git & GitHub", "BEG"]
    ],
    support: [
      ["Windows 10 / 11", "BEG"], ["Linux Ubuntu (basic)", "BEG"], ["OS & driver install", "BEG"],
      ["Backup & restore", "BEG"], ["Troubleshooting", "BEG"], ["AnyDesk / TeamViewer", "BEG"],
      ["MS Office", "ADV"], ["Documentation", ""]
    ]
  }
};
