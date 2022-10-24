import './index.css';
import { renderCard, editingCard } from '../components/card.js';
import { openPopup, closePopup, isLoading } from '../components/modal.js';
import { enableValidation, checkInputValidity, formValidator } from '../components/validate.js';
import { changeProfileInfo, changeAvatar, buttonDisable } from '../utils/utils.js';
import { api } from '../components/api.js';
import { profileFormElement, popupProfile, popupAddCard, popupAddCardEdit, popupProfileEdit, formElementAddCard, profileName, popupEditAvatar, avatarEdit, avatar, formElementEditAvatar, formEditAvatar, profileDescription, nameInput, jobInput, popupPicture, popupDescription, popupDeleteCard, cardPlace, validationConfig } from '../utils/constants.js';

/* console.log(formValidator.formSelector); */

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

function resetProfileForm(validationConfig, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  formElement.reset();
  nameInput.value = profileName.textContent; 
  jobInput.value = profileDescription.textContent;
  inputList.forEach((inputElement) => {checkInputValidity(formElement, inputElement, validationConfig.inputErrorClass)});
  buttonDisable(formElement, validationConfig.submitButtonSelector);
};

function clickButtonDelete(cardId, trash, buttonDeleteCard) {
  api.deleteCard(cardId)
    .then(() => trash.closest('.element').remove())
    .then(() => closePopup(popupDeleteCard))
    .then(() => buttonDeleteCard.removeEventListener('click', clickButtonDelete))
    .catch(err => console.log(err))
}

function addCard(validationConfig, cardId) {
  const namePicture = formElementAddCard.querySelector('.popup__text-field_type_picture-name').value;
  const linkPicture = formElementAddCard.querySelector('.popup__text-field_type_picture-link').value;
  cardPlace.prepend(editingCard(namePicture, linkPicture, 0, true, true, cardId));
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
    .then((result) => addCard(validationConfig, result._id))
    .then(() =>   closePopup(popupAddCard))
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
    cardsData.forEach(item => {renderCard(item.name, item.link, item.likes, item.owner._id, userId, item._id)})
  })
  .catch(err => console.log(err));

export { viewCard, profileFormSubmit, resetProfileForm, clickButtonDelete };