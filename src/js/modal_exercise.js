import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export function showExerciseDetails(exercise) {
  // FIXME
  exercise = TEST_EXERCISE;

  const infoItems = {
    Target: exercise.target,
    'Body part': exercise.bodyPart,
    Equipment: exercise.equipment,
    Popular: exercise.popularity,
    'Burned Calories': `${exercise.burnedCalories} / ${exercise.time} min`,
  };

  // FIXME remove not neded
  // <svg class="modal-close-button-icon" width="24" height="24">
  //   <use href="./img/sprite.svg#icon-close"></use>
  // </svg>

  // <svg class="modal-close-button-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  //                <path d="M11 1L1 11M1 1L11 11" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  //            </svg>
  const instance = basicLightbox.create(
    `
        <div class="modal_container">
            <button class="modal-close-button" type="button">
              <svg class="modal-close-button-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M11 1L1 11M1 1L11 11" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
             </svg>
            </button>
            <img class="modal_exercise_image" src="${
              exercise.gifUrl
            }" width="295" height="258">

            <div class="modal_exercise_details_layout">
              <p class="modal_exercise_title">${exercise.name}</p>

              <div class="modal_exercise_rating_layout">
                  <p class="modal_exercise_rating">${exercise.rating.toString()}</p>
              </div>

              <div class="model_exercise_info_layout">
                  ${createInfoLayoutMarkup(infoItems)}
              </div>

              <p class="modal_exercise_description">${exercise.description}</p>

              <button class="modal_exercise_add_to_favourites_button">Add to favorites</button>
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
}

function createInfoLayoutMarkup(infoItems) {
  // TODO exclude item if null/empty
  const markups = [];

  for (const name in infoItems) {
    const value = infoItems[name];

    markups.push(
      `<div class="modal_exercise_info_item">
            <p class="name">${name}</p>
            <p class="value">${value}</p>
      </div>`
    );
  }

  return markups.join('');
}

const TEST_EXERCISE = {
  _id: '64f389465ae26083f39b17a4',
  bodyPart: 'waist',
  equipment: 'body weight',
  gifUrl: 'https://ftp.goit.study/img/power-pulse/gifs/0003.gif',
  name: 'air bike',
  target: 'abs',
  description:
    "This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They're essential for maintaining posture, stability, and generating force in many movements. Exercises that target the abs include crunches, leg raises, and planks.",
  rating: 4.33,
  burnedCalories: 312,
  time: 3,
  popularity: 4,
};
