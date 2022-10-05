export { requestNameBio, requestCards, editProfile, postNewCard, deleteCard, likeCard, likeDeleteCard, newAvatar };

const checkAnswer = (result) => {
  if(result.ok) {return result.json()}
  return Promise.reject(`Ошибка: ${result.status}`);
}

const requestNameBio = (apiConfig) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {headers: apiConfig.headers})
  .then(result => checkAnswer(result))
  .catch(err => console.log(err));
}

const editProfile = (apiConfig, newName, newDescription) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: newName,
      about: newDescription
    })
  })
  .then(result => checkAnswer(result))
  .catch(err => console.log(err));
}

const requestCards = (apiConfig) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {headers: apiConfig.headers})
    .then(result => checkAnswer(result))
    .catch(err => console.log(err));
}

const postNewCard = (apiConfig, imageName, imageLink) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: imageName,
      link: imageLink
    })
  })
  .then(result => checkAnswer(result))
  .catch(err => console.log(err));
}

const deleteCard = (apiConfig, cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {method: 'DELETE', headers: apiConfig.headers})
    .then(result => checkAnswer(result))
    .catch(err => console.log(err));
}

const likeCard = (apiConfig, cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {method: 'PUT', headers: apiConfig.headers})
    .then(result => checkAnswer(result))
    .catch(err => console.log(err));
}

const likeDeleteCard = (apiConfig, cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {method: 'DELETE', headers: apiConfig.headers})
    .then(result => checkAnswer(result))
    .catch(err => console.log(err));
}

const newAvatar = (apiConfig, imageLink) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH', 
    headers: apiConfig.headers,
    body: JSON.stringify({avatar: imageLink})
  })
  .then(result => checkAnswer(result))
  .catch(err => console.log(err));
}