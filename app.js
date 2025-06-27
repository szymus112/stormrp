document.addEventListener('DOMContentLoaded', function() {
    
    // --- Logika mobilnego menu ---
    const navToggle = document.getElementById('nav-toggle');
    const navButtons = document.getElementById('nav-buttons');

    if (navToggle && navButtons) {
        navToggle.addEventListener('click', () => {
            navButtons.classList.toggle('active');
        });
    }

    // --- Animowany licznik na stronie głównej ---
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    let current = 0;
                    const increment = target / 100; // Szybkość odliczania

                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                    observer.unobserve(counter); // Uruchom animację tylko raz
                }
            });
        }, { threshold: 0.5 }); // Uruchom gdy element jest w 50% widoczny

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }


    // --- Logika dla strony PODANIA ---
    const galleryContainer = document.querySelector('.grid-gallery');
    if (galleryContainer) {
        const applications = [
            {
                title: 'LSPD',
                img: 'assets/lspd.png',
                formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc_q5u0122LqoJ7ZpCsqUNXXwg3y1kOxXMhHF2ZeiIFz9LqVA/viewform?embedded=true'
            },
            {
                title: 'EMS',
                img: 'assets/ems.png',
                formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfF3KsT7YrRHw1jExAQ1kQKstxoH4JxSiEWVNTANlqBnA_dCA/viewform?embedded=true'
            },
            {
                title: 'LSC',
                img: 'assets/lsc.png',
                formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeZy7rsOwoyplqqZo8R2QcjncoPk6xhjuE5jzHfPSfG5uPLlA/viewform?embedded=true'
            },
            {
                title: 'FCK/CK',
                img: 'assets/ck.png',
                formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScYOZLQY39zJJMn1iTJfXRrDsMB2r0Gd-r3XR8uNwEp570Nuw/viewform?embedded=true'
            },
            {
                title: 'T-SUPPORT',
                img: 'assets/support.png',
                formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScwLEl5PemPC0eAXpM3hqiQrGxsiR6jfLJHqR80Mp8LYIngnQ/viewform?embedded=true'
            }
        ];

        applications.forEach(app => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.backgroundImage = `url('${app.img}')`;
            card.innerHTML = `<h3 class="card-title">${app.title}</h3>`;
            card.addEventListener('click', () => openModal(app));
            galleryContainer.appendChild(card);
        });

        const modalOverlay = document.getElementById('modal-overlay');
        const modalTitle = document.getElementById('modal-title');
        const modalIframe = document.getElementById('modal-iframe');
        const modalClose = document.getElementById('modal-close');

        function openModal(appData) {
            modalTitle.textContent = appData.title;
            modalIframe.src = appData.formUrl;
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modalOverlay.classList.remove('active');
            modalIframe.src = 'about:blank';
            document.body.style.overflow = '';
        }

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) closeModal();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
            });
        }
    }
    
    // Inicjalizacja AOS do animacji przy przewijaniu
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }
});