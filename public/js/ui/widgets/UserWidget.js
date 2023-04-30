class UserWidget { // Класс UserWidget отвечает за отображение информации о имени пользователя после авторизации или его выхода из системы
    constructor(element) {
        this.element = element;
        if(this.element === null) {
            throw new Error('Передан пустой элемент');
        }
    }

    update() { // Устанавливает имя текущего авторизованного пользователя
        const user = User.current();
        if(user) {
            this.element.querySelector('.user-name').textContent = user.name;;
        }
    }
}