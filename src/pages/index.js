// styles-------------------------------------------------------------------
import './index.css';


// settings for components--------------------------------------------------
const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: 'a75084ed-65ff-46b2-92ef-67cae42fb5b5',
    'Content-Type': 'application/json'
  }
};

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__text-field__error',
}


// import variables---------------------------------------------------------
import {
  cardBlank,
  cardPlace,
  formSelectors,
  popupSelectors,
  popupOpenButtons,
  profileSelectors,
  profileFormFields,
} from '../utils/constants.js'


// callbacks for components-------------------------------------------------
const handleCardClick = (description, link) => popupWithImage.open(description, link);
const handleHeartClick = card => {
  if (card._heart.classList.contains('element__heart_active')) {
    api.likeDeleteCard(card._cardId)
      .then((res) => {
        card._heartsCount.textContent = res.likes.length;
        card._heart.classList.remove('element__heart_active');
      })
      .catch(err => console.log(err));
  }
  else {
    api.likeCard(card._cardId)
      .then((res) => {
        card._heartsCount.textContent = res.likes.length;
        card._heart.classList.add('element__heart_active');
      })
      .catch(err => console.log(err));
  }
};

const handleCardDelete = card => {
  popupDeleteCard.open(card._cardId, card.card);
}

const deleteCardSubmit = evt => {
  evt.preventDefault();
  popupDeleteCard.isLoading(true);
  api.deleteCard(popupDeleteCard.getIdCard())
    .then(() => popupDeleteCard.delete())
    .then(() => popupDeleteCard.close())
    .catch(err => console.log(err))
    .finally(() => popupDeleteCard.isLoading(false));
};

const profileFormSubmit = evt => {
  evt.preventDefault();
  profilePopup.isLoading(true);
  const inputValues = profilePopup.getFormValues();
  api.editProfile(inputValues.nameInput, inputValues.statusInput)
    .then(data => {
      const userObj = userInfo.getUserInfo(data);
      userInfo.setUserInfo(userObj);
    })
    .then(() => profilePopup.close())
    .catch(err => console.log(err))
    .finally(() => profilePopup.isLoading(false));
};

const avatarFormSubmit = evt => {
  evt.preventDefault();
  avatarPopup.isLoading(true);
  const inputValue = avatarPopup.getFormValues();
  api.newAvatar(inputValue.avatarInput)
    .then(data => {
      const userObj = userInfo.getUserInfo(data);
      userInfo.setUserInfo(userObj);
    })
    .then(() => avatarPopup.close())
    .catch(err => console.log(err))
    .finally(() => avatarPopup.isLoading(false));
}

const addCardFormSubmit = evt => {
  evt.preventDefault();
  addCardPopup.isLoading(true);
  const inputValues = addCardPopup.getFormValues();
  api.postNewCard(inputValues.pictureNameInput, inputValues.linkCardImageInput)
    .then((data) => renderCard.addItem(createCard(data))) //addNewCard(data, callBacks)
    .then(() => addCardPopup.close())
    .catch(err => console.log(err))
    .finally(() => addCardPopup.isLoading(false));
}

const renderer = {
  renderer: (item, id) => {
    renderCard._container.append(createCard(item, id));
  }
}

const callBacks = {
  handleCardClick: handleCardClick,
  handleHeartClick: handleHeartClick,
  handleCardDelete: handleCardDelete,
  profileFormSubmit: profileFormSubmit,
  deleteCardSubmit: deleteCardSubmit,
  avatarFormSubmit: avatarFormSubmit,
  addCardFormSubmit, addCardFormSubmit,
  renderer: renderer
}

// import components--------------------------------------------------------
import Api from '../components/api.js';
import Card from '../components/сard.js';
import Section from '../components/section.js';
import UserInfo from '../components/userInfo.js';
import PopupWithForm from '../components/popupWithForm.js';
import FormValidator from '../components/formValidator.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupDeleteCard from '../components/popupDeleteCard.js';


// initial components-------------------------------------------------------
const api = new Api(apiConfig);

const renderCard = new Section(cardPlace, callBacks.renderer)
const popupWithImage = new PopupWithImage(popupSelectors.viewCard);
const profilePopup = new PopupWithForm(popupSelectors.profile, evt => callBacks.profileFormSubmit(evt));
const addCardPopup = new PopupWithForm(popupSelectors.addCard, evt => callBacks.addCardFormSubmit(evt));
const avatarPopup = new PopupWithForm(popupSelectors.editAvatar, evt => callBacks.avatarFormSubmit(evt));
const popupDeleteCard = new PopupDeleteCard(popupSelectors.deleteCard, evt => callBacks.deleteCardSubmit(evt));

const avatarFormValidator = new FormValidator(validationConfig, formSelectors.avatar);
const profileFormValidator = new FormValidator(validationConfig, formSelectors.profile);
const addCardformValidator = new FormValidator(validationConfig, formSelectors.addCard);

const userInfo = new UserInfo(profileSelectors, profileFormFields);

//functions----------------------------------------------------------------
function createCard(item, userId) {
  const card = new Card(item, cardBlank, userId, callBacks);
  const markupCard = card.returnCard();
  return markupCard;
}

// executable code----------------------------------------------------------
let userData;
api.requestNameBio()
  .then(data => {
    userData = data;
    userInfo.getUserInfo(data);
    userInfo.setUserInfo()
  })

api.requestCards()
  .then(cardsData => renderCard.renderItems(cardsData, userData._id))
  .catch(err => console.log(err))

profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();
addCardformValidator.enableValidation();


// eventListeners-----------------------------------------------------------
popupOpenButtons.profile.addEventListener('click', () => {
  formSelectors.profile.reset();
      userInfo.setInput(userData.name, userData.about)
      profileFormValidator.clearMistakes();
      profilePopup.open();
});
popupOpenButtons.avatar.addEventListener('click', () => {
  avatarFormValidator.clearMistakes();
  avatarPopup.open();
});
popupOpenButtons.addCard.addEventListener('click', () => {
  addCardformValidator.clearMistakes();
  addCardPopup.open();
});