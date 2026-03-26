/**
 * Regression tests for registration.js.
 * Validates form validation logic and reset behaviour introduced /
 * preserved in the frontend overhaul (PR #3).
 */

const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const SCRIPT_PATH = path.join(__dirname, "../src/js/registration.js");

function loadRegistration() {
  const html = `<!DOCTYPE html>
<html><body>
  <form id="regForm">
    <input id="name-input" type="text" />
    <input id="email-input" type="email" />
    <input id="phone-input" type="tel" />
    <input id="password-input" type="password" />
    <input id="confirm-password-input" type="password" />
    <button id="submit" type="button">Register</button>
    <button id="reset" type="reset">Reset</button>
    <p id="message"></p>
  </form>
</body></html>`;
  const dom = new JSDOM(html, { runScripts: "dangerously" });
  const scriptContent = fs.readFileSync(SCRIPT_PATH, "utf8");
  const script = dom.window.document.createElement("script");
  script.textContent = scriptContent;
  dom.window.document.body.appendChild(script);
  return dom;
}

function fillForm(doc, { name = "", email = "", phone = "", password = "", confirm = "" } = {}) {
  doc.getElementById("name-input").value = name;
  doc.getElementById("email-input").value = email;
  doc.getElementById("phone-input").value = phone;
  doc.getElementById("password-input").value = password;
  doc.getElementById("confirm-password-input").value = confirm;
}

function clickSubmit(doc) {
  doc.getElementById("submit").dispatchEvent(new doc.defaultView.MouseEvent("click", { bubbles: true, cancelable: true }));
}

describe("registration.js – form validation", () => {
  let dom, doc;

  beforeEach(() => {
    dom = loadRegistration();
    doc = dom.window.document;
  });

  test("shows error when all fields are empty", () => {
    clickSubmit(doc);
    expect(doc.getElementById("message").textContent).toBe(
      "Please fill in all required fields."
    );
  });

  test("shows error when name is missing", () => {
    fillForm(doc, { email: "a@b.com", phone: "123", password: "pw", confirm: "pw" });
    clickSubmit(doc);
    expect(doc.getElementById("message").textContent).toBe(
      "Please fill in all required fields."
    );
  });

  test("shows error when email is missing", () => {
    fillForm(doc, { name: "Alice", phone: "123", password: "pw", confirm: "pw" });
    clickSubmit(doc);
    expect(doc.getElementById("message").textContent).toBe(
      "Please fill in all required fields."
    );
  });

  test("shows error when phone is missing", () => {
    fillForm(doc, { name: "Alice", email: "a@b.com", password: "pw", confirm: "pw" });
    clickSubmit(doc);
    expect(doc.getElementById("message").textContent).toBe(
      "Please fill in all required fields."
    );
  });

  test("shows error when password is missing", () => {
    fillForm(doc, { name: "Alice", email: "a@b.com", phone: "123", confirm: "pw" });
    clickSubmit(doc);
    expect(doc.getElementById("message").textContent).toBe(
      "Please fill in all required fields."
    );
  });

  test("shows error when confirm password is missing", () => {
    fillForm(doc, { name: "Alice", email: "a@b.com", phone: "123", password: "pw" });
    clickSubmit(doc);
    expect(doc.getElementById("message").textContent).toBe(
      "Please fill in all required fields."
    );
  });

  test("shows error when passwords do not match", () => {
    fillForm(doc, {
      name: "Alice",
      email: "a@b.com",
      phone: "123",
      password: "pass1",
      confirm: "pass2",
    });
    clickSubmit(doc);
    expect(doc.getElementById("message").textContent).toBe(
      "Passwords do not match. Please try again."
    );
  });

  test("shows success message with name and email on valid submission", () => {
    fillForm(doc, {
      name: "Alice Smith",
      email: "alice@example.com",
      phone: "07700900000",
      password: "secret",
      confirm: "secret",
    });
    clickSubmit(doc);
    const msg = doc.getElementById("message").textContent;
    expect(msg).toContain("Alice Smith");
    expect(msg).toContain("alice@example.com");
  });

  test("success message uses the correct template", () => {
    fillForm(doc, {
      name: "Bob",
      email: "bob@test.com",
      phone: "555",
      password: "abc",
      confirm: "abc",
    });
    clickSubmit(doc);
    expect(doc.getElementById("message").textContent).toBe(
      "Bob, Thank you for registering your details, Please use bob@test.com to login and enjoy using our site."
    );
  });

  test("whitespace-only fields are treated as empty (trimming)", () => {
    fillForm(doc, {
      name: "   ",
      email: "   ",
      phone: "   ",
      password: "pw",
      confirm: "pw",
    });
    clickSubmit(doc);
    expect(doc.getElementById("message").textContent).toBe(
      "Please fill in all required fields."
    );
  });
});

describe("registration.js – reset behaviour", () => {
  let dom, doc;

  beforeEach(() => {
    dom = loadRegistration();
    doc = dom.window.document;
  });

  test("resetting the form clears the message element", () => {
    // First submit to populate the message
    fillForm(doc, { name: "", email: "", phone: "", password: "", confirm: "" });
    clickSubmit(doc);
    expect(doc.getElementById("message").textContent).not.toBe("");

    // Now fire the reset event on the form
    doc.getElementById("regForm").dispatchEvent(
      new dom.window.Event("reset", { bubbles: true })
    );
    expect(doc.getElementById("message").textContent).toBe("");
  });
});
