const BASE_URL = "https://auth.nomoreparties.co";

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
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Какая-то ошибка!");
  });
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
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Какая-то ошибка!");
  });
};

export const authorize = ({ token }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Какая-то ошибка!");
  });
};
