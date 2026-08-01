// ===== OneClick — main.js =====
// Shared behavior used across the site (landing + auth pages)

document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle (landing page header)
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("mainNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }
});

// Toggle password visibility (used on login.html and register.html)
function togglePassword(inputId, iconEl) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const icon = iconEl.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    if (icon) { icon.classList.remove("fa-eye"); icon.classList.add("fa-eye-slash"); }
  } else {
    input.type = "password";
    if (icon) { icon.classList.remove("fa-eye-slash"); icon.classList.add("fa-eye"); }
  }
}