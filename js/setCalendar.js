const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

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
const calendar = document.querySelector(".days");
calendar.innerHTML = "";

// 이번 달 렌더링
for (let i = 1; i <= nextDate; i++) {
  calendar.innerHTML = calendar.innerHTML + `<div class="day">${i}</div>`;
}

// 현재 월 표기
const month = document.querySelector(".month");
month.textContent = `${currentYear}.${currentMonth + 1}`;
