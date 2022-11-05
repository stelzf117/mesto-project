export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items; 
    this._renderer = renderer; 
    this.container = container;
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