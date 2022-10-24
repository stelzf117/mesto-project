export { FormValidator };

class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorClass = config.inputErrorClass;
  }

  _enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((element) => {
      setEventListeners(element, this._inputSelector, this._submitButtonSelector, this._inputErrorClass);
    });
  }

  _checkInputValidity(formElement, inputElement, inputErrorClass) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else {
      inputElement.setCustomValidity('');
    }
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
    }
    else {
      hideInputError(formElement, inputElement, inputErrorClass);
    };
  }

  _showInputError(formElement, inputElement, errorMessage, inputErrorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(inputErrorClass);
  }

  _hideInputError(formElement, inputElement, inputErrorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(inputErrorClass);
  }

  _setEventListeners(formElement, popupInput, submitButtonSelector, inputErrorClass) {
    const inputList = Array.from(formElement.querySelectorAll(popupInput));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, inputErrorClass);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
    }
    else {
      buttonElement.removeAttribute('disabled');
    }
  }
};

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config.inputSelector, config.submitButtonSelector, config.inputErrorClass);
  });
};

export function checkInputValidity(formElement, inputElement, inputErrorClass) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else {
    inputElement.setCustomValidity('');
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
  }
  else {
    hideInputError(formElement, inputElement, inputErrorClass);
  };
};

function showInputError(formElement, inputElement, errorMessage, inputErrorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(inputErrorClass);
};

function hideInputError(formElement, inputElement, inputErrorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove(inputErrorClass);
};

function setEventListeners(formElement, popupInput, submitButtonSelector, inputErrorClass) {
  const inputList = Array.from(formElement.querySelectorAll(popupInput));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  });
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
  }
  else {
    buttonElement.removeAttribute('disabled');
  }
}