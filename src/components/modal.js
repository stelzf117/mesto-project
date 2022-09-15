export { viewCard, openPopup, closePopup, currentPopup, profileFormSubmit};
import { profileName, profileDescription, nameInput, jobInput, popupPicture, popupDescription } from './variables.js';


let currentPopup; // текущий открытый попап

function viewCard(imageName, imageLink) {
  popupPicture.src = imageLink;
  popupPicture.alt = imageName;
  popupDescription.textContent = imageName;
};

function profileFormSubmit () {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
};

function closeEscape(event) {
  if (event.key === 'Escape') {
    closePopup(currentPopup);
  }
};

function closeClick(event) {
  if(event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close')) {
    closePopup(currentPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  currentPopup = popup;
  document.addEventListener('keydown', closeEscape);
  document.addEventListener('click', closeClick);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscape);
  document.removeEventListener('click', closeClick);
};