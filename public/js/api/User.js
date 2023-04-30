/**
* Класс User управляет авторизацией, выходом и
* регистрацией пользователя из приложения
* Имеет свойство URL, равное '/user'.
* */

class User {
    static url = '/user';

    static setCurrent(user) { // добавляет текущего зарегистированного пользователя в локальное хранилище
        localStorage.setItem('user', JSON.stringify(user));
    };

    static current() { // Возвращает текущего авторизованного пользователя из локального хранилища
        let currentUser = JSON.parse(localStorage.getItem('user'));
        if(!currentUser) {
            return undefined;
        }
        return currentUser;
    };

    static unsetCurrent() { // удаляет информацию об авторизованном пользователе из локального хранилища
        localStorage.removeItem('user');
    };

    static fetch(callback) { // получает информацию об авторизованном пользователе из локального хранилища
        createRequest({
            url: this.url + '/current',
            method: 'GET',
            callback: (err, response) => {
                if(response && response.success) {
                    this.setCurrent(response.user); // если данные о пользователе есть, обновляем данные текущего пользователя
                } else {
                    this.unsetCurrent(); // если данные о пользователе отсутствуют, удаляем данные об авторизации
                }
                callback(err, response);
            }
        })
    };

    static register(data, callback) { // Производит попытку регистрации пользователя. После успешной регистрации необходимо сохранить пользователя через метод User.setCurrent.
        createRequest({
            url: this.url + '/register',
            method: 'POST',
            data: data,
            callback: (err, response) => {
                if(response && response.success) { 
                    this.setCurrent(response.user);  // создаем пользователя
                } else if(response && response.error) { // в случае неудачи
                    console.log(response.error);
                }
                callback(err, response);
            }
        })
    }

    static login(data, callback) { // Производит попытку авторизации. После успешной авторизации необходимо сохранить пользователя через метод User.setCurrent.
        createRequest({
            url: this.url + '/login',
            method: 'POST',
            data: data,
            callback: (err, response) => {
                if(response && response.user) {  
                    this.setCurrent(response.user); // получаем пользователя
                } else if(response && response.error) {
                    console.log(response.error);
                }
                callback(err, response);
            }
        })
    }

    static logout(callback) { // Производит выход из приложения. После успешного выхода необходимо вызвать метод User.unsetCurrent
        createRequest({
            url: this.url + '/logout',
            method: 'POST',
            callback: (err, response) => {
                if(response && response.success) {
                    this.unsetCurrent(); 
                }
                callback(err, response);
            }
        })
    }
}