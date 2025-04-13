import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { ApiService, StorageService, ApiError } from './js/services';
import { InitializeExercisesSection } from './js/exercises';
import './js/favorites.js';
import './js/tags.js';
import './js/subscribe-form.js';

document.addEventListener('DOMContentLoaded', function () {
  InitializeExercisesSection();
  initializeTopNavigation();
  initializeScrollToTop();
});

function initializeTopNavigation() {
  document
    .getElementById('home-page-button')
    .addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('home-page').style.display = 'block';
      document.getElementById('favorites-page').style.display = 'none';
    });
  document
    .getElementById('logo-button')
    .addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('home-page').style.display = 'block';
      document.getElementById('favorites-page').style.display = 'none';
    });
  document
    .getElementById('favorites-page-button')
    .addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('home-page').style.display = 'none';
      document.getElementById('favorites-page').style.display = 'block';
    });
}

function initializeScrollToTop() {
  const scrollButton = document.getElementById('top-button');
  scrollButton.addEventListener('click', function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  window.onscroll = function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollButton.style.display = 'block';
    } else {
      scrollButton.style.display = 'none';
    }
  };

  const iconUse = document.getElementById('top-button-icon');

  function updateIconBasedOnScreenSize() {
    if (window.innerWidth <= 768) {
      iconUse.setAttribute('href', './sprite.svg#arrow-to-top-small');
    } else {
      iconUse.setAttribute('href', './sprite.svg#arrow-to-top-big');
    }
  }

  updateIconBasedOnScreenSize();

  window.addEventListener('resize', updateIconBasedOnScreenSize);
}
