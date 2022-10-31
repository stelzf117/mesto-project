import Popup from './popup.js'

export class PopupWithImage extends Popup {
  constructor({ data }, popupSelector) {
    this._descriptionTextContent = data.descriptionTextContent;
    this._descriptionSelector = data.descriptionSelector;
    this._imageSelector = data.imageSelector;
    this._popupSelector = popupSelector;
    this._imageSrc = data.imageSrc;
  }

  open() {
    this._imageSelector.src = this._imageSrc;
    this._descriptionSelector.textContent = this._descriptionTextContent;
    super.open();
  }
}