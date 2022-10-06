import '../pages/index.css';
import { renderCard, editingCard } from './card.js';
import { openPopup, closePopup, isLoading } from './modal.js';
import { enableValidation, checkInputValidity } from './validate.js';
import { changeProfileInfo, changeAvatar, buttonDisable } from './utils.js';
import { requestNameBio, requestCards, editProfile, postNewCard, newAvatar, deleteCard } from './api.js';
import { profileFormElement, popupProfile, popupAddCard, popupAddCardEdit, popupProfileEdit, formElementAddCard, profileName, popupEditAvatar, avatarEdit, avatar, formElementEditAvatar, formEditAvatar, profileDescription, nameInput, jobInput, popupPicture, popupDescription, popupDeleteCard, cardPlace } from './variables.js';
export { viewCard, profileFormSubmit, resetProfileForm, clickButtonDelete };

// настройки запросов
const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: 'a75084ed-65ff-46b2-92ef-67cae42fb5b5',
    'Content-Type': 'application/json'
  }
}
// настройки валидации
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__text-field__error',
}

// Функции
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

function clickButtonDelete(apiConfig, cardId, trash, buttonDeleteCard) {
  deleteCard(apiConfig, cardId)
    .then(() => trash.closest('.element').remove())
    .then(() => closePopup(popupDeleteCard))
    .then(() => buttonDeleteCard.removeEventListener('click', clickButtonDelete))
    .catch(err => console.log(err))
}

function addCard(config, cardId, apiConfig) {
  const namePicture = formElementAddCard.querySelector('.popup__text-field_type_picture-name').value;
  const linkPicture = formElementAddCard.querySelector('.popup__text-field_type_picture-link').value;
  cardPlace.prepend(editingCard(namePicture, linkPicture, 0, true, true, cardId, apiConfig));
  formElementAddCard.reset();
  buttonDisable(formElementAddCard, config.submitButtonSelector);
};

// Слушатели
popupAddCardEdit.addEventListener('click', () => {openPopup(popupAddCard)});
avatarEdit.addEventListener('click', () => {openPopup(popupEditAvatar)});
popupProfileEdit.addEventListener('click', () => {
  resetProfileForm(config, profileFormElement);
  openPopup(popupProfile);
});

formEditAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  isLoading(formEditAvatar, config.submitButtonSelector, true);
  newAvatar(apiConfig, formElementEditAvatar.value)
    .then(() => changeAvatar(avatar, formElementEditAvatar.value))
    .then(() =>   closePopup(popupEditAvatar))
    .catch(err => console.log(err))
    .finally(() => isLoading(formEditAvatar, config.submitButtonSelector, false));
})

profileFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  isLoading(formEditAvatar, config.submitButtonSelector, true);
  editProfile(apiConfig, nameInput.value, jobInput.value)
    .then(() => profileFormSubmit(nameInput.value, jobInput.value))
    .then(() => closePopup(popupProfile))
    .catch(err => console.log(err))
    .finally(() => isLoading(formEditAvatar, config.submitButtonSelector, false));
});

formElementAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  isLoading(formEditAvatar, config.submitButtonSelector, true);
  postNewCard(apiConfig, document.querySelector('.popup__text-field_type_picture-name').value, document.querySelector('.popup__text-field_type_picture-link').value)
    .then((result) => addCard(config, result._id, apiConfig))
    .then(() =>   closePopup(popupAddCard))
    .catch(err => console.log(err))
    .finally(() => isLoading(formEditAvatar, config.submitButtonSelector, false));
});


let userId; // сюда записывается наш ID
// Исполняемый код
enableValidation(config);

Promise.all([requestNameBio(apiConfig), requestCards(apiConfig)])
  .then(([userData, cardsData]) => {
    changeProfileInfo(profileName, userData.name, profileDescription, userData.about, avatar, userData.avatar);
    userId = userData._id;
    cardsData.forEach(item => {renderCard(item.name, item.link, item.likes, item.owner._id, userId, item._id, apiConfig)})
  .catch(err => console.log(err));
  })