/**
* Класс Sidebar отвечает за работу боковой колонки:
* кнопки скрытия/показа колонки в мобильной версии сайта
* и за кнопки меню
* */
class Sidebar {
    static init() { // Запускает initAuthLinks и initToggleButton
        this.initAuthLinks();
        this.initToggleButton();
    }

    static initToggleButton() { // Отвечает за скрытие/показа боковой колонки: переключает два класса для body: sidebar-open и sidebar-collapse при нажатии на кнопку .sidebar-toggle
        const toggleButton = document.querySelector('.sidebar-toggle');
        toggleButton.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.toggle('sidebar-open');
            document.body.classList.toggle('sidebar-collapse');
        })
    }

    static initAuthLinks() { // регистрирует обработчики событий для ссылок в боковом меню авторизации
        const registerButton = document.querySelector('.menu-item_register');
        registerButton.addEventListener('click', (e) => { // при нажатии на кнопку Регистрация, открывает окно регистрации
            e.preventDefault();
            App.getModal('register').open();
        })

        const loginButton = document.querySelector('.menu-item_login');
        loginButton.addEventListener('click', (e) => { // при нажатии на кнопку Войти, открывает окно входа
            e.preventDefault();
            App.getModal('login').open();
        })

        const logoutButton = document.querySelector('.menu-item_logout');
        logoutButton.addEventListener('click', (e) => { // при нажатии на кнопку Выйти, выходит из аккаунта
            e.preventDefault();
            User.logout((err, response) => {
                if(response && response.success) {
                    App.setState('init');
                } else {
                    console.log(response.error);
                }
            })
        })
    }
}