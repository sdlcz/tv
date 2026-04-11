/**
 * Calculate password strength
 * Returns: 'weak', 'fair', 'strong', 'very-strong'
 */
const calculatePasswordStrength = (password) => {
  if (!password) return "weak";

  const length = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  // Weak: less than 8 characters
  if (length < 8) return "weak";

  // Fair: 8+ characters but low variety
  if (length < 8 || hasNumber + hasUpper + hasLower + hasSpecial <= 1) {
    return "fair";
  }

  // Strong: 8+ characters + numbers + uppercase
  if (length >= 8 && hasNumber && hasUpper && hasLower) {
    return "strong";
  }

  // Very Strong: 12+ characters + high complexity
  if (length >= 12 && hasNumber && hasUpper && hasLower && hasSpecial) {
    return "very-strong";
  }

  // Default to fair if pattern doesn't match
  return "fair";
};

/**
 * Update password strength meter display
 */
const updatePasswordStrengthMeter = () => {
  const passwordInput = document.querySelector("#password-input");
  const strengthBar = document.querySelector(".strength-bar-fill");
  const strengthLabel = document.querySelector(".strength-label");
  const password = passwordInput.value;
  const strength = calculatePasswordStrength(password);
  const submitBtn = document.querySelector("#submit");

  // Remove all strength classes
  strengthBar?.classList.remove(
    "strength-weak",
    "strength-fair",
    "strength-strong",
    "strength-very-strong",
  );

  // Add current strength class
  if (strength) {
    strengthBar?.classList.add(`strength-${strength}`);
  }

  // Update label text
  if (strengthLabel) {
    strengthLabel.textContent = `Strength: ${strength.charAt(0).toUpperCase() + strength.slice(1)}`;
  }

  // BLOCKING: Disable submit button if strength is less than 'strong'
  if (submitBtn) {
    if (strength === "strong" || strength === "very-strong") {
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      submitBtn.style.cursor = "pointer";
    } else {
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.5";
      submitBtn.style.cursor = "not-allowed";
    }
  }
};

/**
 * Initialize password strength meter on page load
 */
const initPasswordStrength = () => {
  const passwordInput = document.querySelector("#password-input");
  const submitBtn = document.querySelector("#submit");
  const strengthBar = document.querySelector(".strength-bar");

  // Create the strength bar fill element if it doesn't exist
  if (strengthBar && !strengthBar.querySelector(".strength-bar-fill")) {
    const barFill = document.createElement("div");
    barFill.className = "strength-bar-fill";
    strengthBar.appendChild(barFill);
  }

  // Initially disable submit button (password is empty)
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.5";
    submitBtn.style.cursor = "not-allowed";
  }

  // Listen to password input changes
  if (passwordInput) {
    passwordInput.addEventListener("input", updatePasswordStrengthMeter);
  }
};

const processInput = () => {
  document.querySelector("#submit").addEventListener("click", (x) => {
    x.preventDefault();
    const name = document.querySelector("#name-input").value.trim();
    const email = document.querySelector("#email-input").value.trim();
    const phone = document.querySelector("#phone-input").value.trim();
    const password = document.querySelector("#password-input").value;
    const confirmPassword = document.querySelector(
      "#confirm-password-input",
    ).value;
    const messageElement = document.querySelector("#message");

    if (!name || !email || !phone || !password || !confirmPassword) {
      messageElement.textContent = "Please fill in all required fields.";
      return;
    }

    if (password !== confirmPassword) {
      messageElement.textContent = "Passwords do not match. Please try again.";
      return;
    }

    // Check password strength (should be 'strong' or 'very-strong')
    const strength = calculatePasswordStrength(password);
    if (strength !== "strong" && strength !== "very-strong") {
      messageElement.textContent =
        "Password must be at least Strong strength to register.";
      return;
    }

    messageElement.textContent = `${name}, Thank you for registering your details, Please use ${email} to login and enjoy using our site.`;
  });
};

function registrationReset() {
  document.getElementById("regForm").addEventListener("reset", () => {
    document.querySelector("#message").textContent = "";
    // Reset strength meter
    const strengthBar = document.querySelector(".strength-bar-fill");
    if (strengthBar) {
      strengthBar.classList.remove(
        "strength-weak",
        "strength-fair",
        "strength-strong",
        "strength-very-strong",
      );
    }
    const strengthLabel = document.querySelector(".strength-label");
    if (strengthLabel) {
      strengthLabel.textContent = "Password strength";
    }
    // Re-disable submit button
    const submitBtn = document.querySelector("#submit");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.5";
    }
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initPasswordStrength();
  processInput();
  registrationReset();
});

// Also try calling them directly if DOM is already loaded
if (document.readyState === "loading") {
  // DOM is still loading
  document.addEventListener("DOMContentLoaded", () => {
    initPasswordStrength();
    processInput();
    registrationReset();
  });
} else {
  // DOM is already loaded
  initPasswordStrength();
  processInput();
  registrationReset();
}
