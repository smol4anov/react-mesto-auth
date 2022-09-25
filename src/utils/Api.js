import { apiConstants } from './constants.js';

class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._cohortId = data.cohortId;
    this._token = data.token;
  }

  _getHeaders() {
    return {
      authorization: this._token,
      'Content-Type': 'application/json'
    }
  }

  _handleRespons(res) {
    if (res.ok) {
      return res.json();
    }
    console.log(res);
    return Promise.reject(`Ошибка ${res.status}. Скоро исправим!`);
  }

  _getLikeMethod(setLike) {
    return setLike ? 'DELETE' : 'PUT';
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}${this._cohortId}/users/me`, {
      headers: this._getHeaders()
    }).then(this._handleRespons);
  }

  getCards() {
    return fetch(`${this._baseUrl}${this._cohortId}/cards`, {
      headers: this._getHeaders()
    }).then(this._handleRespons);
  }

  sendUserInfo(data) {
    return fetch(`${this._baseUrl}${this._cohortId}/users/me`, {
      headers: this._getHeaders(),
      method: 'PATCH',
      body: JSON.stringify(data)
    }).then(this._handleRespons);
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}${this._cohortId}/cards`, {
      headers: this._getHeaders(),
      method: 'POST',
      body: JSON.stringify(data)
    }).then(this._handleRespons);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}${this._cohortId}/cards/${cardId}`, {
      headers: this._getHeaders(),
      method: 'DELETE'
    }).then(this._handleRespons);
  }

  likeCard(cardId, deleteLike) {
    return fetch(`${this._baseUrl}${this._cohortId}/cards/${cardId}/likes`, {
      headers: this._getHeaders(),
      method: this._getLikeMethod(deleteLike)
    }).then(this._handleRespons);
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}${this._cohortId}/users/me/avatar`, {
      headers: this._getHeaders(),
      method: 'PATCH',
      body: JSON.stringify(data)
    }).then(this._handleRespons);
  }
}

const api = new Api(apiConstants);

export default api;
