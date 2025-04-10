import { ApiService } from './services.js';
import { Templates } from './templates.js';

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
  document.getElementById('search').style.display = 'none';
  document.getElementById('filters').innerHTML = html;

  drawPageButtons(filtersResponse.totalPages);
  addFilterEvents();

  document.getElementById('noitems').style.display =
  filtersResponse.results.length == 0 ? 'block' : 'none';
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
  document.getElementById('search').style.display = 'block';
  document.getElementById('exercises').style.display = 'flex';
  document.getElementById('exercises').innerHTML = html;

  drawPageButtons(exercisesResponse.totalPages);

  document.getElementById('noitems').style.display =
    exercisesResponse.results.length == 0 ? 'block' : 'none';
}

function addFilterTypeEvents() {
  document.querySelectorAll('a[name="filter-type"]').forEach(btn => {
    btn.addEventListener('click', async function () {
      if (currentFilterType != this.dataset.filterType || currentFilter) {
        currentFilterType = this.dataset.filterType;
        currentPage = 1;
        currentFilter = null;
        document.querySelectorAll('.exercises-filter-type').forEach(el => {
          el.classList.remove('active');
        });
        this.classList.add('active');
        await drawExerciseFilters();
      }
    });
  });
}

function addFilterEvents() {
  document.querySelectorAll('li[name="filter-item"]').forEach(btn => {
    btn.addEventListener('click', async function () {
      currentFilter = this.dataset.filter;
      currentPage = 1;
      await drawExercises();
    });
  });
}

function addPageButtonEvents() {
  document.querySelectorAll('a[name="page-number-button"]').forEach(btn => {
    btn.addEventListener('click', function () {
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
  document.getElementById('search').addEventListener('keyup', function () {
    currentKeyword = this.value.trim();
    drawExercises();
  });
}
