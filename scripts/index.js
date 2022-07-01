// container
const container = document.querySelector('.page');

// function toggle popup
function popupToggle(popup) {
  popup.classList.toggle('popup_opened');
}

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const popup_profile = container.querySelector('.popup_profile');
const popup_profile_edit = container.querySelector('.profile__edit');
const popup_profile_close = container.querySelector('.popup_profile_close');
const profile_formElement = popup_profile.querySelector('.profile_popup_form');
const nameInput = profile_formElement.querySelector('.popup__text-field_type_name');
const jobInput = profile_formElement.querySelector('.popup__text-field_type_status');
const profileName = container.querySelector('.profile__name');
const profileDescription = container.querySelector('.profile__description');


function profileFormSubmit (evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileDescription.textContent = jobValue;
}

popup_profile_edit.addEventListener('click', function () {
  popupToggle(popup_profile);
  nameInput.value = profileName.textContent; 
  jobInput.value = profileDescription.textContent;
});
popup_profile_close.addEventListener('click', function () {popupToggle(popup_profile)});
profile_formElement.addEventListener('submit', profileFormSubmit); 
profile_formElement.addEventListener('submit', function () {popupToggle(popup_profile)});


// КАРТОЧКИ
const popup_addCard = container.querySelector('.popup_addCard');
const popup_addCard_edit = container.querySelector('.popup_addCard_edit');
const popup_addCard_close = container.querySelector('.popup_addCard_close');
const addCard_formElement = popup_addCard.querySelector('.addCard_popup_form');
const elements = container.querySelector('.elements');
const popup_viewCard = elements.querySelector('.popup_viewCard');

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
  const cardBlank = container.querySelector('#card-blank').content; 
  const cardElement = cardBlank.querySelector('.element').cloneNode(true);
  const cardPlace = container.querySelector('.elements'); 


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
    const namePicture = addCard_formElement.querySelector('.popup__text-field_type_pictureName').value;
    const linkPicture = addCard_formElement.querySelector('.popup__text-field_type_pictureLink').value;
    renderCard(namePicture, linkPicture);
  addCard_formElement.reset();
}

const popup_view_image = container.querySelector('.popup_viewCard');

function viewCard(imageName, imageLink) {
  popup_view_image.querySelector('.popup__picture').src = imageLink;
  popup_view_image.querySelector('.popup__picture').alt = imageName;
  popup_view_image.querySelector('.popup__description').textContent = imageName;
}


// лайк, удаление карточек и открытие попапа просмотра картинки
elements.addEventListener('click', function(evt) {
  if (evt.target.classList.value === 'element__trash') {
    evt.target.closest('.element').remove();
  }
  else if (evt.target.classList[0] === 'element__heart') {
    evt.target.classList.toggle('element__heart_active');
  }
  else if (evt.target.classList[0] === 'element__photo') {
    viewCard(evt.target.closest('.element').querySelector('.element__name').textContent ,evt.target.src);
    popupToggle(popup_view_image);
  }
})


// слушатели формы
popup_addCard_edit.addEventListener('click', function () {popupToggle(popup_addCard)});
popup_addCard_close.addEventListener('click', function () {popupToggle(popup_addCard)});
addCard_formElement.addEventListener('submit', addCard);
addCard_formElement.addEventListener('submit', function () {popupToggle(popup_addCard)});
popup_view_image.querySelector('.popup__close').addEventListener(('click'), function() {popupToggle(popup_view_image)});