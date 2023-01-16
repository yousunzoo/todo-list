const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

// 이전 달의 마지막 날 날짜와 요일 구하기
// 날짜를 0으로 지정하면 저번 달의 마지막 날짜를 가진 date 객체가 반환됨
const startDay = new Date(currentYear, currentMonth, 0);
const prevDate = startDay.getDate();
const prevDay = startDay.getDay();

// 이번 달의 마지막 날 날짜와 요일 구하기
const endDay = new Date(currentYear, currentMonth + 1, 0);
const nextDate = endDay.getDate();
const nextDay = endDay.getDay();

// 달력 렌더링
const thisMon = document.querySelector(".days");
thisMon.innerHTML = "";

// 지난 달 렌더링
// 이번 달 시작 요일이 일요일이면 지날 달 출력 X
if (prevDay != 6) {
  for (let i = prevDate - prevDay; i <= prevDate; i++) {
    thisMon.innerHTML =
      thisMon.innerHTML + `<div class="day disable">${i}</div>`;
  }
}
// 이번 달 렌더링
for (let i = 1; i <= nextDate; i++) {
  thisMon.innerHTML = thisMon.innerHTML + `<div class="day">${i}</div>`;
}

// 다음 달 렌더링
if (nextDay !== 6) {
  for (let i = 1; i < 7 - nextDay; i++) {
    thisMon.innerHTML =
      thisMon.innerHTML + `<div class="day disable">${i}</div>`;
  }
}

// 현재 월 표기
const month = document.querySelector(".month");
month.textContent = `${currentYear}.${currentMonth + 1}`;

// 오늘 날짜 표기
if (today.getMonth() === currentMonth) {
  const todayDate = today.getDate();
  const currentMonthDate = document.querySelectorAll(".day");
  currentMonthDate[todayDate - 1].classList.add("today");
}
