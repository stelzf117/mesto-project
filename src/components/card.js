import { viewCard, openPopup, clickButtonDelete } from "./modal.js";
import { buttonDisable } from './utils.js';
import { likeCard, likeDeleteCard } from './api.js' ;
import { cardPlace, cardBlank, formElementAddCard, popupViewCard, popupDeleteCard, buttonDeleteCard } from './variables.js';
export { renderCard, addCard };


function editingCard(nameImage, linkImage, likes, ownerId, userId, cardId, apiConfig) {
  const cardElement = cardBlank.querySelector('.element').cloneNode(true);
  const photoElement = cardElement.querySelector('.element__photo');
  const photoName = cardElement.querySelector('.element__name');
  const trash = cardElement.querySelector('.element__trash');
  const heart = cardElement.querySelector('.element__heart');
  const heartsCount = cardElement.querySelector('.element__hearts-count');

  photoElement.src = linkImage;
  photoElement.setAttribute('alt', nameImage);
  photoName.textContent = nameImage;
  photoElement.addEventListener('click', () => {viewCard(nameImage, linkImage); openPopup(popupViewCard)});
  
  heart.addEventListener('click', () => {
    if(heart.classList.contains('element__heart_active')) {
      likeDeleteCard(apiConfig, cardId)
        .then(res => heartsCount.textContent = res.likes.length)
        .then(() => heart.classList.remove('element__heart_active'));
    }
    else {
      likeCard(apiConfig, cardId)
        .then(res => heartsCount.textContent = res.likes.length)
        .then(() => heart.classList.add('element__heart_active'));
    }
  });

  if (likes.length) {
    heartsCount.textContent = likes.length;
    likes.find(item => {
      if(item._id === userId) {
        heart.classList.add('element__heart_active')
      }
    })
  }
  else heartsCount.textContent = '0';

  if(ownerId === userId) {
    trash.classList.remove('element__trash_disabled');
  }

  trash.addEventListener('click', () => {
    openPopup(popupDeleteCard);
    buttonDeleteCard.addEventListener('click', () => {
      clickButtonDelete(apiConfig, cardId, trash, buttonDeleteCard)});
  });
  return cardElement;
};


function renderCard(nameImage, linkImage, likes, ownerId, userId, cardId, apiConfig) {
  cardPlace.append(editingCard(nameImage, linkImage, likes, ownerId, userId, cardId, apiConfig));
};

function addCard(config, cardId, apiConfig) {
  const namePicture = formElementAddCard.querySelector('.popup__text-field_type_picture-name').value;
  const linkPicture = formElementAddCard.querySelector('.popup__text-field_type_picture-link').value;
  cardPlace.prepend(editingCard(namePicture, linkPicture, 0, true, true, cardId, apiConfig));
  formElementAddCard.reset();
  buttonDisable(formElementAddCard, config.submitButtonSelector);
};