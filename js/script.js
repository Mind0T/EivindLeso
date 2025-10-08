document.addEventListener('DOMContentLoaded', function() {
    
    // ---- Lógica para el filtro de la galería ----
    const filtroBotones = document.querySelectorAll('.filtro-btn');
    const galeriaItems = document.querySelectorAll('.galeria-item');

    filtroBotones.forEach(boton => {
        boton.addEventListener('click', () => {
            // Marcar el botón activo
            filtroBotones.forEach(btn => btn.classList.remove('active'));
            boton.classList.add('active');

            const filtro = boton.getAttribute('data-filter');

            // Mostrar/Ocultar items de la galería
            galeriaItems.forEach(item => {
                if (filtro === 'all' || item.getAttribute('data-category') === filtro) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

});