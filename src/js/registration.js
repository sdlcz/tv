const processInput = () => {
  document.querySelector("#submit").addEventListener("click", (x) => {
    x.preventDefault();
    const name = document.querySelector("#name-input").value;
    const email = document.querySelector("#email-input").value;

    document.querySelector(
      "#message"
    ).textContent = `${name}, Thank you for registering your details, Please use ${email} to login and enjoy using our site.`;
  });
};
processInput();

function registrationReset() {
  document.getElementById("regForm");
}

registrationReset();
