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
const gallerySlider = document.querySelector('.gallery-slider');
const galleryTrack = document.querySelector('.gallery-track');
const galleryPrev = document.querySelector('.gallery-prev');
const galleryNext = document.querySelector('.gallery-next');

let galleryIndex = 0;
let galleryPointerId = null;
let galleryStartX = 0;
let galleryStartY = 0;
let galleryWasDragged = false;

function getGalleryStep() {
  if (!galleryItems.length || !galleryTrack) return 0;
  const firstItem = galleryItems[0];
  const style = window.getComputedStyle(galleryTrack);
  const gap = Number.parseFloat(style.gap || style.columnGap || '20');
  return firstItem.getBoundingClientRect().width + gap;
}

function getMaxGalleryIndex() {
  if (!galleryItems.length || !gallerySlider) return 0;

  const maxVisibleCards = 4;
  const visibleCards = Math.min(
    maxVisibleCards,
    Math.max(1, Math.floor((gallerySlider.clientWidth + 20) / getGalleryStep()))
  );

  return Math.max(0, galleryItems.length - visibleCards);
}

function updateGalleryPosition() {
  if (!galleryTrack || !galleryItems.length) return;
  const maxIndex = getMaxGalleryIndex();
  galleryIndex = Math.min(Math.max(galleryIndex, 0), maxIndex);
  galleryTrack.style.transform = `translateX(-${galleryIndex * getGalleryStep()}px)`;

  if (galleryPrev) {
    galleryPrev.disabled = galleryIndex === 0;
  }

  if (galleryNext) {
    galleryNext.disabled = galleryIndex >= maxIndex;
  }
}

function moveGallery(direction) {
  if (!galleryItems.length) return;
  const maxIndex = getMaxGalleryIndex();
  galleryIndex = Math.min(Math.max(galleryIndex + direction, 0), maxIndex);
  updateGalleryPosition();
}

if (galleryPrev && galleryNext && gallerySlider && galleryTrack) {
  galleryPrev.addEventListener('click', () => moveGallery(-1));
  galleryNext.addEventListener('click', () => moveGallery(1));
  window.addEventListener('resize', updateGalleryPosition);
  updateGalleryPosition();

  const endGalleryPointer = (event) => {
    if (galleryPointerId !== event.pointerId) return;

    const distanceX = event.clientX - galleryStartX;
    gallerySlider.classList.remove('is-dragging');
    galleryPointerId = null;

    if (galleryWasDragged && Math.abs(distanceX) > 40) {
      moveGallery(distanceX < 0 ? 1 : -1);
    } else {
      updateGalleryPosition();
    }
  };

  gallerySlider.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    galleryPointerId = event.pointerId;
    galleryStartX = event.clientX;
    galleryStartY = event.clientY;
    galleryWasDragged = false;
    gallerySlider.classList.add('is-dragging');
    gallerySlider.setPointerCapture(event.pointerId);
  });

  gallerySlider.addEventListener('pointermove', (event) => {
    if (galleryPointerId !== event.pointerId) return;

    const distanceX = event.clientX - galleryStartX;
    const distanceY = event.clientY - galleryStartY;
    if (!galleryWasDragged && Math.abs(distanceX) <= Math.abs(distanceY)) return;

    if (Math.abs(distanceX) > 8) galleryWasDragged = true;
    if (!galleryWasDragged) return;

    const maxOffset = getMaxGalleryIndex() * getGalleryStep();
    const offset = Math.min(0, Math.max(-maxOffset, -galleryIndex * getGalleryStep() + distanceX));
    galleryTrack.style.transform = `translateX(${offset}px)`;
  });

  gallerySlider.addEventListener('pointerup', endGalleryPointer);
  gallerySlider.addEventListener('pointercancel', endGalleryPointer);
}

galleryItems.forEach((item) => {
  const link = item.querySelector('a');
  if (!link) return;

  item.setAttribute('tabindex', '0');

  item.addEventListener('click', () => {
    if (galleryWasDragged) {
      galleryWasDragged = false;
      return;
    }
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
  if (dropdown && !dropdown.contains(event.target)) {
    dropdown.classList.remove('open');
  }
});
