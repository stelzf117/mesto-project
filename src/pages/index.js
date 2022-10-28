import './index.css';
// import { renderCard, editingCard } from '../components/card.js';
import { FormValidator } from '../components/validate.js';

import { deleteCardPopup } from '../components/popup.js';
import { PopupWithForm } from '../components/popupWithForm.js';

import { changeProfileInfo, changeAvatar, buttonDisable } from '../utils/utils.js';
import { api } from '../components/api.js';
import { profileFormElement, popupAddCardEdit, popupProfileEdit, formElementAddCard, profileName, avatarEdit, avatar, formElementEditAvatar, formEditAvatar, profileDescription, nameInput, jobInput, popupPicture, popupDescription, cardPlace, cardBlank, popupSelectors } from '../utils/constants.js';

import { Card } from '../components/newCard.js'; //как только newCard будет готов переименовать в card.js
import { Section } from '../components/section.js';

// настройки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__text-field__error',
}

// Для каждой проверяемой формы создаваём экземпляр класса
const profileFormValidator = new FormValidator(validationConfig, profileFormElement);
const avatarFormValidator = new FormValidator(validationConfig, formEditAvatar);
const addCardformValidator = new FormValidator(validationConfig, formElementAddCard);

const profilePopup = new PopupWithForm(popupSelectors.profile, (evt) => { });
const avatarPopup = new PopupWithForm(popupSelectors.editAvatar, (evt) => { });
const addCardPopup = new PopupWithForm(popupSelectors.addCard, (evt) => { });

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
  inputList.forEach((inputElement) => {profileFormValidator.checkInputValidity(inputElement)});
  buttonDisable(formElement, config.submitButtonSelector);
};

export function clickButtonDelete(cardId, trash, buttonDeleteCard) {
  api.deleteCard(cardId)
    .then(() => trash.closest('.element').remove())
    .then(() => deleteCardPopup.close())
    .then(() => buttonDeleteCard.removeEventListener('click', clickButtonDelete))
    .catch(err => console.log(err))
}

function addCard(config, cardId) {
  const namePicture = formElementAddCard.querySelector('.popup__text-field_type_picture-name').value;
  const linkPicture = formElementAddCard.querySelector('.popup__text-field_type_picture-link').value;

  const item = {
    name: namePicture,
    link: linkPicture,
    likes: false,
    owner: {_id: true},
    _id: cardId
  };

  const renderCard = new Section({},cardPlace);
  const newCard = new Card({ item }, cardBlank, true)

  renderCard.addItem(newCard.returnCard())

  formElementAddCard.reset();
  buttonDisable(formElementAddCard, config.submitButtonSelector);
};

// Слушатели
avatarEdit.addEventListener('click', () => { avatarPopup.open() });
popupProfileEdit.addEventListener('click', () => {
  resetProfileForm(validationConfig, profileFormElement);
  profilePopup.open();
});
popupAddCardEdit.addEventListener('click', () => { addCardPopup.open() });

formEditAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  avatarPopup.isLoading(true);
  api.newAvatar(formElementEditAvatar.value)
    .then(() => changeAvatar(avatar, formElementEditAvatar.value))
    .then(() => avatarPopup.close())
    .catch(err => console.log(err))
    .finally(() => avatarPopup.isLoading(false));
})

profileFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profilePopup.isLoading(true);
  api.editProfile(nameInput.value, jobInput.value)
    .then(() => profileFormSubmit(nameInput.value, jobInput.value))
    .then(() => profilePopup.close())
    .catch(err => console.log(err))
    .finally(() => profilePopup.isLoading(false));
});

formElementAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCardPopup.isLoading(true);
  api.postNewCard(document.querySelector('.popup__text-field_type_picture-name').value, document.querySelector('.popup__text-field_type_picture-link').value)
    .then((result) => addCard(validationConfig, result._id))
    .then(() => addCardPopup.close())
    .catch(err => console.log(err))
    .finally(() => addCardPopup.isLoading(false));
});


let userId; // сюда записывается наш ID

// Исполняемый код

// Запускаем валидацию форм
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();
addCardformValidator.enableValidation();

Promise.all([api.requestNameBio(), api.requestCards()])
  .then(([userData, cardsData]) => {
    changeProfileInfo(profileName, userData.name, profileDescription, userData.about, avatar, userData.avatar);
    userId = userData._id;

    const renderCards = new Section({
        items: cardsData,
        renderer: (item) => {
          const card = new Card({ item }, cardBlank, userId);
          renderCards._container.append(card.returnCard());
        }
      },
      cardPlace
    );

    renderCards.renderItems()
  })
  .catch(err => console.log(err));