// 옵션 선택

const viewSelectEl = document.querySelector(".view-select");
const sortSelectEl = document.querySelector(".sort-select");
const viewBtn = viewSelectEl.querySelector("button");
const sortBtn = sortSelectEl.querySelector("button");
const viewOptions = viewSelectEl.querySelectorAll(".option-item");
const sortOptions = sortSelectEl.querySelectorAll(".option-item");

// 클릭한 옵션의 텍스트를 라벨 안에 넣음
function handleViewSelect(item) {
  viewSelectEl.classList.remove("active");
  viewBtn.innerText = item.textContent;
}
function handleSortSelect(item) {
  sortSelectEl.classList.remove("active");
  sortBtn.innerText = item.textContent;
}

// 옵션 클릭 시 클릭한 옵션을 넘김
viewOptions.forEach((option) => {
  option.addEventListener("click", () => handleViewSelect(option));
});

sortOptions.forEach((option) => {
  option.addEventListener("click", () => handleSortSelect(option));
});

// 버튼 클릭 시 옵션 목록이 열림/닫힘
viewBtn.addEventListener("click", () => {
  viewSelectEl.classList.contains("active")
    ? viewSelectEl.classList.remove("active")
    : viewSelectEl.classList.add("active");
});

sortBtn.addEventListener("click", () => {
  sortSelectEl.classList.contains("active")
    ? sortSelectEl.classList.remove("active")
    : sortSelectEl.classList.add("active");
});
