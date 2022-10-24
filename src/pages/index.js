import './index.css';
// import { renderCard, editingCard } from '../components/card.js';
import { openPopup, closePopup, isLoading } from '../components/modal.js';
import { enableValidation, checkInputValidity, formValidator } from '../components/validate.js';
import { changeProfileInfo, changeAvatar, buttonDisable } from '../utils/utils.js';
import { api } from '../components/api.js';
import { profileFormElement, popupProfile, popupAddCard, popupAddCardEdit, popupProfileEdit, formElementAddCard, profileName, popupEditAvatar, avatarEdit, avatar, formElementEditAvatar, formEditAvatar, profileDescription, nameInput, jobInput, popupPicture, popupDescription, popupDeleteCard, cardPlace, cardBlank } from '../utils/constants.js';

import { Card } from '../components/newCard.js'; //как только newCard будет готов переименовать в card.js

// настройки валидации
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__text-field__error',
}

// Функции
export function viewCard(imageName, imageLink) {
  popupPicture.src = imageLink;
  popupPicture.alt = imageName;
  popupDescription.textContent = imageName;
};

export function profileFormSubmit (newName, newDescription) {
  profileName.textContent = newName;
  profileDescription.textContent = newDescription;
};

export function resetProfileForm(config, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  formElement.reset();
  nameInput.value = profileName.textContent; 
  jobInput.value = profileDescription.textContent;
  inputList.forEach((inputElement) => {checkInputValidity(formElement, inputElement, validationConfig.inputErrorClass)});
  buttonDisable(formElement, validationConfig.submitButtonSelector);
};

export function clickButtonDelete(cardId, trash, buttonDeleteCard) {
  api.deleteCard(cardId)
    .then(() => trash.closest('.element').remove())
    .then(() => closePopup(popupDeleteCard))
    .then(() => buttonDeleteCard.removeEventListener('click', clickButtonDelete))
    .catch(err => console.log(err))
}

function addCard(validationConfig, cardId) {
  const namePicture = formElementAddCard.querySelector('.popup__text-field_type_picture-name').value;
  const linkPicture = formElementAddCard.querySelector('.popup__text-field_type_picture-link').value;
  const item = {
    name: namePicture,
    link: linkPicture,
    likes: false,
    owner: {_id: true},
    _id: cardId
  };
  const newCard = new Card({ item }, cardBlank, true);
  cardPlace.prepend(newCard.returnCard())
  formElementAddCard.reset();
  buttonDisable(formElementAddCard, validationConfig.submitButtonSelector);
};

// Слушатели
popupAddCardEdit.addEventListener('click', () => {openPopup(popupAddCard)});
avatarEdit.addEventListener('click', () => {openPopup(popupEditAvatar)});
popupProfileEdit.addEventListener('click', () => {
  resetProfileForm(validationConfig, profileFormElement);
  openPopup(popupProfile);
});

formEditAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  isLoading(formEditAvatar, validationConfig.submitButtonSelector, true);
  api.newAvatar(formElementEditAvatar.value)
    .then(() => changeAvatar(avatar, formElementEditAvatar.value))
    .then(() =>   closePopup(popupEditAvatar))
    .catch(err => console.log(err))
    .finally(() => isLoading(formEditAvatar, validationConfig.submitButtonSelector, false));
})

profileFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  isLoading(formEditAvatar, validationConfig.submitButtonSelector, true);
  api.editProfile(nameInput.value, jobInput.value)
    .then(() => profileFormSubmit(nameInput.value, jobInput.value))
    .then(() => closePopup(popupProfile))
    .catch(err => console.log(err))
    .finally(() => isLoading(formEditAvatar, validationConfig.submitButtonSelector, false));
});

formElementAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  isLoading(formEditAvatar, validationConfig.submitButtonSelector, true);
  api.postNewCard(document.querySelector('.popup__text-field_type_picture-name').value, document.querySelector('.popup__text-field_type_picture-link').value)
    .then((result) => addCard(config, result._id))
    .then(() => closePopup(popupAddCard))
    .catch(err => console.log(err))
    .finally(() => isLoading(formEditAvatar, validationConfig.submitButtonSelector, false));
});



let userId; // сюда записывается наш ID
// Исполняемый код
enableValidation(validationConfig);
//formValidator.enableValidation();

Promise.all([api.requestNameBio(), api.requestCards()])
  .then(([userData, cardsData]) => {
    changeProfileInfo(profileName, userData.name, profileDescription, userData.about, avatar, userData.avatar);
    userId = userData._id;
    cardsData.forEach(item => {
      const card = new Card({ item }, cardBlank, userId);
      cardPlace.append(card.returnCard());
    })
  })
  .catch(err => console.log(err));