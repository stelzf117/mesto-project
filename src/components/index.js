import '../pages/index.css';
import { initialCards, renderCard, addCard } from './card.js';
import { openPopup, closePopup, currentPopup, profileFormSubmit } from './modal.js';
import { enableValidation } from './validate.js';
import { nameInput, jobInput, profileName, profileDescription, profileFormElement, popupProfile, popupAddCard, popupAddCardEdit, popupProfileEdit, formElementAddCard } from './variables.js';


// Исполняемый код
enableValidation();
initialCards.forEach(function (card) {renderCard(card.name, card.link)});

nameInput.value = profileName.textContent; 
jobInput.value = profileDescription.textContent;


// Слушатели
popupAddCardEdit.addEventListener('click', () => {openPopup(popupAddCard)});
popupProfileEdit.addEventListener('click', () => {openPopup(popupProfile);});

document.addEventListener('click', (event) => {
  if(event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close')) {
    closePopup(currentPopup);
  }
});

profileFormElement.addEventListener('submit', () => {profileFormSubmit(); closePopup(popupProfile)});
formElementAddCard.addEventListener('submit', () => {addCard(); closePopup(popupAddCard)});