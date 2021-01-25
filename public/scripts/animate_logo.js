
document.getElementsByClassName('menu__logo')[0].addEventListener("mouseover", function(){
    document.getElementsByClassName('menu__logo')[0].classList.add('pulse')
});

document.getElementsByClassName('menu__logo')[0].addEventListener("mouseout", function(){
    document.getElementsByClassName('menu__logo')[0].classList.remove('pulse')
});
