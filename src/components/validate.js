export { enableValidation };

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
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } 
  else {
    inputElement.setCustomValidity('');
  } 
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
  toggleButtonState(inputList, buttonElement)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    const buttonElement = formElement.querySelector('.popup__button-save');
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      buttonElement.setAttribute('disabled', true);
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