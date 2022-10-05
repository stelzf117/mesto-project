export { openPopup, closePopup, isLoading };
import { popupOpened, popupClose } from './variables.js';

function closeEscape(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector(`.${popupOpened}`));
  }
};

function closeClick(event) {
  if(event.target.classList.contains(popupOpened) || event.target.classList.contains(popupClose)) {
    closePopup(event.currentTarget);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscape);
  popup.addEventListener('click', closeClick);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscape);
  popup.removeEventListener('click', closeClick);
};

function isLoading(poupForm, submitButtonSelector, loading) {
  const button = poupForm.querySelector(submitButtonSelector);
  if(loading) {
    button.textContent = 'Сохранение...'
  }
  else {
    button.textContent = 'Сохранить'
  }
}
