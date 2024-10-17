
const images = ['reloj.jpg',  'reloj1.jpeg', 'reloj2.jpg', 'reloj3.jpg', 'reloj4.jpeg', 'reloj5.jpg', 'reloj6.jpeg', 'reloj7.jpg'];
let currentIndex = 0;
let autoSlideInterval;


function updateImage() {
    const imgElement = document.getElementById('carouselImage');
    const indicators = document.querySelectorAll('.indicator');

    if (imgElement) {
        imgElement.style.opacity = '0'; 
        setTimeout(() => {
            imgElement.src = 'img/' + images[currentIndex];
            imgElement.style.opacity = '1';
        }, 500); 

       
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
}


function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}


function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
}


function startAutoSlide() {
    autoSlideInterval = setInterval(nextImage, 3000); 
}


function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}


document.addEventListener("DOMContentLoaded", () => {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const indicators = document.querySelectorAll('.indicator');

    
    nextBtn.addEventListener('click', () => {
        stopAutoSlide(); 
        nextImage();
        startAutoSlide(); 
    });

    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevImage();
        startAutoSlide();
    });

   
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            currentIndex = index;
            updateImage();
            startAutoSlide();
        });
    });

    
    updateImage();
    startAutoSlide();

    
    
    document.addEventListener('DOMContentLoaded', () => { 
        const inicioLink = document.getElementById('inicio-link');
    
        inicioLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            
         
            window.location.href = window.location.pathname; 
        });
    });
    window.onload = function() {
        const form = document.getElementById('tuFormulario'); 
        if (form) {
            form.reset(); 
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
    
     n
        menuButton.addEventListener('click', () => {
            menu.classList.toggle('visible');
        });
    
       
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('visible');
            });
        });
    });
    

    
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
    
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const formResponse = document.getElementById('formResponse');
    const submitBtn = document.getElementById('submitBtn');

   
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    const phoneRegex = /^\d{10}$/;  
    
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

    
    function validateForm() {
        const isNameValid = validateField(nameInput, /.{3,}/, nameError, "El nombre debe tener al menos 3 caracteres.");
        const isEmailValid = validateField(emailInput, emailRegex, emailError, "Por favor, ingrese un email válido.");
        const isPhoneValid = validateField(phoneInput, phoneRegex, phoneError, "El teléfono debe tener 10 dígitos.");

        submitBtn.disabled = !(isNameValid && isEmailValid && isPhoneValid);
    }

   
    [nameInput, emailInput, phoneInput].forEach(input => {
        input.addEventListener('input', validateForm);
        input.addEventListener('blur', validateForm);
    });

   
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();  

        if (!submitBtn.disabled) {
            
            formResponse.innerHTML = "";  
            const successMessage = document.createElement('p');
            successMessage.className = 'success-message';
            successMessage.textContent = `Mensaje enviado exitosamente! Nombre: ${nameInput.value}, Email: ${emailInput.value}, Teléfono: ${phoneInput.value}`;

            
            formResponse.appendChild(successMessage);

            
            contactForm.reset();

       
            submitBtn.disabled = true;
        }
    });
});
