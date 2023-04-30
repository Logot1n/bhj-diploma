class Modal { // Класс Modal отвечает за управление всплывающими окнами. В первую очередь это открытие или закрытие имеющихся окон
    constructor(element) { // Устанавливает текущий элемент в свойство element
        if(!element) { // Если переданный элемент не существует, необходимо выкинуть ошибку
            throw new Error('Элемент не существует'); 
        }
        this.element = element;
        this.registerEvents();
    }
    
    registerEvents() { // Находит все закрывающие кнопки, уставливает событие для закрытия всплывающего окна
        let closeBtn = this.element.querySelectorAll('[data-dismiss="modal"]');
        closeBtn.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.onClose();
            })
        });
    }

    open() { // Открывает всплывающее окно
        this.element.style.display = 'block';
    }

    close() { // Закрывает всплывающее окно
        this.element.style.display = 'none';
    }

    onClose() { // Срабатывает после нажатия на элементы, закрывающие окно. Закрывает текущее окно используя метод close()
        this.close();
    }
}