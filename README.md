# Engineering Document Control & Operations Portal

A lightweight, responsive web-based **Electronic Document Management System (EDMS)** and operations dashboard built with **HTML5**, **CSS3**, and **Vanilla JavaScript**. Designed to streamline engineering drawing revisions, vendor transmittals, and **IFR → IFC** approval workflows.

---

### 🎯 Key Features

- **Master Document Register (MDR):** Tracks document numbers, engineering disciplines, revision histories, and vendor/subcontractor ownership.
- **Automated Lifecycle Promotion (`IFR` / `HOLD` → `IFC`):** One-click workflow approval that promotes preliminary drawings to *Issued for Construction (Rev 0)* with automatic date stamping.
- **Live KPI Metrics & Filtering:** Real-time summary counters and instant search across document IDs, titles, disciplines, and vendors.
- **Persistent Client-Side Storage:** Uses browser `localStorage` so logged revisions persist across page reloads with zero server dependencies.

---

### 🛠️ Tech Stack

- **Frontend Structure:** Semantic HTML5
- **Styling & Responsive Grid:** Modern CSS3 (CSS Variables, Flexbox, CSS Grid)
- **Application Logic:** ES6+ JavaScript & Web Storage API

---

### 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone [https://github.com/suhair-habib/engineering-doc-control-portal.git](https://github.com/suhair-habib/engineering-doc-control-portal.git)
   cd engineering-doc-control-portal
