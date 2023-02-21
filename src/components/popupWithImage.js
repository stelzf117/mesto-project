import { Popup } from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupPicture = this._popup.querySelector('.popup__picture');
    this.popupDescription = this._popup.querySelector('.popup__description');
  }

  open(description, link) {
    this.popupDescription.textContent = description;
    this.popupPicture.alt = description + '.';
    this.popupPicture.src = link;
    super.open();
  }
};
