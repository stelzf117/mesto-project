export default class UserInfo {
  constructor(profileSelectors, profileFormFields) {
    this._userNameSelector = profileSelectors.userName;
    this._userDescriptionSelector = profileSelectors.userDescription;
    this._userAvatarSelector = profileSelectors.userAvatar;
    this._inputName = profileFormFields.userName;
    this._inputStatus = profileFormFields.userDescription;
  }

  getUserInfo(data) {
    return {
      name: data.name,
      description: data.about,
      avatar: data.avatar
    }
  }

  setUserInfo({ name, description, avatar }) {
    this._userNameSelector.textContent = name;
    this._userDescriptionSelector.textContent = description;
    this._userAvatarSelector.src = avatar;
  }

  setInput() {
    this._inputName.value = this._userNameSelector.textContent;
    this._inputStatus.value = this._userDescriptionSelector.textContent ;
  }
}