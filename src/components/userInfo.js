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
      about: data.about,
      avatar: data.avatar,
      //id: data._id
    }
  }

  setUserInfo({ name, about }) {
    this._userNameSelector.textContent = name;
    this._userDescriptionSelector.textContent = about;
  }


  setInput() {
    this._inputName.value = this._userNameSelector.textContent;
    this._inputStatus.value = this._userDescriptionSelector.textContent;
  }

  setUserAvatar({ avatar }) {
    this._userAvatarSelector.src = avatar;
  }
}