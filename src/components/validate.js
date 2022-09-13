export { openValidation, enableValidation };

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add('popup__text-field__error');
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove('popup__text-field__error');
};

function checkInputValidity(formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
  else {
    hideInputError(formElement, inputElement);
  };
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text-field'));
  const buttonElement = formElement.querySelector('.popup__button-save');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      console.log('formELement = ', formElement);
      console.log('inputElement = ', inputElement);
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  });
};

function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true)
  }
  else {
    buttonElement.removeAttribute('disabled');
  }
}

function openValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text-field'));
  const buttonElement = formElement.querySelector('.popup__button-save');
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
  })
  toggleButtonState(inputList, buttonElement);
}