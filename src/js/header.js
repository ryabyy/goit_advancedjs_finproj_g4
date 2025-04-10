const container = document.querySelector('.container-categories');
const switcher = container.querySelector('.switcer');
const items = container.querySelectorAll('.categories-item');

function moveSwitcherTo(item) {
  switcher.style.width = `${item.offsetWidth}px`;
  switcher.style.left = `${item.offsetLeft}px`;
}

const activeItem = container.querySelector('.categories-item.active');
if (activeItem) {
  moveSwitcherTo(activeItem);
}

items.forEach(item => {
  const link = item.querySelector('.categories-link');

  link.addEventListener('click', e => {
    e.preventDefault();

    container
      .querySelector('.categories-item.active')
      ?.classList.remove('active');
    item.classList.add('active');

    moveSwitcherTo(item);

    const href = link.getAttribute('href');
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  });
});
