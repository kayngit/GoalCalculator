class ItemList {
    constructor() {
        this.container = document.querySelector('.main-container');
        this.ItemList = [];
    }
    addItem() {
        const firstItem = this.container.firstChild;
        const item = new Item(
            item => this.deleteItem(item)
        );
        this.ItemList.push(item);
        this.container.insertBefore(item.container, firstItem);
    }
    deleteItem(item) {
        const id = this.itemList.indexOf(item);
        this.itemList.splice(id, 1);
        item.container.remove();
    }
}