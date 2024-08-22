const menu = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const slides = document.querySelectorAll(".sliderimg");
let slideIndex = 0;
let intervalId = null;

menu.onclick = function(){
    sidebar.classList.toggle("show");

    if (sidebar.classList.contains("show")) {
        // Hide slideshow with animation
        slideshow.classList.add("slide-out");
        slideshow.classList.remove("slide-in");
    } else {
        // Show slideshow with animation
        slideshow.classList.remove("slide-out");
        slideshow.classList.add("slide-in");
    }
}

const galleryImages = [
    'pics/inter1.jpg',
    'pics/inter2.jpg',
    'pics/inter3.jpg',
    'pics/inter4.jpg',
    'pics/inter5.jpg'
];

galleryImages.forEach((imageSrc) => {
    const img = new Image();
    img.src = imageSrc;
});

initializeSlider();

function initializeSlider(){
    slides[slideIndex].classList.add("displaySlide");
    //intervalId = setInterval(nextSlide, 5000);
}

function showSlide(index){
    if(index >= slides.length){
        slideIndex = 0;
    }else if(index < 0){
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide =>{
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");
}

function prevSlide(){
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide(){
    slideIndex++;
    showSlide(slideIndex);
}

// Initialize EmailJS with your public key
emailjs.init("yS2bsPWQQnpxgtMBL");

function showAlert(message, isSuccess = true) {
    let alertContainer = document.getElementById('custom-alert-container');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'custom-alert-container';
        document.body.appendChild(alertContainer);
    }

    const alertBox = document.createElement('div');
    alertBox.className = 'custom-alert';
    alertBox.innerHTML = `
        <p>${message}</p>
        <button onclick="this.parentElement.remove()">OK</button>
    `;

    if (isSuccess) {
        alertBox.style.color = '#2c6f41'; // Success message color
    } else {
        alertBox.style.color = '#ff4d4d'; // Error message color
    }

    alertContainer.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 5000);
}

function sendEmail(event) {
    event.preventDefault(); // Prevent default form submission

    emailjs.send("service_9kz5hgn", "template_u5wl2io", {
        message: document.querySelector('input[name="email"]').value // Use the email input as the message
    }).then(function() {
        console.log("Email sent successfully");
        showAlert("Email sent successfully!"); // Show success alert
    }).catch(function(error) {
        console.error("Failed to send email", error);
        showAlert("Failed to send email. Please try again.", false); // Show error alert
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('email-form');
    if (form) {
        form.addEventListener('submit', sendEmail);
    } else {
        console.error('Form element not found');
    }

    AOS.init({
        duration: 1000, // Duration of the animation in milliseconds
        easing: 'ease-in-out', // Easing function
        once: true
    });
});
