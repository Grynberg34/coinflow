// Formatar data

function formatarData() {

    var data = document.getElementsByClassName('data')

    for (var i = 0; i < data.length; i++) {
        let str = data[i].textContent.substr(4, 20);
        data[i].textContent = str
    }

}

formatarData()