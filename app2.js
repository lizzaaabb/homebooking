document.addEventListener('DOMContentLoaded', function() {
    const menu = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");

    // Toggle sidebar visibility
    menu.onclick = function() {
        sidebar.classList.toggle("show");
    };

    // Initialize EmailJS with your public key
    emailjs.init("yS2bsPWQQnpxgtMBL");

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
    }

    // Add event listener for booking form submission
    const bookingForm = document.getElementById('form1');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Collect form data
            const formData = new FormData(bookingForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Send email using EmailJS for booking
            emailjs.send("service_3qe7cdf", "template_ll1041d", data)
                .then(function(response) {
                    console.log('Booking email sent successfully:', response);
                    showCustomAlert("Booking confirmed!");
                })
                .catch(function(error) {
                    console.error('Booking email failed:', error);
                    showCustomAlert("Failed to confirm booking.");
                });
        });
    }

    // Add event listener for email form submission
    const emailForm = document.getElementById('email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Collect email form data
            const formData = new FormData(emailForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

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
    }

    // Initialize Pikaday for date inputs
    const pickerCheckIn = new Pikaday({
        field: document.getElementById('checkIn'),
        format: 'YYYY-MM-DD',
        minDate: new Date(), // Prevent past dates
        onSelect: function(date) {
            // Update check-out minDate when check-in is selected
            pickerCheckOut.setMinDate(date);
        }
    });

    const pickerCheckOut = new Pikaday({
        field: document.getElementById('checkOut'),
        format: 'YYYY-MM-DD',
        minDate: new Date(), // Prevent past dates
        maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) // Allow dates up to 1 year in the future
    });

    // Update check-out maxDate when check-in is selected
    pickerCheckIn.on('change', function(date) {
        pickerCheckOut.setMinDate(date);
        pickerCheckOut.setMaxDate(new Date(date.getFullYear() + 1, date.getMonth(), date.getDate()));
    });

    // Prevent default behavior on touchstart to hide the virtual keyboard
    function preventKeyboard(event) {
        event.preventDefault();
    }

    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener('touchstart', preventKeyboard, { passive: false });
    });

    // Set readonly attribute to prevent direct input
    document.getElementById('checkIn').setAttribute('readonly', true);
    document.getElementById('checkOut').setAttribute('readonly', true);
});
