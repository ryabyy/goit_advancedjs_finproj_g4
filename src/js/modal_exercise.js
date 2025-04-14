import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { StorageService } from './services';
import { updateFavoritesList } from './favorites';

export function showExerciseDetails(exercise, isFavorite) {
  const infoItems = {
    Target: exercise.target,
    'Body part': exercise.bodyPart,
    Equipment: exercise.equipment,
    Popular: exercise.popularity,
    'Burned Calories': `${exercise.burnedCalories} / ${exercise.time} min`,
  };

  const instance = basicLightbox.create(
    `
        <div class="modal-container">
            <button class="modal-close-button" type="button">
              <svg class="modal-close-button-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M11 1L1 11M1 1L11 11" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
             </svg>
            </button>
            <img class="modal-exercise-image" src="${
              exercise.gifUrl
            }" width="295" height="258">

            <div class="modal-exercise-details-layout">
              <p class="modal-exercise-title">${exercise.name}</p>

              <div class="modal-exercise-rating-layout">
                  <p class="modal-exercise-rating">${exercise.rating.toString()}</p>
                  ${createRatingStarsMarkup(exercise.rating)}
              </div>

              <div class="model-exercise-info-layout">
                  ${createInfoLayoutMarkup(infoItems)}
              </div>

              <p class="modal-exercise-description">${exercise.description}</p>

              <button class="modal-exercise-add-to-favorites-button">
                ${createFavButtonInnerMarkup(isFavorite)}
              </button>
            </div>
        </div>
    `,
    {
      onShow: instance => {
        instance.element().querySelector('.modal-close-button').onclick =
          instance.close;
        window.addEventListener('keydown', function (event) {
          if (event.key === 'Escape') {
            instance.close;
          }
        });
      },
    }
  );

  instance.show();

  const favButton = document.querySelector(
    '.modal-exercise-add-to-favorites-button'
  );

  favButton.addEventListener('click', event => {
    if (isFavorite) {
      StorageService.removeExerciseFromFavorites(exercise._id);
    } else {
      StorageService.addExerciseToFavorites(exercise);
    }
    isFavorite = !isFavorite;
    favButton.innerHTML = createFavButtonInnerMarkup(isFavorite);
    updateFavoritesList();
  });
}

function createRatingStarsMarkup(rating) {
  const markups = [];

  for (let i = 1; i <= 5; i++) {
    const iconName = i <= rating ? 'rating-star-orange' : 'rating-star-gray';
    markups.push(
      `
        <div class="rating-icon-wrapper">
          <svg class="rating-icon" width="14" height="13">
            <use href="./sprite.svg#${iconName}" />
          </svg>
        </div>
      `
    );
  }

  return markups.join('');
}

function createInfoLayoutMarkup(infoItems) {
  const markups = [];

  for (const name in infoItems) {
    const value = infoItems[name];

    markups.push(
      `<div class="modal-exercise-info-item">
            <p class="name">${name}</p>
            <p class="value">${value}</p>
      </div>`
    );
  }

  return markups.join('');
}

function createFavButtonInnerMarkup(isFavorite) {
  return !isFavorite
    ? `
        Add to favorites
        <svg class="favorite-button-icon" width="18" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.3666 2.84172C16.941 2.41589 16.4356 2.0781 15.8794 1.84763C15.3232 1.61716 14.727 1.49854 14.1249 1.49854C13.5229 1.49854 12.9267 1.61716 12.3705 1.84763C11.8143 2.0781 11.3089 2.41589 10.8833 2.84172L9.99994 3.72506L9.1166 2.84172C8.25686 1.98198 7.0908 1.49898 5.87494 1.49898C4.65907 1.49898 3.49301 1.98198 2.63327 2.84172C1.77353 3.70147 1.29053 4.86753 1.29053 6.08339C1.29053 7.29925 1.77353 8.46531 2.63327 9.32506L3.5166 10.2084L9.99994 16.6917L16.4833 10.2084L17.3666 9.32506C17.7924 8.89943 18.1302 8.39407 18.3607 7.83785C18.5912 7.28164 18.7098 6.68546 18.7098 6.08339C18.7098 5.48132 18.5912 4.88514 18.3607 4.32893C18.1302 3.77271 17.7924 3.26735 17.3666 2.84172Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `
    : `
        Remove from favorites
        <svg class="favorite-button-icon" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.3333 4.99996V4.33329C12.3333 3.39987 12.3333 2.93316 12.1517 2.57664C11.9919 2.26304 11.7369 2.00807 11.4233 1.84828C11.0668 1.66663 10.6001 1.66663 9.66667 1.66663H8.33333C7.39991 1.66663 6.9332 1.66663 6.57668 1.84828C6.26308 2.00807 6.00811 2.26304 5.84832 2.57664C5.66667 2.93316 5.66667 3.39987 5.66667 4.33329V4.99996M7.33333 9.58329V13.75M10.6667 9.58329V13.75M1.5 4.99996H16.5M14.8333 4.99996V14.3333C14.8333 15.7334 14.8333 16.4335 14.5608 16.9683C14.3212 17.4387 13.9387 17.8211 13.4683 18.0608C12.9335 18.3333 12.2335 18.3333 10.8333 18.3333H7.16667C5.76654 18.3333 5.06647 18.3333 4.53169 18.0608C4.06129 17.8211 3.67883 17.4387 3.43915 16.9683C3.16667 16.4335 3.16667 15.7334 3.16667 14.3333V4.99996" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `;
}
