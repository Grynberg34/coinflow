var user = document.getElementsByClassName('editar__table__data__icon');

for(var i=0; i< user.length; i++){
  user[i].addEventListener("click", editUser);
}

function editUser(){



    document.getElementById('user').value = this.id;
    document.getElementById('value').value = '';

    console.log(document.getElementById('user').value)
    
    document.getElementsByClassName('form')[0].style.display = "block";
    document.getElementsByClassName('editar')[0].style.display = "none";


}


document.getElementById('formSubmit').addEventListener('click', submitForm);

function submitForm() {
    document.getElementById('formSubmit').disabled = "true";
    document.getElementById('form').submit()
}

document.getElementById('formReturn').addEventListener('click', returnForm);

function returnForm() {
    document.getElementsByClassName('form')[0].style.display = "none";
    document.getElementsByClassName('editar')[0].style.display = "block";
}