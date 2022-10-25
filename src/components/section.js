const items = {
  // items: [...] массив данных которые необходимо добавить на страницу 
  // renderer создание и отрисовка данных на странице
}

export class Section {
  constructor({ array, renderer }, container) {
    this._array = array; // массив для отрисовки
    this._renderer = renderer; //функция для отрисовки
    this._container = container; // контейнер для добавления отрисованных элементов
  }

  // methods
  renderElements() {
    // отрисовка всех элементов должна осуществлятся тут. Каждый отдельный элемент отрисовывается с помощью renderElement
    // вместо renderCard() в index.js
    this._array.forEach(item => {
      this._renderer(item);
    })
  }

  addItem(element) {
    // принимает DOM элемент и добавляет его в контейнер вместо AddCard() в index.js
  }
}