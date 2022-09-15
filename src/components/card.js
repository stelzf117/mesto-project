import { viewCard, openPopup } from "./modal.js";
import { cardPlace, cardBlank, popupAddCard, formElementAddCard, popupViewCard  } from './variables.js';
export { initialCards, renderCard, popupAddCard, formElementAddCard, addCard };

const fijiIslands = new URL('../../images/__item-1.jpg', import.meta.url);
const boraBora = new URL('../../images/__item-2.jpg', import.meta.url);
const atlanticRoad = new URL('../../images/__item-3.jpg', import.meta.url);
const galapagosIslands = new URL('../../images/__item-4.jpg', import.meta.url);
const eleutheraIsland = new URL('../../images/__item-5.jpg', import.meta.url);
const seychelles = new URL('../../images/__item-6.jpg', import.meta.url);

const initialCards = [
  {
    name: 'Острова Фиджи',
    link: fijiIslands
  },
  {
    name: 'Бора-бора',
    link: boraBora
  },
  {
    name: 'Атлантическая дорога',
    link: atlanticRoad
  },
  {
    name: 'Галапагосские острова',
    link: galapagosIslands
  },
  {
    name: 'Остров Эльютера',
    link: eleutheraIsland
  },
  {
    name: 'Сейшельские острова',
    link: seychelles
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