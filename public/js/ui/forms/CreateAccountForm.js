class CreateAccountForm extends AsyncForm { // Класс CreateAccountForm управляет формой создания нового счёта
onSubmit(data) {
    Account.create(data, (err, response) => {
      if(response && response.success) { // в случае успеха, закрывает окно создания счёта, сбрасывает форму, и обновляет список счетов
        App.getModal('newAccount').close();
        this.element.reset();
        App.update();
      } else {
        console.log(err);
      }
    })
  }
}