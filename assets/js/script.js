document.addEventListener('DOMContentLoaded', function() {
    
    // ======================================================
    // 1. LÓGICA DE MENÚ MÓVIL (CORREGIDO)
    // ======================================================
    const menuToggle = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Cambiar ícono de hamburguesa a X (opcional)
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // ======================================================
    // 2. CARGA AUTOMÁTICA DE IMÁGENES (INTELIGENTE)
    // ======================================================
    // Esta función intenta cargar imágenes numeradas hasta que fallan
    // para que no tengas que actualizar el HTML manualmente.
    
    const categories = ['retrato', 'moda', 'sociales', 'producto', 'oficina'];
    const maxImagesToCheck = 30; // Intentará buscar hasta la imagen número 30 de cada categoría
    const galeriaGrid = document.querySelector('.galeria-grid');
    const videoContainer = document.querySelector('.video-container'); // Guardamos referencia al video

    async function loadImagesForCategory(category) {
        for (let i = 1; i <= maxImagesToCheck; i++) {
            // Nombre del archivo esperado: ej. retrato1.jpg
            // NOTA: Para 'producto' tu archivo se llama 'productocom' según el historial.
            // Ajustamos el prefijo del archivo:
            let filePrefix = category;
            if (category === 'producto') filePrefix = 'productocom'; 

            const imgSrc = `assets/img/trabajo/${filePrefix}${i}.jpg`;
            
            // Creamos una promesa para ver si la imagen carga
            await new Promise((resolve) => {
                const img = new Image();
                img.src = imgSrc;
                
                img.onload = () => {
                    // Si la imagen existe, creamos el elemento HTML
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('galeria-item');
                    itemDiv.setAttribute('data-category', category);
                    // Ocultamos inicialmente (el filtro se encargará de mostrarla)
                    itemDiv.style.display = 'none'; 
                    
                    const imgElement = document.createElement('img');
                    imgElement.src = imgSrc;
                    imgElement.alt = `${category} ${i}`;
                    
                    // Añadimos evento para Lightbox a la nueva imagen
                    imgElement.addEventListener('click', () => openLightbox(imgElement));

                    itemDiv.appendChild(imgElement);
                    
                    // Insertamos ANTES del video para mantener el orden
                    if (videoContainer) {
                        galeriaGrid.insertBefore(itemDiv, videoContainer);
                    } else {
                        galeriaGrid.appendChild(itemDiv);
                    }
                    resolve();
                };
                
                img.onerror = () => {
                    // Si la imagen no existe, simplemente no hacemos nada y resolvemos
                    // para seguir el bucle o terminar.
                    resolve();
                };
            });
        }
    }

    // Ejecutamos la carga para todas las categorías
    // Usamos Promise.all para que sea paralelo y rápido
    Promise.all(categories.map(cat => loadImagesForCategory(cat))).then(() => {
        console.log("Carga automática de imágenes completada.");
        // Reiniciamos lógica de filtros si fuera necesario, 
        // pero como es por CSS/clases y eventos delegados, funcionará.
    });


    // ======================================================
    // 3. FILTROS DE GALERÍA
    // ======================================================
    const filtroBotones = document.querySelectorAll('.filtro-btn');
    const galeriaPlaceholder = document.querySelector('.galeria-placeholder');
    
    // Variables para lightbox
    let currentImages = []; // Lista dinámica de imágenes visibles
    let currentImageIndex = 0;

    filtroBotones.forEach(boton => {
        boton.addEventListener('click', () => {
            // Ocultar placeholder
            if (galeriaPlaceholder) galeriaPlaceholder.style.display = 'none';

            // Activar botón
            filtroBotones.forEach(btn => btn.classList.remove('active'));
            boton.classList.add('active');

            const filtro = boton.getAttribute('data-filter');
            
            // Seleccionamos TODOS los items (incluyendo los nuevos agregados dinámicamente)
            const allItems = document.querySelectorAll('.galeria-item');
            
            currentImages = []; // Reiniciar lista para lightbox

            allItems.forEach(item => {
                if (item.getAttribute('data-category') === filtro) {
                    item.style.display = 'grid'; // Grid para mantener el aspect-ratio
                    
                    // Si no es video, lo agregamos a la lista de lightbox actual
                    if (!item.classList.contains('video-container')) {
                        const img = item.querySelector('img');
                        if(img) currentImages.push(img);
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });


    // ======================================================
    // 4. LIGHTBOX (Optimizado para usar la lista dinámica)
    // ======================================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const cerrarBtn = document.querySelector('.lightbox-cerrar');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    // Función auxiliar para abrir lightbox (usada en la carga dinámica)
    function openLightbox(imgElement) {
        lightbox.style.display = 'flex';
        lightboxImg.src = imgElement.src;
        // Encontrar índice en la lista filtrada actual
        currentImageIndex = currentImages.findIndex(img => img.src === imgElement.src);
    }

    function showLightboxImage(index) {
        if (currentImages.length === 0) return;
        currentImageIndex = (index + currentImages.length) % currentImages.length;
        lightboxImg.src = currentImages[currentImageIndex].src;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightboxImage(currentImageIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightboxImage(currentImageIndex + 1);
        });
    }

    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }


    // ======================================================
    // 5. CARRUSEL (Tiempo ajustado a 3 segundos)
    // ======================================================
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselImages = document.querySelectorAll('.carousel-image');
    const carouselPrevBtn = document.querySelector('.carousel-control.prev');
    const carouselNextBtn = document.querySelector('.carousel-control.next');
    
    let currentIndex = 0;
    let isTransitioning = false;
    let autoSlideInterval;
    
    // CAMBIO: TIEMPO DE TRANSICIÓN 3 SEGUNDOS
    const slideDuration = 3000; 
    const fadeDuration = 800; 

    function goToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        carouselContainer.classList.add('transitioning');

        setTimeout(() => {
            carouselImages[currentIndex].classList.remove('active');
            currentIndex = (index + carouselImages.length) % carouselImages.length;
            carouselImages[currentIndex].classList.add('active');
            carouselContainer.classList.remove('transitioning');
            isTransitioning = false;
        }, fadeDuration);
        
        resetAutoSlide();
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => goToSlide(currentIndex + 1), slideDuration);
    }

    if(carouselImages.length > 0) {
        carouselPrevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        carouselNextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
        carouselImages[0].classList.add('active');
        resetAutoSlide();
    }
});