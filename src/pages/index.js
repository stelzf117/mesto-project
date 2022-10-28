import './index.css';
// import { renderCard, editingCard } from '../components/card.js';
import { FormValidator } from '../components/validate.js';

import { Popup } from '../components/popup.js';
import { PopupWithForm } from '../components/popupWithForm.js';

import {
  changeProfileInfo,
  changeAvatar,
  buttonDisable
} from '../utils/utils.js';

import { api } from '../components/api.js';
import {
  profileFormElement,
  popupAddCardEdit,
  popupProfileEdit,
  formElementAddCard,
  profileName,
  avatarEdit,
  avatar,
  formEditAvatar,
  profileDescription,
  nameInput,
  jobInput,
  popupPicture,
  popupDescription,
  cardPlace,
  cardBlank,
  popupSelectors
} from '../utils/constants.js';

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

export const deleteCardPopup = new Popup(popupSelectors.deleteCard);
export const viewCardPopup = new Popup(popupSelectors.viewCard);


// Создаём экземпляр класса для формы редактирования профиля, 
// через колбэк - взаимодейсвие с сервером
const profilePopup = new PopupWithForm(popupSelectors.profile, (evt) => {
  evt.preventDefault();
  profilePopup.isLoading(true);
  const inputValues = profilePopup.getFormValues(); // получаем содержимое инпутов
  api.editProfile(inputValues.nameInput, inputValues.statusInput) // отправляем содержимое инпутов
    .then((data) => profileFormSubmit(data.name, data.about)) //используем данные от сервера
    .then(() => profilePopup.close())
    .catch((err) => console.log(err))
    .finally(() => profilePopup.isLoading(false));
});
profilePopup.setEventListeners(); // вешаем слушатели через метод класса


// Создаём экземпляр класса для формы редактирования аватарки,
// через колбэк - взаимодейсвие с сервером
const avatarPopup = new PopupWithForm(popupSelectors.editAvatar, (evt) => {
  evt.preventDefault();
  avatarPopup.isLoading(true);
  const inputValue = avatarPopup.getFormValues(); // получаем содержимое инпута
  api.newAvatar(inputValue.avatarInput) // отправляем содержимое инпута
    .then((data) => changeAvatar(avatar, data.avatar)) //используем данные от сервера
    .then(() => avatarPopup.close())
    .catch((err) => console.log(err))
    .finally(() => avatarPopup.isLoading(false));
});
avatarPopup.setEventListeners(); // вешаем слушатели через метод класса


// Создаём экземпляр класса для формы добавления карточки,
// через колбэк - взаимодейсвие с сервером
const addCardPopup = new PopupWithForm(popupSelectors.addCard, (evt) => {
  evt.preventDefault();
  addCardPopup.isLoading(true);
  const inputValues = addCardPopup.getFormValues(); // получаем содержимое инпутов
  api.postNewCard(inputValues.pictureNameInput, inputValues.linkCardImageInput) // отправляем содержимое инпутов
    .then((data) => addCard(validationConfig, data._id, data.name, data.link))
    .then(() => addCardPopup.close())
    .catch((err) => console.log(err))
    .finally(() => addCardPopup.isLoading(false));
});
addCardPopup.setEventListeners(); // вешаем слушатели через метод класса


// Функции
export function viewCard(imageName, imageLink) {
  popupPicture.src = imageLink;
  popupPicture.alt = imageName;
  popupDescription.textContent = imageName;
};

export function profileFormSubmit(newName, newDescription) {
  profileName.textContent = newName;
  profileDescription.textContent = newDescription;
};

export function resetProfileForm(config, formElement) {
  const inputList = profilePopup.getInputList();
  formElement.reset();
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  inputList.forEach((inputElement) => { profileFormValidator.checkInputValidity(inputElement) });
  buttonDisable(formElement, config.submitButtonSelector);
};

export function clickButtonDelete(cardId, trash, buttonDeleteCard) {
  api.deleteCard(cardId)
    .then(() => trash.closest('.element').remove())
    .then(() => deleteCardPopup.close())
    .then(() => buttonDeleteCard.removeEventListener('click', clickButtonDelete))
    .catch(err => console.log(err))
}

function addCard(config, cardId, name, link) {

  const item = {
    name: name,
    link: link,
    likes: false,
    owner: { _id: true },
    _id: cardId
  };

  const renderCard = new Section({}, cardPlace);
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