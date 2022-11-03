import { popupDeleteCard, popupWithImage, api } from '../pages/index.js';

export class Card {
  constructor(item, cardBlank, userId) {
// Селекторы
  this._cardBlank = cardBlank.cloneNode(true);
  this._photoElement = this._cardBlank.querySelector('.element__photo');
  this._photoName = this._cardBlank.querySelector('.element__name');
  this._trash = this._cardBlank.querySelector('.element__trash')
  this._heart = this._cardBlank.querySelector('.element__heart')
  this._heartsCount = this._cardBlank.querySelector('.element__hearts-count')
// Данные для замены
  this._nameImage = item.name;
  this._linkImage = item.link;
  this._likes = item.likes;
  this._ownerId = item.owner._id;
  this._userId = userId;
  this._cardId = item._id;
  }

//редактирование скопированного узла
  _enterData(description, link) { 
    this._photoElement.src = link;
    this._photoElement.setAttribute('alt', description);
    this._photoName.textContent = description;

// выведение количества лайков, поиск своего лайка
    if (this._likes.length) {
      this._heartsCount.textContent = this._likes.length;
      this._likes.find(like => {
        if(like._id === this._userId){
          this._heart.classList.add('element__heart_active');
        }
      })
    }
    else this._heartsCount.textContent = '0';

// Разблокировка корзины на своих карточках
    if(this._ownerId === this._userId) {
      this._trash.classList.remove('element__trash_disabled');
    }
  }

//добавление слушателей
  _addEventListeners(description, link) {
    this._photoElement.addEventListener('click', (evt) => {
      popupWithImage.open(description, link);
      evt.stopPropagation();
    })

    this._heart.addEventListener('click', () => {
      if(this._heart.classList.contains('element__heart_active')) {
        api.likeDeleteCard(this._cardId)
          .then((res) => {
            this._heartsCount.textContent = res.likes.length;
            this._heart.classList.remove('element__heart_active');
          })
      }
      else {
        api.likeCard(this._cardId)
          .then((res) => {
            this._heartsCount.textContent = res.likes.length;
            this._heart.classList.add('element__heart_active');
          })
      }
    })

    this._trash.addEventListener('click', () => {
      //popupDeleteCard.open();
      console.log('открытие попапа удаления карточки');
      console.log('добавление слушателя на кнопку попапа удаления карточки');
    })

  }

//возвращение готовой разметки
  returnCard(description, link) { 
    this._enterData(description, link);
    this._addEventListeners(description, link);
    return this._cardBlank;
  }
}
