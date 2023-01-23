export default function initSetDday() {
  const setDdayContainer = document.querySelector(".set-d-day");
  const dDayContainer = document.querySelector(".show-d-day");
  const addDdaybtn = setDdayContainer.querySelector("button");
  const editDdaybtn = dDayContainer.querySelector("button");
  const modal = document.querySelector("#modal");
  const modalContainer = modal.querySelector(".modal-container");
  const dDayModal = document.createElement("form");
  dDayModal.innerHTML = /*html*/ `
          <input
            type="text"
            class="d-day-name"
            placeholder="추가할 일정을 입력해주세요" required />
          <input type="date" class="d-day-date" required />
          <button>완료</button>`;

  dDayModal.classList.add("d-day-modal");

  // 디데이 추가 버튼 클릭하면 모달 창 등장
  addDdaybtn.addEventListener("click", () => {
    showDdayModal();
  });

  // edit 버튼 클릭하면 모달 창 등장
  editDdaybtn.addEventListener("click", () => {
    showDdayModal();
  });

  function showDdayModal() {
    modal.classList.add("active");
    modalContainer.append(dDayModal);

    // form 입력한 값 받아서 디데이 실행
    const dDayForm = document.querySelector(".d-day-modal");
    const setDdaybtn = dDayForm.querySelector("button");
    const dDayName = dDayForm.querySelector(".d-day-name");
    const dDayDate = dDayForm.querySelector(".d-day-date");

    // localStorage에 값 있으면 들고 오기 (edit)
    if (localStorage.getItem("d-day")) {
      const dDayArr = JSON.parse(localStorage.getItem("d-day"));
      dDayName.value = dDayArr[0];
      dDayDate.value = dDayArr[1];
    }

    dDayDate.addEventListener("click", () => {
      dDayDate.classList.remove("alert");
    });

    setDdaybtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (dDayName.value === "") return dDayName.classList.add("alert");
      if (dDayDate.value === "") return dDayDate.classList.add("alert");
      const dDayArr = [dDayName.value, dDayDate.value];
      localStorage.setItem("d-day", JSON.stringify(dDayArr));
      setDday();

      modalContainer.innerHTML = "";
      modal.classList.remove("active");
    });
  }

  function setDday() {
    const dDayData = JSON.parse(localStorage.getItem("d-day"));
    const [name, date] = dDayData;
    const dDay = dDayContainer.querySelector(".d-day");
    const dDayTitle = dDayContainer.querySelector(".d-day-title");
    const dDayDate = dDayContainer.querySelector(".d-day-date");
    dDayTitle.textContent = name;
    dDayDate.textContent = date;
    setDdayContainer.classList.remove("show");
    dDayContainer.classList.add("show");

    const calDday = Math.ceil(
      (new Date(date) - new Date()) / (1000 * 60 * 60 * 24)
    );
    dDay.textContent = calDday < 0 ? `+${-calDday}` : `-${calDday}`;
  }

  // 페이지 로드될 때 localStorage에 값 있는지에 따라 동작
  if (localStorage.getItem("d-day")) {
    setDdayContainer.classList.remove("show");
    dDayContainer.classList.add("show");
    setDday();
  } else {
    setDdayContainer.classList.add("show");
    dDayContainer.classList.remove("show");
  }
}
