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
const filtersLimit = 12;
const exercisesLimit = 10;
let currentPage = 1;
let currentFilterType = FilterTypes.MUSCLES;
let currentFilter;
let currentKeyword;

const loader = document.querySelector('.loader');

export async function InitializeExercisesSection() {
  drawFilterTypes();
  addSearchEvents();
  loader.classList.add('visible');
  await drawExerciseFilters(currentFilterType);
  loader.classList.remove('visible');
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
  if (totalPages == 1) {
    document.getElementById('pages').innerText = '';
    return;
  }
  let html = '';
  if (totalPages < 10) {
    for (let i = 1; i <= totalPages; i++) {
      html += Templates.pageNumberButtonHtml(i, i == currentPage);
    }
  } else {
    let firstPageNumber = currentPage - 3 > 1 ? currentPage - 3 : 1;
    const lastPageNumber =
      totalPages - firstPageNumber < 6 ? totalPages : firstPageNumber + 6;
    firstPageNumber =
      lastPageNumber - firstPageNumber < 6
        ? lastPageNumber - 6
        : firstPageNumber;

    html += Templates.pageNavigationButton(
      1,
      'start',
      currentPage > 1 ? 'active' : 'disabled'
    );
    html += Templates.pageNavigationButton(
      currentPage - 1,
      'prev',
      currentPage > 1 ? 'active' : 'disabled'
    );
    if (firstPageNumber > 1) html += Templates.pageNumberDots();

    for (let i = firstPageNumber; i <= lastPageNumber; i++) {
      html += Templates.pageNumberButtonHtml(i, i == currentPage);
    }
    if (lastPageNumber < totalPages) html += Templates.pageNumberDots();

    html += Templates.pageNavigationButton(
      currentPage + 1,
      'next',
      currentPage < totalPages ? 'active' : 'disabled'
    );
    html += Templates.pageNavigationButton(
      totalPages,
      'end',
      currentPage < totalPages ? 'active' : 'disabled'
    );
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

  listElem.innerHTML = '';

  for (let exercise of exercisesResponse.results) {
    const card = new ExerciseCard();
    card.startBtn.addEventListener('pointerup', async function (e) {
      const isFavorite = StorageService.loadFavorites().some(
        x => x._id === exercise._id
      );
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
  document.querySelectorAll('[name="page-number-button"]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      currentPage = +this.dataset.pageNumber;
      if (currentFilter) {
        drawExercises();
      } else {
        drawExerciseFilters();
      }
    });
  });
}

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

let lastKeyword = '';

function addSearchEvents() {
  const searchInput = document.getElementById('search');

  const debouncedSearch = debounce(function () {
    const keyword = this.value.trim();
    if (keyword !== lastKeyword) {
      lastKeyword = keyword;
      currentKeyword = keyword;
      drawExercises();
    }
  }, 1000);

  searchInput.addEventListener('keyup', function (e) {
    const keyword = this.value.trim();
    if (e.key === 'Enter') {
      if (keyword !== lastKeyword) {
        lastKeyword = keyword;
        currentKeyword = keyword;
        drawExercises(); // fire immediately
      }
    } else {
      debouncedSearch.call(this);
    }
  });
}
