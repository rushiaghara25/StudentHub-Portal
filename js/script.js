

document.addEventListener("DOMContentLoaded", function () {

    //     LOGIN FORM - EVENT HANDLING
    // login validation

let login = document.getElementById("login-form");
if (login) {
    login.addEventListener("submit", function(event) {

        event.preventDefault();

        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();

        let notification = document.getElementById("notification");

        if (email === "" || password === "") {

            notification.textContent = "Please fill in all fields.";

            notification.style.display = "block";

            setTimeout(function() {
                notification.style.display = "none";
            }, 3000);

        } else {

            notification.textContent = "Login successful! Redirecting...";

            notification.style.display = "block";

            setTimeout(function() {
                window.location.href = "dashboard.html";
            }, 2000);

        }
    });
}

     // Registration validation

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Regular expressions
        const nameRegex = /^[A-Za-z ]{2,50}$/;

        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        
        const mobileRegex = /^[6-9]\d{9}$/;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


        // Name validation
        if (!nameRegex.test(name)) {

            alert("Enter a valid name.");

            return;
        }


        // Email validation
        if (!emailRegex.test(email)) {

            alert("Enter a valid email address.");

            return;
        }


        // Mobile validation
        if (!mobileRegex.test(mobile)) {

            alert("Enter a valid 10-digit mobile number.");

            return;
        }


        // Password validation
        if (!passwordRegex.test(password)) {

            alert(
                "Password must contain at least 8 characters, " +
                "one uppercase letter, one lowercase letter, " +
                "one number and one special character."
            );

            return;
        }


        // Confirm password validation
        if (password !== confirmPassword) {

            alert("Password and Confirm Password do not match.");

            return;
        }


        // Registration successful
        alert("Registration successful! Please login to continue.");

        window.location.href = "login.html";

    });

}


    // COLLAPSIBLE FAQ

    const faqItems = document.querySelectorAll("details");

    faqItems.forEach(function (faq) {

        faq.addEventListener("toggle", function () {

            if (faq.open) {

                console.log("FAQ answer opened.");

                faqItems.forEach(function (otherFaq) {

                    if (otherFaq !== faq) {
                        otherFaq.removeAttribute("open");
                    }

                });

            }

        });

    });


    //     NOTIFICATION BANNER

    const notificationButton =
        document.getElementById("notificationButton");

    const notification =
        document.getElementById("notification");

    const closeNotification =
        document.getElementById("closeNotification");

    if (notificationButton && notification) {

        notificationButton.addEventListener("click", function () {

            notification.style.display = "block";

        });

    }

    if (closeNotification && notification) {

        closeNotification.addEventListener("click", function () {

            notification.style.display = "none";

        });

    }
});