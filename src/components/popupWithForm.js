import { Popup } from './popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
    this._formElementSubmitButton = this._formElement.querySelector('.popup__button-save');
    this._inputList = this._formElement.querySelectorAll('.popup__text-field');
    this._inputValues = {}; // здесь будет содержимое инпутов
    this._callbackSubmit = callbackSubmit;
  }

  _getInputValues() {
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value; // ключём будет "name" из инпута html-разметки
    });
    return this._inputValues;
  }

  getFormValues() {
    return this._getInputValues();
  }

  getInputList() {
    return this._inputList;
  }

  open() { // если не перезаписать так, то отрисовываются сразу 2-3 одинаковые карточки
    this._popup.classList.add('popup_opened');
    super.setEventListeners();
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  // переписываем метод setEventListeners(), который унаследовали от класса Popup
  // добавляем слушатель на кнопку submit, которая запускает колбэк
  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => this._callbackSubmit(evt));
    super.setEventListeners();
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