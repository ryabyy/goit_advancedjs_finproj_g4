import { ApiService, StorageService } from './services.js';
import { Templates } from './templates.js';
import { showExerciseDetails } from './modal_exercise.js';

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
  const quote = await StorageService.loadDailyQuote();
  document.getElementById('quote-author').innerText = quote.author;
  document.getElementById('quote-body').innerText = quote.quote;
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
  let html = '';
  for (let exercise of exercisesResponse.results) {
    html += Templates.exerciseHtml(exercise);
  }
  document.getElementById('filters').style.display = 'none';
  document.getElementById('label-search').style.display = 'block';
  document.getElementById('exercises').style.display = 'flex';
  document.getElementById('exercises').innerHTML = html;

  addStartExerciseEvents();
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

function addStartExerciseEvents() {
  document
    .getElementById('exercise-start')
    .addEventListener('click', async function (e) {
      e.preventDefault();
      const exercise = await ApiService.fetchExerciseByID(
        this.dataset.exerciseId
      );
      debugger;
      showExerciseDetails(exercise, false, function () {
        alert('added to favorites');
      });
    });
}
