import '../pages/index.css';
import { initialCards, renderCard, addCard } from './card.js';
import { openPopup, closePopup, currentPopup, profileFormSubmit } from './modal.js';
import { enableValidation } from './validate.js';
import { nameInput, jobInput, profileName, profileDescription, profileFormElement, popupProfile, popupAddCard, popupAddCardEdit, popupProfileEdit, formElementAddCard } from './variables.js';

// настройка валидации
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__text-field__error',
}


// Исполняемый код
enableValidation(config);
initialCards.forEach(function (card) {renderCard(card.name, card.link)});

nameInput.value = profileName.textContent; 
jobInput.value = profileDescription.textContent;


// Слушатели
popupAddCardEdit.addEventListener('click', () => {openPopup(popupAddCard)});
popupProfileEdit.addEventListener('click', () => {openPopup(popupProfile)});

profileFormElement.addEventListener('submit', () => {profileFormSubmit(); closePopup(popupProfile)});
formElementAddCard.addEventListener('submit', () => {addCard(); closePopup(popupAddCard)});