#import "@preview/simple-technical-resume:0.1.0": *

#let name = "Tobias Klingenberg"
#let phone = "+49 178 8759080"
#let email = "tobikli@pm.me"
#let github = "tobikli"
#let linkedin = "klingenberg"
#let personal-site = "tobiwn.me"

#show: resume.with(
  top-margin: 0.45in,
  personal-info-font-size: 9.2pt,
  author-position: center,
  personal-info-position: center,
  author-name: name,
  phone: phone,
  email: email,
  website: personal-site,
  linkedin-user-id: linkedin,
  github-username: github,
)

#custom-title("Education")[
  #education-heading(
    "Technical University of Munich",
    "Munich, BY",
    "Master of Science",
    "Informatics / Computer Science",
    datetime(year: 2025, month: 10, day: 1),
    "Present",
  )[
    - Specialization in Software Engineering, Cybersecurity and Machine Learning and AI
    - Relevant Coursework: Deep Learning, Webapp Sec, DevOps, Cryptography, Causality, Cybersecurity
  ]
  #education-heading(
    "Technical University of Munich",
    "Munich, BY",
    "Bachelor of Science",
    "Informatics / Computer Science",
    datetime(year: 2022, month: 10, day: 1),
    datetime(year: 2025, month: 9, day: 1),
  )[
    - Minor in Management and Economics
    - Relevant Coursework: Software Engineering, Functional Programming, Data Structures and Algorithms, Computer Networks, Operating Systems
  ]
  #education-heading(
    "Goethe University Frankfurt",
    "Frankfurt, HE",
    "Bachelor of Science",
    "Economics and Business Administration",
    datetime(year: 2021, month: 10, day: 1),
    datetime(year: 2022, month: 9, day: 1),
  )[
    - Reorientation of studies towards computer science
  ]
]

#custom-title("Experience")[
  #work-heading(
    "Cybersecurity Strategy",
    "Deloitte / Technology, Working Student",
    "Munich, BY",
    datetime(year: 2026, month: 6, day: 1),
    "Present",
  )[
    - Cloud Security and Transformation consulting
  ]
  #work-heading(
    "R&D Software Engineering",
    "Siemens AG / FT, Working Student",
    "Munich, BY",
    datetime(year: 2026, month: 2, day: 1),
    datetime(year: 2026, month: 5, day: 1),
  )[
    - Self localisation of edge devices using Mesh-Networks on mqtt
    - Integration with autonomously guided vehicles
  ]
  #work-heading(
    "IT-Infrastructure and Administration",
    "Siemens AG / CYS-OE-IS, Working Student",
    "Munich, BY",
    datetime(year: 2025, month: 6, day: 1),
    datetime(year: 2026, month: 2, day: 1),
  )[
    - Deployment and configuration of IT infrastructure for Siemens Cybersecurity (Proxmox)
    - Automation of intra service synchronization
  ]

  #work-heading(
    "Software Engineering Intern",
    "TUM / iPraktikum / Siemens, Practical Course",
    "Garching, BY",
    datetime(year: 2024, month: 10, day: 1),
    datetime(year: 2025, month: 2, day: 1),
  )[
    - Developed the iOS application ”Safeguard” that tackles EHS challenges
  ]
]


#custom-title("Projects")[
  #project-heading(
    "CareDesk",
  )[
    _FastAPI, Langchain, CI/CD, Terraform, K8s_
    - Microservice based clinical organization tool, including appointment booking, patient data and GenAI
    - Langchain integration with FastAPI microservice and vector database for scalable and personalized queries
  ]
  #project-heading(
    "UPlan",
  )[
    _React, Supabase, Auth_
    - Developed a single page webapp that helps students keep track of their course work / study progress
    - OAuth with multiple providers, statistics, continous deployment
  ]
  #project-heading(
    "Siemens Safeguard",
  )[
    _Swift, SwiftUI, K8s_
    - Realtime iOS app that utilizes device proxmity and personalized settings for in factory warning of EHS specified hazards
  ]
]

#custom-title("Skills")[
  #skills()[
    - *Programming Languages:* Java, Python, C/C\#, SQL, JS/TS, HTML/CSS, PHP, Dart, Swift, OCaml, Rust
    - *Developer Tools:* Git, Docker, Ansible, Terraform, Kubernetes, Slack, Mira, Draw.io, IntelliJ
    - *Peronal Interests:* Raspberry Pi, Selfhosting, Embedded Systems, Robotics, Aerospace, Neuroscience
    - *Languages:* German (native), English (fluent), Chinese (basic)
  ]
]
