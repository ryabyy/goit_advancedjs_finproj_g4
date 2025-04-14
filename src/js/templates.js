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

  static pageNumberButtonHtml(pageNumber, disabled) {
    return disabled
      ? `<li><span class="exercises-page-button disabled">${pageNumber}</span></li>`
      : `<li><a href='#' class='exercises-page-button' name='page-number-button' data-page-number='${pageNumber}'>${pageNumber}</a></li>`;
  }

  static pageNumberDots() {
    return `<li><span class="exercises-page-button noclick">...</span></li>`;
  }

  static pageNavigationButton(pageNumber, type, state) {
    return `  
        <svg name='page-number-button' data-page-number='${pageNumber}' class='exercises-page-button ${state}' width="40" height="40">
          <use href="./sprite.svg#page-pagination-arrow-${type}-${state}"></use>
        </svg>
        `;
  }
}
