import '../../pages/index.css';
import { initialCards, renderCard, popupAddCard, formElementAddCard, addCard } from './card.js';
import { openPopup, closePopup, currentPopup, profileFormSubmit } from './modal.js';
import { openValidation, enableValidation } from './validate.js';
import { nameInput, jobInput, profileName, profileDescription, profileFormElement, popupProfile } from './variables.js';



// Исполняемый код
enableValidation();

initialCards.forEach(function (card) {
  renderCard(card.name, card.link);
});


// Слушатели
profileFormElement.addEventListener('submit', profileFormSubmit);
formElementAddCard.addEventListener('submit', () => {addCard(); closePopup(popupAddCard)});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('profile__add')) {
    openPopup(popupAddCard);
    openValidation(formElementAddCard);
  } 
  else if (event.target.classList.contains('profile__edit')) {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent; 
    jobInput.value = profileDescription.textContent;
    openValidation(profileFormElement);
  }
});

document.addEventListener('click', (event) => {
  if(event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close')) {
    closePopup(currentPopup);
  }
});

const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10 