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
               <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 13" width="14" height="13" fill="none">
                <path d="M6.04894 0.927052C6.3483 0.0057416 7.6517 0.00574088 7.95106 0.927052L8.79611 3.52786C8.92999 3.93989 9.31394 4.21885 9.74717 4.21885H12.4818C13.4505 4.21885 13.8533 5.45846 13.0696 6.02786L10.8572 7.63525C10.5067 7.8899 10.3601 8.34127 10.494 8.75329L11.339 11.3541C11.6384 12.2754 10.5839 13.0415 9.80017 12.4721L7.58779 10.8647C7.2373 10.6101 6.7627 10.6101 6.41222 10.8647L4.19983 12.4721C3.41612 13.0415 2.36164 12.2754 2.66099 11.3541L3.50604 8.75329C3.63992 8.34127 3.49326 7.8899 3.14277 7.63525L0.930391 6.02787C0.146677 5.45846 0.549452 4.21885 1.51818 4.21885H4.25283C4.68606 4.21885 5.07001 3.93989 5.20389 3.52786L6.04894 0.927052Z" fill="#EEA10C"></path>
              </svg>
          </div>
          <button data-exercise-id='${
            exercise._id
          }' name='exercise-start' class="exer-card__start-btn">
            Start
           <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
              <path stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-miterlimit="4"
                    stroke-width="2.7733"
                    stroke="#242424"
                    fill="#242424"
                    d="M16 29.867l13.867-13.867M29.867 16l-13.867-13.867M29.867 16h-27.733">
              </path>
            </svg>
          </button>
        </div>
        <div class="exer-card__name">
          <svg width="24" height="24" class="exer-card__name__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
            <circle cx="16" cy="16" r="16" fill="#242424" fill-opacity="1"></circle>
            <path d="M24.7293 11.907C24.4611 11.594 23.9834 11.5528 23.6631 11.8138L21.5637 13.5369L20.5983 11.1998C20.564 11.1121 20.5119 11.0384 20.452 10.9734C20.2547 10.5446 19.9122 10.1763 19.44 9.96297C19.235 9.872 19.0233 9.82326 18.8116 9.79944C18.765 9.77561 18.7229 9.7442 18.6697 9.72796L14.9754 8.72184C14.7681 8.6666 14.5597 8.70234 14.3891 8.79981C14.1862 8.86696 14.0122 9.011 13.9291 9.22002L12.538 12.7149C12.3873 13.0951 12.5801 13.5239 12.9703 13.6734C13.3582 13.8207 13.7983 13.6311 13.9501 13.2499L15.125 10.2987L16.8076 10.7557C16.7666 10.8207 16.7222 10.8814 16.689 10.9507L14.532 15.5188C14.501 15.586 14.4844 15.6542 14.4622 15.7235L11.8408 20.0177L7.45378 21.4516C6.95721 21.8144 6.85192 22.4978 7.2188 22.983C7.5879 23.4692 8.28951 23.5721 8.78497 23.2137L13.274 21.7029C13.4114 21.6054 13.5112 21.4776 13.5866 21.34C13.6431 21.2816 13.7074 21.235 13.7506 21.1624L15.3135 18.6022L18.0878 20.9123L15.1195 24.1808C14.7105 24.6313 14.7515 25.3255 15.2148 25.7241C15.677 26.1259 16.3853 26.0836 16.7965 25.6309L20.5008 21.5534C20.6161 21.4278 20.6848 21.2826 20.7313 21.131C20.759 21.0487 20.759 20.9632 20.7657 20.8776C20.7657 20.8343 20.7823 20.7953 20.779 20.7552C20.769 20.4563 20.6449 20.1661 20.3944 19.9592L17.8417 17.8322C18.0257 17.661 18.182 17.4574 18.2951 17.2181L19.9488 13.7189L20.4786 15.0975C20.5008 15.2199 20.5429 15.3401 20.6316 15.4409C20.7114 15.534 20.8134 15.5957 20.922 15.6391C20.9331 15.6445 20.9464 15.6456 20.9597 15.6488C21.0284 15.6726 21.0982 15.6954 21.1703 15.6986C21.2556 15.7062 21.3421 15.6954 21.4296 15.6715C21.4318 15.6705 21.4329 15.6705 21.4329 15.6705C21.4562 15.665 21.4795 15.6694 21.5028 15.6596C21.6258 15.6141 21.72 15.5372 21.8009 15.4474L24.8136 12.9488C25.1339 12.6857 24.9987 12.22 24.7293 11.907Z" fill="#F4F4F4"></path>
            <path d="M20.9191 10.1263C22.0853 10.1263 23.0306 9.20259 23.0306 8.06314C23.0306 6.9237 22.0853 6 20.9191 6C19.753 6 18.8076 6.9237 18.8076 8.06314C18.8076 9.20259 19.753 10.1263 20.9191 10.1263Z" fill="#F4F4F4"></path>
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
