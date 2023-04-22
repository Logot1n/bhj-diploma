/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = ({url, data, method, callback}) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    xhr.responseType = 'json';
    try {
        if(method === 'GET') {
            // обработка запроса GET
            let urlParams = url;
            for(let key in data) {
                urlParams += `?${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
            }
            xhr.open('GET', urlParams);
            xhr.send();
        } else if(method === 'POST') {
            // обработка запроса POST
            for(let key in data) {
                formData.append(key, data[key]);
            }
            xhr.open('POST', url);
            xhr.send(formData);
        }
        xhr.onload = function() {
            if(xhr.response && xhr.response.success) {
                callback(null, xhr.response)
            } else {
                callback(new Error(xhr.response.error), null)
            }
        }
    } catch (err) {
        callback(err, null)
    }
}