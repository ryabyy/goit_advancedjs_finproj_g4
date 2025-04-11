export class Templates {
  static exercisesTitleFilter(filter) {
    return ` / <span class="exercises-title-filter">${filter}</span>`;
  }

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
      <li class="exer-list__card">
        <div class="exer-card__header">
          <div class="exer-card__tag-box">
            <div class="exer-card__tag">WORKOUT</div>
            <div class="exer-card__post-tag">
            ${exercise.rating.toFixed(1)}
            </div>
                <svg width="16" height="16">
                  <use xlink:href="../assets/img/sprite.svg#rating-star-orange"></use>
                </svg>
            
          </div>
          <button data-exercise-id='${exercise._id}' id='exercise-start' class="exer-card__start-btn">
            Start
            <svg width="16" height="16">
              <use xlink:href="../assets/img/sprite.svg#arrow-right"></use>
            </svg>
          </button>
        </div>
        <div class="exer-card__name">
          <svg width="24" height="24" class="exer-card__name__icon">
            <use xlink:href="../assets/img/sprite.svg#icon-running-man-black-bg"></use>
          </svg>
          <p class="exer-card__name__text">${exercise.name}</p>
        </div>
        <div class="exer-card__stats">
          <div class="exer-card__stats__param cal">
            Burned calories: <span>${exercise.burnedCalories}</span>
          </div>
          <div class="exer-card__stats__param part">
            Body part: <span>${exercise.bodyPart}</span>
          </div>
          <div class="exer-card__stats__param target">
            Target: <span>${exercise.target}</span>
          </div>
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
