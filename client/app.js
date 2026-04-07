const API_URL = "http://localhost:5000/api/students";
let allStudents = [];

// ── DOM refs ──────────────────────────────────────────
const form        = document.getElementById("student-form");
const formTitle   = document.getElementById("form-title");
const submitBtn   = document.getElementById("submit-btn");
const cancelBtn   = document.getElementById("cancel-btn");
const studentIdEl = document.getElementById("student-id");
const searchInput = document.getElementById("search-input");
const tbody       = document.getElementById("student-tbody");
const statsEl     = document.getElementById("stats");

// ── Fetch all students ────────────────────────────────
async function fetchStudents() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch");
    allStudents = await res.json();
    renderTable(allStudents);
    renderStats(allStudents);
  } catch (err) {
    showToast("Could not connect to API", "error");
  }
}

// ── Render table ──────────────────────────────────────
function renderTable(students) {
  tbody.innerHTML = "";
  if (students.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:#aaa">No students found.</td></tr>`;
    return;
  }
  students.forEach((s, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${s.firstName} ${s.lastName}</td>
      <td>${s.email}</td>
      <td>${s.course}</td>
      <td>Year ${s.year}</td>
      <td>${s.gpa !== undefined ? s.gpa.toFixed(1) : "—"}</td>
      <td><span class="badge ${s.status}">${s.status}</span></td>
      <td>
        <button class="btn-edit" onclick="editStudent('${s._id}')">✏️ Edit</button>
        <button class="btn-delete" onclick="deleteStudent('${s._id}')">🗑️ Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ── Render stats ──────────────────────────────────────
function renderStats(students) {
  const total    = students.length;
  const active   = students.filter(s => s.status === "active").length;
  const graduated = students.filter(s => s.status === "graduated").length;
  const avgGpa   = total ? (students.reduce((a, s) => a + (s.gpa || 0), 0) / total).toFixed(2) : "—";

  statsEl.innerHTML = `
    <div class="stat-card"><div class="stat-number">${total}</div><div class="stat-label">Total Students</div></div>
    <div class="stat-card"><div class="stat-number">${active}</div><div class="stat-label">Active</div></div>
    <div class="stat-card"><div class="stat-number">${graduated}</div><div class="stat-label">Graduated</div></div>
    <div class="stat-card"><div class="stat-number">${avgGpa}</div><div class="stat-label">Avg GPA</div></div>
  `;
}

// ── Create / Update ───────────────────────────────────
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = studentIdEl.value;

  const payload = {
    firstName: document.getElementById("firstName").value.trim(),
    lastName:  document.getElementById("lastName").value.trim(),
    email:     document.getElementById("email").value.trim(),
    course:    document.getElementById("course").value.trim(),
    year:      parseInt(document.getElementById("year").value),
    gpa:       parseFloat(document.getElementById("gpa").value) || undefined,
    phone:     document.getElementById("phone").value.trim(),
    status:    document.getElementById("status").value,
  };

  try {
    const res = await fetch(id ? `${API_URL}/${id}` : API_URL, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Request failed");
    }

    showToast(id ? "Student updated!" : "Student added!", "success");
    resetForm();
    fetchStudents();
  } catch (err) {
    showToast(err.message, "error");
  }
});

// ── Edit ──────────────────────────────────────────────
async function editStudent(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const s = await res.json();

    studentIdEl.value = s._id;
    document.getElementById("firstName").value = s.firstName;
    document.getElementById("lastName").value  = s.lastName;
    document.getElementById("email").value     = s.email;
    document.getElementById("course").value    = s.course;
    document.getElementById("year").value      = s.year;
    document.getElementById("gpa").value       = s.gpa || "";
    document.getElementById("phone").value     = s.phone || "";
    document.getElementById("status").value    = s.status;

    formTitle.textContent   = "Edit Student";
    submitBtn.textContent   = "💾 Update Student";
    cancelBtn.style.display = "inline-block";

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch {
    showToast("Could not load student", "error");
  }
}

// ── Delete ────────────────────────────────────────────
async function deleteStudent(id) {
  if (!confirm("Are you sure you want to delete this student?")) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();
    showToast("Student deleted!", "success");
    fetchStudents();
  } catch {
    showToast("Delete failed", "error");
  }
}

// ── Cancel edit ───────────────────────────────────────
cancelBtn.addEventListener("click", resetForm);

function resetForm() {
  form.reset();
  studentIdEl.value       = "";
  formTitle.textContent   = "Add New Student";
  submitBtn.textContent   = "➕ Add Student";
  cancelBtn.style.display = "none";
}

// ── Search ────────────────────────────────────────────
searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase();
  const filtered = allStudents.filter(s =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
    s.email.toLowerCase().includes(q) ||
    s.course.toLowerCase().includes(q)
  );
  renderTable(filtered);
});

// ── Toast ─────────────────────────────────────────────
function showToast(msg, type = "") {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className   = `toast ${type} show`;
  setTimeout(() => toast.className = "toast", 3000);
}

// ── Init ──────────────────────────────────────────────
fetchStudents();