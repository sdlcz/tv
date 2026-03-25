const processInput = () => {
  document.querySelector("#submit").addEventListener("click", (x) => {
    x.preventDefault();
    const name = document.querySelector("#name-input").value.trim();
    const email = document.querySelector("#email-input").value.trim();
    const phone = document.querySelector("#phone-input").value.trim();
    const password = document.querySelector("#password-input").value;
    const confirmPassword = document.querySelector("#confirm-password-input").value;
    const messageElement = document.querySelector("#message");

    if (!name || !email || !phone || !password || !confirmPassword) {
      messageElement.textContent = "Please fill in all required fields.";
      return;
    }

    if (password !== confirmPassword) {
      messageElement.textContent = "Passwords do not match. Please try again.";
      return;
    }

    messageElement.textContent = `${name}, Thank you for registering your details, Please use ${email} to login and enjoy using our site.`;
  });
};
processInput();

function registrationReset() {
  document.getElementById("regForm").addEventListener("reset", () => {
    document.querySelector("#message").textContent = "";
  });
}

registrationReset();
