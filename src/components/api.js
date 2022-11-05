export default class Api {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl;
    this._headers = apiConfig.headers;
  }

  _checkAnswer(result) {
    if (result.ok) { return result.json() }
    return Promise.reject(`Ошибка: ${result.status}`);
  }

  requestNameBio() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      .then(result => this._checkAnswer(result))
      .catch(err => console.log(err));
  }

  requestCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then(result => this._checkAnswer(result))
      .catch(err => console.log(err));
  }

  editProfile(newName, newDescription) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newDescription
      })
    })
      .then(result => this._checkAnswer(result))
      .catch(err => console.log(err));
  }

  postNewCard(imageName, imageLink) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: imageName,
        link: imageLink
      })
    })
      .then(result => this._checkAnswer(result))
      .catch(err => console.log(err));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, { method: 'DELETE', headers: this._headers })
      .then(result => this._checkAnswer(result))
      .catch(err => console.log(err));
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, { method: 'PUT', headers: this._headers })
      .then(result => this._checkAnswer(result))
      .catch(err => console.log(err));
  }

  likeDeleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, { method: 'DELETE', headers: this._headers })
      .then(result => this._checkAnswer(result))
      .catch(err => console.log(err));
  }

  newAvatar(imageLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: imageLink })
    })
      .then(result => this._checkAnswer(result))
      .catch(err => console.log(err));
  }
}