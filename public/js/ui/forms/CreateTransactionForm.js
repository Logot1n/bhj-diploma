class CreateTransactionForm extends AsyncForm { // Класс CreateTransactionForm управляет формой создания новой транзакции
  
  constructor(element) { // Вызывает родительский конструктор и метод renderAccountsList
    super(element)
    this.renderAccountsList();
  }

  renderAccountsList() {
    const accountSelect = this.element.querySelector('.accounts-select'); // Это поле с выпадающим списком счетов

    Account.list(User.current(), (err, response) => { // Запрос на получение списка счетов
      if (response.data) { // Если данные получены успешно, тогда в поле с выпадающим списком счетов выводится список счетов 
        accountSelect.innerHTML = ''; 
        response.data.forEach((item) => accountSelect.innerHTML += `<option value="${item.id}">${item.name}</option>`);
      } else {
        console.log(err);
      }
    });
  }
  
  onSubmit(data) {
    Transaction.create(data, (err, response) => { // Создаёт новую транзакцию (доход или расход) с помощью Transaction.create
      if (response && response.success) { // Если запрос успешен, закрывает окно создания Дохода или Расхода
        App.update();
        this.element.reset()
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
      } else {
        console.log(err);
      }
    })
  }
}