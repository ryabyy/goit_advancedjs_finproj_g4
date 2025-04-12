import { Card } from './card.js';

export class ExerciseCard extends Card {
  constructor(listId) {
    super(listId);
  }

  updateList(list) {
    super.updateList(list);
    list.forEach(({ rating }, i) => {
      this.listContainer
        .children[i].querySelector('.exer-card__post-tag span')
        .innerText = this.#numberToString(rating);
    });
  }

  getPostTagItem() {
    const item = super.getPostTagItem();
    const span = document.createElement('span');
    const icon = this.getIcon('18', '18', 'rating-star-orange');
    item.append(span, icon);
    return item;
  }

  #numberToString(num) {
    return Number.isInteger(num) ? num + '.0' : num.toString();
  }
}