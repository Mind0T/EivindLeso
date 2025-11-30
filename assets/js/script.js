document.addEventListener('DOMContentLoaded', function() {
    
    // 1. MENÚ MÓVIL
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

    // 2. CARGA DE IMÁGENES (OPTIMIZADA CON DOCUMENT FRAGMENT)
    const configuracionImagenes = {
        'retrato': 15,
        'moda': 6,
        'sociales': 6,
        'producto': 13, 
        'oficina': 6
    };

    const galeriaGrid = document.querySelector('.galeria-grid');
    const videoContainer = document.querySelector('.video-container'); 

    async function loadImagesForCategory(category, count) {
        let filePrefix = category;
        if (category === 'producto') filePrefix = 'productocom'; 

        // Creamos un fragmento de memoria para no repintar el DOM en cada vuelta
        const fragment = document.createDocumentFragment();

        for (let i = 1; i <= count; i++) {
            const imgSrc = `assets/img/trabajo/${filePrefix}${i}.jpg`;
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('galeria-item');
            itemDiv.setAttribute('data-category', category);
            itemDiv.style.display = 'none'; 
            
            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            imgElement.alt = `${category} ${i}`;
            imgElement.loading = "lazy"; // Carga diferida
            
            imgElement.addEventListener('click', () => openLightbox(imgElement));

            itemDiv.appendChild(imgElement);
            // Añadimos al fragmento
            fragment.appendChild(itemDiv);
        }

        // Insertamos todo el bloque de una sola vez
        if (videoContainer) {
            galeriaGrid.insertBefore(fragment, videoContainer);
        } else {
            galeriaGrid.appendChild(fragment);
        }
    }

    // Usamos Promise.all para cargar configuraciones en paralelo si fuera necesario, 
    // aunque aquí es síncrono, mantenemos el orden.
    Object.entries(configuracionImagenes).forEach(([category, count]) => {
        loadImagesForCategory(category, count);
    });

    // 3. FILTROS & AUDIO
    const filtroBotones = document.querySelectorAll('.filtro-btn');
    const galeriaPlaceholder = document.querySelector('.galeria-placeholder');
    let currentImages = []; 
    let currentImageIndex = 0;

    function stopAllVideos() {
        const videoIframes = document.querySelectorAll('.video-slide iframe');
        videoIframes.forEach(iframe => {
            const tempSrc = iframe.src;
            iframe.src = tempSrc; 
        });
    }

    filtroBotones.forEach(boton => {
        boton.addEventListener('click', () => {
            stopAllVideos();
            if (galeriaPlaceholder) galeriaPlaceholder.style.display = 'none';

            filtroBotones.forEach(btn => btn.classList.remove('active'));
            boton.classList.add('active');

            const filtro = boton.getAttribute('data-filter');
            const allItems = document.querySelectorAll('.galeria-item');
            
            currentImages = []; 

            allItems.forEach(item => {
                if (item.getAttribute('data-category') === filtro) {
                    item.style.display = 'block'; 
                    if (!item.classList.contains('video-container')) {
                       item.style.display = 'grid'; 
                       const img = item.querySelector('img');
                       if(img) currentImages.push(img);
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 4. LIGHTBOX
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

    // 5. CARRUSEL HERO (PRINCIPAL)
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

    // 6. CARRUSEL VIDEO & SWIPE
    const videoSlides = document.querySelectorAll('.video-slide');
    const vidPrevBtn = document.querySelector('.video-control-btn.prev');
    const vidNextBtn = document.querySelector('.video-control-btn.next');
    const videoTouchArea = document.getElementById('video-carousel-touch');
    let currentVideoIndex = 0;

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            if (idx === currentVideoIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    function showVideo(index) {
        const currentIframe = videoSlides[currentVideoIndex].querySelector('iframe');
        if(currentIframe) currentIframe.src = currentIframe.src; 

        videoSlides[currentVideoIndex].classList.remove('active');
        currentVideoIndex = (index + videoSlides.length) % videoSlides.length;
        videoSlides[currentVideoIndex].classList.add('active');
        updateDots();
    }

    if(videoSlides.length > 0) {
        vidPrevBtn.addEventListener('click', () => showVideo(currentVideoIndex - 1));
        vidNextBtn.addEventListener('click', () => showVideo(currentVideoIndex + 1));
        
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
               if (idx === currentVideoIndex) return;
               const currentIframe = videoSlides[currentVideoIndex].querySelector('iframe');
               if(currentIframe) currentIframe.src = currentIframe.src;
               videoSlides[currentVideoIndex].classList.remove('active');
               currentVideoIndex = idx;
               videoSlides[currentVideoIndex].classList.add('active');
               updateDots();
            });
        });

        let touchStartX = 0;
        let touchEndX = 0;
        videoTouchArea.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
        videoTouchArea.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) showVideo(currentVideoIndex + 1);
            if (touchEndX > touchStartX + 50) showVideo(currentVideoIndex - 1);
        }, {passive: true});
    }

    // 7. BOTÓN FLOTANTE (OPTIMIZADO CON THROTTLING)
    const btnUp = document.getElementById('btn-up-trabajo');
    const targetSection = document.getElementById('seccion-filtros');

    if (btnUp && targetSection) {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 300) btnUp.classList.add('visible');
                    else btnUp.classList.remove('visible');
                    ticking = false;
                });
                ticking = true;
            }
        }, {passive: true}); 

        btnUp.addEventListener('click', () => {
            const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - 150; 
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        });
    }
});