/* Default project: Google Product Manager I, Geo Roads and Safety Data.
   Facts are taken from the public portfolio. Do not invent titles, tools, or metrics. */
window.RESUME_TEMPLATES = window.RESUME_TEMPLATES || {};

window.RESUME_TEMPLATES["google-pm-geo"] = {
  id: "google-pm-geo",
  name: "Google PM I, Geo Roads and Safety Data",
  targetRole: "Product Manager I, Geo Roads and Safety Data",
  company: "Google",
  location: "Mountain View, CA",
  jobDescription: [
    "Bachelor's degree or equivalent practical experience.",
    "3 years of experience in product management or related technical role.",
    "1 year of experience taking technical products from conception to launch (ideation to execution, end-to-end, 0 to 1).",
    "2 years of experience preparing and delivering technical presentations to executive leadership.",
    "Experience with deploying machine learning models in production, including quality evaluation and policy design.",
    "Experience with geospatial datasets or large, complex datasets.",
    "Lead cross-functional teams, manage product roadmaps, and deliver high-quality products on schedule.",
    "Comfort with SQL, Python, and self-directed data analysis.",
    "Collaborate with engineering and operations to deliver scalable systems powered by AI and operations.",
    "Detailed road network, geometry, road signs, and other attribute data for consumer and auto surfaces.",
    "Define enterprise-grade quality standards for core basemap data products (roads, signs, speed limits).",
    "Identify and integrate new data sources: vehicle sensor observations, driving telemetry, user reports, and imagery.",
    "Prioritize features that increase detail of foundational roads and speed limit product offering.",
    "Lead market research on consumer and auto offerings to influence the data roadmap.",
    "Basemap Data team. Data products that power search, navigation, and orientation use cases.",
    "Fresh and accurate core road network. Safety and driver-assistance attributes.",
    "Foundational routing, consumer navigation, adaptive cruise control for Auto OEM partners."
  ].join(" "),
  atsKeywords: [
    "product management",
    "technical products",
    "conception to launch",
    "0 to 1",
    "cross-functional",
    "product roadmap",
    "quality standards",
    "geospatial",
    "datasets",
    "Python",
    "data analysis",
    "telemetry",
    "vehicle sensor",
    "road network",
    "ADAS",
    "auto OEM",
    "navigation",
    "quality evaluation",
    "engineering",
    "operations"
  ],
  resume: {
    name: "Kshitija Kumbharkar",
    location: "Los Angeles, CA",
    phone: "(213) 245-5814",
    email: "kumbharkarkshitija14@gmail.com",
    linkedin: "linkedin.com/in/kshitija-kumbharkar",
    skills: {
      Product:
        "product management for 0 to 1 technical products (conception to launch), quality evaluation, quality standards, product roadmap metrics, cross-functional delivery with engineering and operations",
      Data:
        "Python, geospatial datasets, driving telemetry, GPX, Excel, self-directed data analysis",
      Domain:
        "ADAS, road network validation, vehicle sensor data, auto OEM, consumer navigation, EV wire-harness integration",
      "Design & CAD":
        "Siemens NX (UG-NX), CATIA V5, SolidWorks, GD&T, DFMEA, ECR/CN, PPAP/FAI"
    },
    experience: [
      {
        company: "Porsche Engineering Services North America",
        role: "Engineering Intern",
        subtitle: "ADAS Validation Platform, Data & Vehicle Integration",
        location: "Carson, CA",
        dates: "Jun 2025 - May 2026"
      },
      {
        company: "Mercedes-Benz R&D India",
        role: "Product Design Engineer",
        subtitle: "EV Wire-Harness & Electromechanical Integration",
        location: "Pune, India",
        dates: "Sep 2022 - Jul 2024"
      },
      {
        company: "Cummins",
        role: "Design Intern, Engine Test & Validation",
        subtitle: "Durability & Validation Support",
        location: "Pune, India",
        dates: "Jun 2021 - Sep 2021"
      }
    ],
    bullets: [
      {
        experienceIndex: 0,
        situation: "ADAS validation was a 4-hour manual cycle.",
        task: "Stand up a geospatial vehicle-data platform the fleet could trust.",
        action: "Built the Python platform and used the output with engineering and operations.",
        result: "Core validation cycle dropped from 4 hours to 25 minutes.",
        compiled:
          "When ADAS validation was a 4-hour manual cycle, I built a geospatial vehicle-data platform in Python, cut the core cycle to 25 minutes, and used the output with engineering and operations so fleet telemetry and route tracking could be trusted."
      },
      {
        experienceIndex: 0,
        situation: "The validation program was a 10-vehicle pilot.",
        task: "Scale routing, test execution, and data capture without dropping quality.",
        action: "Defined routing and test-execution and standardized fleet data capture.",
        result: "Fleet grew to 50 vehicles while holding a 98% CARIAD quality target.",
        compiled:
          "The program was a 10-vehicle pilot, so I defined routing and test-execution, scaled data capture to a 50-vehicle fleet, and held quality against a 98% CARIAD target."
      },
      {
        experienceIndex: 1,
        situation: "CLA rear-end harness integration was blocking production release.",
        task: "Get routing, packaging, and production drawings out on the release path.",
        action: "Owned Siemens NX routing, packaging, and GD&T drawings, plus DFMEA and ECR/CN updates.",
        result: "Cleared PPAP/FAI with Kroschu in Germany.",
        compiled:
          "CLA rear-end harness integration was blocking production release, so I owned Siemens NX routing, packaging, and GD&T drawings, ran DFMEA and ECR/CN updates, and cleared PPAP/FAI with Kroschu in Germany."
      }
    ],
    projects: [
      {
        name: "Audio PCBA Enclosure - Electronics Packaging (SolidWorks)",
        context: "Personal project",
        tools: "SolidWorks",
        line: "Reverse-engineered a connector-dense audio PCBA with calipers and designed an injection-moldable enclosure with board-retention bosses, connector clearances, and port cutouts."
      },
      {
        name: "Formula Student, Veloce Racing - Chassis & Braking Lead",
        context: "Student project",
        tools: "CAD, FEA",
        line: "Performed structural FEA on chassis components under dynamic load cases, evaluated forged-material selection for fatigue life, and validated tolerance stack-ups during system integration."
      }
    ],
    education: [
      {
        school: "University of Southern California",
        degree: "M.S, Engineering Management",
        dates: "May 2026",
        detail: "GPA: 3.85/4.0"
      },
      {
        school: "Vishwakarma Institute of Technology",
        degree: "B.Tech, Mechanical Engineering",
        dates: "May 2022",
        detail: ""
      }
    ]
  }
};
