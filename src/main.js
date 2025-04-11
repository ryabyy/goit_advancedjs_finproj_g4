import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { ApiService, StorageService, ApiError } from './js/services';
import { InitializeExercisesSection } from './js/exercises';

import './js/tags.js';

///////////////////// API + Local Usage examples: /////////////////////

// // StorageService.clearDailyQuote();
// // StorageService.clearFavorites();

// const quote = await StorageService.loadDailyQuote();
// console.log(quote);

// const favorites = StorageService.loadFavorites();
// console.log(favorites);

// const filters = await ApiService.fetchFilters('Body parts', 1, 10);
// const exercises = await ApiService.fetchExercises('back', '', '', 'ups', 1, 10);
// const exercise = await ApiService.fetchExerciseByID('64f389465ae26083f39b17a2');

// favorites.push(exercise);
// StorageService.storeFavorites(favorites);

// try {
//   const res = await ApiService.addSubscription('test@gmail.com');
// } catch (error) {
//   if (error instanceof ApiError) {
//     if (error.statusCode === 409) {
//       iziToast.warning({
//         message: 'Provided email is already subscribed!',
//         position: 'topCenter',
//       });
//     }
//   }
// }

// try {
//   const res = await ApiService.submitExerciseRating(
//     '64f389465ae26083f39b17a2',
//     5,
//     'test@gmail.com'
//   );
// } catch (error) {
//   if (error instanceof ApiError) {
//     if (error.statusCode === 409) {
//       iziToast.warning({
//         message: 'This email already used to rate the exercise!',
//         position: 'topCenter',
//       });
//     }
//   }
// }

///////////////////// End of API + Local examples: /////////////////////

document.addEventListener('DOMContentLoaded', function () {
  InitializeExercisesSection();
});
