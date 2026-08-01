// ===== OneClick — register.js =====
// Handles the register form on pages/register.html
// Supports two self-registerable roles: "customer" and "provider"

// Called when a role card is clicked
function selectRole(role) {
  document.getElementById("role").value = role;

  document.querySelectorAll(".role-card").forEach(function (card) {
    card.classList.toggle("active", card.dataset.role === role);
  });

  const providerFields = document.getElementById("providerFields");
  if (role === "provider") {
    providerFields.classList.add("show");
  } else {
    providerFields.classList.remove("show");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");
  if (!form) return;

  // Pre-select role from a query string, e.g. register.html?role=provider
  // (the landing page's "Register as Provider" buttons link here)
  const params = new URLSearchParams(window.location.search);
  const presetRole = params.get("role");
  if (presetRole === "provider") {
    selectRole("provider");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const role = document.getElementById("role").value; // "customer" or "provider"
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;
    const errorMsg = document.getElementById("errorMsg");

    let valid =
      fullName &&
      email.includes("@") &&
      phone.length >= 7 &&
      password.length >= 4 &&
      password === confirmPassword &&
      terms;

    let serviceCategory = "", businessName = "", experience = "", serviceArea = "";
    if (role === "provider") {
      serviceCategory = document.getElementById("serviceCategory").value;
      businessName = document.getElementById("businessName").value.trim();
      experience = document.getElementById("experience").value;
      serviceArea = document.getElementById("serviceArea").value.trim();

      if (!serviceCategory || !serviceArea) {
        valid = false;
      }
    }

    if (!valid) {
      errorMsg.style.display = "block";
      return;
    }
    errorMsg.style.display = "none";

    // Build the user object — this is where you'd normally POST to your backend/API
    const newUser = { role: role, fullName: fullName, email: email, phone: phone };
    if (role === "provider") {
      newUser.serviceCategory = serviceCategory;
      newUser.businessName = businessName;
      newUser.experience = experience;
      newUser.serviceArea = serviceArea;
    }

    console.log("New user registered:", newUser);

    if (role === "provider") {
      alert("Provider account created successfully! Redirecting to login...");
    } else {
      alert("Account created successfully! Redirecting to login...");
    }
    // window.location.href = "login.html";
  });
});