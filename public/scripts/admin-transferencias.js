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

//Filtros

var options = {
    valueNames: [ 'remetente', 'destinatario', 'data' ]
};

var lista = new List('transf-list', options);