/* =====================================================
   TEXTO DIGITANDO
===================================================== */

const typingElement = document.getElementById("typing");

const typingTexts = [
  "olá, recrutador",
  "bem-vindo ao meu portfólio",
  "construindo experiências digitais",
  "sempre aprendendo",
];

let textIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typingElement) {
    return;
  }

  const currentText = typingTexts[textIndex];

  if (!deleting) {
    typingElement.textContent = currentText.substring(0, characterIndex + 1);

    characterIndex++;

    if (characterIndex === currentText.length) {
      deleting = true;

      setTimeout(typeEffect, 1800);

      return;
    }

    setTimeout(typeEffect, 80);
  } else {
    typingElement.textContent = currentText.substring(0, characterIndex - 1);

    characterIndex--;

    if (characterIndex === 0) {
      deleting = false;

      textIndex = (textIndex + 1) % typingTexts.length;

      setTimeout(typeEffect, 400);

      return;
    }

    setTimeout(typeEffect, 40);
  }
}

typeEffect();

/* =====================================================
   REVEAL AO ROLAR
===================================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.12,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =====================================================
   CONTADORES
===================================================== */

const counters = document.querySelectorAll(".stat-number");

let countersStarted = false;

function animateCounters() {
  if (countersStarted) {
    return;
  }

  const statsSection = document.querySelector(".about-stats");

  if (!statsSection) {
    return;
  }

  const position = statsSection.getBoundingClientRect();

  if (position.top < window.innerHeight * 0.85) {
    countersStarted = true;

    counters.forEach((counter) => {
      const target = Number(counter.dataset.target);

      let current = 0;

      const increment = Math.max(1, Math.ceil(target / 50));

      function updateCounter() {
        current += increment;

        if (current >= target) {
          counter.textContent = target;

          return;
        }

        counter.textContent = current;

        requestAnimationFrame(updateCounter);
      }

      updateCounter();
    });
  }
}

window.addEventListener("scroll", animateCounters, {
  passive: true,
});

animateCounters();

/* =====================================================
   PARTÍCULAS
===================================================== */

const canvas = document.getElementById("particles");

if (canvas) {
  const ctx = canvas.getContext("2d");

  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);

  const particleCount = window.innerWidth < 700 ? 35 : 65;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,

      y: Math.random() * canvas.height,

      size: Math.random() * 1.5 + 0.5,

      speedX: (Math.random() - 0.5) * 0.25,

      speedY: (Math.random() - 0.5) * 0.25,

      opacity: Math.random() * 0.5 + 0.1,
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.x += particle.speedX;

      particle.y += particle.speedY;

      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX *= -1;
      }

      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY *= -1;
      }

      ctx.beginPath();

      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

      ctx.fillStyle = `rgba(
                        56,
                        189,
                        248,
                        ${particle.opacity}
                    )`;

      ctx.fill();
    });

    requestAnimationFrame(drawParticles);
  }

  drawParticles();
}

/* =====================================================
   ANO DO FOOTER
===================================================== */

const footerYear = document.querySelector("footer span");

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}
