# Portafolio Fotográfico de Eivind Leso (v1.0)

[![Deploy with Vercel](https://vercel.com/button)](https://eivindleso.vercel.app/)

Repositorio del portafolio web personal de Eivind Leso, fotógrafo. Este proyecto es una Single Page Application (SPA) estática, construida con HTML, CSS y JavaScript puro (Vanilla JS), diseñada para ser ligera, rápida y completamente responsiva.

**➡️ Visita el sitio en vivo: [eivindleso.vercel.app](https://eivindleso.vercel.app/)**

---

## 📸 Captura de Pantalla

![Captura de pantalla del portafolio de Eivind Leso](./screenshot.png)

*(Para agregar tu propia captura de pantalla, simplemente toma una foto de tu sitio, nombra el archivo `screenshot.png` y súbelo a la raíz de tu repositorio en GitHub).*

---

## 📂 Estructura del Proyecto

El proyecto sigue una estructura de archivos clara y organizada para separar las responsabilidades del código.

EivindLeso/
├── 📄 index.html         # Archivo principal de la estructura DOM
├── 📁 css/
│   └── 📄 style.css     # Hoja de estilos principal
├── 📁 js/
│   └── 📄 script.js      # Lógica de interactividad y manipulación del DOM
├── 📁 img/
│   ├── 📁 carrusel/      # Imágenes para el carrusel de inicio
│   ├── 📁 trabajo/       # Imágenes para la galería del portafolio
│   └── 📄 logo2.png
│   └── 📄 mi-foto.jpg
└── 📄 README.md          # Documentación del proyecto

## 💡 Arquitectura y Decisiones Técnicas

### JavaScript (Vanilla JS)
Se optó por JavaScript puro para mantener el proyecto sin dependencias, asegurando un tiempo de carga mínimo y un control total sobre la interactividad. La lógica principal se encuentra en `js/script.js` y se ejecuta tras el evento `DOMContentLoaded`.

**Funciones Clave:**
* **Filtrado de la Galería:**
    * Utiliza `eventListeners` en los botones de filtro (`.filtro-btn`).
    * Manipula la propiedad `display` de los elementos (`.galeria-item`) basándose en el atributo `data-category` para mostrar u ocultar contenido dinámicamente.
* **Lightbox (Visor de Imágenes):**
    * Captura los clics en las imágenes de la galería.
    * Abre un modal (`#lightbox`) y actualiza dinámicamente el `src` del `<img>` contenido.
    * Gestiona un array (`currentImages`) con las imágenes de la categoría activa para permitir la navegación (anterior/siguiente) sin cerrar el visor.
* **Carrusel de Inicio:**
    * Controla un carrusel con animación de fundido a negro.
    * Utiliza `setTimeout` y clases CSS (`.active`, `.transitioning`) para orquestar el desvanecimiento de la imagen actual antes de mostrar la siguiente, creando una transición suave.
    * Incluye un `setInterval` (`autoSlideInterval`) para la reproducción automática, que se reinicia con la interacción del usuario.

### CSS
La hoja de estilos `css/style.css` está estructurada de forma modular y utiliza características modernas de CSS para un diseño eficiente y mantenible.
* **Variables CSS (`:root`):** Se utilizan para gestionar la paleta de colores global y las fuentes, permitiendo cambios de tema rápidos y consistentes.
* **Layout Moderno:** El diseño se basa principalmente en **CSS Flexbox** (para la alineación de componentes como el header y la sección de contacto) y **CSS Grid** (para la galería de imágenes), asegurando una estructura robusta y responsiva.
* **Animaciones:** Las transiciones y animaciones (`@keyframes`) se utilizan para mejorar la experiencia de usuario, como en el efecto de "zoom" del lightbox y el fundido del carrusel.

### Manejo de Formularios
El backend del formulario de contacto se delega al servicio externo **Formspree**. El `action` del formulario apunta al endpoint de Formspree, que procesa los datos y los envía al correo electrónico designado, evitando la necesidad de un backend propio.

---

## 🚀 Despliegue y Flujo de Trabajo (CI/CD)

El sitio está desplegado en **Vercel**, integrado directamente con este repositorio de GitHub.
* **Despliegue Continuo:** Cualquier `git push` a la rama `main` activa automáticamente un nuevo despliegue en Vercel.
* **Atomic Deployments:** Vercel garantiza cero tiempo de inactividad. La nueva versión del sitio se construye en segundo plano y solo se activa cuando está lista, asegurando que los usuarios nunca vean un sitio roto.
* **Preview Deployments:** Los pushes a otras ramas generan URLs de vista previa para probar los cambios en un entorno de producción antes de fusionarlos a la rama principal.

---

## 🔧 Cómo Ejecutar el Proyecto Localmente

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/Mind0T/EivindLeso.git](https://github.com/Mind0T/EivindLeso.git)
    ```
2.  **Navega al directorio:**
    ```bash
    cd EivindLeso
    ```
3.  **Inicia un servidor local:**
    * La forma más sencilla es abrir `index.html` en tu navegador.
    * Para una mejor experiencia (con recarga en vivo), se recomienda usar la extensión **Live Server** en Visual Studio Code.

---

## 🔮 Posibles Mejoras a Futuro

* **Lazy Loading:** Implementar carga diferida (lazy loading) para las imágenes de la galería para optimizar el tiempo de carga inicial.
* **Modularización de JS:** Refactorizar el archivo `script.js` en módulos ES6 para una mejor organización y mantenibilidad.
* **Animaciones en Scroll:** Añadir animaciones sutiles que se activen al hacer scroll para mejorar la dinámica de la página.
* **Integración con un CMS Headless:** Conectar la galería a un CMS como Contentful o Sanity para poder añadir o modificar fotos sin tener que tocar el código.

---

## 👤 Autor

* **Irving Soriano**
* **GitHub:** [@Mind0T](https://github.com/Mind0T)
* **LinkedIn:** [Irving Soriano](https://www.linkedin.com/in/irving-soriano/)