export default class UserInfo {
  constructor(profileSelectors, profileFormFields) {
    this._userNameSelector = profileSelectors.userName;
    this._userDescriptionSelector = profileSelectors.userDescription;
    this._userAvatarSelector = profileSelectors.userAvatar;
    this._inputName = profileFormFields.userName;
    this._inputStatus = profileFormFields.userDescription;
  }

  // По условиям из тренажёра "Проект Mesto на ООП", данные для метода getUserInfo нужно получить от методов класса Api.
  // Этот же метод нужно использовать для вставки данных в форму при открытии.
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

  setInput({ name, description }) {
    this._inputName.value = name;
    this._inputStatus.value = description;
  }
}