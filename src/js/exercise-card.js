import { Card } from './card.js';

export class ExerciseCard extends Card {
  constructor() {
    super();
  }

  updateCard({ name, burnedCalories, bodyPart, target, rating }) {
    super.updateCard({ name, burnedCalories, bodyPart, target });
    this._card.querySelector('.exer-card__post-tag span')
      .innerText = this.#numberToString(rating);
  }

  _getPostTagItem() {
    const item = super._getPostTagItem();
    const span = document.createElement('span');
    const icon = this.getIcon('18', '18', 'rating-star-orange');
    item.append(span, icon);
    return item;
  }

  #numberToString(num) {
    return Number.isInteger(num) ? num + '.0' : num.toString();
  }
}