// Mobile navigation
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const btnNav = document.querySelector('.btn-mobile-nav');

  const toggleNav = () => {
    header?.classList.toggle('nav-open');
    document.body.classList.toggle('no-scroll');
  };

  if (btnNav) {
    btnNav.addEventListener('click', toggleNav);
  }

  // Smooth scrolling
  const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").slice(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Close mobile nav if open
          if (header.classList.contains("nav-open")) {
            toggleNav();
          }

          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  };

  // Smooth scrolling animation
  const allLinks = document.querySelectorAll("a:link");

  allLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");

      // Scroll back to top
      if (href === "#") {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      // Scroll to other links
      if (href !== "#" && href.startsWith("#")) {
        e.preventDefault();
        const sectionEl = document.querySelector(href);
        sectionEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Sticky navigation
  const stickyNav = () => {
    const obs = new IntersectionObserver(
      (entries) => {
        const ent = entries[0];
        if (!ent.isIntersecting) {
          document.body.classList.add("sticky");
        } else {
          document.body.classList.remove("sticky");
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-80px",
      }
    );
    obs.observe(document.querySelector(".section-hero"));
  };

  // Animate sections on scroll
  const animateSections = () => {
    const sections = document.querySelectorAll(
      ".section-how, .section-meals, .section-testimonials, .section-pricing"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");

            // Animate app screens if they exist in this section
            const appScreens = entry.target.querySelectorAll(".app-screen");
            appScreens.forEach((screen, index) => {
              setTimeout(() => {
                screen.classList.add("show");
              }, index * 200);
            });

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "50px",
      }
    );

    sections.forEach((section) => observer.observe(section));
  };

  // Pricing toggle
  const initPricingToggle = () => {
    const toggle = document.querySelector(".toggle-prices input");
    const prices = document.querySelectorAll(".pricing-num");
    const monthlyPrices = ["399", "649", "999"];
    const yearlyPrices = ["3990", "6490", "9990"];

    toggle?.addEventListener("change", () => {
      prices.forEach((price, index) => {
        price.textContent = toggle.checked
          ? yearlyPrices[index]
          : monthlyPrices[index];
      });
    });
  };

  // Update copyright year
  const yearEl = document.querySelector(".year");
  const currentYear = new Date().getFullYear();
  yearEl.textContent = currentYear;

  // Initialize other features
  smoothScroll();
  stickyNav();
  animateSections();
  initPricingToggle();
});
