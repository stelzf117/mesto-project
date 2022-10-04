import '../pages/index.css';
import { renderCard, addCard } from './card.js';
import { openPopup, closePopup, profileFormSubmit, resetProfileForm, isLoading } from './modal.js';
import { enableValidation } from './validate.js';
import { changeProfileInfo, changeAvatar } from './utils.js';
import { requestNameBio, requestCards, editProfile, postNewCard, newAvatar } from './api.js';
import { profileFormElement, popupProfile, popupAddCard, popupAddCardEdit, popupProfileEdit, formElementAddCard, profileName, profileDescription, nameInput, jobInput, popupEditAvatar, avatarEdit, avatar, formElementEditAvatar, formEditAvatar } from './variables.js';


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
    .catch(err => console.log(err))
    .finally(() => isLoading(formEditAvatar, config.submitButtonSelector, false))
  closePopup(popupEditAvatar);
})

profileFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  isLoading(formEditAvatar, config.submitButtonSelector, true);
  editProfile(apiConfig, nameInput.value, jobInput.value)
    .then(() => {profileFormSubmit(nameInput.value, jobInput.value)})
    .catch(err => console.log(err))
    .finally(() => isLoading(formEditAvatar, config.submitButtonSelector, false));
  closePopup(popupProfile);
});

formElementAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  isLoading(formEditAvatar, config.submitButtonSelector, true);
  postNewCard(apiConfig, document.querySelector('.popup__text-field_type_picture-name').value, document.querySelector('.popup__text-field_type_picture-link').value)
    .then((result) => addCard(config, result._id, apiConfig))
    .catch(err => console.log(err))
    .finally(() => isLoading(formEditAvatar, config.submitButtonSelector, false));
  closePopup(popupAddCard);
});


let userId; // сюда записывается наш ID
// Исполняемый код
enableValidation(config);

requestNameBio(apiConfig)
  .then(data => {
    changeProfileInfo(profileName, data.name, profileDescription, data.about, avatar, data.avatar);
    userId = data._id;
  })
  .catch(err => console.log(err));

requestCards(apiConfig)
  .then(data => {data.forEach(item => {renderCard(item.name, item.link, item.likes, item.owner._id, userId, item._id, apiConfig)})})
  .catch(err => console.log(err));