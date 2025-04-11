export class Quote {
  LS_QUOTE_KEY = 'quote';

  #textElem;
  #authorElem;

  constructor(textId, authorId) {
    this.#initTextFields(textId, authorId);
  }

  #initTextFields(textId, authorId) {
    const textElem = document.querySelector('.quote-body__text');
    const authorElem = document.querySelector('.quote-body__author');
    textElem.id = textId;
    authorElem.id = authorId;

    this.#textElem = document.querySelector(`#${textId}`);
    this.#authorElem = document.querySelector(`#${authorId}`);
  }

  updateQuote({ quote, author }) {
    this.#textElem.style.innerText = quote;
    this.#authorElem.style.innerText = author;
    // In case the next quote will fail to fetch, we can use the previous one from localStorage
    localStorage.setItem(this.LS_QUOTE_KEY, JSON.stringify({ quote, author }));
  }
}
