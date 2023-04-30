class TransactionsWidget { // Класс TransactionsWidget отвечает за открытие всплывающих окон для создания нового дохода или расхода
  constructor(element) {
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    const incomeBtn = this.element.querySelector('.create-income-button'); // Кнопка нового дохода
    incomeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const income = App.getModal('newIncome'); // Открывает окно создания нового дохода
      income.open();
    })
    const expenseBtn = this.element.querySelector('.create-expense-button'); // Кнопка нового расхода
    expenseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const expense = App.getModal('newExpense'); // Открывает окно создания нового расхода
      expense.open();
    })
  }
}
