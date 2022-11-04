import './index.css';
export const api = new Api(apiConfig);
export const popupWithImage = new PopupWithImage(popupSelectors.viewCard);
// ----------------------------------------------------------------------------------
import {
  changeProfileInfo,
  changeAvatar
} from '../utils/utils.js';
// ----------------------------------------------------------------------------------
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
  validationConfig
} from '../utils/constants.js';
// ----------------------------------------------------------------------------------
import { Api, apiConfig } from '../components/api.js';
import { FormValidator } from '../components/validate.js';
import { Card } from '../components/сard.js';
import { Section } from '../components/section.js';
import { PopupWithForm } from '../components/popupWithForm.js';
import { PopupWithImage } from '../components/popupWithImage.js';
import { PopupDeleteCard } from '../components/popupDeleteCard.js';
// ----------------------------------------------------------------------------------
const profileFormValidator = new FormValidator(validationConfig, profileFormElement);
const avatarFormValidator = new FormValidator(validationConfig, formEditAvatar);
const addCardformValidator = new FormValidator(validationConfig, formElementAddCard);
// ----------------------------------------------------------------------------------
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
// ----------------------------------------------------------------------------------


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
    .then((data) => profileFormSubmit(data.name, data.about)) //используем данные от сервера
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
    .then((data) => changeAvatar(avatar, data.avatar)) //используем данные от сервера
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
    .then((data) => addNewCard(data, callBacks))
    .then(() => addCardPopup.close())
    .finally(() => addCardPopup.isLoading(false));
});
addCardPopup.setEventListeners(); // вешаем слушатели через метод класса

export function profileFormSubmit(newName, newDescription) {
  profileName.textContent = newName;
  profileDescription.textContent = newDescription;
};

export function resetProfileForm(formElement) {
  const inputList = profilePopup.getInputList();
  formElement.reset();
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  inputList.forEach((inputElement) => { profileFormValidator.checkInputValidity(inputElement) });
};

// ----------------------------------------------------------------------------------
// Функция должна возвращать объект и добавлять все слушатели, налаживать взаимодействие с api и получение данных от форм
// Вторая функция должна добавлять карточку в разметку
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

// ----------------------------------------------------------------------------------
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
    changeProfileInfo(profileName, userData.name, profileDescription, userData.about, avatar, userData.avatar);

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