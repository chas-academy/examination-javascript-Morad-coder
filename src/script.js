// Hämta alla nödvändiga element från HTML-dokumentet
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const addIncomeBtn = document.getElementById('addIncomeBtn');
const addExpenseBtn = document.getElementById('addExpenseBtn');
const incomeList = document.getElementById('incomeList');
const expenseList = document.getElementById('expenseList');
const balanceDisplay = document.getElementById('balance');

// Initialisera saldo och listor för transaktioner
let totalBalance = 0;
let incomes = [];
let expenses = [];

// Lägg till händelselyssnare på knapparna
addIncomeBtn.addEventListener('click', addIncome);
addExpenseBtn.addEventListener('click', addExpense);

// Funktion för att lägga till en inkomst
function addIncome() {
    // Hämta och konvertera värden från input-fälten
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);

    // Validering: se till att fälten inte är tomma och beloppet är ett giltigt tal
    if (description.trim() === '' || isNaN(amount) || amount <= 0) {
        alert('Vänligen fyll i en giltig beskrivning och ett positivt belopp.');
        return;
    }

    // Skapa ett transaktionsobjekt
    const income = { description, amount };
    incomes.push(income);

    // Uppdatera totala saldot
    totalBalance += amount;
    
    // Uppdatera gränssnittet
    updateUI();
    clearInputs();
}

// Funktion för att lägga till en utgift
function addExpense() {
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);

    if (description.trim() === '' || isNaN(amount) || amount <= 0) {
        alert('Vänligen fyll i en giltig beskrivning och ett positivt belopp.');
        return;
    }

    const expense = { description, amount };
    expenses.push(expense);

    // Uppdatera totala saldot
    totalBalance -= amount;

    // Uppdatera gränssnittet
    updateUI();
    clearInputs();
}

// Funktion för att rita om hela gränssnittet
function updateUI() {
    // Uppdatera saldot
    balanceDisplay.textContent = totalBalance.toFixed(2);

    // Rensa befintliga listor
    incomeList.innerHTML = '';
    expenseList.innerHTML = '';

    // Fyll inkomstlistan
    incomes.forEach(income => {
        const li = document.createElement('li');
        li.innerHTML = `${income.description} <span>+${income.amount.toFixed(2)} kr</span>`;
        li.classList.add('income-item');
        incomeList.appendChild(li);
    });

    // Fyll utgiftslistan
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `${expense.description} <span>-${expense.amount.toFixed(2)} kr</span>`;
        li.classList.add('expense-item');
        expenseList.appendChild(li);
    });
}

// Funktion för att rensa input-fälten efter en transaktion
function clearInputs() {
    descriptionInput.value = '';
    amountInput.value = '';
}