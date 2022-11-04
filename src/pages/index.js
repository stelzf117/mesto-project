import './index.css';
export const api = new Api(apiConfig);
export const popupWithImage = new PopupWithImage(popupSelectors.viewCard);
//// Импорт utils ////
import { changeAvatar } from '../utils/utils.js';

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
  cardPlace,
  cardBlank,
  popupSelectors,
  validationConfig,
  profileSelectors
} from '../utils/constants.js';
//// Импорт модулей
import { Api, apiConfig } from '../components/api.js';
import { FormValidator } from '../components/validate.js';
import { Card } from '../components/сard.js';
import { Section } from '../components/section.js';
import { PopupWithForm } from '../components/popupWithForm.js';
import { PopupWithImage } from '../components/popupWithImage.js';
import { PopupDeleteCard } from '../components/popupDeleteCard.js';
import UserInfo from '../components/userInfo.js';
//// Переменные ////
const profileFormValidator = new FormValidator(validationConfig, profileFormElement);
const avatarFormValidator = new FormValidator(validationConfig, formEditAvatar);
const addCardformValidator = new FormValidator(validationConfig, formElementAddCard);
const userinfo = new UserInfo(profileSelectors);
//// Функции коллбэки ////
const handleCardClick = (description, link) => popupWithImage.open(description, link);
const handleHeartClick = (card) => {
  if (card._heart.classList.contains('element__heart_active')) {
    api.likeDeleteCard(card._cardId)
      .then((res) => {
        card._heartsCount.textContent = res.likes.length;
        card._heart.classList.remove('element__heart_active');
      })
  }
  else {
    api.likeCard(card._cardId)
      .then((res) => {
        card._heartsCount.textContent = res.likes.length;
        card._heart.classList.add('element__heart_active');
      })
  }
}
const handleCardDelete = (card) => popupDeleteCard.open(card._cardId, card.card)
const callBacks = {
  handleCardClick: handleCardClick,
  handleHeartClick: handleHeartClick,
  handleCardDelete: handleCardDelete
}

export const popupDeleteCard = new PopupDeleteCard(popupSelectors.deleteCard, (evt) => {
  evt.preventDefault();
  popupDeleteCard.isLoading(true);
  api.deleteCard(popupDeleteCard.getIdCard())
    .then(() => popupDeleteCard.delete())
    .then(() => popupDeleteCard.close())
    .finally(() => popupDeleteCard.isLoading(false));
});
popupDeleteCard.setEventListeners();


//// Функции ////
const profilePopup = new PopupWithForm(popupSelectors.profile, (evt) => {
  evt.preventDefault();
  profilePopup.isLoading(true);
  const inputValues = profilePopup.getFormValues();
  api.editProfile(inputValues.nameInput, inputValues.statusInput)
    .then((data) => profileFormSubmit(data.name, data.about))
    .then(() => profilePopup.close())
    .finally(() => profilePopup.isLoading(false));
});
profilePopup.setEventListeners();


const avatarPopup = new PopupWithForm(popupSelectors.editAvatar, (evt) => {
  evt.preventDefault();
  avatarPopup.isLoading(true);
  const inputValue = avatarPopup.getFormValues();
  api.newAvatar(inputValue.avatarInput)
    .then((data) => changeAvatar(avatar, data.avatar)) 
    .then(() => avatarPopup.close())
    .finally(() => avatarPopup.isLoading(false));
});
avatarPopup.setEventListeners();


const addCardPopup = new PopupWithForm(popupSelectors.addCard, (evt) => {
  evt.preventDefault();
  addCardPopup.isLoading(true);
  const inputValues = addCardPopup.getFormValues();
  api.postNewCard(inputValues.pictureNameInput, inputValues.linkCardImageInput)
    .then((data) => addNewCard(data, callBacks))
    .then(() => addCardPopup.close())
    .finally(() => addCardPopup.isLoading(false));
});
addCardPopup.setEventListeners();

function profileFormSubmit(newName, newDescription) {
  profileName.textContent = newName;
  profileDescription.textContent = newDescription;
};

function resetProfileForm(formElement) {
  const inputList = profilePopup.getInputList();
  formElement.reset();
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  inputList.forEach((inputElement) => { profileFormValidator.checkInputValidity(inputElement) });
};


function addNewCard(cardData, callBacks) {
  const item = {
    description: cardData.name,
    link: cardData.link,
    likes: false,
    owner: { _id: true },
    _id: cardData._id
  };
  const renderCard = new Section({}, cardPlace);
  const newCard = new Card(item, cardBlank, true, callBacks);
  renderCard.addItem(newCard.returnCard(cardData.name, cardData.link));
  formElementAddCard.reset();
};


//// Исполняемый код ////
avatarEdit.addEventListener('click', () => { avatarPopup.open() });
popupProfileEdit.addEventListener('click', () => {
  resetProfileForm(profileFormElement);
  profilePopup.open();
});
popupAddCardEdit.addEventListener('click', () => { addCardPopup.open() });

profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();
addCardformValidator.enableValidation();

Promise.all([api.requestNameBio(), api.requestCards()])
  .then(([userData, cardsData]) => {
    userinfo.setUserInfo(userinfo.getUserInfo(userData));
    const renderCards = new Section({
      items: cardsData,
      renderer: (item) => {
        const card = new Card(item, cardBlank, userData._id, callBacks)
        renderCards.container.append(card.returnCard(item.name, item.link));
      }
    },
      cardPlace
    );
    renderCards.renderItems()
  })
  .catch(err => console.log(err));