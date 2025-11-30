 # Eivind Leso - Portafolio Fotografía Comercial

 Este repositorio contiene el código fuente del sitio web profesional de **Eivind Leso**, 
 enfocado en fotografía comercial, editorial, de producto y retrato.

 El sitio está construido con **Vanilla JavaScript** (sin frameworks), priorizando el 
 rendimiento (WPO), la semántica SEO y una experiencia de usuario fluida mediante 
 cargas asíncronas y manipulación optimizada del DOM.

 ---

 ## 🚀 Características Técnicas

 ### 1. Rendimiento y Optimización (WPO)
 - **Carga Diferida (Lazy Loading):** Implementado nativamente en imágenes y iframes.
 - **DocumentFragment:** El script de carga de galería utiliza fragmentos de memoria para 
   insertar elementos en el DOM en un solo "reflow", mejorando drásticamente el rendimiento 
   al renderizar múltiples imágenes.
 - **Content Visibility:** Uso de `content-visibility: auto` en secciones inferiores (About/Contacto) 
   para mejorar el tiempo de carga inicial.
 - **Responsive Images:** Uso de la etiqueta `<picture>` en el carrusel principal para servir 
   imágenes de distinto tamaño según el dispositivo (Móvil vs Desktop).

 ### 2. Interfaz de Usuario (UI/UX)
 - **Sistema de Filtrado:** Galería dinámica que filtra por categorías (Retrato, Moda, Producto, etc.) 
   sin recargar la página.
 - **Carrusel Héroe:** Slider principal con transición de desvanecimiento (Fade) y cambio automático.
 - **Lightbox Personalizado:** Visor de imágenes a pantalla completa con navegación por teclado y botones.

 ### 3. Video
 - **Carrusel de Video Táctil:** Implementación personalizada de swipe (`touchstart`, `touchend`) 
   para navegar entre videos en dispositivos móviles.
 - **Gestión de Iframes:** El script detiene la reproducción de los videos automáticamente 
   cuando el usuario cambia de filtro o navega.

 ---

 ## 🛠️ Tecnologías Utilizadas

 - **HTML5:** Semántico y accesible.
 - **CSS3:** Variables CSS (`:root`), Flexbox, CSS Grid y Media Queries.
 - **JavaScript (ES6+):** Lógica modular, Async/Await para carga de recursos y Event Listeners pasivos.
 - **FontAwesome:** Iconografía vectorial.

 ---

 ## 📂 Estructura del Proyecto

 ```bash
 .
 ├── index.html           # Estructura principal
 ├── assets/
 │   ├── css/
 │   │   └── style.css    # Estilos globales y responsivos
 │   ├── js/
 │   │   └── script.js    # Lógica de galería, filtros y carruseles
 │   └── img/
 │       ├── carrusel/    # Imágenes del slider principal
 │       ├── trabajo/     # Imágenes de la galería (nombradas por categoría)
 │       └── general/     # Logos y assets estáticos
 │
 └── README.md            # Documentación
 ```

 ---

 ## 🔧 Configuración y Personalización

 ### 1. Formulario de Contacto
 El formulario utiliza **Formspree**. Para conectarlo a tu correo:
 1. Ve a `index.html`.
 2. Busca la etiqueta `<form action="...">`.
 3. Reemplaza la URL `https://formspree.io/f/xovknlbb` con tu propio "endpoint" de Formspree.

 ### 2. Añadir Imágenes a la Galería
 No es necesario tocar el HTML para cada foto.
 1. Sube tus fotos a `assets/img/trabajo/`.
 2. Nómbralas siguiendo el patrón: `categoriaNumero.jpg` (ej. `retrato1.jpg`, `moda3.jpg`).
 3. Abre `assets/js/script.js` y actualiza el objeto `configuracionImagenes`:
    ```javascript
    const configuracionImagenes = {
        'retrato': 15, // Cantidad de fotos que tienes
        'moda': 6,
        // ...
    };
    ```

 ---

 ## ✒️ Autor

 **Eivind Leso**
 - *Fotografía Comercial & IA Engineering*
 - [Instagram](https://www.instagram.com/eivindleso)
 - [YouTube](https://www.youtube.com/@eivindleso)

 ---

 ## 📄 Licencia

 Todos los derechos reservados sobre las imágenes mostradas en este portafolio.
 El código fuente puede ser utilizado con fines educativos.