import getAdvice from "./getAdvice";
import InitCalandar from "./setCalendar";
import renderTodo from "./renderTodo";
import { createTodo, readTodos } from "./operateTodos";

window.onload = async function () {
  await InitCalandar();
  await getAdvice();
  const todos = await readTodos();
  renderTodo(todos);
};

const headers = {
  "content-type": "application/json",
  apikey: "FcKdtJs202301",
  username: "KDT4_YooSeonJu",
};

// 버튼 누르면 모달창 등장
const addBtn = document.querySelector(".btn--add");
const modalEl = document.getElementById("modal");
const modalLayerEl = modalEl.querySelector(".modal-layer");
const modalContainer = modalEl.querySelector(".modal-container");
const addModal = document.createElement("form");
const editModal = document.createElement("form");

addModal.innerHTML = `<h2>할 일 추가</h2>
<input type="text" placeholder="추가할 할 일을 입력해주세요" />
<button class="btn--add-todo">추가</button>`;
addModal.classList.add("add-todo");
editModal.innerHTML = ` <h2>할 일 수정</h2>
<input type="text" />
<button class="btn--edit-todo">수정</button>`;
editModal.classList.add("edit-todo");

const addTodoInput = addModal.querySelector("input");
const addTodoBtn = addModal.querySelector(".btn--add-todo");

addBtn.addEventListener("click", function () {
  console.log("clicked");
  addTodoInput.value = "";
  addTodoInput.classList?.remove("alert");
  modalContainer.append(addModal);
  modalEl.classList.add("active");
});

// 모달 레이어 누르면 창 꺼짐
modalLayerEl.addEventListener("click", function () {
  modalEl.classList.remove("active");
  modalContainer.innerHTML = "";
});

// 할 일 추가 모달에서 input 값 없으면 placeholder 색상 바뀜
// input 값 있으면 createTodo() 실행

addTodoBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  const todoTitle = addTodoInput.value;
  if (todoTitle === "") {
    addTodoInput.classList.add("alert");
    return;
  }
  await createTodo(todoTitle);
  const todos = await readTodos();
  renderTodo(todos);
  modalContainer.innerHTML = "";
  modalEl.classList.remove("active");
});
