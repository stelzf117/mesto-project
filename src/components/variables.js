export { nameInput, jobInput, profileName, profileDescription, profileFormElement, popupProfile, cardPlace, cardBlank, popupAddCard, formElementAddCard, popupViewCard, popupPicture, popupDescription, popupAddCardEdit, popupProfileEdit, popupOpened, popupClose, avatar, popupEditAvatar, avatarEdit, formElementEditAvatar, formEditAvatar, popupDeleteCard, buttonDeleteCard };

// Переменные
const popupProfileEdit = document.querySelector('.profile__edit');
const popupAddCardEdit = document.querySelector('.profile__add');
const popupProfile = document.querySelector('.popup_type_profile');
const profileFormElement = popupProfile.querySelector('.popup__form_type_profile');
const nameInput = profileFormElement.querySelector('.popup__text-field_type_name'); 
const jobInput = profileFormElement.querySelector('.popup__text-field_type_status');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const avatarEdit = document.querySelector('.profile__avatar-conainer');
const popupEditAvatar = document.querySelector('.popup__type_edit-avatar'); //аватар
const avatar = document.querySelector('.profile__avatar');
const formElementEditAvatar = document.querySelector('.popup__text-field_type_link-picture');
const formEditAvatar = document.querySelector('.popup__form_type_avatar');

const cardPlace = document.querySelector('.elements');
const cardBlank = document.querySelector('#card-blank').content;
const popupAddCard = document.querySelector('.popup_type_add-card');
const formElementAddCard = popupAddCard.querySelector('.popup__form_type_add-card');

const popupViewCard = document.querySelector('.popup__type_view-card');
const popupPicture = popupViewCard.querySelector('.popup__picture');
const popupDescription =  popupViewCard.querySelector('.popup__description');

const popupDeleteCard = document.querySelector('.popup__type_delete-card');
const buttonDeleteCard = document.querySelector('.popup__button-delete-card');

const popupOpened = 'popup_opened';
const popupClose = 'popup__close';