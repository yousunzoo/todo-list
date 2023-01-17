import getAdvice from "./getAdvice";
import InitCalandar from "./setCalendar";

const loader = document.querySelector(".loader-container");
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

async function createTodo(title) {
  try {
    const res = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          title,
        }),
      }
    );
    const json = await res.json();
    return json;
  } catch (error) {
    // 사용자에게 어떤 에러가 발생했는지 보여주는 코드..
  }
}

async function readTodos() {
  try {
    const res = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",
      {
        method: "GET",
        headers,
      }
    );
    const json = await res.json();
    return json;
  } catch (error) {
    // 강제로 에러 발생!
    throw error;
  }
}

async function deleteTodos(id) {
  try {
    const res = await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
      {
        method: "DELETE",
        headers,
      }
    );
    const json = await res.json();
    return json;
  } catch (error) {
    // 강제로 에러 발생!
    throw error;
  }
}

async function editTodos(todo) {
  try {
    const res = await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({
          title: todo.title,
          done: todo.done,
        }),
      }
    );
    const json = await res.json();
    return json;
  } catch (error) {
    // 강제로 에러 발생!
    throw error;
  }
}

// 버튼 누르면 모달창 등장
const addBtn = document.querySelector(".btn--add");
const modalEl = document.getElementById("modal");
const modalLayerEl = modalEl.querySelector(".modal-layer");
const addModal = modalEl.querySelector(".add-todo");

const addTodoInput = addModal.querySelector("input");
const addTodoBtn = addModal.querySelector(".btn--add-todo");

addBtn.addEventListener("click", function () {
  addTodoInput.value = "";
  addTodoInput.classList?.remove("alert");
  addModal.style.display = "block";
  modalEl.classList.add("active");
});

// 모달 레이어 누르면 창 꺼짐
modalLayerEl.addEventListener("click", function () {
  modalEl.classList.remove("active");
  addModal.style.display = "none";
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
  modalEl.classList.remove("active");
  addModal.style.display = "none";
});

function renderTodo(todos) {
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
      const editForm = modalEl.querySelector(".edit-todo");
      const editInput = editForm.querySelector("input");
      const editBtn = editForm.querySelector("button");
      editInput.value = todo.title;
      editForm.style.display = "block";
      modalEl.classList.add("active");

      editBtn.addEventListener("click", async function (e) {
        e.preventDefault();
        todo.title = editInput.value;
        await editTodos(todo);
        const todos = await readTodos();
        renderTodo(todos);
        editForm.style.display = "none";
        modalEl.classList.remove("active");
      });
    });

    return todoLi;
  });

  todoListEl.innerHTML = "";
  todoListEl.append(...todoEls);

  loader.style.display = "none";
}
