document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('#main-nav ul li a');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

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

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const formUrl = 'https://formsubmit.co/' + formData.get('emailParaEnvio');

            const realEmail = 'jeffersonguedes0211@gmail.com';

            const dataToSend = new FormData();
            for (let [key, value] of formData.entries()) {
                dataToSend.append(key, value);
            }
            dataToSend.append('_recipients', realEmail);

            try {
                const submitButton = contactForm.querySelector('.send-message-btn');
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';

                const response = await fetch('https://formsubmit.co/ajax/' + realEmail, {
                    method: 'POST',
                    body: dataToSend
                });

                const result = await response.json();

                if (result.success) {
                    displayMessage('Mensagem enviada com sucesso! Agradeço o seu contato.', 'success');
                    contactForm.reset();
                } else {
                    displayMessage('Erro ao enviar a mensagem. Tente novamente.', 'error');
                }
            } catch (error) {
                console.error('Erro no envio do formulário:', error);
                displayMessage('Erro na conexão. Tente novamente mais tarde.', 'error');
            } finally {
                const submitButton = contactForm.querySelector('.send-message-btn');
                submitButton.disabled = false;
                submitButton.textContent = 'ENVIAR MENSAGEM';
            }
        });
    }

    function displayMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-notification show';
        formMessage.classList.add(type);

        setTimeout(() => {
            formMessage.classList.remove('show');
            setTimeout(() => {
                formMessage.className = 'form-notification';
                formMessage.textContent = '';
            }, 500);
        }, 5000);
    }
});
