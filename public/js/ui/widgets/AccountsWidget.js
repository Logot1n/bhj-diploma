class AccountsWidget { // Класс AccountsWidget управляет блоком отображения счетов в боковой колонке
  constructor(element) {
    if(this.element === null) {
      throw new Error('Передан пустой элемент');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() { // registerEvents устанавливает обработчики событий: выбор счёта, нажатие на кнопку «Создать счёт»
    const createAccountButton = document.querySelector('.create-account'); // кнопка создания нового счёта
    createAccountButton.addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('newAccount').open() // открывает окно для создания нового счета
    })

    this.element.addEventListener('click', (e) => { // выбор существующего счета
      const item = e.target;
      if(item.closest('.account')) {
        this.onSelectAccount(item.closest('.account'));
      }
    })
  }

  update() {
    if(User.current()) {
        Account.list(User.current(), (err, response) => { // Если пользователь авторизован, необходимо получить список счетов через Account.list()
          if(response && response.success) {
            this.clear(); // При успешном ответе необходимо очистить список ранее отображённых счетов через AccountsWidget.clear().
            this.renderItem(response.data); // Отображает список полученных счетов с помощью метода renderItem()
          } else {
            console.log(err);
          }
        })
    }
  }

  clear() { // Очищает список ранее отображённых счетов.
    const accounts = [...document.querySelectorAll('.account')];
    accounts.forEach(account => {
      account.remove();
    })
  }

  onSelectAccount(element) { // Удаляет у предыдущего счёта класс .active и добавляет его новому выбранному счёту
    const accounts = [...document.querySelectorAll('.account')];
    accounts.forEach(account => {
        account.classList.remove('active');
    })
    element.classList.add('active')
    App.showPage('transactions', { account_id: `${element.dataset.id}`});
  }

  getAccountHTML(item) { // Возвращает HTML-код счёта для последующего отображения в боковой колонке. item - объект с данными о счёте
    const account = ` 
            <li class="account" data-id=${item.id}>
              <a href="#">
                <span>${item.name}</span> /
                <span>${item.sum}</span>
              </a>
            </li>
           `
    return account; 
  }

  renderItem(data){ // renderItem отображает список счетов в боковой колонке
    data.forEach(element => {
      const accountHTML = this.getAccountHTML(element); // Получаем HTML-код счёта
      this.element.insertAdjacentHTML('beforeend', accountHTML); // добавляем его внутрь элемента виджета
    })
  }
}
