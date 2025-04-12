import { ApiService, StorageService } from './services.js';
import { Templates } from './templates.js';
import { showExerciseDetails } from './modal_exercise.js';
import { Quote } from './quote.js';
import { ExerciseCard } from './exercise-card.js';

const FilterTypes = Object.freeze({
  MUSCLES: 'Muscles',
  BODY_PARTS: 'Body parts',
  EQUIPMENT: 'Equipment',
});
let currentPage = 1;
let currentFilterType = FilterTypes.MUSCLES;
let currentFilter;
let currentKeyword;
const filtersLimit = 12;
const exercisesLimit = 10;

export async function InitializeExercisesSection() {
  drawFilterTypes();
  addSearchEvents();
  await drawExerciseFilters(currentFilterType);
  await drawDailyQuote();
}

async function drawDailyQuote() {
  const quoteElem = new Quote(Quote.PAGES.HOME, 'exercises-sidebar');
  const { quote, author } = await StorageService.loadDailyQuote();
  quoteElem.updateQuote({ quote, author });
}

async function drawFilterTypes() {
  let html = '';
  for (let key in FilterTypes) {
    html += Templates.filterTypeHtml(
      FilterTypes[key],
      FilterTypes[key] == currentFilterType
    );
  }
  document.getElementById('filter-types').innerHTML = html;
  addFilterTypeEvents();
}

async function drawExerciseFilters() {
  const filtersResponse = await ApiService.fetchFilters(
    currentFilterType,
    currentPage,
    filtersLimit
  );
  let html = '';
  for (let filter of filtersResponse.results) {
    html += Templates.exerciseFilterHtml(filter);
  }
  document.getElementById('exercises').style.display = 'none';
  document.getElementById('filters').style.display = 'flex';
  document.getElementById('label-search').style.display = 'none';
  document.getElementById('filters').innerHTML = html;

  drawPageButtons(filtersResponse.totalPages);
  addFilterEvents();
  displayNoItemsText(filtersResponse.results.length);
}

function drawPageButtons(totalPages) {
  let html = '';
  for (let i = 1; i <= totalPages; i++) {
    html += Templates.pageNumberButtonHtml(i, i == currentPage);
  }
  document.getElementById('pages').innerHTML = html;
  addPageButtonEvents();
}

async function drawExercises() {
  const listElem = document.getElementById('exercises');
  const muscle = currentFilterType == FilterTypes.MUSCLES ? currentFilter : '';
  const bodypart =
    currentFilterType == FilterTypes.BODY_PARTS ? currentFilter : '';
  const equipment =
    currentFilterType == FilterTypes.EQUIPMENT ? currentFilter : '';
  const exercisesResponse = await ApiService.fetchExercises(
    bodypart,
    muscle,
    equipment,
    currentKeyword,
    currentPage,
    exercisesLimit
  );

  for (let exercise of exercisesResponse.results) {
    const card = new ExerciseCard();
    card.startBtn.addEventListener('pointerup', async function (e) {
      const isFavorite = StorageService.loadFavorites().some(x => x._id === exercise.id);
      showExerciseDetails(exercise, isFavorite);
    });
    card.updateCard(exercise);
    listElem.append(card.card);
  }

  document.getElementById('filters').style.display = 'none';
  document.getElementById('label-search').style.display = 'block';
  document.getElementById('exercises').style.display = 'flex';

  drawPageButtons(exercisesResponse.totalPages);
  displayNoItemsText(exercisesResponse.results.length);
}

function displayNoItemsText(length) {
  document.getElementById('noitems').style.display =
    length == 0 ? 'block' : 'none';
  document.querySelector('.exercises-layout').style.flexDirection =
    length == 0 ? 'row' : 'column';
}

function addFilterTypeEvents() {
  document.querySelectorAll('a[name="filter-type"]').forEach(btn => {
    btn.addEventListener('click', async function (e) {
      e.preventDefault();
      if (currentFilterType != this.dataset.filterType || currentFilter) {
        currentFilterType = this.dataset.filterType;
        currentPage = 1;
        currentFilter = null;
        currentKeyword = '';
        document.getElementById('search').value = '';
        document.querySelectorAll('.exercises-filter-type').forEach(el => {
          el.classList.remove('active');
        });
        this.classList.add('active');
        document.getElementById('exercises-title').innerHTML = 'Exercises';
        await drawExerciseFilters();
      }
    });
  });
}

function addFilterEvents() {
  document.querySelectorAll('li[name="filter-item"]').forEach(btn => {
    btn.addEventListener('click', async function (e) {
      e.preventDefault();
      currentFilter = this.dataset.filter;
      currentPage = 1;
      document.getElementById('exercises-title').innerHTML +=
        Templates.exercisesTitleFilter(currentFilter);
      await drawExercises();
    });
  });
}

function addPageButtonEvents() {
  document.querySelectorAll('a[name="page-number-button"]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      currentPage = this.dataset.pageNumber;
      if (currentFilter) {
        drawExercises();
      } else {
        drawExerciseFilters();
      }
    });
  });
}

function addSearchEvents() {
  document.getElementById('search').addEventListener('keyup', function (e) {
    e.preventDefault();
    currentKeyword = this.value.trim();
    drawExercises();
  });
}
