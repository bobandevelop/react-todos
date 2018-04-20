const baseUrl = "https://api.jsonbin.io/b/5ad906c7003aec63328d86e6";

export const loadTodos = () => {
  return fetch(baseUrl).then(res => res.json());
};

export const createTodo = todo => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(todo)
  }).then(res => res.json());
};
