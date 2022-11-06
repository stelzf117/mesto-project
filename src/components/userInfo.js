export default class UserInfo {
  constructor(profileSelectors, profileFormFields) {
    this._userNameSelector = profileSelectors.userName;
    this._userDescriptionSelector = profileSelectors.userDescription;
    this._userAvatarSelector = profileSelectors.userAvatar;
    this._inputName = profileFormFields.userName;
    this._inputStatus = profileFormFields.userDescription;
  }

  getUserInfo(data) {
    return this._userData = {
      name: data.name,
      description: data.about,
      avatar: data.avatar,
      id: data._id
    }
  }

  setUserInfo() {
    this._userNameSelector.textContent = this._userData.name;
    this._userDescriptionSelector.textContent = this._userData.description;
  }


  setInput(name, description) {
    this._inputName.value = name;
    this._inputStatus.value = description;
  }

  setUserAvatar() {
    this._userAvatarSelector.src = this._userData.avatar;
  }

  setUserInfo() {
    this._userNameSelector.textContent = this._userData.name;
    this._userDescriptionSelector.textContent = this._userData.description;
    this._userAvatarSelector.src = this._userData.avatar;
  }
}