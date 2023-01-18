const headers = {
  "content-type": "application/json",
  apikey: "FcKdtJs202301",
  username: "KDT4_YooSeonJu",
};

export async function createTodo(title) {
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

export async function readTodos() {
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

export async function deleteTodos(id) {
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

export async function editTodos(todo) {
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
