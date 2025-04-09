// Mock data
const quote = {
  author: "Muhammad Ali",
  quote: "I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'"
};

const textQuote = document.querySelector('.daily-text__text-quote');
const textAuthor = document.querySelector('.daily-text__text-author');

export function updateQuote({ quote, author }) {
  textQuote.style.innerText = quote;
  textAuthor.style.innerText = author;
  // In case the next quote will fail to fetch, we can use the previous one from localStorage
  localStorage.setItem('quote', JSON.stringify({ quote, author }));
}
