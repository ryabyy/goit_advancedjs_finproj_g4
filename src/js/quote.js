// Mock data
const quote = {
  author: "Muhammad Ali",
  quote: "I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'"
};

const textQuote = document.querySelector('.quote__text__text');
const textAuthor = document.querySelector('.quote__text__author');

export function updateQuote({ quote, author }) {
  textQuote.style.innerText = quote;
  textAuthor.style.innerText = author;
  // In case the next quote will fail to fetch, we can use the previous one from localStorage
  localStorage.setItem('quote', JSON.stringify({ quote, author }));
}
