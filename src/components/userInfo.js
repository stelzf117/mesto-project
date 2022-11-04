export class UserInfo {
  constructor(selectors) {
    this._elementName = document.querySelector(selectors.name);
    this._elementStatus = document.querySelector(selectors.status);
    this._elementAvatar = document.querySelector(selectors.linkPicture);
    this._elementInputName = document.querySelector(selectors.inputName);
    this._elementInputStatus = document.querySelector(selectors.inputStatus);
  }

  getUserInfo(data) {
    return this._user = {
      name: data.name,
      about: data.about,
      avatar: data.avatar,
    }
  }

  setProfile(data) {
    this._elementName.textContent = data.name;
    this._elementStatus.textContent = data.about;
  }

  setInputs(data) {
    this._elementInputName.value = data.name;
    this._elementInputStatus.value = data.about;
  }

  setAvatar(data) {
    this._elementAvatar.src = data.avatar
  }

  setUserInfo(data) {
    this.setProfile(data);
    this.setAvatar(data);
  }
}