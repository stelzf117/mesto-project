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
const handleCardDelete = card => popupDeleteCard.open(card._cardId, card.card);

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
    .then(data => userInfo.setUserInfo(userInfo.getUserInfo(data)))
    .then(() => profilePopup.close())
    .catch(err => console.log(err))
    .finally(() => profilePopup.isLoading(false));
};

const avatarFormSubmit = evt => {
  evt.preventDefault();
  avatarPopup.isLoading(true);
  const inputValue = avatarPopup.getFormValues();
  api.newAvatar(inputValue.avatarInput)
    .then(data => userInfo.setUserAvatar(userInfo.getUserInfo(data))) 
    .then(() => avatarPopup.close())
    .catch(err => console.log(err))
    .finally(() => avatarPopup.isLoading(false));
}

const addCardFormSubmit = evt => {
  evt.preventDefault();
  addCardPopup.isLoading(true);
  const inputValues = addCardPopup.getFormValues();
  api.postNewCard(inputValues.pictureNameInput, inputValues.linkCardImageInput)
    .then((data) => addNewCard(data, callBacks))
    .then(() => addCardPopup.close())
    .catch(err => console.log(err))
    .finally(() => addCardPopup.isLoading(false));
}

const callBacks = {
  handleCardClick: handleCardClick,
  handleHeartClick: handleHeartClick,
  handleCardDelete: handleCardDelete,
  profileFormSubmit: profileFormSubmit,
  deleteCardSubmit: deleteCardSubmit,
  avatarFormSubmit: avatarFormSubmit,
  addCardFormSubmit, addCardFormSubmit
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

const popupWithImage = new PopupWithImage(popupSelectors.viewCard);
const profilePopup = new PopupWithForm(popupSelectors.profile, evt => callBacks.profileFormSubmit(evt));
const addCardPopup = new PopupWithForm(popupSelectors.addCard, evt => callBacks.addCardFormSubmit(evt));
const avatarPopup = new PopupWithForm(popupSelectors.editAvatar, evt => callBacks.avatarFormSubmit(evt));
const popupDeleteCard = new PopupDeleteCard(popupSelectors.deleteCard, evt => callBacks.deleteCardSubmit(evt));

const avatarFormValidator = new FormValidator(validationConfig, formSelectors.avatar);
const profileFormValidator = new FormValidator(validationConfig, formSelectors.profile);
const addCardformValidator = new FormValidator(validationConfig, formSelectors.addCard);

const userInfo = new UserInfo(profileSelectors);


//functions----------------------------------------------------------------
function resetProfileForm() {
  profileFormFields.userName.value = profileSelectors.userName.textContent;
  profileFormFields.userDescription.value = profileSelectors.userDescription.textContent;
  const inputList = profilePopup.getInputList();
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
  formSelectors.addCard.reset();
};


// eventListeners-----------------------------------------------------------
popupOpenButtons.profile.addEventListener('click', () => {resetProfileForm(), profilePopup.open()});
popupOpenButtons.avatar.addEventListener('click', () => avatarPopup.open());
popupOpenButtons.addCard.addEventListener('click', () => addCardPopup.open());

avatarPopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
popupDeleteCard.setEventListeners();


// executable code----------------------------------------------------------
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();
addCardformValidator.enableValidation();

Promise.all([api.requestNameBio(), api.requestCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userInfo.getUserInfo(userData));
    const renderCards = new Section({
      items: cardsData,
      renderer: item => {
        const card = new Card(item, cardBlank, userData._id, callBacks);
        renderCards.container.append(card.returnCard(item.name, item.link));
      }
    },
      cardPlace
    );
    renderCards.renderItems()
  })
  .catch(err => console.log(err));