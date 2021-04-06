
document.getElementsByClassName('individual__button')[0].addEventListener('click', submitForm);

function submitForm() {
    document.getElementsByClassName('individual__button')[0].disabled = "true";
    document.getElementById('form').submit()
}