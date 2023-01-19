const url = "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos";
const headers = {
  "content-type": "application/json",
  apikey: "FcKdtJs202301",
  username: "KDT4_YooSeonJu",
};

export async function createTodo(title) {
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
}

export async function readTodos() {
  const res = await fetch(url, {
    method: "GET",
    headers,
  });
  const json = await res.json();
  return json;
}

export async function deleteTodos(id) {
  const res = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers,
  });
  const json = await res.json();
  return json;
}

export async function editTodos(todo) {
  const res = await fetch(`${url}/${todo.id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      title: todo.title,
      done: todo.done,
    }),
  });
  const json = await res.json();
  return json;
}

export async function reorderTodos(array) {
  const res = await fetch(`${url}/reorder`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      todoIds: array,
    }),
  });
  const result = await res.json();
  return result;
}
