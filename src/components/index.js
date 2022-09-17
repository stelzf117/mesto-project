import '../pages/index.css';
import { initialCards, renderCard, addCard } from './card.js';
import { openPopup, closePopup, profileFormSubmit, resetProfileForm } from './modal.js';
import { enableValidation } from './validate.js';
import { profileFormElement, popupProfile, popupAddCard, popupAddCardEdit, popupProfileEdit, formElementAddCard } from './variables.js';

// настройка валидации
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__text-field__error',
}

// Слушатели
popupAddCardEdit.addEventListener('click', () => {openPopup(popupAddCard)});
popupProfileEdit.addEventListener('click', () => {
  resetProfileForm(config, profileFormElement);
  openPopup(popupProfile);
});

profileFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileFormSubmit(); 
  closePopup(popupProfile);
});

formElementAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard(config);
  closePopup(popupAddCard);
});

// Исполняемый код
enableValidation(config);
initialCards.forEach(function (card) {renderCard(card.name, card.link)});