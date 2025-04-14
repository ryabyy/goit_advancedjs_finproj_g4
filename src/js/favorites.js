import { FavoritesCard } from './favorites-card.js';
import { ApiService, StorageService } from './services.js';
import { showExerciseDetails } from './modal_exercise.js';
import { Quote } from './quote.js';

const EMPTY_MSG =
  "It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.";

const quoteElem = new Quote(Quote.PAGES.FAVORITES, 'favorites__info-panel');
const listContainer = document.querySelector('.favorites__list');
const emptyListElem = document.createElement('div');
const emptyListText = document.createElement('p');
const listElem = document.createElement('ul');
const favNavBtn = document.querySelector('#favorites-page-button');

emptyListElem.append(emptyListText);
emptyListElem.classList.add('list__empty-msg');
emptyListText.innerText = EMPTY_MSG;
listElem.classList.add('exer-list');

export function updateFavoritesList() {
  const favList = StorageService.loadFavorites();
  if (favList.length === 0) {
    showEmptyMsg();
    return;
  }
  updateList(favList);
}

favNavBtn.addEventListener('pointerup', async e => {
  await updateQuote();
  updateFavoritesList();
});

function updateList(listData) {
  clearList();
  listContainer.append(listElem);
  listData.forEach(({ _id, name, burnedCalories, bodyPart, target }) => {
    const card = addCard(_id);
    card.updateCard({ name, burnedCalories, bodyPart, target });
  });
}

function clearList() {
  while (listElem.lastElementChild) {
    listElem.removeChild(listElem.lastElementChild);
  }
  listElem.remove();
  emptyListElem.remove();
}

async function updateQuote() {
  const { quote, author } = await StorageService.loadDailyQuote();
  quoteElem.updateQuote({ quote, author });
}

function addCard(id) {
  const card = new FavoritesCard();
  card.removeBtn.addEventListener('pointerup', () => {
    removeCard(card.card, id);
  });
  card.startBtn.addEventListener('pointerup', async function (e) {
    const exercise = await ApiService.fetchExerciseByID(id);
    const isFavorite = StorageService.loadFavorites().some(
      x => x._id === exercise._id
    );
    showExerciseDetails(exercise, isFavorite);
  });
  listElem.append(card.card);
  return card;
}

function removeCard(card, id) {
  StorageService.removeExerciseFromFavorites(id);
  card.remove();
  if (StorageService.loadFavorites().length === 0) {
    showEmptyMsg();
  }
}

function showEmptyMsg() {
  listElem.remove();
  listContainer.append(emptyListElem);
}
