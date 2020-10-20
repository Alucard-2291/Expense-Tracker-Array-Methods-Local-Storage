const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


// add a custom transaction
const addTransaction = e => {
  e.preventDefault();

  if(text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id : gerenateID(),
      text : text.value,
      amount : +amount.value
    }

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = '';
    amount.value= '';
    console.log(transaction);
  }
}

//

//generate ID function
const gerenateID = () => {
  return Math.floor(Math.random() * 100000000); 
}

// Add Transactions to DOM list
const addTransactionDOM = (transaction) => {
  // get the sign
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  
  //add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
  <button class=""delete-btn" onClick = 'removeTransaction(${transaction.id})'>x</button>
  `;

  list.appendChild(item);
}

//update balance and income and exp
const updateValues = () => {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc +=  item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);

  console.log(expense)

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

//remove transaction by ID
const removeTransaction = id => {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();
  init();
}

//update local storage transactions
const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

//init app function
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
};

init();

form.addEventListener('submit', addTransaction);