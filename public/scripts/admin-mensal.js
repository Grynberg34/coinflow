
document.getElementsByClassName('mensal__button')[0].addEventListener('click', submitForm);

function submitForm() {
    document.getElementsByClassName('mensal__button')[0].disabled = "true";
    document.getElementById('form').submit()
}

// Formatar data

function formatarData() {

    var data = document.getElementsByClassName('mensal__date__timestamp')[0];
    let str = data.textContent.substr(4, 20);
    data.textContent = str;
}

formatarData()