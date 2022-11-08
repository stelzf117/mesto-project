export default class Card {
  constructor(item, cardBlank, userId, { handleCardClick, handleHeartClick, handleCardDelete }) {
    // selectors
    this._cardBlank = cardBlank.cloneNode(true);
    this.card = this._cardBlank.querySelector('.element');
    this._photoElement = this.card.querySelector('.element__photo');
    this._photoName = this.card.querySelector('.element__name');
    this._trash = this.card.querySelector('.element__trash');
    this._heart = this.card.querySelector('.element__heart');
    this._heartsCount = this.card.querySelector('.element__hearts-count');
    // data
    this._nameImage = item.name;
    this._linkImage = item.link;
    this._likes = item.likes;
    this._ownerId = item.owner._id;
    this._userId = userId;
    this._cardId = item._id;
    // states
    this._isLiked = false;
    // callbacks
    this._handleCardClick = handleCardClick;
    this._handleHeartClick = handleHeartClick;
    this._handleCardDelete = handleCardDelete;
  }

  // edit node
  _enterData() {
    this._photoName.textContent = this._nameImage;
    this._photoElement.src = this._linkImage;
    this._photoElement.alt = this._nameImage + '.';

    // likes
    if (this._likes.length) {
      this._heartsCount.textContent = this._likes.length;
      this._likes.find(like => {
        if (like._id === this._userId) {
          this._heart.classList.add('element__heart_active');
        }
      })
    }
    else this._heartsCount.textContent = '0';

    // unlock trash
    if (this._ownerId === this._userId) {
      this._trash.classList.remove('element__trash_disabled');
    }
  }

  _addEventListeners() {
    this._photoElement.addEventListener('click', () => this._handleCardClick(this._nameImage, this._linkImage));
    this._heart.addEventListener('click', () => this._handleHeartClick(this));
    this._trash.addEventListener('click', () => this._handleCardDelete(this));
  }

  returnCard() {
    this._enterData();
    this._addEventListeners();
    return this._cardBlank;
  }
}
