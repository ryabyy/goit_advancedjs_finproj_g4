import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { StorageService } from './services';

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
  });
}

function createRatingStarsMarkup(rating) {
  const markups = [];

  for (let i = 1; i <= 5; i++) {
    const icon = i <= rating ?
     `<svg class="rating-icon" xmlns="http$$://www.w3.org/2000/svg" viewBox="0 0 14 13" width="14" height="13" fill="none">
        <path d="M6.04894 0.927052C6.3483 0.0057416 7.6517 0.00574088 7.95106 0.927052L8.79611 3.52786C8.92999 3.93989 9.31394 4.21885 9.74717 4.21885H12.4818C13.4505 4.21885 13.8533 5.45846 13.0696 6.02786L10.8572 7.63525C10.5067 7.8899 10.3601 8.34127 10.494 8.75329L11.339 11.3541C11.6384 12.2754 10.5839 13.0415 9.80017 12.4721L7.58779 10.8647C7.2373 10.6101 6.7627 10.6101 6.41222 10.8647L4.19983 12.4721C3.41612 13.0415 2.36164 12.2754 2.66099 11.3541L3.50604 8.75329C3.63992 8.34127 3.49326 7.8899 3.14277 7.63525L0.930391 6.02787C0.146677 5.45846 0.549452 4.21885 1.51818 4.21885H4.25283C4.68606 4.21885 5.07001 3.93989 5.20389 3.52786L6.04894 0.927052Z" fill="#EEA10C"></path>
      </svg>
`
     :
   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19" width="20" height="19" fill="none">
      <path d="M9.04894 0.927052C9.3483 0.00574112 10.6517 0.00573993 10.9511 0.927051L12.4697 5.60081C12.6035 6.01284 12.9875 6.2918 13.4207 6.2918H18.335C19.3037 6.2918 19.7065 7.53141 18.9228 8.10081L14.947 10.9894C14.5966 11.244 14.4499 11.6954 14.5838 12.1074L16.1024 16.7812C16.4017 17.7025 15.3472 18.4686 14.5635 17.8992L10.5878 15.0106C10.2373 14.756 9.7627 14.756 9.41221 15.0106L5.43648 17.8992C4.65276 18.4686 3.59828 17.7025 3.89763 16.7812L5.41623 12.1074C5.55011 11.6954 5.40345 11.244 5.05296 10.9894L1.07722 8.10081C0.293507 7.53141 0.696283 6.2918 1.66501 6.2918H6.57929C7.01252 6.2918 7.39647 6.01284 7.53035 5.60081L9.04894 0.927052Z" fill="#F4F4F4" fill-opacity="0.2"></path>
    </svg>
`;

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
