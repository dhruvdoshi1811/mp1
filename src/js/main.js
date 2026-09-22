/* Your JS here. */
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
const modalButtons = document.querySelectorAll('[data-modal-target]');


const openModal = (modal) => {
    if (modal == null) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

const closeModal = (modal) => {
    if (modal == null) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

modalButtons.forEach(button => {
    const modalId = button.getAttribute('data-modal-target');
    const modal = document.getElementById(modalId);
    button.addEventListener('click', () => openModal(modal));
});

const closeButtons = document.querySelectorAll('.modal-close');

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});


const modals = document.querySelectorAll('.modal');

modals.forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
});


document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal(document.querySelector('.modal.open'));
    }
});

let currentSlide = 0;
const totalSlides = slides.length;
const updateCarousel = () => {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
};
prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
});
nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
});





const updateNavbar = () => {
    if (window.scrollY > 100) {
        header.classList.add('shrink');
    }
    else{
        header.classList.remove('shrink');
    }

    //change active buttons according to the section
    let currentSection = '';
    const headerHeight = header.offsetHeight;
    for (const section of sections) {
        const sectionTop = section.offsetTop;
        
        if (window.scrollY + headerHeight >= sectionTop-10) {
            currentSection = section.id;

        }
    }

    
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        currentSection = sections[sections.length - 1].id;
    }

    for (const link of navLinks) {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    }
}
window.addEventListener('scroll', updateNavbar);
updateNavbar();

