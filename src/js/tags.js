const tagsList = document.querySelector('.js-hero__tags-list');
const tags = ['Sport', 'Healthy', 'Workout', 'Diet'];

function createTagsMarkup() {
  return tags.map(tag =>
    `<li class="hero__tags-item js-hero__tags-item">#${tag}</li>`,
  )
    .join('');
}


tagsList.innerHTML = createTagsMarkup();