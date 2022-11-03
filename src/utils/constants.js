// селекторы popup-окон (модификаторы для идентификации)
export const popupSelectors = {
  profile: '.popup_type_profile',
  editAvatar: '.popup__type_edit-avatar',
  addCard: '.popup_type_add-card',
  viewCard: '.popup__type_view-card',
  deleteCard: '.popup__type_delete-card'
}

// настройки валидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__text-field__error',
}

export const popupProfileEdit = document.querySelector('.profile__edit');
export const popupAddCardEdit = document.querySelector('.profile__add');
export const popupProfile = document.querySelector(popupSelectors.profile);
export const profileFormElement = popupProfile.querySelector('.popup__form_type_profile');
export const nameInput = profileFormElement.querySelector('.popup__text-field_type_name');
export const jobInput = profileFormElement.querySelector('.popup__text-field_type_status');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');

export const avatarEdit = document.querySelector('.profile__avatar-conainer');
export const popupEditAvatar = document.querySelector(popupSelectors.editAvatar);
export const avatar = document.querySelector('.profile__avatar');
export const formElementEditAvatar = document.querySelector('.popup__text-field_type_link-picture');
export const formEditAvatar = document.querySelector('.popup__form_type_avatar');

export const cardPlace = document.querySelector('.elements');
export const cardBlank = document.querySelector('#card-blank').content;
export const popupAddCard = document.querySelector(popupSelectors.addCard);
export const formElementAddCard = popupAddCard.querySelector('.popup__form_type_add-card');

export const popupViewCard = document.querySelector(popupSelectors.viewCard);
export const popupPicture = popupViewCard.querySelector('.popup__picture');
export const popupDescription = popupViewCard.querySelector('.popup__description');

export const popupDeleteCard = document.querySelector(popupSelectors.deleteCard);
export const buttonDeleteCard = document.querySelector('.popup__button-delete-card');
