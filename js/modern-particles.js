// Modern Particle Effects
class ModernParticles {
  constructor() {
    // Clean up existing instance if it exists
    if (window.modernParticles && window.modernParticles !== this) {
      window.modernParticles.destroy();
    }

    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationId = null;
    this.currentTheme = "default";
    this.resizeHandler = null;
    this.isInitialized = false;

    this.themes = {
      spring: {
        colors: ["#4ade80", "#22c55e", "#16a34a", "#86efac", "#bbf7d0"],
        size: { min: 3, max: 8 },
        speed: { min: 0.8, max: 2.5 },
        count: 60,
        opacity: { min: 0.4, max: 0.8 },
      },
      summer: {
        colors: ["#fbbf24", "#f59e0b", "#d97706", "#fcd34d", "#fef3c7"],
        size: { min: 4, max: 10 },
        speed: { min: 1.2, max: 3.5 },
        count: 70,
        opacity: { min: 0.5, max: 0.9 },
      },
      fall: {
        colors: ["#f97316", "#ea580c", "#dc2626", "#fb923c", "#fed7aa"],
        size: { min: 2, max: 6 },
        speed: { min: 0.4, max: 1.8 },
        count: 45,
        opacity: { min: 0.3, max: 0.7 },
      },
      winter: {
        colors: ["#60a5fa", "#3b82f6", "#1d4ed8", "#93c5fd", "#dbeafe"],
        size: { min: 1.5, max: 5 },
        speed: { min: 0.3, max: 1.2 },
        count: 90,
        opacity: { min: 0.2, max: 0.6 },
      },
      default: {
        colors: ["#667eea", "#764ba2", "#f093fb", "#a78bfa", "#c4b5fd"],
        size: { min: 2, max: 5 },
        speed: { min: 0.5, max: 1.5 },
        count: 30,
        opacity: { min: 0.3, max: 0.7 },
      },
    };

    this.init();
  }

  init() {
    try {
      console.log("Initializing ModernParticles");
      this.createCanvas();
      this.createParticles();
      this.animate();
      this.isInitialized = true;
      console.log("ModernParticles initialized successfully");
    } catch (error) {
      console.error("Error initializing ModernParticles:", error);
    }
  }

  createCanvas() {
    try {
      // Remove existing canvas if it exists
      if (this.canvas && this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }

      this.canvas = document.createElement("canvas");
      this.canvas.style.position = "fixed";
      this.canvas.style.top = "0";
      this.canvas.style.left = "0";
      this.canvas.style.width = "100%";
      this.canvas.style.height = "100%";
      this.canvas.style.pointerEvents = "none";
      this.canvas.style.zIndex = "1";
      this.canvas.style.opacity = "0.5";

      document.body.appendChild(this.canvas);
      this.ctx = this.canvas.getContext("2d");

      this.resize();

      // Store resize handler reference for cleanup
      this.resizeHandler = () => this.resize();
      window.addEventListener("resize", this.resizeHandler);

      console.log("Canvas created successfully");
    } catch (error) {
      console.error("Error creating canvas:", error);
    }
  }

  resize() {
    if (this.canvas && this.ctx) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }

  createParticles() {
    if (!this.canvas || !this.ctx) {
      console.error("Canvas not available for creating particles");
      return;
    }

    const theme = this.themes[this.currentTheme];
    this.particles = [];

    for (let i = 0; i < theme.count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size:
          Math.random() * (theme.size.max - theme.size.min) + theme.size.min,
        speedX:
          (Math.random() - 0.5) * (theme.speed.max - theme.speed.min) +
          theme.speed.min,
        speedY:
          (Math.random() - 0.5) * (theme.speed.max - theme.speed.min) +
          theme.speed.min,
        color: theme.colors[Math.floor(Math.random() * theme.colors.length)],
        opacity:
          Math.random() * (theme.opacity.max - theme.opacity.min) +
          theme.opacity.min,
      });
    }

    console.log(
      `Created ${this.particles.length} particles for theme: ${this.currentTheme}`
    );
  }

  animate() {
    if (!this.canvas || !this.ctx) {
      console.error("Canvas not available for animation");
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fill();

      // Draw connections
      this.particles.forEach((otherParticle) => {
        const distance = Math.sqrt(
          Math.pow(particle.x - otherParticle.x, 2) +
            Math.pow(particle.y - otherParticle.y, 2)
        );

        if (distance < 120) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.strokeStyle = particle.color;
          this.ctx.globalAlpha = ((120 - distance) / 120) * 0.15;
          this.ctx.lineWidth = 1.5;
          this.ctx.stroke();
        }
      });
    });

    this.ctx.globalAlpha = 1;
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  changeTheme(theme) {
    console.log("Changing theme to:", theme);
    if (this.themes[theme]) {
      this.currentTheme = theme;

      // Update canvas opacity based on theme
      if (this.canvas) {
        const opacityMap = {
          spring: "0.6",
          summer: "0.7",
          fall: "0.5",
          winter: "0.4",
          default: "0.5",
        };
        this.canvas.style.opacity = opacityMap[theme] || "0.5";
      }

      this.createParticles();
      console.log("Theme changed successfully to:", theme);
    } else {
      console.log("Theme not found:", theme);
    }
  }

  destroy() {
    console.log("Destroying particles");

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
      this.canvas = null;
      this.ctx = null;
    }

    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
      this.resizeHandler = null;
    }

    this.particles = [];
    this.isInitialized = false;

    console.log("Particles destroyed");
  }
}

// Initialize particles when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing modern particles");
  try {
    window.modernParticles = new ModernParticles();
    console.log("Modern particles initialized:", window.modernParticles);
  } catch (error) {
    console.error("Error initializing modern particles:", error);
  }
});

// Override existing particle functions
if (typeof changeParticle === "function") {
  window.changeParticle = function (theme) {
    if (window.modernParticles) {
      window.modernParticles.changeTheme(theme);
    }
  };
}

if (typeof removeParticle === "function") {
  window.removeParticle = function () {
    if (window.modernParticles) {
      window.modernParticles.destroy();
    }
  };
}
