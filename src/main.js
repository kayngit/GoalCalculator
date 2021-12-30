window.addEventListener('load', () => init());
const addBtn = document.querySelector('.add');

function init() {
    const itemList = new ItemList()
    itemList.addItem();

    addBtn.addEventListener('click', () => {
        
        if (itemList.itemList[itemList.itemList.length - 1].checkIfEmpty()) {
            itemList.addItem();
        }
    })
}



class ItemList {
    constructor() {
        this.container = document.querySelector('#main-container');
        this.itemList = [];
    }
    addItem() {
        const item = new Item(1,
            item => this.deleteItem(item)
        );

        this.itemList.push(item);
        this.container.append(item.container);
    }
    deleteItem(item) {
        const id = this.itemList.indexOf(item);
            if (this.itemList.length > 1) {
                if(confirm('Вы точно хотите удалить эту копилку?')) {
                this.itemList.splice(id, 1);
                const table = item.container.querySelector('.table');
                const size = table.getBoundingClientRect();
                this.animation(size);
                item.container.remove();
                }
            } else {
                if(confirm('Очистить эту копилку?')) {
                item.sum.value = ''; 
                item.dateEnd.value = ''; 
                item.startSum.value = ''; 
                item.percent.value = ''; 
                item.title.value = '';
                }
            }
        setTimeout(() => item.container.style.opacity = "1", 500)
        
        const table = item.container.querySelector('.table');
        const size = table.getBoundingClientRect();
        console.log(size.height);
        this.animation(size);
    }
    animation(size) {
        this.itemList.forEach((x, i) => {
            console.log(x.container)
            x.container.style.top = (size.height + 10) * (this.itemList.length - i -1) + 'px';
            console.log(x.container.style.top, x.container.classList)
        });
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
                <p>Ежемесечный платеж: <span class="payment"></span> </p>
        </div>
        `;
        this.title = this.container.querySelector('.goal');
        this.sum = this.container.querySelector('.sum')
        this.dateEnd = this.container.querySelector('.date-end');
        this.startSum = this.container.querySelector('.start-sum');
        this.percent = this.container.querySelector('.percent');
        
        this.getMonthlyPayment()

        const deleteBtn = this.container.querySelector('.btn-delete');
        deleteBtn.addEventListener('click', () => {
            deleteItem(this);
        })

        
    }
    checkIfEmpty() {
        if (this.title.value !== ''
            && this.sum.value !== ''
            && this.dateEnd.value !== ''
            && this.startSum.value !== ''
            && this.percent.value !== '') {
            return true;
        } else {
            return false;
        }
    }

    calculate() {
            const date = new Date(this.dateEnd.value)
            let months = Math.floor((date - Date.now()) / 2629800000)
            let perc = this.startSum.value / 100 * this.percent.value  
            let calc = (this.sum.value - (+this.startSum.value + +perc)) / months 
            this.monthPayment = Math.round(calc * 100) /100
            const span = this.container.querySelector('.payment');
            span.innerHTML = `${this.monthPayment} рублей`
    }
    getMonthlyPayment() {
        this.percent.addEventListener('change', () => { 
            if(this.checkIfEmpty()) {
                this.calculate();
                console.log('l')
            }
        })
        this.sum.addEventListener('change', () => {
            if(this.checkIfEmpty()) {
                this.calculate();
            }
        })
        this.startSum.addEventListener('change', () => {
            if(this.checkIfEmpty()) {
                this.calculate();
            }
        })
        this.dateEnd.addEventListener('change', () => {
            if(this.checkIfEmpty()) {
                this.calculate();
            }
        })
    }
}