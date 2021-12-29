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
class Item {
    constructor(payment = 1, deleteItem) {
        this.container = document.createElement('div');
        this.container.id = 'id';
        this.container.innerHTML = `
        <div class="table">
        <div class="delete">
            <input class="goal" placeholder="Цель"/>
            <div class="btn-delete">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#C4C4C4"/>
                <path d="M6 6L14 14" stroke="#C4C4C4"/>
                <path d="M6 14L14 6" stroke="#C4C4C4"/>
            </svg>
        </div>
        </div>
        <label>
            Требуемая сумма
            <input class="sum" type="text">
        </label>
        <label>
            Дата
            <input class="date-end" type="date">
        </label>
        <label>
            У меня есть
            <input class="start-sum" type="text">
        </label>
        <label>
            % на депозит
            <input class="percent" type="text">
        </label>
        <p>Ежемесечный платеж: <span class="payment">${this.monthPayment} рублей</span></p>
        </div>
        <button class="add">Добавить</button>
        `;
        this.title = this.container.querySelector('.goal');
        this.sum = this.container.querySelector('.sum')
        this.dateEnd = this.container.querySelector('.date-end');
        this.startSum = this.container.querySelector('.start-sum');
        this.percent = this.container.querySelector('.percent');
        this.monthPayment = this.container.querySelector('.payment');

        const deleteBtn = this.container.querySelector('.btn-delete');
        deleteBtn.addEventListener('click', () => {
            deleteItem(this);
        })
    }
}