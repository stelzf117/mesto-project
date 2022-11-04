export default class UserInfo {
  constructor(profileSelectors) {
    this._userNameSelector = profileSelectors.userName;
    this._userDescriptionSelector = profileSelectors.userDescription;
    this._userAvatarSelector = profileSelectors.userAvatar;
  }

  getUserInfo(data) {
    this._userData = {
      name: data.name,
      description: data.about,
      avatar: data.avatar
    }

    return this._userData;
  }

  setUserInfo() {
    this._userNameSelector.textContent = this._userData.name;
    this._userDescriptionSelector.textContent = this._userData.description;
    this._userAvatarSelector.src = this._userData.avatar;
  }
}