async function getAdvice() {
  await fetch("https://api.adviceslip.com/advice")
    .then((response) => response.json())
    .then((data) => {
      let advice = data.slip.advice;
      setAdvice(advice);
    });
}

function setAdvice(advice) {
  const loader = document
    .querySelector(".advice-container")
    .querySelector(".loader");
  const advicesEl = document.querySelector(".advice");
  loader.style.display = "none";
  advicesEl.textContent = advice;
}

export default getAdvice;
