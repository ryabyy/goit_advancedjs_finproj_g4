const tagsList = document.querySelector('.js-hero__tags-list');
const tags = ['Sport', 'Healthy', 'Workout', 'Diet'];

function renderTags() {
  tags.forEach(tag => {
    const li = document.createElement('li');
    li.classList.add('hero__tags-item', 'js-hero__tags-item');
    li.innerText = `#${tag}`;
    tagsList.append(li);
  });
}


renderTags();