import getQuote from "./getQuotes";
import InitCalandar from "./setCalendar";

window.onload = function () {
  InitCalandar();
  getQuote();
};
