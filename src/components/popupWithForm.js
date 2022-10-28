import { Popup } from './popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
    this._formElementSubmitButton = this._formElement.querySelector('.popup__button-save');
    this._inputList = this._formElement.querySelectorAll('.popup__text-field');
    this._inputValues = [];
    this._callbackSubmit = callbackSubmit;
  }

  _getInputValues() {
    this._inputList.forEach(input => {
      this._inputValues.push(input.value);
    });
    return this._inputValues;
  }

  getFormValues() {
    return this._getInputValues();
  }

  getInputList() {
    return this._inputList;
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  setEventListener() {
    this._formElement.addEventListener('submit', (evt) => this._callbackSubmit(evt));
    super.setEventListener();
  }

  isLoading(loading) {
    if (loading) {
      this._formElementSubmitButton.textContent = 'Сохранение...'
    }
    else {
      this._formElementSubmitButton.textContent = 'Сохранить'
    }
  }
}