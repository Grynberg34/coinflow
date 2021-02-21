
document.getElementsByClassName('mensal__button')[0].addEventListener('click', submitForm);

function submitForm() {
    document.getElementsByClassName('mensal__button')[0].disabled = "true";
    document.getElementById('form').submit()
}

// Formatar data

function formatarData() {

    var data = document.getElementsByClassName('mensal__date__timestamp')[0]

    let dia = data.textContent.substr(7,4);
    let anohora = data.textContent.substr(10, 11);
    let mes_ingles = data.textContent.substr(4, 3);
    

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

    data.textContent = str;

}

formatarData()