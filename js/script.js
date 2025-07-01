// Hero Carousel JavaScript
class HeroCarousel {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".hero-slide");
    this.dots = document.querySelectorAll(".dot");
    this.prevButton = document.querySelector(".hero-arrow-prev");
    this.nextButton = document.querySelector(".hero-arrow-next");
    this.autoRotateInterval = null;
    this.autoRotateDelay = 11000; // 5 seconds

    this.init();
  }

  init() {
    // Add event listeners for navigation arrows
    this.prevButton.addEventListener("click", () => this.prevSlide());
    this.nextButton.addEventListener("click", () => this.nextSlide());

    // Add event listeners for dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Start auto rotation
    this.startAutoRotate();

    // Initialize first slide
    this.showSlide(0);
  }

  showSlide(index) {
    // Remove active class from all slides and dots
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.dots.forEach((dot) => dot.classList.remove("active"));

    // Add active class to current slide and dot
    this.slides[index].classList.add("active");
    this.dots[index].classList.add("active");

    this.currentSlide = index;
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(nextIndex);
    this.resetAutoRotate();
  }

  prevSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prevIndex);
    this.resetAutoRotate();
  }

  goToSlide(index) {
    this.showSlide(index);
    this.resetAutoRotate();
  }

  startAutoRotate() {
    this.autoRotateInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoRotateDelay);
  }

  stopAutoRotate() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
    }
  }

  resetAutoRotate() {
    this.stopAutoRotate();
    this.startAutoRotate();
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HeroCarousel();
});

// Add this to your existing script.js file
document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dropdown-parent");

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".links");

    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Close other dropdowns
      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove("active");
        }
      });

      // Toggle current dropdown
      dropdown.classList.toggle("active");
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown-parent")) {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    }
  });
});

// Hamburger menu functionality
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
const body = document.body;

// Prevent body scroll when mobile menu is open
function toggleBodyScroll(disable) {
  if (disable) {
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.width = "100%";
  } else {
    body.style.overflow = "";
    body.style.position = "";
    body.style.width = "";
  }
}

hamburger.addEventListener("click", function () {
  const isActive = hamburger.classList.contains("active");
  hamburger.classList.toggle("active");
  mobileNav.classList.toggle("active");
  toggleBodyScroll(!isActive);
});

// Mobile dropdown functionality
const mobileDropdownItems = document.querySelectorAll(
  ".mobile-nav-item.has-dropdown"
);

mobileDropdownItems.forEach((item) => {
  const link = item.querySelector(".mobile-nav-link");
  const dropdown = item.querySelector(".mobile-dropdown");

  link.addEventListener("click", function (e) {
    e.preventDefault();

    // Close other dropdowns first
    mobileDropdownItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
        const otherDropdown = otherItem.querySelector(".mobile-dropdown");
        otherDropdown.style.height = "0";
      }
    });

    // Toggle current dropdown
    if (item.classList.contains("active")) {
      // Close current dropdown
      item.classList.remove("active");
      dropdown.style.height = "0";
    } else {
      // Open current dropdown
      item.classList.add("active");
      dropdown.style.height = dropdown.scrollHeight + "px";
    }
  });
});

function openHoursModal() {
  const modal = document.getElementById("hoursModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeHoursModal() {
  const modal = document.getElementById("hoursModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

document.getElementById("hoursModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeHoursModal();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeHoursModal();
  }
});
