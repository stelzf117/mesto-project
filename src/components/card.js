import { viewCard, openPopup } from "./modal.js";
import { cardPlace, cardBlank, popupAddCard, formElementAddCard, popupViewCard  } from './variables.js';
export { initialCards, renderCard, popupAddCard, formElementAddCard, addCard };


const initialCards = [
  {
    name: 'Острова Фиджи',
    link: 'images/__item-1.jpg'
  },
  {
    name: 'Бора-бора',
    link: 'images/__item-2.jpg'
  },
  {
    name: 'Атлантическая дорога',
    link: 'images/__item-3.jpg'
  },
  {
    name: 'Галапагосские острова',
    link: 'images/__item-4.jpg'
  },
  {
    name: 'Остров Эльютера',
    link: 'images/__item-5.jpg'
  },
  {
    name: 'Сейшельские острова',
    link: 'images/__item-6.jpg'
  }
];


function editingCard(nameImage, linkImage) {
  const cardElement = cardBlank.querySelector('.element').cloneNode(true);
  const photoElement = cardElement.querySelector('.element__photo');
  const photoName = cardElement.querySelector('.element__name');
  const trash = cardElement.querySelector('.element__trash');
  const heart = cardElement.querySelector('.element__heart');
  
  photoElement.src = linkImage;
  photoElement.setAttribute('alt', nameImage);
  photoName.textContent = nameImage;

  trash.addEventListener('click', function() {trash.closest('.element').remove()});
  heart.addEventListener('click', function() {heart.classList.toggle('element__heart_active');});
  photoElement.addEventListener('click', function() {viewCard(nameImage, linkImage); openPopup(popupViewCard)});
  return cardElement;
};


function renderCard(nameImage, linkImage) {
  cardPlace.prepend(editingCard(nameImage, linkImage));
};

function addCard() {
  const namePicture = formElementAddCard.querySelector('.popup__text-field_type_picture-name').value;
  const linkPicture = formElementAddCard.querySelector('.popup__text-field_type_picture-link').value;
  renderCard(namePicture, linkPicture);
  formElementAddCard.reset();
};