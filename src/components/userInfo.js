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
      avatar: data.avatar,
      _id: data._id
    }
  }

  setUserInfo({ name, description, avatar }) {
    this._userNameSelector.textContent = name;
    this._userDescriptionSelector.textContent = description;
    this._userAvatarSelector.src = avatar;
  }

  setInput({ name, description }) {
    this._inputName.value = name;
    this._inputStatus.value = description;
  }
}