const TEXT_QUOTE = document.querySelector('.quote-body__text');
const TEXT_AUTHOR = document.querySelector('.quote-body__author');

export function updateQuote({ quote, author }) {
  TEXT_QUOTE.style.innerText = quote;
  TEXT_AUTHOR.style.innerText = author;
  // In case the next quote will fail to fetch, we can use the previous one from localStorage
  localStorage.setItem('quote', JSON.stringify({ quote, author }));
}
