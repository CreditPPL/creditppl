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

document.addEventListener('click', (event) => {
  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove('open');
  }
});
