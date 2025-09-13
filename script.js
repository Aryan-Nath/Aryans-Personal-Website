document.addEventListener("DOMContentLoaded", () => {
  const sailboat = document.getElementById("sailboat");
  const path = document.getElementById("wavePath");
  const careerSection = document.getElementById("career");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute("href")));

  const pathLength = path.getTotalLength();

  function positionSailboat() {
    const rect = careerSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    let progress = 0;

    if (rect.top < viewportHeight && rect.bottom > 0) {
      progress = Math.min(Math.max((viewportHeight - rect.top) / (viewportHeight + rect.height), 0), 1);
    }

    const pointAtLength = path.getPointAtLength(progress * pathLength);

    sailboat.style.top = `${pointAtLength.y - 23}px`;
    sailboat.style.left = `${pointAtLength.x - 20}px`;

    const rotation = Math.sin(progress * Math.PI * 4) * 12;
    sailboat.style.transform = `rotate(${rotation}deg)`;
  }

  function fadeInSections() {
    document.querySelectorAll(".fade-in").forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
        el.classList.add("visible");
      }
    });
  }

  function highlightNav() {
    let scrollPos = window.scrollY + window.innerHeight / 3;
    sections.forEach((section, i) => {
      if (
        section.offsetTop <= scrollPos &&
        (i === sections.length - 1 || sections[i + 1].offsetTop > scrollPos)
      ) {
        navLinks.forEach(link => link.classList.remove("active"));
        navLinks[i].classList.add("active");
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  window.addEventListener("scroll", () => {
    positionSailboat();
    fadeInSections();
    highlightNav();
  });

  positionSailboat();
  fadeInSections();
  highlightNav();

  // Demo form submission interception
  const form = document.querySelector(".contact-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Message sent (demo)!");
    form.reset();
  });
});
