import { Popup } from './popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
    this._formElementSubmitButton = this._formElement.querySelector('.popup__button-save');
    this._inputList = this._formElement.querySelectorAll('.popup__text-field');
    this._inputValues = {}; // здесь будет содержимое инпутов
    this._callbackSubmit = callbackSubmit;
    this._doCallback = this._doCallback.bind(this);// этот нужно, чтобы можно было снять обработчик с кнопки
  }

  _doCallback(evt) { // этот метод нужен, чтобы можно было снять обработчик с кнопки
    this._callbackSubmit(evt);
  }

  _getInputValues() {
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value; // ключём будет "name" из инпута html-разметки
    });
    return this._inputValues;
  }

  getFormValues(data) {
    return this._getInputValues(data);
  }

  getInputList() {
    return this._inputList;
  }

  open() { // переписываем метод родителя
    super.open();// присваиваем свойства родителя
  }

  close() {// переписываем метод родителя
    super.close();// присваиваем свойства родителя
    this._formElement.reset();// сбрасыаем форму
  }

  setEventListeners() {// переписываем метод родителя
    super.setEventListeners();// присваиваем свойства родителя
    this._formElement.addEventListener('submit', this._doCallback);
  }

  deactivateEventListeners() {// переписываем метод родителя
    super.deactivateEventListeners();// присваиваем свойства родителя
    this._formElement.removeEventListener('submit', this._doCallback);
  }

  // изменение состояния кнопки при взаимодействии с сервером
  isLoading(loading) {
    if (loading) {
      this._formElementSubmitButton.textContent = 'Сохранение...';
      this._formElementSubmitButton.setAttribute('disabled', true);
    }
    else {
      setTimeout(() => { // отсрочка нужна, чтобы окно успело закрыться (из-за анимации)        
        this._formElementSubmitButton.textContent = 'Сохранить';
      }, 400);
    }
  }
}