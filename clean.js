class Item {
  constructor(value, description, user) {
    this.value = value;
    this.description = description;
    this.user = user;
    this.flag = null;
  }
}

const budget = [
  new Item(250, 'Sold old TV 📺', 'jonas'),
  new Item(-45, 'Groceries 🥑', 'jonas'),
  new Item(3500, 'Monthly salary 👩‍💻', 'jonas'),
  new Item(300, 'Freelancing 👩‍💻', 'jonas'),
  new Item(-1100, 'New iPhone 📱', 'jonas'),
  new Item(-20, 'Candy 🍭', 'matilda'),
  new Item(-125, 'Toys 🚂', 'matilda'),
  new Item(-1800, 'New Laptop 💻', 'jonas'),
];

const spendingLimits = {
  jonas: 1500,
  matilda: 100,
};

const getLimit = user => spendingLimits?.[user] ?? 0;

function addExpense(value, description, user = 'jonas') {
  user = user.toLowerCase();
  if (value <= getLimit(user)) budget.push(new Item(-value, description, user));
}

function checkExpenses() {
  budget.forEach(el => {
    if (el.value < -getLimit(el.user)) el.flag = 'limit';
  });
}

function logBigExpenses(limit) {
  const output = budget
    .map(el => (el.value <= -limit ? `${el.description.slice(-2)} / ` : ''))
    .join('')
    .slice(0, -2);
  console.log(output);
}

addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');
console.log(budget);
checkExpenses();
console.log(budget);
logBigExpenses(1000);
