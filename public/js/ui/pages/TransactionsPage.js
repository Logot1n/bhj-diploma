class TransactionsPage { // Класс TransactionsPage управляет страницей отображения доходов и расходов конкретного счёта

  constructor(element) {
    if(!element) { // Если переданный элемент не существует, необходимо выкинуть ошибку
      throw new Error('Элемент не существует'); 
    }
    this.element = element;
    this.registerEvents();
  }

  update() { // Вызывает метод render для отрисовки страницы
    this.render(this.lastOptions);
  }

  registerEvents() {
    const removeAccount = document.querySelector('.remove-account'); // кнопка удаления счёта
    removeAccount.addEventListener('click', (e) => { // в событие удаляем счёт
      e.preventDefault();
      this.removeAccount(); 
    })
    
    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      const removeTransaction = e.target.closest('.transaction__remove'); // кнопка удаления транзакции
      if(removeTransaction) {
        this.removeTransaction(removeTransaction.dataset.id); // удаляем транзакцию по id
      } else {
        return;
      }
    })
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if(!this.lastOptions) { // если объекта с настройками (где account_id - идентификатор счёта) не существует, отменить удаление
      return;
    }
    if(confirm('Вы действительно хотите удалить счёт?')) { // показываем диалоговое окно
      Account.remove({id: this.lastOptions.account_id}, (err, response) => { 
        if(response && response.success) {
          this.clear();
          App.updateWidgets();
          App.updateForms();
        } else {
          console.log(err);
        }
      })
    } else {
      console.log('Отмена удаления счёта');
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    if(confirm('Вы действительно хотите удалить эту транзакцию?')) {
      Transaction.remove({id}, (err, response) => {
        if(response && response.success) {
          App.update();
        } else {
          console.log(err);
        }
      })
    } else {
      console.log('Отмена удаления транзакции');
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    this.lastOptions = options; // объект с настройками

    if(!options) {
      return;
    }

    Account.get(options.account_id, (err, response) => {
      if(response && response.success) {
        this.renderTitle(response.data.name);
      } else {
        console.log(err);
      }
    })

    Transaction.list(options, (err, response) => {
      if(response && response.success) {
        this.renderTransactions(response.data);
      } else {
        console.log(err);
      }
    })
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    const title = document.querySelector('.content-title');
    title.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    const currentDate = new Date().toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'});
    const currentTime = new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});
    return `${currentDate} в ${currentTime}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    const div = document.createElement('div');
    div.classList.add('transaction');
    div.classList.add('row');
    div.classList.add(`transaction_${item.type}`)
    div.innerHTML += `<div class="col-md-7 transaction__details">
                        <div class="transaction__icon">
                            <span class="fa fa-money fa-2x"></span>
                        </div>
                        <div class="transaction__info">
                            <h4 class="transaction__title">${item.name}</h4>
                            <!-- дата -->
                            <div class="transaction__date">${this.formatDate(item.created_at)}</div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="transaction__summ">
                        <!--  сумма -->
                        ${item.sum} <span class="currency">₽</span>
                        </div>
                      </div>
                      <div class="col-md-2 transaction__controls">
                          <!-- в data-id нужно поместить id -->
                          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                              <i class="fa fa-trash"></i>  
                          </button>
                      </div>
                    `
      return div;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    const content = document.querySelector('.content');
    content.innerHTML = '';
    data.forEach(transaction => {
      let transactions = this.getTransactionHTML(transaction);
      content.appendChild(transactions);
    })
  }
}