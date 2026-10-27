
document.addEventListener("DOMContentLoaded", () => {
  // Hide the loading screen.
  const loader = document.getElementById("loader");

  window.setTimeout(() => {
    loader?.classList.add("loader-hidden");
  }, 300);

  // Mobile navigation menu.
  const menuButton = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const opening = mobileMenu.classList.contains("hidden");

      mobileMenu.classList.toggle("hidden");
      menuButton.setAttribute("aria-expanded", String(opening));
      menuButton.setAttribute(
        "aria-label",
        opening ? "Close menu" : "Open menu"
      );
      menuButton.textContent = opening ? "✕" : "☰";
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
        menuButton.textContent = "☰";
      });
    });
  }

  // Theme toggle.
  const themeButton = document.getElementById("theme-toggle");

  if (themeButton) {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const dark = savedTheme !== "light";

    document.body.classList.toggle("dark", dark);
    themeButton.textContent = dark ? "☀️" : "🌙";
    themeButton.setAttribute(
      "aria-label",
      dark ? "Switch to light mode" : "Switch to dark mode"
    );

    themeButton.addEventListener("click", () => {
      const nowDark = !document.body.classList.contains("dark");

      document.body.classList.toggle("dark", nowDark);
      localStorage.setItem(
        "portfolio-theme",
        nowDark ? "dark" : "light"
      );

      themeButton.textContent = nowDark ? "☀️" : "🌙";
      themeButton.setAttribute(
        "aria-label",
        nowDark ? "Switch to light mode" : "Switch to dark mode"
      );
    });
  }

  // Reveal sections as they enter the screen.
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  // Animated introduction text on the homepage.
  const typing = document.getElementById("typing-text");

  if (typing) {
    const words = [
      "Software Engineering Student",
      "Web Developer",
      "Multimedia Creator",
      "Problem Solver"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
      const word = words[wordIndex];

      charIndex += deleting ? -1 : 1;
      typing.textContent = word.slice(0, Math.max(0, charIndex));

      let delay = deleting ? 45 : 85;

      if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = 1200;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 250;
      }

      window.setTimeout(type, delay);
    }

    type();
  }

  // Back-to-top button.
  const topButton = document.getElementById("back-to-top");

  if (topButton) {
    const updateTopButton = () => {
      topButton.classList.toggle("hidden", window.scrollY < 450);
    };

    window.addEventListener("scroll", updateTopButton, {
      passive: true
    });

    updateTopButton();

    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
