export class Card{
  #STATS_CLASS_NAMES = { // enum
      CALORIES: 'cal',
      PART: 'part',
      TARGET: 'target',
  };
  #STATS_ITEMS = [
    { name: 'Burned calories', className: this.#STATS_CLASS_NAMES.CALORIES },
    { name: 'Body part', className: this.#STATS_CLASS_NAMES.PART },
    { name: 'Target', className: this.#STATS_CLASS_NAMES.TARGET },
  ];

  #card;
  #startBtn;

  constructor() {
    this.#card = this.#createCard();
    this.#startBtn = this.#card.querySelector('.exer-card__start-btn');
  }

  get card() {
    return this.#card;
  }

  get startBtn() {
    return this.#startBtn;
  }

  updateCard({ name, burnedCalories, bodyPart, target }) {
    //update card name
    this.#card.querySelector('.exer-card__name__text')
      .innerText = this.#truncateString(name[0].toUpperCase() + name.slice(1), 34);
    // update stats
    this.#card.querySelector(`.${this.#STATS_CLASS_NAMES.CALORIES} span`)
      .innerText = this.#truncateString(burnedCalories.toString(), 5);
    this.#card.querySelector(`.${this.#STATS_CLASS_NAMES.PART} span`)
      .innerText = this.#truncateString(bodyPart, 5);
    this.#card.querySelector(`.${this.#STATS_CLASS_NAMES.TARGET} span`)
      .innerText = this.#truncateString(target, 5);
  }

  onStart() {}

  #createCard() {
    const li = document.createElement('exer-card');
    li.classList.add('exer-list__card');

    // Item header
    const header = document.createElement('div');
    const tagBox = document.createElement('div');
    const tag = document.createElement('div');
    const postTag = this.getPostTagItem();
    const startBtn = document.createElement('button');
    header.classList.add('exer-card__header');
    tagBox.classList.add('exer-card__tag-box');
    tag.classList.add('exer-card__tag');
    tag.innerText = 'WORKOUT';
    postTag.classList.add('exer-card__post-tag');
    startBtn.classList.add('exer-card__start-btn');
    startBtn.innerText = 'Start';
    startBtn.append(this.getIcon('16', '16', 'arrow-right'));
    tagBox.append(tag, postTag);
    header.append(tagBox, startBtn);
    li.append(header);

    // Item name
    const name = document.createElement('div');
    const icon = this.getIcon('24', '24', 'icon-running-man-black-bg');
    const nameText = document.createElement('p');
    name.classList.add('exer-card__name');
    icon.classList.add('exer-card__name__icon');
    nameText.classList.add('exer-card__name__text');
    name.append(icon, nameText);
    li.append(name);

    // Item stats
    const stats = document.createElement('div');
    stats.classList.add('exer-card__stats');
    this.#STATS_ITEMS.forEach(({ name, className }) => {
      stats.append(this.#getStatsEl(name, className));
    });
    li.append(stats);

    return li;
  }

  getPostTagItem() { // protected
    return document.createElement('div');
  }

  #getStatsEl(name, className) {
    const container = document.createElement('div');
    const span = document.createElement('span');
    container.classList.add('exer-card__stats__param', className);
    container.innerText = `${name}: `;
    container.appendChild(span);
    return container;
  }

  getIcon(width, height, id) { // protected
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `../assets/img/sprite.svg#${id}`);
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.append(use);
    return svg;
  }

  #truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    }
    const strSliced = str.slice(0, maxLength);
    if (strSliced.length <= 3) {
      return strSliced + '...';
    }
    return strSliced.slice(0, -3) + '...';
  }
}
