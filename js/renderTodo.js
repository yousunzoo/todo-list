import { readTodos, deleteTodos, editTodos } from "./operateTodos";

const loader = document.querySelector(".loader-container");
const modalEl = document.getElementById("modal");
const modalContainer = modalEl.querySelector(".modal-container");
const editModal = document.createElement("form");
editModal.innerHTML = ` <h2>할 일 수정</h2>
<input type="text" />
<button class="btn--edit-todo">수정</button>`;
editModal.classList.add("edit-todo");

export default function renderTodo(todos) {
  loader.style.display = "block";

  const todoListEl = document.querySelector(".todo-list");
  const todoEls = todos.map((todo) => {
    const todoLi = document.createElement("li");
    todoLi.innerHTML = `
    <input type="checkbox" name="done" id="chk_done" />
              <label for="chk_done"></label>
              <p class="todo"><span>${todo.title}</span></p>
              <div class="btns">
                <button class="btn--edit"></button>
                <button class="btn--delete"></button>
              </div>
    `;

    const checkbox = todoLi.querySelector("input");
    const checkLabel = todoLi.querySelector("label");
    const todoText = todoLi.querySelector("p");
    const deleteBtn = todoLi.querySelector(".btn--delete");
    const editBtn = todoLi.querySelector(".btn--edit");

    // 할 일이 완료된 상태면 checkbox 체크
    if (todo.done) {
      checkbox.checked = true;
      todoText.classList.add("done");
    }

    // checkbox 눌러서 할 일 완료 시키면 api에 수정 요청
    checkLabel.addEventListener("click", async function (e) {
      e.preventDefault();
      todo.done = !todo.done;

      checkbox.checked = todo.done;
      todo.done
        ? todoText.classList.add("done")
        : todoText.classList.remove("done");
      await editTodos(todo);
      const todos = await readTodos();
      renderTodo(todos);
    });

    // deleteBtn 누르면 해당 할 일 삭제
    deleteBtn.addEventListener("click", async function () {
      loader.style.display = "block";
      await deleteTodos(todo.id);
      const todos = await readTodos();
      renderTodo(todos);
    });

    // editBtn 누르면 모달 창 등장
    editBtn.addEventListener("click", function () {
      const editModalInput = editModal.querySelector("input");
      const editModalBtn = editModal.querySelector("button");
      editModalInput.value = todo.title;
      modalContainer.append(editModal);
      modalEl.classList.add("active");

      editModalBtn.addEventListener("click", async function (e) {
        e.preventDefault();
        todo.title = editModalInput.value;
        await editTodos(todo);
        const todos = await readTodos();
        renderTodo(todos);
        modalContainer.innerHTML = "";
        modalEl.classList.remove("active");
      });
    });

    return todoLi;
  });

  todoListEl.innerHTML = "";
  todoListEl.append(...todoEls);

  loader.style.display = "none";
}
