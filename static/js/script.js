document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('#main-nav ul li a');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {

            if (hamburgerMenu.classList.contains('active')) {
                hamburgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (mainNav.classList.contains('active') && !hamburgerMenu.contains(event.target) && !mainNav.contains(event.target)) {
            hamburgerMenu.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});