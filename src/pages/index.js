import './index.css';

import {
  profileFormElement,
  popupAddCardEdit,
  popupProfileEdit,
  formElementAddCard,
  avatarEdit,
  avatar,
  formEditAvatar,
  cardPlace,
  cardBlank,
  popupSelectors,
  validationConfig,
  userSelectors,
} from '../utils/constants.js';

import { Api, apiConfig } from '../components/api.js';

import { FormValidator } from '../components/validate.js';

// import { renderCard, editingCard } from '../components/card.js';
import { Card } from '../components/newCard.js'; //как только newCard будет готов переименовать в card.js
import { Section } from '../components/section.js';

import { PopupWithForm } from '../components/popupWithForm.js';
import { PopupWithImage } from '../components/popupWithImage.js';
import { PopupDeleteCard } from '../components/popupDeleteCard.js';
import { UserInfo } from '../components/userInfo.js';

export const api = new Api(apiConfig);

const userInfo = new UserInfo(userSelectors);

const profileFormValidator = new FormValidator(validationConfig, profileFormElement);
const avatarFormValidator = new FormValidator(validationConfig, formEditAvatar);
const addCardformValidator = new FormValidator(validationConfig, formElementAddCard);

export const popupWithImage = new PopupWithImage(popupSelectors.viewCard);

// Создаём экземпляр класса для формы редактирования профиля, 
// через колбэк - взаимодейсвие с сервером
export const popupDeleteCard = new PopupDeleteCard(popupSelectors.deleteCard, (evt) => {
  evt.preventDefault();
  popupDeleteCard.isLoading(true);
  api.deleteCard(popupDeleteCard.getIdCard())
    .then(() => popupDeleteCard.delete())
    .then(() => popupDeleteCard.close())
    .finally(() => popupDeleteCard.isLoading(false));
});
popupDeleteCard.setEventListeners(); // вешаем слушатели через метод класса

// Создаём экземпляр класса для формы редактирования профиля, 
// через колбэк - взаимодейсвие с сервером
const profilePopup = new PopupWithForm(popupSelectors.profile, (evt) => {
  evt.preventDefault();
  profilePopup.isLoading(true);
  const inputValues = profilePopup.getFormValues(); // получаем содержимое инпутов
  api.editProfile(inputValues.nameInput, inputValues.statusInput) // отправляем содержимое инпутов
    .then((data) =>  userInfo.setProfile(userInfo.getUserInfo(data)) ) //используем данные от сервера
    .then(() => profilePopup.close())
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
    .then((data) => userInfo.setAvatar(userInfo.getUserInfo(data))) //используем данные от сервера
    .then(() => avatarPopup.close())
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
    .then((data) => addNewCard(data))
    .then(() => addCardPopup.close())
    .finally(() => addCardPopup.isLoading(false));
});
addCardPopup.setEventListeners(); // вешаем слушатели через метод класса

function addNewCard(cardData) {
  const item = {
    description: cardData.name,
    link: cardData.link,
    likes: false,
    owner: { _id: true },
    _id: cardData._id
  };

  const renderCard = new Section({}, cardPlace);
  const newCard = new Card(item, cardBlank, true);
  renderCard.addItem(newCard.returnCard(cardData.name, cardData.link));
  formElementAddCard.reset();
};

//// Исполняемый код ////

// Слушатели
avatarEdit.addEventListener('click', () => { avatarPopup.open() });

popupProfileEdit.addEventListener('click', () => {
  profilePopup.open();
  api.requestNameBio()
    .then((data) => { userInfo.setInputs(userInfo.getUserInfo(data)) });
});

popupAddCardEdit.addEventListener('click', () => { addCardPopup.open() });

// Запускаем валидацию форм
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();
addCardformValidator.enableValidation();

Promise.all([api.requestNameBio(), api.requestCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    const renderCards = new Section({
      items: cardsData,
      renderer: (item) => {
        const card = new Card(item, cardBlank, userData._id);
        renderCards.container.append(card.returnCard(item.name, item.link));
      }
    },
      cardPlace
    );
    renderCards.renderItems()
  })
  .catch(err => console.log(err));
