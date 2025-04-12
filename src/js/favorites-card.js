import { Card } from './card.js';

export class FavoritesCard extends Card {
  #removeBtn;

  constructor() {
    super();
    this.#removeBtn = this.card.querySelector('.exer-card__post-tag button');
  }

  get removeBtn() {
    return this.#removeBtn;
  }

  getPostTagItem() {
    const item = super.getPostTagItem();
    const removeBtn = document.createElement('button');
    removeBtn.append(this.getIcon('16', '16', 'trash-black'));
    item.append(removeBtn);
    return item;
  }
}