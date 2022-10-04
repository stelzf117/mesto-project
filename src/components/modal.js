export { viewCard, openPopup, closePopup, profileFormSubmit, resetProfileForm, isLoading };
import { checkInputValidity } from './validate.js';
import { buttonDisable } from './utils.js';
import { profileName, profileDescription, nameInput, jobInput, popupPicture, popupDescription, popupOpened, popupClose } from './variables.js';



function viewCard(imageName, imageLink) {
  popupPicture.src = imageLink;
  popupPicture.alt = imageName;
  popupDescription.textContent = imageName;
};

function profileFormSubmit (newName, newDescription) {
  profileName.textContent = newName;
  profileDescription.textContent = newDescription;
};

function resetProfileForm(config, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  formElement.reset();
  nameInput.value = profileName.textContent; 
  jobInput.value = profileDescription.textContent;
  inputList.forEach((inputElement) => {checkInputValidity(formElement, inputElement, config.inputErrorClass)});
  buttonDisable(formElement, config.submitButtonSelector);
};

function closeEscape(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector(`.${popupOpened}`));
  }
};

function closeClick(event) {
  if(event.target.classList.contains(popupOpened) || event.target.classList.contains(popupClose)) {
    closePopup(event.currentTarget);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscape);
  popup.addEventListener('click', closeClick);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscape);
  popup.removeEventListener('click', closeClick);
};

function isLoading(poupForm, submitButtonSelector, loading) {
  const button = poupForm.querySelector(submitButtonSelector);
  if(loading) {
    button.textContent = 'Сохранение...'
  }
  else {
    button.textContent = 'Сохранить'
  }
}