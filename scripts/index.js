// container
const container = document.querySelector('.page');

// function toggle popup
function popupToggle(popup) {
  popup.classList.toggle('popup_opened');
}

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const popupProfile = container.querySelector('.popup_type_profile');
const popupProfileEdit = container.querySelector('.profile__edit');
const popupProfileClose = container.querySelector('.popup__close_profile');
const profileFormElement = popupProfile.querySelector('.popup__form_profile');
const nameInput = profileFormElement.querySelector('.popup__text-field_type_name');
const jobInput = profileFormElement.querySelector('.popup__text-field_type_status');
const profileName = container.querySelector('.profile__name');
const profileDescription = container.querySelector('.profile__description');


function profileFormSubmit (evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileDescription.textContent = jobValue;
}

popupProfileEdit.addEventListener('click', function () {
  popupToggle(popupProfile);
  nameInput.value = profileName.textContent; 
  jobInput.value = profileDescription.textContent;
});
popupProfileClose.addEventListener('click', function () {popupToggle(popupProfile)});
profileFormElement.addEventListener('submit', profileFormSubmit); 
profileFormElement.addEventListener('submit', function () {popupToggle(popupProfile)});


// КАРТОЧКИ
const popupAddCard = container.querySelector('.popup_type_add-card');
const popupAddCardEdit = container.querySelector('.profile__add');
const popupAddCardClose = container.querySelector('.popup__close_add-card');
const addCardFormElement = popupAddCard.querySelector('.popup__form_add-card');
const cardPlace = container.querySelector('.elements');
const cardBlank = container.querySelector('#card-blank').content;


const initialCards = [
  {
    name: 'Острова Фиджи',
    link: '../images/__item-1.jpg'
  },
  {
    name: 'Бора-бора',
    link: '../images/__item-2.jpg'
  },
  {
    name: 'Атлантическая дорога',
    link: '../images/__item-3.jpg'
  },
  {
    name: 'Галапагосские острова',
    link: '../images/__item-4.jpg'
  },
  {
    name: 'Остров Эльютера',
    link: '../images/__item-5.jpg'
  },
  {
    name: 'Сейшельские острова',
    link: '../images/__item-6.jpg'
  }
];

// фунция отрисовки карточки
function renderCard(nameImage, linkImage) {
  const cardElement = cardBlank.querySelector('.element').cloneNode(true);


  cardElement.querySelector('.element__photo').src = linkImage;
  cardElement.querySelector('.element__photo').setAttribute('alt', nameImage);
  cardElement.querySelector('.element__name').textContent = nameImage;
  cardPlace.prepend(cardElement);
}

// Отрисовка из массива
initialCards.forEach(function (card) {
  renderCard (card.name, card.link);
});

// Добавление карточки вручную
function addCard(evt) {
  evt.preventDefault();
    const namePicture = addCardFormElement.querySelector('.popup__text-field_type_picture-name').value;
    const linkPicture = addCardFormElement.querySelector('.popup__text-field_type_picture-link').value;
    renderCard(namePicture, linkPicture);
    addCardFormElement.reset();
}

const popupViewCard = container.querySelector('.popup__type_view-card');

function viewCard(imageName, imageLink) {
  popupViewCard.querySelector('.popup__picture').src = imageLink;
  popupViewCard.querySelector('.popup__picture').alt = imageName;
  popupViewCard.querySelector('.popup__description').textContent = imageName;
}


// лайк, удаление карточек и открытие попапа просмотра картинки
cardPlace.addEventListener('click', function(evt) {
  if (evt.target.classList.value === 'element__trash') {
    evt.target.closest('.element').remove();
  }
  else if (evt.target.classList[0] === 'element__heart') {
    evt.target.classList.toggle('element__heart_active');
  }
  else if (evt.target.classList[0] === 'element__photo') {
    viewCard(evt.target.closest('.element').querySelector('.element__name').textContent ,evt.target.src);
    popupToggle(popupViewCard);
  }
})


// слушатели формы
popupAddCardEdit.addEventListener('click', function () {popupToggle(popupAddCard)});
popupAddCardClose.addEventListener('click', function () {popupToggle(popupAddCard)});
addCardFormElement.addEventListener('submit', addCard);
addCardFormElement.addEventListener('submit', function () {popupToggle(popupAddCard)});
popupViewCard.querySelector('.popup__close').addEventListener(('click'), function() {popupToggle(popupViewCard)});