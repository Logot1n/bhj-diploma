/**
* Основная функция для совершения запросов на сервер.
* */
const createRequest = ({url, data, method, callback}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json' // формат, в котором необходимо выдать результат
    const formData = new FormData(); // создаем объект для передачи данных в запрос при !== GET
    try {
        if(method === 'GET') {
            // обработка GET запроса
            for(let key in data) {
                url += `?${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
            }
            xhr.open(`GET`, url);
            xhr.send();
        } else if(method !== 'GET') { // запрос не GET
            for(let key in data) {
                formData.append(key, data[key])
            }
            xhr.open(method, url);
            xhr.send(formData);
        }

        // В случае успешного запроса
        xhr.addEventListener('load', () => {
            const response = xhr.response;
            const err = response.error;
            if(response && response.success) {
                callback(null, response);
            } else { // в случае, если возникают ошибки 
                callback(err, null);
            }
        })
    }  catch (e) {
        callback("Произошла ошибка: ", e); // если код try не выполнился - вывести ошибку
    }
}