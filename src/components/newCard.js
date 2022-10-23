export class Card {
  constructor({ item }, cardBlank, userId) {
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
  _editCard() { 
    this._photoElement.src = this._linkImage;
    this._photoElement.setAttribute('alt', this._nameImage);
    this._photoName.textContent = this._nameImage;

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
  _addEventListeners() {
    this._photoElement.addEventListener('click', () => {
      console.log('открытие попапа просмотра картинки');
    })

    this._heart.addEventListener('click', () => {
      if(this._heart.classList.contains('element__heart_active')) {
        console.log('отправка запроса на сервер');
        this._heart.classList.remove('element__heart_active');
      }
      else {
        console.log('отправка запроса на сервер')
        this._heart.classList.add('element__heart_active');
      }
    })

    this._trash.addEventListener('click', () => {
      console.log('открытие попапа удаления карточки');
      console.log('добавление слушателя на кнопку попапа удаления карточки');
    })

  }

//возвращение готовой разметки
  returnCard() { 
    this._editCard();
    this._addEventListeners();
    return this._cardBlank;
  }
}
