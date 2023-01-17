import getQuote from "./getQuotes";
import InitCalandar from "./setCalendar";

window.onload = async function () {
  await InitCalandar();
  await getQuote();
};
