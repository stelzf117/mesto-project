import { Popup } from './popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._button = this._popup.querySelector('.popup__button-save');
    this._callbackSubmit = callbackSubmit;
    this._cardId = '';
    this._cardElement = '';
    this._doCallback = this._doCallback.bind(this);// этот нужно, чтобы можно было снять обработчик с кнопки
  }

  _doCallback(evt) { // этот метод нужен, чтобы можно было снять обработчик с кнопки
    this._callbackSubmit(evt);
  }

  getIdCard() {
    return this._cardId;
  }

  open(cardId, cardElement) { // переписываем метод родителя
    super.open();// присваиваем свойства родителя
    this.setEventListeners();// используем переписанный метод
    return this._cardId = cardId, this._cardElement = cardElement;
  }

  close() {// переписываем метод родителя
    super.close();// присваиваем свойства родителя
    this.deactivateEventListeners();// используем переписанный метод
  }

  setEventListeners() {// переписываем метод родителя
    super.setEventListeners();// присваиваем свойства родителя
    this._button.addEventListener('click', this._doCallback);
  }

  deactivateEventListeners() {// переписываем метод родителя
    super.deactivateEventListeners();// присваиваем свойства родителя
    this._button.removeEventListener('click', this._doCallback);
  }

  // изменение состояния кнопки при взаимодействии с сервером
  isLoading(loading) {
    if (loading) {
      this._button.textContent = 'Удаление...';
      this._button.setAttribute('disabled', true);
    }
    else {
      setTimeout(() => { // отсрочка нужна, чтобы окно успело закрыться (из-за анимации)        
        this._button.textContent = 'Да';
        this._button.removeAttribute('disabled', true);
      }, 400);
    }
  }

  delete() {
    this._cardElement.remove();
  }
};