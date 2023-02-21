export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeClick = this._closeClick.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // закрытие при нажатии на клавишу 'Escape'
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // закрытие при клике по кнопке и оверлею
  _closeClick(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      this.close();
    };
    evt.stopPropagation();
  }

  // установка слушателей
  setEventListeners() {
    this._popup.addEventListener('click', this._closeClick);
    document.addEventListener('keydown', this._handleEscClose);
  }

  // отключение слушателей
  deactivateEventListeners() {
    this._popup.removeEventListener('click', this._closeClick);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this.deactivateEventListeners();
    this._popup.classList.remove('popup_opened');
  }
}