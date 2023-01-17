async function getAdvice() {
  await fetch("https://api.adviceslip.com/advice")
    .then((response) => response.json())
    .then((data) => {
      let advice = data.slip.advice;
      setAdvice(advice);
    });
}

function setAdvice(advice) {
  const advicesEl = document.querySelector(".advice");
  advicesEl.textContent = advice;
}

export default getAdvice;
