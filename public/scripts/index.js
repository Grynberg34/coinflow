function animateCard() {
    window.onload = (event) => {
        if(window.innerWidth > 767){
            document.getElementsByClassName('menu')[0].classList.add('rotateInDownLeft')
        }
    };
}

animateCard()