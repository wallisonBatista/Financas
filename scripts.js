const Modal = {
    open(){
        //Procure dentro do documento a classe modal-overlay e add a classe active
        document
            .querySelector('.modal-overlay')
            .classList.add('active')
    },
    close(){
        //Fechar o modal, retira a classe active
        document
        .querySelector('.modal-overlay')
        .classList.remove('active')

    }
}

const Transaction = {
    
    all: [
        {
            description: 'Luz',
            amount: -50000,
            date: '23/01/2021'
        },
        {
            description: 'z',
            amount: 7000000,
            date: '23/01/2021'
        },
        {
            description: 'web',
            amount: -20000,
            date: '23/01/2021'
        }
    ],

    add(transaction) {
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes() {
        let income = 0

        //pegar todas as transações
        Transaction.all.forEach(transaction => {
        //para cada transação verificar se é maior que zero, se for maior que zero, somar a uma variável
            if(transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        
        return income;
    },
    expenses(){
            let expense = 0
    
            Transaction.all.forEach(transaction => {
                if(transaction.amount < 0) {
                    expense += transaction.amount;
                }
            })
            
            return expense;

    },
    total(){
        return Transaction.incomes() + Transaction.expenses();

    }
}

const DOM = {

    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction){
        //se transaction amount for maior que 0 Então coloque a classe income Senão coloque expense...
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img class="icone-remover" src="./assets/sinal-de-menos.svg" alt="remover transação">
            </td>
            
        `
        return html
    },

    updateBalance(){
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatCurrency(value){
        //se o valor numerico for menor que 0 recebe o sinal - senão não recebe nada
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

const Form = {}

const App = {
    init(){
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()

        
    },
    reload(){
        DOM.clearTransactions()
        App.init
    },
}

App.init()

