// Formatar data

function formatarData() {

    var data = document.getElementsByClassName('data')

    for (var i = 0; i < data.length; i++) {
        let dia = data[i].textContent.substr(7,4);
        let anohora = data[i].textContent.substr(10, 11);
        let mes_ingles = data[i].textContent.substr(4, 3);
        

        if (mes_ingles == 'Jan') {
            var mes = 'Jan'
        }

        if (mes_ingles == 'Feb') {
            var mes = 'Fev'
        }

        if (mes_ingles == 'Mar') {
            var mes = 'Mar'
        }

        if (mes_ingles == 'Apr') {
            var mes = 'Abr'
        }

        if (mes_ingles == 'May') {
            var mes = 'Mai'
        }

        if (mes_ingles == 'Jun') {
            var mes = 'Jun'
        }

        if (mes_ingles == 'Jul') {
            var mes = 'Jul'
        }

        if (mes_ingles == 'Aug') {
            var mes = 'Ago'
        }

        if (mes_ingles == 'Sep') {
            var mes = 'Set'
        }

        if (mes_ingles == 'Oct') {
            var mes = 'Out'
        }

        if (mes_ingles == 'Nov') {
            var mes = 'Nov'
        }
    
        if (mes_ingles == 'Dec') {
            var mes = 'Dez'
        }

        let str = dia + mes +anohora;

        data[i].textContent = str;
    }

}

formatarData()


function esconderBtn() {


    var button = document.getElementsByClassName('recompensas__table__data__button');

    for (var i=0; i < button.length; i++) {
        
        if (button[i].parentElement.firstElementChild.textContent !== "entrega pendente") {
            button[i].style.display = 'none'
        }
        else {
            button[i].parentElement.firstElementChild.style.display = 'none'
        }
    }


}

esconderBtn()


var res = document.getElementsByClassName('recompensas__table__data__button');

for(var i=0; i< res.length; i++){
  res[i].addEventListener("click", confirmarEntrega);
}

function confirmarEntrega(){

    id = this.id;

    document.getElementsByClassName('form__input')[0].value = id;
    document.getElementsByClassName('recompensas')[0].style.display = "none";
    document.getElementsByClassName('form')[0].style.display = "block";

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