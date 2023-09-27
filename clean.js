'use strict';

class Item {
  constructor(value, description, user) {
    this.value = value;
    this.description = description;
    this.user = user;
    this.flag = null;
  }
}

const budget = Object.freeze([
  new Item(250, 'Sold old TV 📺', 'jonas'),
  new Item(-45, 'Groceries 🥑', 'jonas'),
  new Item(3500, 'Monthly salary 👩‍💻', 'jonas'),
  new Item(300, 'Freelancing 👩‍💻', 'jonas'),
  new Item(-1100, 'New iPhone 📱', 'jonas'),
  new Item(-20, 'Candy 🍭', 'matilda'),
  new Item(-125, 'Toys 🚂', 'matilda'),
  new Item(-1800, 'New Laptop 💻', 'jonas'),
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
}); // Make the object immutable (just the first level of it, inside elements can still be modified)

const getLimit = (user, limits) => limits?.[user] ?? 0;

function addExpense(state, limits, value, description, user = 'jonas') {
  user = user.toLowerCase();
  if (value <= getLimit(user, limits))
    return [...state, new Item(-value, description, user)];
  return state;
}

function checkExpenses(state, limits) {
  return state.map(el =>
    el.value < -getLimit(el.user, limits) ? { ...el, flag: 'limit' } : el
  );
}

function logBigExpenses(state, limit) {
  console.log(
    state
      .filter(el => el.value <= -limit)
      .map(el => el.description.slice(-2))
      .join(' / ')
  );
}

const budget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
// prettier-ignore
const budget2 = addExpense(budget1, spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
const budget3 = addExpense(budget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(budget3);
const finalBudget = checkExpenses(budget3, spendingLimits);
console.log(finalBudget);
logBigExpenses(finalBudget, 1000);
