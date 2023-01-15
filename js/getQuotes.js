async function getQuote() {
  await fetch("https://api.adviceslip.com/advice")
    .then((response) => response.json())
    .then((data) => {
      let quote = data.slip.advice;
      setQuote(quote);
    });
}

function setQuote(quote) {
  const quotesEl = document.querySelector(".quotes");
  quotesEl.textContent = quote;
}

export default getQuote;
