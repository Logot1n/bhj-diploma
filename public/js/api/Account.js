/**
* Класс Account наследуется от Entity.
* Управляет счетами пользователя.
* Имеет свойство URL со значением '/account'
* */

class Account extends Entity {
    static url = '/account'; // статическое свойство

    static get(id = '', callback) { // метод get получает информацию о счёте
        createRequest({
            url: `${this.url}/${id}`,
            method: 'GET',
            data: null,
            callback,
        })
    }
}