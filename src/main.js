window.addEventListener('load', () => init());
const addBtn = document.querySelector('.add');

function init() {
    const itemList = new ItemList()

    addBtn.addEventListener('click', () => {
        itemList.addItem();
    })
    itemList.addItem();
}

class ItemList {
    constructor() {
        this.container = document.querySelector('#main-container');
        this.itemList = [];
    }
    addItem() {
        const firstItem = this.container.firstChild;
        const item = new Item(1,
            item => this.deleteItem(item)
        );

        this.itemList.push(item);
        this.container.append(item.container);
        setTimeout(() => item.container.style.opacity = "1", 500)
        
        const table = item.container.querySelector('.table');
        const size = table.getBoundingClientRect();
        console.log(size.height);
        
        this.itemList.forEach((x, i) => {
            console.log(x.container)
            x.container.style.top = (size.height + 10) * (this.itemList.length - i -1) + 'px';
            console.log(x.container.style.top, x.container.classList)
        });
        

    }
    deleteItem(item) {
        const id = this.itemList.indexOf(item);
        if(this.itemList.length > 1) {
            this.itemList.splice(id, 1);
            item.container.remove();
        }  
    }
}
class Item {
    constructor(payment = 1, deleteItem) {
        this.container = document.createElement('div');
        this.container.classList.add('item');
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