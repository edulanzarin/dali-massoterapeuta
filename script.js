/* ============================================
   DALI MASSOTERAPEUTA — MODERN JAVASCRIPT
   ============================================ */

class SiteController {
  constructor() {
    this.navbar = document.getElementById("navbar");
    this.hamburger = document.getElementById("hamburger");
    this.navLinks = document.getElementById("navLinks");
    this.overlay = document.getElementById("mobileOverlay");

    this.init();
  }

  init() {
    this.setupNavbar();
    this.setupMobileMenu();
    this.setupSmoothScroll();
    this.setupRevealAnimations();
    this.setupCounters();
    this.setupLazyLoading();
  }

  // NAVBAR SCROLL EFFECT
  setupNavbar() {
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener(
      "scroll",
      () => {
        lastScroll = window.scrollY;

        if (!ticking) {
          window.requestAnimationFrame(() => {
            if (lastScroll > 50) {
              this.navbar.classList.add("scrolled");
            } else {
              this.navbar.classList.remove("scrolled");
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true },
    );
  }

  // MOBILE MENU
  setupMobileMenu() {
    const toggleMenu = () => {
      const isActive = this.navLinks.classList.toggle("active");
      this.hamburger.classList.toggle("active");
      this.overlay.classList.toggle("active");
      document.body.style.overflow = isActive ? "hidden" : "";
    };

    this.hamburger?.addEventListener("click", toggleMenu);
    this.overlay?.addEventListener("click", toggleMenu);

    // Close on link click
    const navItems = this.navLinks?.querySelectorAll("a");
    navItems?.forEach((link) => {
      link.addEventListener("click", () => {
        if (this.navLinks.classList.contains("active")) {
          toggleMenu();
        }
      });
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.navLinks.classList.contains("active")) {
        toggleMenu();
      }
    });
  }

  // SMOOTH SCROLL
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        // Ignore empty anchors
        if (href === "#" || href === "#!") return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // REVEAL ANIMATIONS
  setupRevealAnimations() {
    const revealElements = document.querySelectorAll(
      ".reveal-up, .reveal-left, .reveal-right",
    );

    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // ANIMATED COUNTERS
  setupCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute("data-count"));
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      const stepTime = duration / steps;

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  // LAZY LOADING IMAGES
  setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ("loading" in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      return;
    }

    // Fallback for browsers without native lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
}

// WHATSAPP FLOAT ANIMATION
class WhatsAppFloat {
  constructor() {
    this.button = document.querySelector(".whatsapp-float");
    if (this.button) {
      this.init();
    }
  }

  init() {
    let lastScroll = 0;
    window.addEventListener(
      "scroll",
      () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 300) {
          this.button.style.opacity = "1";
          this.button.style.visibility = "visible";
        } else {
          this.button.style.opacity = "0";
          this.button.style.visibility = "hidden";
        }

        lastScroll = currentScroll;
      },
      { passive: true },
    );
  }
}

// FORM VALIDATION (if needed)
class FormValidator {
  constructor(form) {
    this.form = form;
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validate();
    });
  }

  validate() {
    const inputs = this.form.querySelectorAll("input, textarea");
    let isValid = true;

    inputs.forEach((input) => {
      if (input.hasAttribute("required") && !input.value.trim()) {
        this.showError(input, "Este campo é obrigatório");
        isValid = false;
      } else {
        this.removeError(input);
      }
    });

    if (isValid) {
      this.submitForm();
    }
  }

  showError(input, message) {
    const parent = input.parentElement;
    const error =
      parent.querySelector(".error-message") || document.createElement("span");
    error.className = "error-message";
    error.textContent = message;
    error.style.color = "#ef4444";
    error.style.fontSize = "0.875rem";
    error.style.marginTop = "4px";

    if (!parent.querySelector(".error-message")) {
      parent.appendChild(error);
    }

    input.style.borderColor = "#ef4444";
  }

  removeError(input) {
    const parent = input.parentElement;
    const error = parent.querySelector(".error-message");
    if (error) {
      error.remove();
    }
    input.style.borderColor = "";
  }

  submitForm() {
    // Handle form submission
    console.log("Form submitted successfully");
  }
}

// PERFORMANCE OPTIMIZATION
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    // Preload critical resources
    this.preloadImages();

    // Defer non-critical scripts
    this.deferScripts();

    // Setup intersection observer for animations
    this.setupPerformanceMonitoring();
  }

  preloadImages() {
    const criticalImages = document.querySelectorAll("[data-preload]");
    criticalImages.forEach((img) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = img.src || img.dataset.src;
      document.head.appendChild(link);
    });
  }

  deferScripts() {
    const scripts = document.querySelectorAll("script[data-defer]");
    scripts.forEach((script) => {
      script.defer = true;
    });
  }

  setupPerformanceMonitoring() {
    if ("PerformanceObserver" in window) {
      // Monitor Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entries) => {
        const lastEntry = entries.getEntries().pop();
        console.log("LCP:", lastEntry.renderTime || lastEntry.loadTime);
      });

      try {
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      } catch (e) {
        // LCP not supported
      }
    }
  }
}

// ACCESSIBILITY ENHANCEMENTS
class AccessibilityEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupARIA();
  }

  setupKeyboardNavigation() {
    // Tab trap for mobile menu
    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.getElementById("navLinks");

    if (modal) {
      const firstFocusable = modal.querySelectorAll(focusableElements)[0];
      const focusableContent = modal.querySelectorAll(focusableElements);
      const lastFocusable = focusableContent[focusableContent.length - 1];

      document.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("active")) return;

        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        }
      });
    }
  }

  setupFocusManagement() {
    // Add visible focus indicators
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        document.body.classList.add("keyboard-nav");
      }
    });

    document.addEventListener("mousedown", () => {
      document.body.classList.remove("keyboard-nav");
    });
  }

  setupARIA() {
    // Add aria-current to active nav links
    const currentPath = window.location.hash;
    if (currentPath) {
      const activeLink = document.querySelector(`a[href="${currentPath}"]`);
      if (activeLink) {
        activeLink.setAttribute("aria-current", "page");
      }
    }
  }
}

// INITIALIZE EVERYTHING
document.addEventListener("DOMContentLoaded", () => {
  // Core functionality
  new SiteController();
  new WhatsAppFloat();

  // Performance optimizations
  new PerformanceOptimizer();

  // Accessibility enhancements
  new AccessibilityEnhancer();

  // Initialize form validation if form exists
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    new FormValidator(contactForm);
  }

  // Add loading complete class
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });
});

// HANDLE ORIENTATION CHANGE
window.addEventListener("orientationchange", () => {
  // Close mobile menu on orientation change
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");
  const overlay = document.getElementById("mobileOverlay");

  if (navLinks?.classList.contains("active")) {
    navLinks.classList.remove("active");
    hamburger?.classList.remove("active");
    overlay?.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// SERVICE WORKER REGISTRATION (Optional - for PWA)
if ("serviceWorker" in navigator && window.location.protocol === "https:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("Service Worker registered successfully");
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}
