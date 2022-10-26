export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeEscape);
    this._popup.addEventListener('click', this._closeClick);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('click', this._closeClick);
    document.removeEventListener('keydown', this._closeEscape);
  }

  _closeEscape(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _closeClick(event) {
    if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close')) {
      this.close();
    };
    event.stopPropagation();
  }

  setEventListener() {
    this._popup.addEventListener('click', this._closeClick);
  }
}