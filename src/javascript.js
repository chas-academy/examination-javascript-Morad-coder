// Arrayer för inkomster och utgifter
let incomes = [];
let expenses = [];

// Element från HTML
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const incomeList = document.getElementById('incomeList');
const expenseList = document.getElementById('expenseList');
const totalBalance = document.getElementById('totalBalance');

const addIncomeBtn = document.getElementById('addIncome');
const addExpenseBtn = document.getElementById('addExpense');

// Funktion för att lägga till transaktion
function addTransaction(type) {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!description || isNaN(amount) || amount <= 0) {
        alert("Vänligen fyll i både beskrivning och ett belopp större än 0.");
        return;
    }

    const transaction = { description, amount, type };

    if (type === "income") {
        incomes.push(transaction);
    } else if (type === "expense") {
        expenses.push(transaction);
    }

    updateUI();

    // Rensa input-fälten
    descriptionInput.value = "";
    amountInput.value = "";
}

// Funktion för att uppdatera listor och saldo
function updateUI() {
    // Rensa listor
    incomeList.innerHTML = "";
    expenseList.innerHTML = "";

    // Visa inkomster
    incomes.forEach(trans => {
        const li = document.createElement('li');
        li.textContent = `${trans.description}: ${trans.amount.toFixed(2)} kr`;
        li.classList.add('income');
        incomeList.appendChild(li);
    });

    // Visa utgifter
    expenses.forEach(trans => {
        const li = document.createElement('li');
        li.textContent = `${trans.description}: ${trans.amount.toFixed(2)} kr`;
        li.classList.add('expense');
        expenseList.appendChild(li);
    });

    // Beräkna total saldo
    const totalIncome = incomes.reduce((sum, trans) => sum + trans.amount, 0);
    const totalExpense = expenses.reduce((sum, trans) => sum + trans.amount, 0);
    totalBalance.textContent = (totalIncome - totalExpense).toFixed(2);
}

// Event listeners - säkerställer att de läggs till EN gång
if (!addIncomeBtn.hasListener) {
    addIncomeBtn.addEventListener('click', () => addTransaction("income"));
    addIncomeBtn.hasListener = true;
}

if (!addExpenseBtn.hasListener) {
    addExpenseBtn.addEventListener('click', () => addTransaction("expense"));
    addExpenseBtn.hasListener = true;
}
