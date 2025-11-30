document.addEventListener('DOMContentLoaded', function() {
    
    // ======================================================
    // 1. LÓGICA DE MENÚ MÓVIL
    // ======================================================
    const menuToggle = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a'); 

    function toggleMenu() {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', toggleMenu);
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // ======================================================
    // 2. CARGA DE IMÁGENES (CANTIDADES FIJAS)
    // ======================================================
    const configuracionImagenes = {
        'retrato': 15,
        'moda': 6,
        'sociales': 6,
        'producto': 15, 
        'oficina': 6
    };

    const galeriaGrid = document.querySelector('.galeria-grid');
    const videoContainer = document.querySelector('.video-container'); 

    async function loadImagesForCategory(category, count) {
        let filePrefix = category;
        if (category === 'producto') filePrefix = 'productocom'; 

        for (let i = 1; i <= count; i++) {
            const imgSrc = `assets/img/trabajo/${filePrefix}${i}.jpg`;
            
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('galeria-item');
            itemDiv.setAttribute('data-category', category);
            itemDiv.style.display = 'none'; 
            
            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            imgElement.alt = `${category} ${i}`;
            imgElement.loading = "lazy";
            
            imgElement.addEventListener('click', () => openLightbox(imgElement));

            itemDiv.appendChild(imgElement);
            
            if (videoContainer) {
                galeriaGrid.insertBefore(itemDiv, videoContainer);
            } else {
                galeriaGrid.appendChild(itemDiv);
            }
        }
    }

    Object.entries(configuracionImagenes).forEach(([category, count]) => {
        loadImagesForCategory(category, count);
    });


    // ======================================================
    // 3. FILTROS DE GALERÍA
    // ======================================================
    const filtroBotones = document.querySelectorAll('.filtro-btn');
    const galeriaPlaceholder = document.querySelector('.galeria-placeholder');
    
    let currentImages = []; 
    let currentImageIndex = 0;

    filtroBotones.forEach(boton => {
        boton.addEventListener('click', () => {
            if (galeriaPlaceholder) galeriaPlaceholder.style.display = 'none';

            filtroBotones.forEach(btn => btn.classList.remove('active'));
            boton.classList.add('active');

            const filtro = boton.getAttribute('data-filter');
            const allItems = document.querySelectorAll('.galeria-item');
            
            currentImages = []; 

            allItems.forEach(item => {
                if (item.getAttribute('data-category') === filtro) {
                    item.style.display = 'block'; // OJO: Block para que funcione el video y las imagenes
                    
                    // Ajuste: si es imagen usamos grid/aspect ratio del CSS, si es video tiene su CSS propio
                    if (!item.classList.contains('video-container')) {
                       item.style.display = 'grid'; // Mantiene el estilo de las fotos
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
    // 4. LIGHTBOX
    // ======================================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const cerrarBtn = document.querySelector('.lightbox-cerrar');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    function openLightbox(imgElement) {
        lightbox.style.display = 'flex';
        lightboxImg.src = imgElement.src;
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
    // 5. CARRUSEL HERO (PRINCIPAL)
    // ======================================================
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselImages = document.querySelectorAll('.carousel-image');
    const carouselPrevBtn = document.querySelector('.carousel-control.prev');
    const carouselNextBtn = document.querySelector('.carousel-control.next');
    
    let currentIndex = 0;
    let isTransitioning = false;
    let autoSlideInterval;
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

    // ======================================================
    // 6. CARRUSEL DE VIDEO (PORTFOLIO)
    // ======================================================
    const videoSlides = document.querySelectorAll('.video-slide');
    const vidPrevBtn = document.querySelector('.video-control.prev');
    const vidNextBtn = document.querySelector('.video-control.next');
    let currentVideoIndex = 0;

    function showVideo(index) {
        // Pausar el video actual (si es un iframe de youtube) reiniciando el src
        const currentIframe = videoSlides[currentVideoIndex].querySelector('iframe');
        if(currentIframe) {
            const tempSrc = currentIframe.src;
            currentIframe.src = tempSrc; 
        }

        // Ocultar actual
        videoSlides[currentVideoIndex].classList.remove('active');

        // Calcular nuevo índice
        currentVideoIndex = (index + videoSlides.length) % videoSlides.length;

        // Mostrar nuevo
        videoSlides[currentVideoIndex].classList.add('active');
    }

    if(videoSlides.length > 0) {
        vidPrevBtn.addEventListener('click', () => showVideo(currentVideoIndex - 1));
        vidNextBtn.addEventListener('click', () => showVideo(currentVideoIndex + 1));
    }
});