const Container = document.querySelector('.categories-container');
const Items = Container.querySelectorAll('.category');
const ActiveItem = Container.querySelector('.category--active');
const Switcher = Container.querySelector('.switcher');

function moveSwitcherTo(item) {
  Switcher.style.width = `${item.offsetWidth}px`;
  Switcher.style.left = `${item.offsetLeft}px`;
}

function isActiveItems(elements, activeElem, container) {
  if (activeElem) {
    moveSwitcherTo(activeElem);
  }
  
  elements.forEach(element => {
    const link = element.querySelector('.category__link');
    
    link.addEventListener('click', event => {
      event.preventDefault();

      container.querySelector('.category--active')?.classList.remove('category--active');

      element.classList.add('category--active');
      
      moveSwitcherTo(element);
      
      const href = link.getAttribute('href');
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
}

isActiveItems(Items, ActiveItem, Container);
