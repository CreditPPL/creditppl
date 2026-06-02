const dropdown = document.querySelector('.dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const carouselSlides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
let currentIndex = 0;
let carouselTimer;

function setSlide(index) {
  carouselSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  currentIndex = index;
}

function nextSlide() {
  setSlide((currentIndex + 1) % carouselSlides.length);
}

function prevSlide() {
  setSlide((currentIndex - 1 + carouselSlides.length) % carouselSlides.length);
}

function startCarousel() {
  carouselTimer = setInterval(nextSlide, 5000);
}

function stopCarousel() {
  clearInterval(carouselTimer);
}

if (dropdownToggle) {
  dropdownToggle.addEventListener('click', () => {
    dropdown.classList.toggle('open');
  });
}

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
}

if (nextButton) {
  nextButton.addEventListener('click', () => {
    stopCarousel();
    nextSlide();
    startCarousel();
  });
}

if (prevButton) {
  prevButton.addEventListener('click', () => {
    stopCarousel();
    prevSlide();
    startCarousel();
  });
}

setSlide(0);
startCarousel();

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach((item) => {
  const link = item.querySelector('a');
  if (!link) return;

  item.setAttribute('tabindex', '0');

  item.addEventListener('click', () => {
    link.click();
  });

  item.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      link.click();
    }
  });

  const activateItem = () => item.classList.add('active');
  const deactivateItem = () => item.classList.remove('active');

  item.addEventListener('pointerdown', activateItem);
  item.addEventListener('pointerup', deactivateItem);
  item.addEventListener('pointercancel', deactivateItem);
  item.addEventListener('pointerleave', deactivateItem);
  item.addEventListener('touchstart', activateItem, { passive: true });
  item.addEventListener('touchend', deactivateItem);
  item.addEventListener('touchcancel', deactivateItem);
});

document.addEventListener('click', (event) => {
  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove('open');
  }
});
