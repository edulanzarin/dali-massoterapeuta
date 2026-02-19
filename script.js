/* ============================================
   ESPAÇO RENOVA — JavaScript
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // 1. NAVBAR SCROLL EFFECT
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 2. MOBILE MENU TOGGLE
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const overlay = document.getElementById("mobileOverlay");
  const navItems = document.querySelectorAll(".nav-links a");

  function toggleMenu() {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "";
  }

  hamburger.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) toggleMenu();
    });
  });

  // 3. SMOOTH SCROLL (Corrigido para compensar navbar)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
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

  // 4. HERO PARTICLES
  const heroParticles = document.getElementById("heroParticles");
  if (heroParticles) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: rgba(255,255,255, ${Math.random() * 0.5});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float-up ${Math.random() * 10 + 5}s linear infinite;
      `;
      // Adiciona animação css dinamicamente se necessário,
      // mas aqui estamos usando apenas positioning para simplificar
      // Se tiver a keyframe no CSS (hero particles), isso já funciona visualmente.
      heroParticles.appendChild(particle);
    }
  }

  // 5. REVEAL ON SCROLL
  const revealElements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right",
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // 6. NUMBERS COUNTER
  const counters = document.querySelectorAll("[data-count]");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute("data-count");
          const duration = 2000;
          const stepTime = Math.abs(Math.floor(duration / target));

          let current = 0;
          const timer = setInterval(() => {
            current += 1;
            counter.textContent = current;
            if (current >= target) {
              clearInterval(timer);
            }
          }, stepTime);

          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  // 7. TESTIMONIALS CAROUSEL (Lógica Robusta)
  const track = document.getElementById("testimonialsTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("sliderDots");

  if (track && prevBtn && nextBtn) {
    const cards = Array.from(track.children);
    let currentIndex = 0;

    // Calcula quantos cards cabem na tela
    function getCardsPerView() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function updateCarousel() {
      const cardsPerView = getCardsPerView();
      const cardWidth = track.offsetWidth / cardsPerView;
      // Precisamos subtrair o gap visualmente se usarmos margin,
      // mas com flex gap o calculo de translate % é mais seguro:

      const widthPercentage = 100 / cardsPerView;
      // Adiciona gap no calculo
      const gap = 20; // igual ao css

      // Movimento básico: width do card + gap
      const moveAmount = track.parentElement.offsetWidth / cardsPerView;

      // Simplesmente move baseado no índice e largura do container
      // Ajuste fino: usamos translateX em porcentagem para ser fluido
      const percentage = -(currentIndex * (100 / cardsPerView));
      // Gap compensation logic is complex, simpler approach for grid:

      // Abordagem Simplificada que funciona com o CSS Grid/Flex Gap:
      const itemWidth = cards[0].offsetWidth + 20; // 20 é o gap
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

      // Atualiza dots
      updateDots();
    }

    function createDots() {
      dotsContainer.innerHTML = "";
      const totalViews = Math.ceil(cards.length - getCardsPerView() + 1);
      // Evita dots negativos ou excessivos
      const dotsCount = cards.length - getCardsPerView() + 1;

      for (let i = 0; i < (dotsCount > 0 ? dotsCount : 1); i++) {
        const dot = document.createElement("div");
        dot.classList.add("slider-dot");
        if (i === currentIndex) dot.classList.add("active");
        dot.addEventListener("click", () => {
          currentIndex = i;
          updateCarousel();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      const dots = dotsContainer.querySelectorAll(".slider-dot");
      dots.forEach((dot, index) => {
        if (index === currentIndex) dot.classList.add("active");
        else dot.classList.remove("active");
      });
    }

    nextBtn.addEventListener("click", () => {
      const maxIndex = cards.length - getCardsPerView();
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0; // Loop
      }
      updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = cards.length - getCardsPerView(); // Loop
      }
      updateCarousel();
    });

    // Resize Event
    window.addEventListener("resize", () => {
      currentIndex = 0; // Reseta para evitar bugs visuais
      createDots();
      updateCarousel();
    });

    // Touch / Swipe
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true },
    );

    track.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true },
    );

    function handleSwipe() {
      if (touchEndX < touchStartX - 50) nextBtn.click();
      if (touchEndX > touchStartX + 50) prevBtn.click();
    }

    // Inicialização
    createDots();
    // Pequeno delay para garantir que o layout renderizou
    setTimeout(updateCarousel, 100);
  }
});
