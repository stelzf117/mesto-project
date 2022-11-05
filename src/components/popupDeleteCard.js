import { Popup } from './popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._button = this._popup.querySelector('.popup__button-save');
    this._callbackSubmit = callbackSubmit;
    this._cardId = '';
    this._cardElement = '';
  }

  getIdCard() {
    return this._cardId;
  }

  open(cardId, cardElement) {
    this._popup.classList.add('popup_opened');
    super.setEventListeners();
    return this._cardId = cardId, this._cardElement = cardElement;
  }

  // переписываем метод setEventListeners(), который унаследовали от класса Popup
  // добавляем слушатель на кнопку, которая запускает колбэк
  setEventListeners() {
    this._button.addEventListener('click', (evt) => this._callbackSubmit(evt));
    super.setEventListeners();
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