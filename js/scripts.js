///////////////////////////////////////////////////////////
// Set current year in footer
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Mobile navigation
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".hero-section");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

//////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Scroll to other links
    if (
      href !== "#" &&
      href.startsWith("#") &&
      !link.className.startsWith("address")
    ) {
      e.preventDefault();
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
      
      // Update URL with anchor link
      const newUrl = `${window.location.origin}${window.location.pathname}${href}`;
      window.history.pushState({ section: href.slice(1) }, '', newUrl);
    }

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

//////////////////////////////////////////////////////////
// Photo Gallery Overlay
const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
const photoOverlay = document.querySelector('.photo-overlay');
const overlayImage = document.querySelector('.overlay-image');
const overlayDescription = document.querySelector('.overlay-description');
const overlayClose = document.querySelector('.overlay-close');
const overlayPrev = document.querySelector('.overlay-prev');
const overlayNext = document.querySelector('.overlay-next');

let currentImageIndex = 0;
const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

// Open overlay when gallery item is clicked
galleryItems.forEach((item, index) => {
  item.addEventListener('click', function() {
    currentImageIndex = index;
    showOverlay();
  });
});

// Close overlay
overlayClose.addEventListener('click', hideOverlay);
photoOverlay.addEventListener('click', function(e) {
  if (e.target === photoOverlay) {
    hideOverlay();
  }
});

// Navigation
overlayPrev.addEventListener('click', showPreviousImage);
overlayNext.addEventListener('click', showNextImage);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  if (!photoOverlay.classList.contains('active')) return;
  
  if (e.key === 'Escape') hideOverlay();
  if (e.key === 'ArrowLeft') showPreviousImage();
  if (e.key === 'ArrowRight') showNextImage();
});

function showOverlay() {
  const currentItem = galleryItems[currentImageIndex];
  
  // Update image
  overlayImage.src = images[currentImageIndex];
  overlayImage.alt = currentItem.querySelector('img').alt;
  
  // Update description
  overlayDescription.textContent = currentItem.dataset.description || '';
  
  photoOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function hideOverlay() {
  photoOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function showPreviousImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateOverlayImage();
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateOverlayImage();
}

function updateOverlayImage() {
  const currentItem = galleryItems[currentImageIndex];
  
  // Update image with fade effect
  overlayImage.style.opacity = '0';
  setTimeout(() => {
    overlayImage.src = images[currentImageIndex];
    overlayImage.alt = currentItem.querySelector('img').alt;
    overlayImage.style.opacity = '1';
  }, 150);
  
  // Update description
  overlayDescription.textContent = currentItem.dataset.description || '';
}
