export { enableValidation };

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

function checkInputValidity(formElement, inputElement, inputErrorClass) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } 
  else {
    inputElement.setCustomValidity('');
  } 
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
  }
  else {
    hideInputError(formElement, inputElement, inputErrorClass);
  };
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

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      buttonElement.setAttribute('disabled', true);
    });
    setEventListeners(formElement, config.inputSelector, config.submitButtonSelector, config.inputErrorClass);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  });
};

function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    console.log(`button disabled ${buttonElement.id}`);
  }
  else {
    buttonElement.removeAttribute('disabled');
    console.log(`button restored ${buttonElement.id}`)
  }
}