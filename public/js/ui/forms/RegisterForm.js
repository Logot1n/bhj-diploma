class RegisterForm extends AsyncForm { // Класс RegisterForm управляет формой регистрации
    onSubmit(data) {
        User.register(data, (err, response) => { // Производит регистрацию с помощью User.register и закрывает окно, в котором находится форма
            if(response && response.success) {
                this.element.reset();
                App.setState('user-logged');
                const modalRegister = App.getModal('register');
                modalRegister.close();
            } else {
                alert(err);
            }
        })
    }
}