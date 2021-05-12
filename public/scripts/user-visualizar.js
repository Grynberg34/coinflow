var rec = document.getElementsByClassName('recompensas__recompensa__button');

for(var i=0; i< rec.length; i++){
  rec[i].addEventListener("click", resgatarRec);
}

function resgatarRec(){

    id = this.id;

    var price = parseInt(document.getElementById(`p${id}`).textContent, 10);
    var flowin = parseInt(document.getElementById('flowin').textContent, 10)

    document.getElementsByClassName('form__input')[0].value = id;
    document.getElementsByClassName('recompensas')[0].style.display = "none";
    document.getElementsByClassName('form')[0].style.display = "block";

    if (flowin < price) {
        document.getElementById('form').style.display = "none"
        document.getElementsByClassName('form__message')[0].style.display = "block"
    }
    else {
        document.getElementsByClassName('form__message')[0].style.display = "none"
        document.getElementById('form').style.display = "block"
    }


}

document.getElementById('formSubmit').addEventListener('click', submitForm);

function submitForm() {
    document.getElementById('formSubmit').disabled = "true";
    document.getElementById('form').submit()
}

document.getElementById('formReturn').addEventListener('click', returnForm);

function returnForm() {
    document.getElementsByClassName('recompensas')[0].style.display = "block";
    document.getElementsByClassName('form')[0].style.display = "none";
}


//Filtros

var options = {
    valueNames: [ 'title', 'category', 'price' ]
};

var lista = new List('rec-list', options);