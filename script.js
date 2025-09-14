// Simple fade-in on scroll (optional, for class="fade-in" sections)
document.addEventListener("DOMContentLoaded", () => {
  const fadeEls = document.querySelectorAll(".fade-in");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute("href")));

  function fadeInSections() {
    fadeEls.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85)
        el.classList.add("visible");
    });
  }
  function highlightNav() {
    let scrollPos = window.scrollY + window.innerHeight / 3;
    sections.forEach((section, i) => {
      if (section.offsetTop <= scrollPos &&
        (i === sections.length - 1 || sections[i + 1].offsetTop > scrollPos)) {
        navLinks.forEach(link => link.classList.remove("active"));
        navLinks[i].classList.add("active");
      }
    });
  }
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(link.getAttribute("href")).scrollIntoView({behavior: "smooth"});
    });
  });

  fadeInSections();
  highlightNav();
  window.addEventListener("scroll", () => {
    fadeInSections();
    highlightNav();
  });

  // Contact form demo submission
  const form = document.querySelector(".contact-form");
  if (form)
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Message sent! (demo)");
      form.reset();
    });
});
