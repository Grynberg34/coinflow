var rec = document.getElementsByClassName('remove');

for(var i=0; i< rec.length; i++){
  rec[i].addEventListener("click", deleteRec);
}

function deleteRec(){

    id = this.id;
    document.getElementsByClassName('delete__input')[0].value = id;
    
    document.getElementsByClassName('remover')[0].style.display = "none";
    document.getElementsByClassName('delete')[0].style.display = "block";


}


document.getElementById('deleteSubmit').addEventListener('click', submitForm);

function submitForm() {
    document.getElementById('deleteSubmit').disabled = "true";
    document.getElementById('form').submit()
}

document.getElementById('deleteReturn').addEventListener('click', returnForm);

function returnForm() {
    document.getElementsByClassName('remover')[0].style.display = "block";
    document.getElementsByClassName('delete')[0].style.display = "none";
}