export { buttonDisable, changeProfileInfo, changeAvatar };

function buttonDisable(formElement, buttonSelector) {
  const buttonElement = formElement.querySelector(buttonSelector);
  buttonElement.setAttribute('disabled', true);
};

function changeProfileInfo(profileContainer, ProfileName, descriptionContainer, ProfileDescription, avatarContainer, linkImage) {
  profileContainer.textContent = ProfileName;
  descriptionContainer.textContent = ProfileDescription;
  avatarContainer.src = linkImage;
}

function changeAvatar(currentAvatar, linkImage) {
  currentAvatar.src = linkImage;
}