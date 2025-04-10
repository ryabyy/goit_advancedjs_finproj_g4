const STATS_ITEMS = [
  { name: 'Burned calories', className: 'cal' },
  { name: 'Body part', className: 'part' },
  { name: 'Target', className: 'target' },
];

const listElem = document.querySelector('.exer-list');
let isFavoritesCart = false;

export function updateList(list) {
  isFavoritesCart = !!listElem.dataset.mode;
  list.forEach(({ name, burnedCalories, bodyPart, target, rating }) => {
    const card = getCard();
    card.querySelector('.exer-card__name__text').innerText = truncateString(name[0].toUpperCase() + name.slice(1), 34);
    card.querySelector('.cal span').innerText = truncateString(burnedCalories.toString(), 5);
    card.querySelector('.part span').innerText = truncateString(bodyPart, 5);
    card.querySelector('.target span').innerText = truncateString(target, 5);
    if (!isFavoritesCart) {
      card.querySelector('.exer-card__post-tag span').innerText = numberToString(rating);
    }
    listElem.append(card);
  });
}

function onRemove() {}

function onStart() {}

function getCard() {
  const li = document.createElement('li');
  li.classList.add('exer-list__card');

  // Item header
  const header = document.createElement('div');
  const tagBox = document.createElement('div');
  const tag = document.createElement('div');
  const postTag = getPostTagItem();
  const startBtn = document.createElement('button');
  header.classList.add('exer-card__header');
  tagBox.classList.add('exer-card__tag-box');
  tag.classList.add('exer-card__tag');
  tag.innerText = 'WORKOUT';
  postTag.classList.add('exer-card__post-tag');
  startBtn.classList.add('exer-card__start-btn');
  startBtn.innerText = 'Start';
  startBtn.append(getIcon('16', '16', 'arrow-right'));
  tagBox.append(tag, postTag);
  header.append(tagBox, startBtn);
  li.append(header);

  // Item name
  const name = document.createElement('div');
  const icon = getIcon('24', '24', 'icon-running-man-black-bg');
  const nameText = document.createElement('p');
  name.classList.add('exer-card__name');
  icon.classList.add('exer-card__name__icon');
  nameText.classList.add('exer-card__name__text');
  name.append(icon, nameText);
  li.append(name);

  // Item stats
  const stats = document.createElement('div');
  stats.classList.add('exer-card__stats');
  STATS_ITEMS.forEach(({ name, className }) => {
    stats.append(getStatsElement(name, className));
  });
  li.append(stats);

  return li;
}

function getPostTagItem() {
  const item = document.createElement('div');
  if (isFavoritesCart) {
    const btn = document.createElement('button');
    btn.append(getIcon('16', '16', 'trash-black'));
    item.append(btn);
  } else {
    const span = document.createElement('span');
    const icon = getIcon('18', '18', 'rating-star-orange');
    item.append(span, icon);
  }
  return item;
}

function getStatsElement(name, className) {
  const box = document.createElement('div');
  const span = document.createElement('span');
  box.classList.add('exer-card__stats__param', className);
  box.innerText = `${name}: `;
  box.appendChild(span);
  return box;
}

function getIcon(width, height, id) {
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `../assets/img/sprite.svg#${id}`);
  icon.setAttribute('width', width);
  icon.setAttribute('height', height);
  icon.append(use);
  return icon;
}

function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  const strSliced = str.slice(0, maxLength);
  if (strSliced.length <= 3) {
    return strSliced + '...';
  }
  return strSliced.slice(0, -3) + '...';
}

function numberToString(num) {
  return Number.isInteger(num) ? num + '.0' : num.toString();
}
