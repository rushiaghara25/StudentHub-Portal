

document.addEventListener("DOMContentLoaded", function () {

    //     LOGIN FORM - EVENT HANDLING

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function () {

            alert("Login successful. Welcome to StudentHub!");

        });

    }


    //    COLLAPSIBLE FAQ

    const faqItems = document.querySelectorAll("details");

    faqItems.forEach(function (faq) {

        faq.addEventListener("toggle", function () {

            if (faq.open) {
                console.log("FAQ answer opened.");
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