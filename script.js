// Definir el array con las imágenes del carrusel
const images = ['reloj.jpg',  'reloj1.jpeg', 'reloj2.jpg', 'reloj3.jpg', 'reloj4.jpeg', 'reloj5.jpg', 'reloj6.jpeg', 'reloj7.jpg'];
let currentIndex = 0;
let autoSlideInterval;

// Función para actualizar la imagen en el carrusel
function updateImage() {
    const imgElement = document.getElementById('carouselImage');
    const indicators = document.querySelectorAll('.indicator');

    if (imgElement) {
        imgElement.style.opacity = '0'; // Añadir transición de opacidad
        setTimeout(() => {
            imgElement.src = 'img/' + images[currentIndex];
            imgElement.style.opacity = '1';
        }, 500); // Tiempo de transición para la opacidad

        // Actualizar los indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
}

// Función para avanzar en el carrusel
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}

// Función para retroceder en el carrusel
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
}

// Función para iniciar el auto deslizamiento
function startAutoSlide() {
    autoSlideInterval = setInterval(nextImage, 3000); // Cambia la imagen cada 3 segundos
}

// Detener el auto deslizamiento cuando el usuario interactúa con los botones
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Inicializar eventos del carrusel cuando la página cargue
document.addEventListener("DOMContentLoaded", () => {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const indicators = document.querySelectorAll('.indicator');

    // Agregar eventos para los botones de navegación
    nextBtn.addEventListener('click', () => {
        stopAutoSlide(); // Detener auto deslizamiento cuando se hace clic
        nextImage();
        startAutoSlide(); // Reanudar auto deslizamiento
    });

    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevImage();
        startAutoSlide();
    });

    // Agregar eventos para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            currentIndex = index;
            updateImage();
            startAutoSlide();
        });
    });

    // Inicializar la primera imagen y comenzar el auto deslizamiento
    updateImage();
    startAutoSlide();

    
    // Menú desplegable
    document.addEventListener('DOMContentLoaded', () => { 
        const inicioLink = document.getElementById('inicio-link');
    
        inicioLink.addEventListener('click', (event) => {
            event.preventDefault(); // Evitar el comportamiento por defecto del enlace
            
            // Reiniciar la página
            window.location.href = window.location.pathname; // Recargar la página actual
        });
    });
    window.onload = function() {
        const form = document.getElementById('tuFormulario'); // Cambia 'tuFormulario' por el ID real de tu formulario
        if (form) {
            form.reset(); // Resetea los campos del formulario
        }
    };
        
    

    
    const menuButton = document.getElementById('menuButton');
    const menu = document.getElementById('menu');

    if (menuButton && menu) {
        menuButton.addEventListener('click', () => {
            menu.classList.toggle('visible');
        });
    }
    document.addEventListener('DOMContentLoaded', () => {
        const menuButton = document.getElementById('menuButton');
        const menu = document.getElementById('menu');
        const menuLinks = document.querySelectorAll('#menu a');
    
        // Mostrar/Ocultar menú al hacer clic en el botón
        menuButton.addEventListener('click', () => {
            menu.classList.toggle('visible');
        });
    
        // Ocultar el menú al hacer clic en una opción
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('visible');
            });
        });
    });
    

    // Acordeón
    const headers = document.querySelectorAll('.accordion-header');
    if (headers.length > 0) {
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                if (content) {
                    content.classList.toggle('active');
                    headers.forEach(otherHeader => {
                        if (otherHeader !== header) {
                            otherHeader.nextElementSibling.classList.remove('active');
                        }
                    });
                }
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del formulario
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const formResponse = document.getElementById('formResponse');
    const submitBtn = document.getElementById('submitBtn');

    // Mensajes de error
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');

    // Expresiones regulares
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Email válido
    const phoneRegex = /^\d{10}$/;  // Teléfono de 10 dígitos

    // Validación de campo en tiempo real
    function validateField(input, regex, errorDiv, errorMsg) {
        if (input.value.trim() === "") {
            errorDiv.textContent = "Este campo es obligatorio.";
            input.classList.add('invalid');
            input.classList.remove('valid');
            return false;
        } else if (!regex.test(input.value.trim())) {
            errorDiv.textContent = errorMsg;
            input.classList.add('invalid');
            input.classList.remove('valid');
            return false;
        } else {
            errorDiv.textContent = "";
            input.classList.remove('invalid');
            input.classList.add('valid');
            return true;
        }
    }

    // Validar todos los campos antes de permitir el envío
    function validateForm() {
        const isNameValid = validateField(nameInput, /.{3,}/, nameError, "El nombre debe tener al menos 3 caracteres.");
        const isEmailValid = validateField(emailInput, emailRegex, emailError, "Por favor, ingrese un email válido.");
        const isPhoneValid = validateField(phoneInput, phoneRegex, phoneError, "El teléfono debe tener 10 dígitos.");

        submitBtn.disabled = !(isNameValid && isEmailValid && isPhoneValid);
    }

    // Validar campos en tiempo real
    [nameInput, emailInput, phoneInput].forEach(input => {
        input.addEventListener('input', validateForm);
        input.addEventListener('blur', validateForm);
    });

    // Manejar el evento de envío del formulario
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();  // Evitar envío por defecto

        if (!submitBtn.disabled) {
            // Crear mensaje de éxito con los datos
            formResponse.innerHTML = "";  // Limpiar mensajes anteriores
            const successMessage = document.createElement('p');
            successMessage.className = 'success-message';
            successMessage.textContent = `Mensaje enviado exitosamente! Nombre: ${nameInput.value}, Email: ${emailInput.value}, Teléfono: ${phoneInput.value}`;

            // Agregar el mensaje al contenedor
            formResponse.appendChild(successMessage);

            // Resetear el formulario
            contactForm.reset();

            // Deshabilitar botón nuevamente
            submitBtn.disabled = true;
        }
    });
});
