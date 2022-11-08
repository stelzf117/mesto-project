export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputErrorClass = config.inputErrorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  enableValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  clearMistakes() {
    this._inputList.forEach((inputElement) => { this._hideInputError(inputElement) })
  }

  checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else {
      inputElement.setCustomValidity('');
    }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
    else {
      this._hideInputError(inputElement);
    };
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true);
    }
    else {
      this._buttonElement.removeAttribute('disabled');
    }
  }
};