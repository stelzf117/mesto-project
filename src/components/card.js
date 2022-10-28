import { deleteCardPopup, viewCardPopup } from '../components/index.js';
import { api } from './api.js';
import { cardPlace, cardBlank, buttonDeleteCard } from '../utils/constants.js';
import { viewCard, clickButtonDelete } from '../pages/index.js';


export function editingCard(nameImage, linkImage, likes, ownerId, userId, cardId) {
  const cardElement = cardBlank.querySelector('.element').cloneNode(true);
  const photoElement = cardElement.querySelector('.element__photo');
  const photoName = cardElement.querySelector('.element__name');
  const trash = cardElement.querySelector('.element__trash');
  const heart = cardElement.querySelector('.element__heart');
  const heartsCount = cardElement.querySelector('.element__hearts-count');

  photoElement.src = linkImage;
  photoElement.setAttribute('alt', nameImage);
  photoName.textContent = nameImage;
  photoElement.addEventListener('click', () => { viewCard(nameImage, linkImage); viewCardPopup.open() });

  heart.addEventListener('click', () => {
    if (heart.classList.contains('element__heart_active')) {
      api.likeDeleteCard(cardId)
        .then(res => {
          heartsCount.textContent = res.likes.length;
          heart.classList.remove('element__heart_active');
        })
        .catch(err => console.log(err));
    }
    else {
      api.likeCard(cardId)
        .then(res => {
          heartsCount.textContent = res.likes.length;
          heart.classList.add('element__heart_active')
        })
        .catch(err => console.log(err));
    }
  });

  if (likes.length) {
    heartsCount.textContent = likes.length;
    likes.find(item => {
      if (item._id === userId) {
        heart.classList.add('element__heart_active')
      }
    })
  }
  else heartsCount.textContent = '0';

  if (ownerId === userId) {
    trash.classList.remove('element__trash_disabled');
  }

  trash.addEventListener('click', () => {
    deleteCardPopup.open();
    buttonDeleteCard.addEventListener('click', () => {
      clickButtonDelete(cardId, trash, buttonDeleteCard)
    });
  });
  return cardElement;
};


export function renderCard(nameImage, linkImage, likes, ownerId, userId, cardId) {
  cardPlace.append(editingCard(nameImage, linkImage, likes, ownerId, userId, cardId));
};