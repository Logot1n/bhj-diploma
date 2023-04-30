// Класс AsyncForm управляет всеми формами приложения, которые не должны быть отправлены с перезагрузкой страницы.
// Вместо этого данные с таких форм собираются и передаются в метод onSubmit для последующей обработки
class AsyncForm {
    constructor(element) {
        this.element = element;
        if(this.element === null) { // Если переданный элемент не существует, необходимо выкинуть ошибку
            throw new Error('Элемент не существует');
        }
        this.registerEvents();
    }

    registerEvents() { // задает обработчик формы
        this.element.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submit();
        })
    }

    getData() { // получает все поля формы и из них формирует объект со всеми данными, которые необходимо передать
        const newForm = new FormData(this.element);
        let data = {};
        for(let [key, value] of newForm.entries()) {
            data[key] = value;
        }
        return data; // передаем данные формы
    }

    onSubmit({url, data, method, callback}) {
        // Пустой метод. Пригодится для дальнейших форм, что будут унаследованы от AsyncForm. Например, в формах:

        // Создания аккаунта
        // Создания новой транзакции
        // Авторизации
        // Регистрации
    }
    submit() { // метод, который извлекает из формы данные и передаёт их в onSubmit.
        this.onSubmit(this.getData());
    }
}