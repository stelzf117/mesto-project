// Переменные
const container = document.querySelector('.page');
const popupProfile = container.querySelector('.popup_type_profile');
const popupProfileEdit = container.querySelector('.profile__edit');
const profileFormElement = popupProfile.querySelector('.popup__form_type_profile');
const nameInput = profileFormElement.querySelector('.popup__text-field_type_name');
const jobInput = profileFormElement.querySelector('.popup__text-field_type_status');
const profileName = container.querySelector('.profile__name');
const profileDescription = container.querySelector('.profile__description');

const popupAddCard = container.querySelector('.popup_type_add-card');
const popupAddCardEdit = container.querySelector('.profile__add');
const formElementAddCard = popupAddCard.querySelector('.popup__form_type_add-card');
const cardPlace = container.querySelector('.elements');
const cardBlank = container.querySelector('#card-blank').content;

const popupViewCard = container.querySelector('.popup__type_view-card');
const popupPicture = popupViewCard.querySelector('.popup__picture');
const popupDescription =  popupViewCard.querySelector('.popup__description');

let currentPopup;


// Функции
function openPopup(popup) {popup.classList.add('popup_opened')};
function closePopup(popup) {popup.classList.remove('popup_opened')};
function refreshCurrentPopup() {currentPopup = container.querySelector('.popup_opened')};

function profileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupProfile);
}


function viewCard(imageName, imageLink) {
  popupPicture.src = imageLink;
  popupPicture.alt = imageName;
  popupDescription.textContent = imageName;
}


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
}


function renderCard(nameImage, linkImage) {
  cardPlace.prepend(editingCard(nameImage, linkImage));
}


function addCard(evt) {
  evt.preventDefault();
  const namePicture = formElementAddCard.querySelector('.popup__text-field_type_picture-name').value;
  const linkPicture = formElementAddCard.querySelector('.popup__text-field_type_picture-link').value;
  renderCard(namePicture, linkPicture);
  formElementAddCard.reset();
}



// Исполняемый код
initialCards.forEach(function (card) {
  renderCard(card.name, card.link);
});



// Слушатели
profileFormElement.addEventListener('submit', profileFormSubmit);
formElementAddCard.addEventListener('submit', function (evt) {addCard(evt); closePopup(popupAddCard)});

container.addEventListener('click', (event) => {
  if (event.target.classList.contains('profile__add')) {
    openPopup(popupAddCard);
  } 
  else if (event.target.classList.contains('profile__edit')) {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent; 
    jobInput.value = profileDescription.textContent;
  }
})

container.addEventListener('click', (event) => {
  if(event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close')) {
    refreshCurrentPopup();
    closePopup(currentPopup);
  }
})

container.addEventListener('keydown', (event) => {
  refreshCurrentPopup();
  if (event.key === 'Escape') {
    closePopup(currentPopup);
  }
})