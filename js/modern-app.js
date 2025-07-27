// Modern Portfolio JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Loading animation
  const loading = document.createElement("div");
  loading.className = "loading";
  loading.innerHTML = '<div class="spinner"></div>';
  document.body.appendChild(loading);

  // Hide loading after page loads
  window.addEventListener("load", function () {
    setTimeout(() => {
      loading.classList.add("hidden");
      setTimeout(() => {
        loading.remove();
      }, 500);
    }, 1000);
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".js-scroll-trigger");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Add fade-in class to elements
  const animateElements = document.querySelectorAll(
    ".resume-section, .works-card, .certification-item"
  );
  animateElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  // Parallax effect for about section
  const aboutSection = document.querySelector("#about");
  if (aboutSection) {
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      aboutSection.style.transform = `translateY(${rate}px)`;
    });
  }

  // Typing animation for name
  const nameElement = document.querySelector("#about h1");
  if (nameElement) {
    const text = nameElement.textContent;
    nameElement.textContent = "";
    nameElement.style.opacity = "1";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        nameElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    setTimeout(typeWriter, 500);
  }

  // Skill level animations
  const skillRows = document.querySelectorAll("#skills tbody tr");
  skillRows.forEach((row, index) => {
    row.style.opacity = "0";
    row.style.transform = "translateX(-20px)";

    setTimeout(() => {
      row.style.transition = "all 0.6s ease-out";
      row.style.opacity = "1";
      row.style.transform = "translateX(0)";
    }, index * 100);
  });

  // Works card hover effects
  const workCards = document.querySelectorAll(".works-card");
  workCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Certification item animations
  const certItems = document.querySelectorAll(".certification-item");
  certItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-30px)";

    setTimeout(() => {
      item.style.transition = "all 0.8s ease-out";
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
    }, index * 200);
  });

  // Social icons hover effects
  const socialIcons = document.querySelectorAll(".social-icons a");
  socialIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.1) rotate(5deg)";
    });

    icon.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1) rotate(0deg)";
    });
  });

  // Navigation active state
  const sections = document.querySelectorAll(".resume-section");
  const navItems = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });

  // Particle system enhancement
  if (typeof changeParticle === "function") {
    // Enhanced particle effects
    const particleThemes = {
      spring: {
        color: "#4ade80",
        size: 3,
        speed: 2,
      },
      summer: {
        color: "#fbbf24",
        size: 4,
        speed: 3,
      },
      fall: {
        color: "#f97316",
        size: 2,
        speed: 1.5,
      },
      winter: {
        color: "#60a5fa",
        size: 2.5,
        speed: 1,
      },
    };

    // Override the original changeParticle function
    window.changeParticle = function (theme) {
      const config = particleThemes[theme];
      if (config) {
        // Apply enhanced particle configuration
        console.log(`Changing particles to ${theme} theme`);
        // You can add more sophisticated particle effects here
      }
    };
  }

  // Modern Modal functionality
  const optionModal = document.getElementById("optionModal");
  const modalOverlay = optionModal?.querySelector(".modal-overlay");
  const modalClose = optionModal?.querySelector(".modal-close");
  const particleBtns = optionModal?.querySelectorAll(".particle-btn");

  // Show modal
  function showModal() {
    if (optionModal) {
      optionModal.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  }

  // Hide modal
  function hideModal() {
    if (optionModal) {
      optionModal.classList.remove("show");
      document.body.style.overflow = "";
    }
  }

  // Event listeners for modal
  if (optionModal) {
    // Show modal when OPTION is clicked
    const optionLink = document.querySelector(".option-link");
    if (optionLink) {
      optionLink.addEventListener("click", function (e) {
        e.preventDefault();
        showModal();
      });
    }

    // Close modal when clicking overlay or close button
    if (modalOverlay) {
      modalOverlay.addEventListener("click", hideModal);
    }

    if (modalClose) {
      modalClose.addEventListener("click", hideModal);
    }

    // Close modal with Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && optionModal.classList.contains("show")) {
        hideModal();
      }
    });

    // Particle button functionality
    if (particleBtns) {
      particleBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const theme = this.getAttribute("data-theme");

          // Remove active class from all buttons
          particleBtns.forEach((b) => b.classList.remove("active"));

          // Add active class to clicked button
          this.classList.add("active");

          // Change particle theme
          if (theme === "none") {
            if (window.modernParticles) {
              window.modernParticles.destroy();
            }
          } else {
            if (window.modernParticles) {
              window.modernParticles.changeTheme(theme);
            }
          }

          // Hide modal after selection
          setTimeout(hideModal, 300);
        });
      });
    }
  }

  // Add floating action button for quick navigation
  const fab = document.createElement("div");
  fab.innerHTML = `
        <div class="fab-container">
            <button class="fab-button" id="fab-button">
                <i class="fas fa-chevron-up"></i>
            </button>
        </div>
    `;
  document.body.appendChild(fab);

  // FAB styles
  const fabStyles = `
        .fab-container {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 1000;
        }
        
        .fab-button {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: var(--gradient-primary);
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: var(--shadow-medium);
            transition: var(--transition);
            opacity: 0;
            transform: scale(0);
        }
        
        .fab-button:hover {
            transform: scale(1.1);
            box-shadow: var(--shadow-heavy);
        }
        
        .fab-button.visible {
            opacity: 1;
            transform: scale(1);
        }
    `;

  const styleSheet = document.createElement("style");
  styleSheet.textContent = fabStyles;
  document.head.appendChild(styleSheet);

  // FAB functionality
  const fabButton = document.getElementById("fab-button");
  fabButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Show/hide FAB based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      fabButton.classList.add("visible");
    } else {
      fabButton.classList.remove("visible");
    }
  });

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple styles
  const rippleStyles = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;

  const rippleStyleSheet = document.createElement("style");
  rippleStyleSheet.textContent = rippleStyles;
  document.head.appendChild(rippleStyleSheet);

  // Add active state to navigation
  const navLinksWithActive = document.querySelectorAll(".nav-link");
  navLinksWithActive.forEach((link) => {
    link.addEventListener("click", function () {
      navLinksWithActive.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Add active styles
  const activeStyles = `
        .nav-link.active {
            background: rgba(255, 255, 255, 0.2) !important;
            color: white !important;
            transform: translateX(10px);
        }
    `;

  const activeStyleSheet = document.createElement("style");
  activeStyleSheet.textContent = activeStyles;
  document.head.appendChild(activeStyleSheet);

  console.log("Modern portfolio enhancements loaded successfully!");
});
