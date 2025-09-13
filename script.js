document.addEventListener("DOMContentLoaded", () => {
  const sailboat = document.getElementById("careerSailboat");
  const wavePath = document.getElementById("careerWavePath");
  const entries = Array.from(document.querySelectorAll(".career-entry"));
  const careerSection = document.getElementById("career");

  const pathLen = wavePath.getTotalLength();

  // Position entries aligned vertically on wave dots with slight vertical gap
  const entryRatios = entries.map((_, i) => i / (entries.length - 1));
  const pathPoints = entryRatios.map((r) => wavePath.getPointAtLength(r * pathLen));

  entries.forEach((el, i) => {
    // Apply a vertical spacing offset between entries for better visual separation
    const verticalOffset = i * 8; // 8px spacing multiplier
    el.style.top = pathPoints[i].y - el.offsetHeight / 2 + verticalOffset + "px";
    el.style.left = "130px";
  });

  function updateSailboat() {
    const rect = careerSection.getBoundingClientRect();
    const minY = rect.top + window.scrollY;
    const maxY = rect.bottom + window.scrollY - window.innerHeight / 4;
    const scroll = Math.max(Math.min(window.scrollY + window.innerHeight / 2, maxY), minY);
    const pct = (scroll - minY) / (maxY - minY);
    const progress = Math.max(0, Math.min(1, pct || 0));
    const pt = wavePath.getPointAtLength(progress * pathLen);

    // Clamp sailboat vertical position between first and last dot Y
    const clampedY = Math.min(Math.max(pt.y, pathPoints[0].y), pathPoints[pathPoints.length - 1].y);

    sailboat.style.left = pt.x + 20 + "px";
    sailboat.style.top = clampedY + 10 + "px";
    sailboat.style.transform = `rotate(${Math.sin(progress * Math.PI * 2) * 10}deg)`;

    // Highlight the entry closest to the sailboat position
    let nearest = 0,
      best = Infinity;
    pathPoints.forEach((p, i) => {
      const dist = Math.abs(clampedY - p.y);
      if (dist < best) {
        best = dist;
        nearest = i;
      }
    });
    entries.forEach((e, i) => e.classList.toggle("active", i === nearest));
  }

  updateSailboat();
  window.addEventListener("scroll", updateSailboat);

  // Fade-in and navigation highlight unchanged
  const fadeEls = document.querySelectorAll(".fade-in");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = Array.from(navLinks).map((link) =>
    document.querySelector(link.getAttribute("href"))
  );

  function fadeInSections() {
    fadeEls.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85)
        el.classList.add("visible");
    });
  }
  function highlightNav() {
    let scrollPos = window.scrollY + window.innerHeight / 3;
    sections.forEach((section, i) => {
      if (
        section.offsetTop <= scrollPos &&
        (i === sections.length - 1 || sections[i + 1].offsetTop > scrollPos)
      ) {
        navLinks.forEach((link) => link.classList.remove("active"));
        navLinks[i].classList.add("active");
      }
    });
  }
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(link.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
  fadeInSections();
  highlightNav();
  window.addEventListener("scroll", () => {
    fadeInSections();
    highlightNav();
  });

  // Contact form demo submit
  const form = document.querySelector(".contact-form");
  if (form)
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Message sent! (demo)");
      form.reset();
    });
});
