var user = document.getElementsByClassName('funcionarios__table__data__icon');

for(var i=0; i< user.length; i++){
  user[i].addEventListener("click", deleteUser);
}

function deleteUser(){

    id = this.id;
    document.getElementsByClassName('delete__input')[0].value = id;
    
    document.getElementsByClassName('funcionarios')[0].style.display = "none";
    document.getElementsByClassName('delete')[0].style.display = "block";


}


document.getElementById('deleteSubmit').addEventListener('click', submitForm);

function submitForm() {
    document.getElementById('deleteSubmit').disabled = "true";
    document.getElementById('form').submit()
}

document.getElementById('deleteReturn').addEventListener('click', returnForm);

function returnForm() {
    document.getElementsByClassName('funcionarios')[0].style.display = "block";
    document.getElementsByClassName('delete')[0].style.display = "none";
}