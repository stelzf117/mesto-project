export { viewCard, openPopup, closePopup, currentPopup, profileFormSubmit};
import { profileName, profileDescription, nameInput, jobInput, popupProfile, popupPicture, popupDescription, popupViewCard } from './variables.js';


let currentPopup; // текущий открытый попап

function viewCard(imageName, imageLink) {
  popupPicture.src = imageLink;
  popupPicture.alt = imageName;
  popupDescription.textContent = imageName;
};

function profileFormSubmit () {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupProfile);
};


// Функции
function closeEscape(event) {
  if (event.key === 'Escape') {
    closePopup(currentPopup);
  }
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  currentPopup = popup;
  document.addEventListener('keydown', closeEscape);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscape);
};

