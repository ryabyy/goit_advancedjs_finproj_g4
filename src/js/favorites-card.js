import { Card } from './card.js';

export class FavoritesCard extends Card {
  constructor(listId) {
    super(listId);
  }

  getPostTagItem() {
    const item = document.createElement('div');
    const btn = document.createElement('button');
    btn.append(this.getIcon('16', '16', 'trash-black'));
    item.append(btn);
    return item;
  }

  #onRemove() {}
}