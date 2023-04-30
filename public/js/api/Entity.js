/**
* Класс Entity - базовый для взаимодействия с сервером.
* Имеет свойство URL, равно пустой строке.
* */
class Entity {
    static url = ''; // Статическое свойство

    /**
    * Запрашивает с сервера список данных.
    * Это могут быть счета или доходы/расходы
    * Метод посылает GET запрос на адрес, заданный URL. Метод запускает выполнение функции createRequest.
    * */
    static list(data, callback){  // метод получает данные
        createRequest({
            url: this.url,
            method: 'GET',
            data,
            callback
        })
    }

    /**
    * Создаёт счёт или доход/расход с помощью запроса на сервер
    * Метод посылает PUT запрос на адрес, заданный URL. Метод запускает выполнение функции createRequest.
    * */
    static create(data, callback) { // метод создает новые данные
        createRequest({
            url: this.url,
            method: 'PUT',
            data,
            callback
        })
    }

    /**
    * Удаляет информацию о счёте или доходе/расходе
    * Метод посылает DELETE запрос на адрес, заданный URL. Метод запускает выполнение функции createRequest.
    * */
    static remove(data, callback ) { // метод изменяет/удаляет данные
        createRequest({
            url: this.url,
            method: 'DELETE',
            data,
            callback
        })
    }
}
