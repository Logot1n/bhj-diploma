class LoginForm extends AsyncForm { // Класс LoginForm управляет формой входа в портал
    onSubmit(data) {
        User.login(data, (err, response) => { // Производит авторизацию с помощью User.login и закрывает окно, в котором находится форма
            if(response && response.success) {
                this.element.reset();
                App.setState('user-logged');
                const modalLogin = App.getModal('login'); 
                modalLogin.close();
            } else {
                console.log(err);
            }
        })
    }
}