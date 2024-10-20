let currentIndex = 0;
let isTransitioning = false;

function moveCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const products = document.querySelectorAll('.product');
    const productWidth = products[0].clientWidth;
    const totalProducts = products.length;

    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex += direction;

    // Si el índice supera el límite, hacemos un bucle infinito
    if (currentIndex < 0) {
        currentIndex = totalProducts - 1;
        carousel.style.transition = 'none'; // Desactivar transición para saltar
        const offset = -currentIndex * productWidth;
        carousel.style.transform = `translateX(${offset}px)`;
        setTimeout(() => {
            currentIndex = totalProducts - 2;
            moveCarousel(1); // Regresar al anterior con transición
        }, 50);
    } else if (currentIndex >= totalProducts) {
        currentIndex = 0;
        carousel.style.transition = 'none';
        const offset = -currentIndex * productWidth;
        carousel.style.transform = `translateX(${offset}px)`;
        setTimeout(() => {
            currentIndex = 1;
            moveCarousel(-1); // Mover hacia atrás con transición
        }, 50);
    } else {
        // Mover el carrusel
        const offset = -currentIndex * productWidth;
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(${offset}px)`;
    }

    setTimeout(() => {
        isTransitioning = false; // Desbloquear la transición
    }, 500); // Tiempo igual al de la animación
}

// Desplazamiento táctil para dispositivos móviles
let startX = 0;
let currentX = 0;

const carouselContainer = document.querySelector('.carousel-container');

carouselContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carouselContainer.addEventListener('touchmove', (e) => {
    currentX = e.touches[0].clientX;
});

carouselContainer.addEventListener('touchend', () => {
    const diff = startX - currentX;
    if (diff > 50) {
        moveCarousel(1); // Mover a la derecha
    } else if (diff < -50) {
        moveCarousel(-1); // Mover a la izquierda
    }
});
