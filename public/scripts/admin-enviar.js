var option = document.getElementsByClassName('menu__options__option');

for(var i=0; i< option.length; i++){
  option[i].addEventListener("mouseover", hoverOn);
  option[i].addEventListener("mouseout", hoverOff);
}

function hoverOn(){
    if (screen.width > 767) {
        this.style.border = "3px solid #2bffd5";
        this.classList.add('pulse');
        this.firstElementChild.classList.add('verde-claro');
        this.lastElementChild.classList.add('verde-claro');
    }
}
function hoverOff(){
    if (screen.width > 767) {
        this.style.border = "3px solid #4472ff";
        this.classList.remove('pulse');
        this.firstElementChild.classList.remove('verde-claro');
        this.lastElementChild.classList.remove('verde-claro');
    }
}