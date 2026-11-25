const STORAGE_KEY = "edms_document_register_v1";

const defaultDocuments = [
  {
    id: 1,
    docNumber: "ENG-CTRL-001",
    title: "SCADA Network Architecture & Redundancy Diagram",
    discipline: "Controls & Automation",
    revision: "Rev 0",
    vendor: "Apex Automation Ltd.",
    status: "IFC",
    updated: "2026-11-12"
  },
  {
    id: 2,
    docNumber: "ENG-ELEC-204",
    title: "Substation MCC Single-Line Schematic",
    discipline: "Electrical",
    revision: "Rev B",
    vendor: "NorthStar Power Systems",
    status: "IFR",
    updated: "2026-11-19"
  },
  {
    id: 3,
    docNumber: "ENG-QA-018",
    title: "Factory Acceptance Test (FAT) & UAT Sign-off Checklist",
    discipline: "QA / Commissioning",
    revision: "Rev A",
    vendor: "Internal QA Engineering",
    status: "IFC",
    updated: "2026-11-21"
  },
  {
    id: 4,
    docNumber: "ENG-MECH-112",
    title: "Compressor Skid Piping & Instrumentation Layout",
    discipline: "Mechanical",
    revision: "Rev C",
    vendor: "Boreal Industrial Fab",
    status: "HOLD",
    updated: "2026-11-24"
  }
];

let documents = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultDocuments;

const tableBody = document.getElementById("docTableBody");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const docForm = document.getElementById("docForm");

function saveDocuments() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
}

function updateKPIs() {
  document.getElementById("kpiTotal").textContent = documents.length;
  document.getElementById("kpiIfc").textContent = documents.filter(d => d.status === "IFC").length;
  document.getElementById("kpiIfr").textContent = documents.filter(d => d.status === "IFR").length;
  document.getElementById("kpiHold").textContent = documents.filter(d => d.status === "HOLD").length;
}

function renderTable() {
  const query = searchInput.value.trim().toLowerCase();
  const filter = statusFilter.value;

  const filtered = documents.filter(doc => {
    const matchesStatus = filter === "ALL" || doc.status === filter;
    const matchesQuery =
      doc.docNumber.toLowerCase().includes(query) ||
      doc.title.toLowerCase().includes(query) ||
      doc.vendor.toLowerCase().includes(query) ||
      doc.discipline.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });

  tableBody.innerHTML = filtered.map(doc => `
    <tr>
      <td><strong>${doc.docNumber}</strong></td>
      <td>${doc.title}</td>
      <td>${doc.discipline}</td>
      <td>${doc.revision}</td>
      <td>${doc.vendor}</td>
      <td><span class="pill pill-${doc.status}">${doc.status}</span></td>
      <td>${doc.updated}</td>
      <td>
        ${doc.status !== "IFC"
          ? `<button class="btn-promote" onclick="approveToIFC(${doc.id})">Approve → IFC</button>`
          : `<span style="color:#6b7280;font-size:0.8rem;">Released</span>`}
      </td>
    </tr>
  `).join("");

  updateKPIs();
}

window.approveToIFC = function (id) {
  const target = documents.find(d => d.id === id);
  if (!target) return;
  target.status = "IFC";
  target.revision = "Rev 0";
  target.updated = new Date().toISOString().split("T")[0];
  saveDocuments();
  renderTable();
};

docForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newDoc = {
    id: Date.now(),
    docNumber: document.getElementById("docNumber").value.trim().toUpperCase(),
    title: document.getElementById("docTitle").value.trim(),
    discipline: document.getElementById("discipline").value,
    revision: document.getElementById("revision").value.trim(),
    vendor: document.getElementById("vendor").value.trim(),
    status: document.getElementById("status").value,
    updated: new Date().toISOString().split("T")[0]
  };
  documents.unshift(newDoc);
  saveDocuments();
  docForm.reset();
  renderTable();
});

searchInput.addEventListener("input", renderTable);
statusFilter.addEventListener("change", renderTable);

renderTable();
