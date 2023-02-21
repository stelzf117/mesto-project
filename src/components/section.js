export default class Section {
  constructor(container, {renderer}) {
    this._renderer = renderer; 
    this._container = container;
  }

  renderItems(items, userId) {
    items.forEach(item => {
      this._renderer(item, userId);
    })
  }

  addItem(item) {
    this._container.prepend(item);
  }
}