import { popupSelectors } from '../utils/constants.js';

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeClick = this._closeClick.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // закрытие при нажатии на клавишу 'Escape'
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      console.log('Нажат Escape');
      this.close();
    }
  }

  // закрытие при клике по кнопке и оверлею
  _closeClick(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      console.log('Нажат Click');
      this.close();
    };
    evt.stopPropagation();
  }

  // установка слушателей
  setEventListeners() {
    this._popup.addEventListener('click', this._closeClick);
    document.addEventListener('keydown', this._handleEscClose);
    console.log('Слушатели активированы');
  }

  // отключение слушателей
  deactivateEventListeners() {
    this._popup.removeEventListener('click', this._closeClick);
    document.removeEventListener('keydown', this._handleEscClose);
    console.log('Слушатели убраны');
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

// создаём экземпляры классов для popup-окон
// export const profilePopup = new Popup(popupSelectors.profile);
// export const avatarPopup = new Popup(popupSelectors.editAvatar);
// export const addCardPopup = new Popup(popupSelectors.addCard);
export const deleteCardPopup = new Popup(popupSelectors.deleteCard);
export const viewCardPopup = new Popup(popupSelectors.viewCard);