export class Section {
  constructor({ items, renderer }, container) {
    this._items = items; // массив для отрисовки
    this._renderer = renderer; //функция для отрисовки
    this.container = container; // контейнер для добавления отрисованных элементов
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    })
  }

  addItem(item) {
    this.container.prepend(item);
  }
}