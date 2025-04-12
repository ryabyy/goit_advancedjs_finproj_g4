export class Quote {
  static PAGES = {
    HOME: 'home',
    FAVORITES: 'favorites'
  }

  #textId;
  #authorId;
  #textElem;
  #authorElem;

  constructor(page, parentClass) {
    this.#initTextFields(page, parentClass);
  }

  #initTextFields(page, parentClass) {
    const textElem = document.querySelector(`.${parentClass} .quote-body__text`);
    const authorElem = document.querySelector(`.${parentClass} .quote-body__author`);
    this.#textId = `${page}-quote-text`;
    this.#authorId = `${page}-quote-author`;
    textElem.id = this.#textId;
    authorElem.id = this.#authorId;

    this.#textElem = document.querySelector(`#${this.#textId}`);
    this.#authorElem = document.querySelector(`#${this.#authorId}`);
  }

  updateQuote({ quote, author }) {
    this.#textElem.innerText = quote;
    this.#authorElem.innerText = author;
  }
}
