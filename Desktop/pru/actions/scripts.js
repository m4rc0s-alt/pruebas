// scripts.js

// Variables de precios (se inicializan al cargar el DOM)
let precio1, precio2, precio3;

// --- Función para el menú desplegable (toggleMenu) ---
function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    // Alternar la visibilidad del menú
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// --- Funciones de "Ver más" y "Ver menos" (para planes) ---
function verMas(plan) {
    let descripcion;
    if (plan === 1) {
        descripcion = "Este plan de 40MB es ideal para navegar por internet y realizar tareas ligeras como revisar correos y redes sociales.";
    } else if (plan === 2) {
        descripcion = "El plan de 90MB es perfecto para streaming en calidad HD, videollamadas y descargas moderadas.";
    } else if (plan === 3) {
        descripcion = "Con 300MB, tendrás una conexión ultra rápida, ideal para trabajar desde casa, jugar en línea y ver contenido en 4K sin interrupciones.";
    }
    document.getElementById(`plan${plan}-description`).innerText = descripcion;
    document.querySelector(`#plan${plan} button:not(.btn-ver-menos)`).style.display = 'none'; // Selecciona el botón "Ver más"
    document.querySelector(`#plan${plan} .btn-ver-menos`).style.display = 'inline-block';
}

function verMenos(plan) {
    let descripcionInicial;
    if (plan === 1) {
        descripcionInicial = precio1;
    } else if (plan === 2) {
        descripcionInicial = precio2;
    } else if (plan === 3) {
        descripcionInicial = precio3;
    }
    document.getElementById(`plan${plan}-description`).innerText = descripcionInicial;
    document.querySelector(`#plan${plan} button:not(.btn-ver-menos)`).style.display = 'inline-block'; // Muestra el botón "Ver más"
    document.querySelector(`#plan${plan} .btn-ver-menos`).style.display = 'none';
}

function suscribir(planId) {
    alert('¡Te has suscrito al Plan ' + planId + '!');
}

// --- Funciones de Google Maps ---
let map;
let marker;

function initMap() {
    const centro = { lat: -34.6266, lng: -59.4064 }; // Chacabuco por defecto
    map = new google.maps.Map(document.getElementById('map'), {
        center: centro,
        zoom: 12
    });
    marker = new google.maps.Marker({
        position: centro,
        map: map,
        title: "Tu Ubicación"
    });
}

function actualizarMapa(ciudad) {
    let ubicacion;
    switch(ciudad) {
        case 'chacabuco': ubicacion = { lat: -34.6266, lng: -59.4064 }; break;
        case 'chivilcoy': ubicacion = { lat: -35.0805, lng: -60.0163 }; break; // Agregué Chivilcoy (ejemplo)
        case 'irala': ubicacion = { lat: -34.8087, lng: -60.1064 }; break; // Agregué Irala (ejemplo)
        case 'ines_indart': ubicacion = { lat: -34.7088, lng: -60.5283 }; break; // Agregué Inés Indart (ejemplo)
        case 'ohiggins': ubicacion = { lat: -34.6853, lng: -60.2764 }; break; // Agregué O'Higgins (ejemplo)
        case 'coronel_mom': ubicacion = { lat: -34.8392, lng: -59.8829 }; break; // Agregué Coronel Mom (ejemplo)
        case 'segui': ubicacion = { lat: -34.9080, lng: -59.7214 }; break; // Agregué Seguí (ejemplo)
        case 'alberti': ubicacion = { lat: -35.0336, lng: -60.4077 }; break; // Agregué Alberti (ejemplo)
        case 'buenos-aires': ubicacion = { lat: -34.6037, lng: -58.3816 }; break;
        case 'cordoba': ubicacion = { lat: -31.4201, lng: -64.1888 }; break;
        case 'rosario': ubicacion = { lat: -32.9468, lng: -60.6393 }; break;
        default: ubicacion = { lat: -34.6266, lng: -59.4064 };
    }
    if (map) { // Asegura que el mapa ya esté inicializado
        map.setCenter(ubicacion);
        marker.setPosition(ubicacion);
    }
}

function guardarDireccion() {
    const direccion = document.getElementById('direccion').value;
    if (direccion) {
        alert("Dirección guardada: " + direccion);
    } else {
        alert("Por favor, ingresa una dirección.");
    }
}

// --- Lazy Loading de imágenes (si tienes imágenes con clase 'lazy-load') ---
function lazyLoadImages() {
    const images = document.querySelectorAll('img.lazy-load');
    const config = {
        rootMargin: '50px 0px',
        threshold: 0.01
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazy-load');
                observer.unobserve(img);
            }
        });
    }, config);
    images.forEach(image => {
        observer.observe(image);
    });
}

// --- Funciones de mostrar planes por tipo de conexión (relevante para PlanesF.html) ---
function mostrarPlanes(tipoConexion) {
    const plan1 = document.getElementById('plan1');
    const plan2 = document.getElementById('plan2');
    const plan3 = document.getElementById('plan3');

    // Solo ejecuta si los elementos de planes existen (para evitar errores en index.html)
    if (plan1 && plan2 && plan3) {
        if (tipoConexion === 'antena') {
            plan1.style.display = 'block';
            plan2.style.display = 'none';
            plan3.style.display = 'none';
        } else if (tipoConexion === 'fibra') {
            plan1.style.display = 'block';
            plan2.style.display = 'block';
            plan3.style.display = 'block';
        }
    }
}

// --- Gestión de eventos de carga y scroll ---
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar precios DESPUÉS de que el DOM esté cargado
    // Estas líneas solo se ejecutarán si los elementos existen (en PlanesF.html)
    const plan1Desc = document.querySelector("#plan1-description");
    const plan2Desc = document.querySelector("#plan2-description");
    const plan3Desc = document.querySelector("#plan3-description");

    if (plan1Desc) precio1 = plan1Desc.innerText;
    if (plan2Desc) precio2 = plan2Desc.innerText;
    if (plan3Desc) precio3 = plan3Desc.innerText;

    // Inicializar el Lazy Loading (siempre que se use)
    lazyLoadImages();

    // Event listener para el selector de ciudad (para index.html)
    const ciudadSelect = document.getElementById('ciudad');
    if (ciudadSelect) {
        ciudadSelect.addEventListener('change', (event) => {
            actualizarMapa(event.target.value);
        });
    }

    // Event listener para el selector de conexión (para PlanesF.html)
    const conexionSelect = document.getElementById('conexion');
    if (conexionSelect) {
        conexionSelect.addEventListener('change', (event) => {
            mostrarPlanes(event.target.value);
        });
        // Llama a mostrarPlanes al cargar la página si el selector de conexión existe
        mostrarPlanes(conexionSelect.value);
    }
});


// Oculta la navbar al bajar, la muestra al subir (en toda la página, móvil o PC)
let lastScrollTop = 0;
let navbar = document.querySelector('.navbar');

// Asegúrate de que el navbar exista antes de añadir el listener de scroll
if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Si el usuario está bajando Y ha scrollado más de 50px
        if (currentScroll > lastScrollTop && currentScroll > 50) {
            navbar.style.top = '-100px'; // O la altura real de tu navbar
        } else {
            // Subiendo, o si está en la parte superior de la página
            navbar.style.top = '0';
        }

        // Actualiza la última posición de scroll
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
} else {
    console.warn("Elemento con clase 'navbar' no encontrado. La funcionalidad de ocultar/mostrar no funcionará.");
}

// Nota: initMap es llamado por la API de Google Maps (ver script en HTML)
// google.maps.event.addDomListener(window, 'load', initMap); // No es necesario si usas el callback en el script de GMaps