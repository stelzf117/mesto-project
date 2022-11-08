export default class Section {
  constructor(container, {renderer}) {
    this._renderer = renderer; 
    this._container = container;
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    })
  }

  addItem(item) {
    this._container.prepend(item);
  }
}