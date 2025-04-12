const burgerMenu = document.getElementById('burger-menu');
const sideMenu = document.getElementById('side-menu');
const sideMenuClose = document.getElementById('side-menu-close');
const sideMenuHomeButton = sideMenu.querySelector('.button-container .button:nth-child(1)');
const sideMenuFavoritesButton = sideMenu.querySelector('.button-container .button:nth-child(2)');

burgerMenu.addEventListener('click', () => {
  sideMenu.style.right = '0';
});

sideMenuClose.addEventListener('click', () => {
  sideMenu.style.right = '-100%';
});

document.addEventListener('click', (event) => {
  if (!sideMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
    sideMenu.style.right = '-100%';
  }
});

function switchSection(sectionId) {
  document.querySelectorAll('.category').forEach((category) => {
    category.classList.remove('category--active');
  });
  document.getElementById(sectionId).closest('.category').classList.add('category--active');
}

function closeSideMenu() {
  sideMenu.style.right = '-100%';
}

function initializeSideMenuNavigation() {
  sideMenuHomeButton.addEventListener('click', (e) => {
    e.preventDefault();
    switchSection('home-page-button');
    closeSideMenu();
    setTimeout(() => {
      document.getElementById('home-page').style.display = 'block';
      document.getElementById('favorites-page').style.display = 'none';
    }, 300);
  });

  sideMenuFavoritesButton.addEventListener('click', (e) => {
    e.preventDefault();
    switchSection('favorites-page-button');
    closeSideMenu();
    setTimeout(() => {
      document.getElementById('home-page').style.display = 'none';
      document.getElementById('favorites-page').style.display = 'block';
    }, 300);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeSideMenuNavigation();
});