(function () {
    function setNavigation () {
        document.querySelector('.header').classList.remove('header__noJS');
        const nav = document.querySelector('.nav');
        const navButton = document.querySelector('.btn-nav');
        const navList = document.querySelector('.nav-list');
        if (window.matchMedia("(max-width: 767px)").matches) {

            navList.classList.add('nav-list__closed');
            navButton.addEventListener('click', function (event) {
                event.preventDefault();
                if (navButton.classList.contains('btn-nav__open')) {
                    navButton.classList.remove('btn-nav__open');
                    navButton.classList.add('btn-nav__close');
                    navList.classList.remove('nav-list__closed');
                    navList.classList.add('nav-list__opened');
                } else {
                    navButton.classList.add('btn-nav__open');
                    navButton.classList.remove('btn-nav__close');
                    navList.classList.add('nav-list__closed');
                    navList.classList.remove('nav-list__opened');
                }
            })
        }
    }
    window.addEventListener('load', setNavigation);
    window.addEventListener('resize', setNavigation);
})();
