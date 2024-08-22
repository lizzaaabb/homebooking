document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    const menu = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");

    if (menu) {
        // Toggle sidebar visibility
        menu.onclick = function() {
            sidebar.classList.toggle("show");
            console.log("Sidebar toggled:", sidebar.classList.contains("show"));
        };
    } else {
        console.error("Menu toggle button not found");
    }

    // Initialize EmailJS with your public key
    emailjs.init("yS2bsPWQQnpxgtMBL");
    console.log("EmailJS initialized");

    // Function to show custom alert
    function showCustomAlert(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'custom-alert';
        alertDiv.innerHTML = `
            <p>${message}</p>
            <button onclick="this.parentElement.style.display='none'">OK</button>
        `;
        document.body.appendChild(alertDiv);
        setTimeout(() => alertDiv.style.display = 'none', 5000); // Hide after 5 seconds
        console.log("Custom alert shown:", message);
    }

    // Add event listener for email form submission
    const emailForm = document.getElementById('email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            console.log("Email form submitted");

            // Collect email form data
            const formData = new FormData(emailForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            console.log("Collected email form data:", data);

            // Send email using EmailJS for email form
            emailjs.send("service_3qe7cdf", "template_u5wl2io", data) // Use your email template ID
                .then(function(response) {
                    console.log('Email sent successfully:', response);
                    showCustomAlert("Email sent successfully!");
                })
                .catch(function(error) {
                    console.error('Email sending failed:', error);
                    showCustomAlert("Failed to send email.");
                });
        });
    } else {
        console.error("Email form not found");
    }

   
});
