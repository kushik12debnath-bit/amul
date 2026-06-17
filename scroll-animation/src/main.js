import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 240;
const base = import.meta.env.BASE_URL;
const currentFrame = index => (
  `${base}frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
);

// Preload images
const images = [];
const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }
};

preloadImages();

// Setup starting image dimensions
const firstImage = new Image();
firstImage.src = currentFrame(1);
firstImage.onload = () => {
  canvas.width = firstImage.width;
  canvas.height = firstImage.height;
  renderImage(0);
};

// Render function with load-handling
const renderImage = (index) => {
  const img = images[index];
  if (img) {
    if (img.complete && img.naturalWidth !== 0) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    } else {
      img.onload = () => {
        if (Math.abs(animationObj.frame - index) < 10) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0);
        }
      };
    }
  }
};

// GSAP Scroll Trigger for scrubbing canvas frames based on app scroll height
const animationObj = { frame: 0 };
gsap.to(animationObj, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    trigger: "#scroll-animation-section",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.1
  },
  onUpdate: () => {
    renderImage(animationObj.frame);
  }
});

// GSAP animation to fade out the heading and subheading text overlay at 30% scroll progress of the scroll section
gsap.to("#scroll-text-overlay", {
  opacity: 0,
  ease: "power1.out",
  scrollTrigger: {
    trigger: "#scroll-animation-section",
    start: "top top",
    end: "30% top",
    scrub: true
  }
});

// Mobile Menu Toggle Event Handler
const menuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    const icon = menuToggle.querySelector("span");
    if (mobileMenu.classList.contains("hidden")) {
      icon.textContent = "more_vert";
    } else {
      icon.textContent = "close";
    }
  });

  // Close menu when a link or button is clicked
  const menuLinks = mobileMenu.querySelectorAll("a, button");
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuToggle.querySelector("span").textContent = "more_vert";
    });
  });
}

// Contact Us Modal Toggle Logic
const contactModal = document.getElementById("contact-modal");
const contactUsLink = document.getElementById("contact-us-link");
const closeContactModal = document.getElementById("close-contact-modal");

if (contactModal && contactUsLink && closeContactModal) {
  contactUsLink.addEventListener("click", (e) => {
    e.preventDefault();
    contactModal.classList.remove("hidden");
  });

  closeContactModal.addEventListener("click", () => {
    contactModal.classList.add("hidden");
  });

  // Close modal when clicking outside the container backdrop
  contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.classList.add("hidden");
    }
  });
}


