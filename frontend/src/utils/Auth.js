// const BASE_URL = "https://auth.nomoreparties.co";
// const BASE_URL = "https://localhost:3000";
const BASE_URL = "https://petfolio.api.nomoreparties.sbs";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      // Получаем текст ошибки из ответа сервера
      return response.json().then((data) => {
        throw new Error(data.message);
      });
    }
  })
};


export const authorization = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        // Получаем текст ошибки из ответа сервера
        return response.json().then((data) => {
          throw new Error(data.message);
        });
      }
    })
};

export const authorize = ( token ) => {

  // console.log('Token:', token);
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      // Authorization: token,

    },
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      // Получаем текст ошибки из ответа сервера
      return response.json().then((data) => {
        throw new Error(data.message);
      });
    }
  })
};
