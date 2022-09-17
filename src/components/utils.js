export { buttonDisable };

function buttonDisable(formElement, buttonSelector) {
  const buttonElement = formElement.querySelector(buttonSelector);
  buttonElement.setAttribute('disabled', true);
};