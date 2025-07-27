// Modern Particle Effects
class ModernParticles {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationId = null;
    this.currentTheme = "default";

    this.themes = {
      spring: {
        colors: ["#4ade80", "#22c55e", "#16a34a"],
        size: { min: 2, max: 6 },
        speed: { min: 0.5, max: 2 },
        count: 50,
      },
      summer: {
        colors: ["#fbbf24", "#f59e0b", "#d97706"],
        size: { min: 3, max: 8 },
        speed: { min: 1, max: 3 },
        count: 60,
      },
      fall: {
        colors: ["#f97316", "#ea580c", "#dc2626"],
        size: { min: 2, max: 5 },
        speed: { min: 0.3, max: 1.5 },
        count: 40,
      },
      winter: {
        colors: ["#60a5fa", "#3b82f6", "#1d4ed8"],
        size: { min: 1, max: 4 },
        speed: { min: 0.2, max: 1 },
        count: 80,
      },
      default: {
        colors: ["#667eea", "#764ba2", "#f093fb"],
        size: { min: 2, max: 5 },
        speed: { min: 0.5, max: 1.5 },
        count: 30,
      },
    };

    this.init();
  }

  init() {
    this.createCanvas();
    this.createParticles();
    this.animate();

    // Add theme change buttons
    this.addThemeControls();
  }

  createCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "fixed";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.pointerEvents = "none";
    this.canvas.style.zIndex = "1";
    this.canvas.style.opacity = "0.3";

    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
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
        opacity: Math.random() * 0.5 + 0.3,
      });
    }
  }

  animate() {
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

        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.strokeStyle = particle.color;
          this.ctx.globalAlpha = ((100 - distance) / 100) * 0.1;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      });
    });

    this.ctx.globalAlpha = 1;
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  changeTheme(theme) {
    if (this.themes[theme]) {
      this.currentTheme = theme;
      this.createParticles();
    }
  }

  addThemeControls() {
    // Theme controls are now handled by the modal
    // This method is kept for compatibility but doesn't add floating controls
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas) {
      this.canvas.remove();
    }
  }
}

// Initialize particles when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  window.modernParticles = new ModernParticles();
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
