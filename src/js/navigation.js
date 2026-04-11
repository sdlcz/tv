/**
 * Mobile Navigation - Burger Menu Toggle
 * Handles opening/closing the mobile navigation menu on screens < 768px
 */

function initBurgerMenu() {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navMenu = document.querySelector(".nav-menu-mobile");

  if (!hamburgerBtn || !navMenu) return;

  // Toggle menu on hamburger button click
  hamburgerBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Close menu when nav link is clicked
  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  // Close menu when escape key is pressed
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
    }
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", initBurgerMenu);
