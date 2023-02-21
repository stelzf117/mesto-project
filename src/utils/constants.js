// popups
export const popupSelectors = {
  profile: '.popup_type_profile',
  addCard: '.popup_type_add-card',
  editAvatar: '.popup__type_edit-avatar',
  viewCard: '.popup__type_view-card',
  deleteCard: '.popup__type_delete-card'
}

// buttons for open popup
export const popupOpenButtons = {
  profile: document.querySelector('.profile__edit'),
  avatar: document.querySelector('.profile__avatar-container'),
  addCard: document.querySelector('.profile__add')
}

// forms
export const formSelectors = {
  profile: document.querySelector('.popup__form_type_profile'),
  avatar: document.querySelector('.popup__form_type_avatar'),
  addCard: document.querySelector('.popup__form_type_add-card')
}

// profile form fields
export const profileFormFields = {
  userName: document.querySelector('.popup__text-field_type_name'),
  userDescription: document.querySelector('.popup__text-field_type_status')
}

// profile selectors
export const profileSelectors = {
  userName: document.querySelector('.profile__name'),
  userDescription: document.querySelector('.profile__description'),
  userAvatar: document.querySelector('.profile__avatar')
}

// card selectors
export const cardPlace = document.querySelector('.elements');
export const cardBlank = document.querySelector('#card-blank').content;