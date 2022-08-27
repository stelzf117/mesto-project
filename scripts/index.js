// container
const container = document.querySelector('.page');

// function popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const popupProfile = container.querySelector('.popup_type_profile');
const popupProfileEdit = container.querySelector('.profile__edit');
// const popupProfileClose = container.querySelector('.popup__close_type_profile');
const profileFormElement = popupProfile.querySelector('.popup__form_type_profile');
const nameInput = profileFormElement.querySelector('.popup__text-field_type_name');
const jobInput = profileFormElement.querySelector('.popup__text-field_type_status');
const profileName = container.querySelector('.profile__name');
const profileDescription = container.querySelector('.profile__description');


function profileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupProfile);
}

popupProfileEdit.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent; 
  jobInput.value = profileDescription.textContent;
});

// popupProfileClose.addEventListener('click', function () {closePopup(popupProfile)});
// profileFormElement.addEventListener('submit', profileFormSubmit);


// КАРТОЧКИ
const popupAddCard = container.querySelector('.popup_type_add-card');
const popupAddCardEdit = container.querySelector('.profile__add');
// const popupAddCardClose = container.querySelector('.popup__close_type_add-card');
const formElementAddCard = popupAddCard.querySelector('.popup__form_type_add-card');
const cardPlace = container.querySelector('.elements');
const cardBlank = container.querySelector('#card-blank').content;
const popupViewCard = container.querySelector('.popup__type_view-card');
const popupPicture = popupViewCard.querySelector('.popup__picture');
const popupDescription =  popupViewCard.querySelector('.popup__description');

function viewCard(imageName, imageLink) {
  popupPicture.src = imageLink;
  popupPicture.alt = imageName;
  popupDescription.textContent = imageName;
}


// фунция клонирования и изменения template карточки
function editingCard(nameImage, linkImage) {
  const cardElement = cardBlank.querySelector('.element').cloneNode(true);
  const photoElement = cardElement.querySelector('.element__photo');
  const photoName = cardElement.querySelector('.element__name');
  const trash = cardElement.querySelector('.element__trash');
  const heart = cardElement.querySelector('.element__heart');
  
  photoElement.src = linkImage;
  photoElement.setAttribute('alt', nameImage);
  photoName.textContent = nameImage;
  
  // лайк, удаление карточек, открытие попапа просмотра картинки
  trash.addEventListener('click', function() {trash.closest('.element').remove()});
  heart.addEventListener('click', function() {heart.classList.toggle('element__heart_active');});
  photoElement.addEventListener('click', function() {viewCard(nameImage, linkImage); openPopup(popupViewCard)});
  
  return cardElement;
}

// функция добавления карточки
function renderCard(nameImage, linkImage) {
  cardPlace.prepend(editingCard(nameImage, linkImage));
}

// Отрисовка из массива
initialCards.forEach(function (card) {
  renderCard(card.name, card.link);
});

// Добавление карточки вручную
function addCard(evt) {
  evt.preventDefault();
  const namePicture = formElementAddCard.querySelector('.popup__text-field_type_picture-name').value;
  const linkPicture = formElementAddCard.querySelector('.popup__text-field_type_picture-link').value;
  renderCard(namePicture, linkPicture);
  formElementAddCard.reset();
}


// слушатели формы
popupAddCardEdit.addEventListener('click', function () {openPopup(popupAddCard)});
// popupAddCardClose.addEventListener('click', function () {closePopup(popupAddCard)});
formElementAddCard.addEventListener('submit', function (evt) {addCard(evt); closePopup(popupAddCard)});
// popupViewCard.querySelector('.popup__close').addEventListener(('click'), function() {closePopup(popupViewCard)});

let currentPopup;
function refreshCurrentPopup() {currentPopup = container.querySelector('.popup_opened')}

container.addEventListener('keydown', (event) => {
  refreshCurrentPopup();
  if (event.key === 'Escape') {
     closePopup(currentPopup);
  }
})

container.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close')) {
    refreshCurrentPopup();
    closePopup(currentPopup);
  }
})