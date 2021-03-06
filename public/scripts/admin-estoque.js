var rec = document.getElementsByClassName('edit');

for(var i=0; i< rec.length; i++){
  rec[i].addEventListener("click", editRec);
}

function editRec(){

    id = this.id;
    document.getElementsByClassName('form__input')[0].value = id;
    
    document.getElementsByClassName('estoque')[0].style.display = "none";
    document.getElementsByClassName('form')[0].style.display = "block";


}


document.getElementById('formSubmit').addEventListener('click', submitForm);

function submitForm() {
    document.getElementById('formSubmit').disabled = "true";
    document.getElementById('form').submit()
}

document.getElementById('formReturn').addEventListener('click', returnForm);

function returnForm() {
    document.getElementsByClassName('estoque')[0].style.display = "block";
    document.getElementsByClassName('form')[0].style.display = "none";
}