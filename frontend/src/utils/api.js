class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
    // console.log(this._url);
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json()
      }
      return Promise.reject(new Error('Какая-то ошибка!'))
  }

  getUserInformation() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    })
    .then(this._checkResponse)
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

const api = new Api({  url: 'https://mesto.nomoreparties.co/v1/cohort-58/',
headers: {
  'Content-Type': 'application/json',
  authorization: 'babe0c92-1b62-46ea-b207-046cc0a5214b'
}})

export default api;