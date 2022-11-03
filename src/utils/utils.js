export function changeProfileInfo(profileContainer, ProfileName, descriptionContainer, ProfileDescription, avatarContainer, linkImage) {
  profileContainer.textContent = ProfileName;
  descriptionContainer.textContent = ProfileDescription;
  avatarContainer.src = linkImage;
}

export function changeAvatar(currentAvatar, linkImage) {
  currentAvatar.src = linkImage;
}