class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json()
      }
      return Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));
  }

  setToken(token) {
    this._headers.authorization = `Bearer ${token}`;
  }

  getToken() {
    return this._headers.authorization;
  }

  getUserInformation() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    })
    .then(this._checkResponse)
    .then((response) => {
      // console.log(response.data); // Выводим результат запроса в консоль
      return response.data; // Возвращаем результат для дальнейшей обработки
    });
  }
  

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  changeUserInformation(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._checkResponse)
  }

  addCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse)
  }

  deleteCard(idCard) {
    return fetch(`${this._url}cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  addLike(idCard) {
    return fetch(`${this._url}cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  deleteLike(idCard) {
    return fetch(`${this._url}cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  changeProfileAvatar(link) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link        
      })
    })
    .then(this._checkResponse)
  }
}


// Получение токена из localStorage
const storedToken = localStorage.getItem("token");
// console.log(storedToken);

// Создание объекта headers с заголовками запроса
const headers = {
  "Content-Type": "application/json",
};

// Если в localStorage есть токен, добавляем его в заголовки
if (storedToken && storedToken !== "null" && storedToken !== "undefined") {
  // console.log(storedToken && storedToken !== "null" && storedToken !== "undefined");
  const token = JSON.parse(storedToken);
  // console.log(token);
  headers.authorization = `Bearer ${token}`;
} else {
  console.log('Token не существует');
}

// Создание экземпляра API с учетом заголовков
const api = new Api({  
  url: 'http://localhost:3000/',
  headers: headers
});

export default api;