// ===== OneClick — login.js =====
// Handles the login form on pages/login.html
// Supports three roles: "customer", "provider", "admin"

// Called when a role tab is clicked
function selectLoginRole(role, btnEl) {
  document.getElementById("loginRole").value = role;

  document.querySelectorAll(".role-tab").forEach(function (btn) {
    btn.classList.toggle("active", btn === btnEl);
  });

  // Admins aren't self-registered, so hide the "Register here" link for that tab
  const footNote = document.getElementById("registerFootNote");
  if (footNote) {
    footNote.style.display = role === "admin" ? "none" : "block";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  if (!form) return;

  // Pre-select role from a query string, e.g. login.html?role=provider
  const params = new URLSearchParams(window.location.search);
  const presetRole = params.get("role");
  if (presetRole) {
    const btn = document.querySelector('.role-tab[data-role="' + presetRole + '"]');
    if (btn) selectLoginRole(presetRole, btn);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const role = document.getElementById("loginRole").value; // customer | provider | admin
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    if (!email.includes("@") || password.length < 4) {
      errorMsg.style.display = "block";
      return;
    }
    errorMsg.style.display = "none";

    // This is where you'd normally call your backend/API to verify credentials.
    // For now we just redirect based on the selected role.
    let destination = "customer-dashboard.html";
    if (role === "provider") destination = "provider-dashboard.html";
    if (role === "admin") destination = "admin-dashboard.html";

    alert("Login successful! Redirecting to your " + role + " dashboard...");
    // window.location.href = destination;
  });
});