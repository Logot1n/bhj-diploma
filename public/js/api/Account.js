/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  constructor(url = '/account') {
    super(url);
  }
  static get(id = '', callback){
    createRequest({
      url: `${this.url}/${id}`,
      method: 'GET',
      data,
      callback  
    })
  }
}