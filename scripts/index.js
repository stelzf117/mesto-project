// Переменные
const container = document.querySelector('.page');
const popupProfile = container.querySelector('.popup_type_profile'); //профиль
const popupProfileEdit = container.querySelector('.profile__edit');
const profileFormElement = popupProfile.querySelector('.popup__form_type_profile');
const nameInput = profileFormElement.querySelector('.popup__text-field_type_name');
const jobInput = profileFormElement.querySelector('.popup__text-field_type_status');
const profileName = container.querySelector('.profile__name');
const profileDescription = container.querySelector('.profile__description');

const popupEditAvatar = container.querySelector('.popup__type_edit-avatar'); //аватар
const avatar = container.querySelector('.profile__avatar');
const formElementEditAvatar = container.querySelector('.popup__text-field_type_link-picture');
const formEditAvatar = container.querySelector('.popup__form_type_avatar');

const popupAddCard = container.querySelector('.popup_type_add-card'); //добавление карточки
const popupAddCardEdit = container.querySelector('.profile__add');
const formElementAddCard = popupAddCard.querySelector('.popup__form_type_add-card');
const cardPlace = container.querySelector('.elements');
const cardBlank = container.querySelector('#card-blank').content;

const popupViewCard = container.querySelector('.popup__type_view-card'); // просмотр карточки
const popupPicture = popupViewCard.querySelector('.popup__picture');
const popupDescription =  popupViewCard.querySelector('.popup__description');

let currentPopup; // текущий открытый попап

// Функции
function closeEscape(event) {
  if (event.key === 'Escape') {
    closePopup(currentPopup);
  }
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  currentPopup = popup;
  container.addEventListener('keydown', closeEscape);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  container.removeEventListener('keydown', closeEscape);
};


function profileFormSubmit () {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupProfile);
};


function viewCard(imageName, imageLink) {
  popupPicture.src = imageLink;
  popupPicture.alt = imageName;
  popupDescription.textContent = imageName;
};


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


function changeAvatar(evt) { // T0D0 сделать смену аватара
  evt.preventDefault();
};


function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add('popup__text-field__error');
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove('popup__text-field__error');
};

function checkInputValidity(formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
  else {
    hideInputError(formElement, inputElement);
  };
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text-field'));
  const buttonElement = formElement.querySelector('.popup__button-save');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      console.log('formELement = ', formElement);
      console.log('inputElement = ', inputElement);
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(container.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  });
};

function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true)
  }
  else {
    buttonElement.removeAttribute('disabled');
  }
}

function openValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text-field'));
  const buttonElement = formElement.querySelector('.popup__button-save');
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
  })
  toggleButtonState(inputList, buttonElement);
}

// Исполняемый код
enableValidation();

initialCards.forEach(function (card) {
  renderCard(card.name, card.link);
});



// Слушатели
profileFormElement.addEventListener('submit', profileFormSubmit);
formElementAddCard.addEventListener('submit',  () => {addCard(); closePopup(popupAddCard)});

container.addEventListener('click', (event) => {
  if (event.target.classList.contains('profile__add')) {
    openPopup(popupAddCard);
    openValidation(formElementAddCard);
  } 
  else if (event.target.classList.contains('profile__edit')) {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent; 
    jobInput.value = profileDescription.textContent;
    openValidation(profileFormElement);
  }
  else if (event.target.classList.contains('profile__avatar')) {
    openPopup(popupEditAvatar);
  }
});

container.addEventListener('click', (event) => {
  if(event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close')) {
    closePopup(currentPopup);
  }
});