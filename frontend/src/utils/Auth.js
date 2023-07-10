import apiUrl from './utils';

const BASE_URL = apiUrl;

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
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
