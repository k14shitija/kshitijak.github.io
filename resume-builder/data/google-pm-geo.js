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
    name: "Kshitija Sunil Kumbharkar",
    headline: "Product-minded engineer for geospatial, ADAS, and auto data products",
    location: "Los Angeles, CA",
    relocation: "Open to Mountain View, CA",
    phone: "213-245-5814",
    email: "kumbhark@usc.edu",
    linkedin: "linkedin.com/in/kshitija-kumbharkar",
    skills: {
      Product:
        "product management for 0 to 1 technical products (conception to launch), quality evaluation and quality standards, product roadmap metrics, cross-functional delivery with engineering and operations, FMEA, CAPA",
      Data:
        "Python, pandas, GPX, geospatial datasets, driving telemetry, Power BI, Excel, self-directed data analysis",
      Domain:
        "ADAS, road network test routes, vehicle sensor mounts, auto OEM, consumer navigation, EV systems"
    },
    experience: [
      {
        company: "Porsche Engineering Services",
        role: "ADAS Intern, Fleet and Test Data Tools",
        location: "Carson, CA",
        dates: "Jun 2025 - Present",
        showBullets: true
      },
      {
        company: "Mercedes-Benz R&D India",
        role: "Product Design Engineer, EV Systems and Harness Integration",
        location: "Pune, India",
        dates: "Sep 2022 - Jul 2024",
        showBullets: true
      },
      {
        company: "Dassault Systemes",
        role: "Design Intern, Simulation and Vehicle Dynamics",
        location: "Pune, India",
        dates: "Sep 2021 - Jul 2022",
        showBullets: false
      },
      {
        company: "Cummins",
        role: "Design Intern, Process Optimization and Test Support",
        location: "Pune, India",
        dates: "Jun 2021 - Sep 2021",
        showBullets: false
      }
    ],
    bullets: [
      {
        experienceIndex: 0,
        situation:
          "ADAS test routes were dropping live tracking because GPX files had broken polylines and out-of-order timestamps.",
        task:
          "Make the fleet geospatial dataset trustworthy for live tracking and weather overlays used in validation.",
        action:
          "Scoped and shipped a Python GPX ingest and QC pipeline with health checks and dashboards, then sat with hardware and software teams to use the flags in first-pass log review.",
        result:
          "Validation could catch route and telemetry issues earlier instead of walking broken tracks by hand.",
        compiled:
          "When ADAS test routes kept dropping live tracking on broken GPX polylines and out-of-order timestamps, I scoped a Python ingest and QC pipeline, added health checks and dashboards, and used those quality flags with hardware and software teams so validation could trust fleet telemetry and weather overlays."
      },
      {
        experienceIndex: 0,
        situation:
          "Sensor-mount and fixture records looked different on every fleet vehicle, so data quality was hard to compare across tests.",
        task:
          "Set a shared quality bar for fixture and sensor-mount data before cars went back on the route.",
        action:
          "Wrote test plans and verification checklists, ran first-pass FMEA with HW/SW, and turned classified issues into CAPA and roadmap metrics.",
        result:
          "The team had a repeatable way to decide what to fix before the next test window.",
        compiled:
          "Sensor-mount records differed by vehicle, so I wrote fixture test plans and checklists, ran FMEA with hardware and software, and turned classified issues into CAPA and roadmap metrics the team used to pick fixes before the next test window."
      },
      {
        experienceIndex: 1,
        situation:
          "EV harness and bracket work was slipping PV/DV because routing, clearances, and fixture access were not locked.",
        task:
          "Get integration designs released on the build calendar with vehicle and manufacturing partners.",
        action:
          "Owned UG-NX layouts, GD&T, and clearance checks, and drove ECRs through cross-functional reviews until fabrication-ready drawings were out.",
        result:
          "PV/DV builds had routing and fixture access documented on schedule.",
        compiled:
          "EV harness layouts were blocking PV/DV, so I owned the UG-NX design, GD&T, and clearance checks, ran ECRs with vehicle and manufacturing teams, and released fabrication-ready drawings on the build calendar."
      }
    ],
    projects: [
      {
        name: "Houston ADAS Route and Fleet Tooling",
        context: "Porsche Engineering",
        tools: "Python, GPX, telemetry",
        line: "Built GPX ingest and QC for the Houston fleet, including polyline and timestamp checks, so live tracking and weather overlays stayed usable on ADAS test routes."
      },
      {
        name: "ADAS Sensor-Mount Fixtures",
        context: "Porsche Engineering",
        tools: "test plans, verification checklists",
        line: "Wrote sensor-mount fixture test plans and sign-off checklists so fleet vehicles could be instrumented the same way before a route."
      },
      {
        name: "Formula Student Chassis and Braking",
        context: "Student project",
        tools: "CAD, FEA, Python, GPX",
        line: "Led chassis and brake design, then used pandas and GPX run files to review test-day performance with the team."
      }
    ],
    education: [
      {
        school: "University of Southern California",
        degree: "M.S., Engineering Management",
        location: "Los Angeles, CA",
        dates: "Aug 2024 - May 2026",
        detail: "GPA 3.85/4.00"
      },
      {
        school: "Vishwakarma Institute of Technology",
        degree: "B.Tech, Mechanical Engineering",
        location: "India",
        dates: "Aug 2019 - Jul 2022",
        detail: "GPA 4.00/4.00"
      }
    ]
  }
};
