import { deleteTodos, readTodos } from "./api";
import renderTodo from "./renderTodo";

// 옵션 선택
const viewSelectEl = document.querySelector(".view-select");
const sortSelectEl = document.querySelector(".sort-select");
const viewBtn = viewSelectEl.querySelector("button");
const sortBtn = sortSelectEl.querySelector("button");
const viewOptions = viewSelectEl.querySelectorAll(".option-item");
const sortOptions = sortSelectEl.querySelectorAll(".option-item");
const deleteAllBtn = document.querySelector(".delete-all-btn");
const modalEl = document.getElementById("modal");
const modalContainer = modalEl.querySelector(".modal-container");
const deleteAllModal = document.createElement("form");
deleteAllModal.innerHTML = ` <h2>정말로 모두 삭제하시겠습니까?</h2>
<p>삭제된 리스트는 원상복구할 수 없습니다.</p>
<button class="btn-yes">예</button><button class="btn-cancel">아니오</button>`;
deleteAllModal.classList.add("deleteAll-todo");

const loader = document.querySelector(".loader-container");

export default function initSelectOptions() {
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
    option.addEventListener("click", async function () {
      handleViewSelect(option);
      const todos = await readTodos();
      renderTodo(todos);
    });
  });

  sortOptions.forEach((option) => {
    option.addEventListener("click", async function () {
      handleSortSelect(option);
      const todos = await readTodos();
      renderTodo(todos);
    });
  });

  // 버튼에 포커스 잡힐 시 옵션 목록이 열림/닫힘
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

  // 버튼에서 포커스 사라지면 옵션 목록 닫힘
  viewBtn.addEventListener("focusout", () => {
    viewSelectEl.classList.remove("active");
  });

  sortBtn.addEventListener("focusout", () => {
    sortSelectEl.classList.remove("active");
  });

  // 모두 삭제 버튼 클릭 시 API에서 값 모두 삭제 및 인터페이스에서 삭제
  deleteAllBtn.addEventListener("click", async function () {
    modalContainer.append(deleteAllModal);
    modalEl.classList.add("active");
    const modalBtns = deleteAllModal.querySelectorAll("button");
    modalBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        if (btn.textContent === "예") deleteAllTodos();
        modalContainer.innerHTML = "";

        modalEl.classList.remove("active");
      });
    });
  });

  async function deleteAllTodos() {
    loader.style.display = "block";
    let todos = await readTodos();
    todos.map(async (item) => {
      deleteTodos(item.id);
    });
    renderTodo([]);
  }
}
