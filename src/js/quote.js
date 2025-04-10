const quoteText = document.querySelector('.quote-body__text');
const quoteAuthor = document.querySelector('.quote-body__author');

export function updateQuote({ quote, author }) {
  quoteText.style.innerText = quote;
  quoteAuthor.style.innerText = author;
  // In case the next quote will fail to fetch, we can use the previous one from localStorage
  localStorage.setItem('quote', JSON.stringify({ quote, author }));
}
