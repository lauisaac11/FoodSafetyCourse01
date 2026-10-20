(function () {
  'use strict';

  var nav = document.getElementById('primary-nav');
  var menuToggle = document.querySelector('.menu-toggle');
  var carousel = document.querySelector('.hero-carousel');
  var slides = document.querySelectorAll('[data-slide]');
  var currentSlide = 0;
  var carouselTimer = null;

  function preventNavigation(event) {
    if (event.target.closest('a')) event.preventDefault();
  }

  document.addEventListener('click', preventNavigation, true);
  document.addEventListener('auxclick', preventNavigation, true);
  document.addEventListener('submit', function (event) {
    event.preventDefault();
  }, true);

  menuToggle.addEventListener('click', function () {
    var isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach(function (slide, slideIndex) {
      var active = slideIndex === currentSlide;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
    });
  }

  function restartTimer() {
    window.clearInterval(carouselTimer);
    carouselTimer = null;
    if (document.hidden || slides.length < 2) return;
    carouselTimer = window.setInterval(function () {
      showSlide(currentSlide + 1);
    }, 5000);
  }

  document.getElementById('slide-prev').addEventListener('click', function () {
    showSlide(currentSlide - 1);
    restartTimer();
  });

  document.getElementById('slide-next').addEventListener('click', function () {
    showSlide(currentSlide + 1);
    restartTimer();
  });

  carousel.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(currentSlide + (event.key === 'ArrowRight' ? 1 : -1));
      restartTimer();
    }
  });

  document.addEventListener('visibilitychange', restartTimer);
  restartTimer();
}());
