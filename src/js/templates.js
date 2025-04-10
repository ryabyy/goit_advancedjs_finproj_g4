export class Templates {
  static filterTypeHtml(filterType, active) {
    return `<li><a href="#" class='exercises-filter-type ${
      active ? 'active' : ''
    }' name='filter-type' data-filter-type='${filterType}'>${filterType}</a></li>`;
  }

  static exerciseFilterHtml(filter) {
    return `<li class="exercises-filter-card" name='filter-item' data-filter='${filter.name}' style="background-image: url('${filter.imgURL}')">
                <h3 class="exercises-filter-card-name">${filter.name}</h3>
                <p class="exercises-filter-card-type">${filter.filter}</p>
            </li>`;
  }

  static exerciseHtml(exercise) {
    return `
      <li class="exercises-card">
        <div class="exercises-card-top">
          <span class="exercises-tag">WORKOUT</span>
          <span class="exercises-rating">${Number(exercise.rating).toFixed(
            1
          )} <span class="exercises-star">★</span></span>
          <a href="#" class="exercises-start">Start →</a>
        </div>
        <div class="exercises-card-main">
          <div class="exercises-icon">🏃‍♂️</div>
          <h3 class="exercises-title">${exercise.name}</h3>
        </div>
        <div class="exercises-card-bottom">
          <span>Burned calories: <strong>${
            exercise.burnedCalories
          }</strong> / ${exercise.time} min</span>
          <span>Body part: <strong>${exercise.bodyPart}</strong></span>
          <span>Target: <strong>${exercise.target}</strong></span>
        </div>
      </li>
    `;
  }

  static pageNumberButtonHtml(pageNumber, disabled) {
    return disabled
      ? `<li><span class="exercises-page-button disabled">${pageNumber}</span></li>`
      : `<li><a href='#' class='exercises-page-button' name='page-number-button' data-page-number='${pageNumber}'>${pageNumber}</a></li>`;
  }
}
