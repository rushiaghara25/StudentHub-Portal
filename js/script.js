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


        if (!nameRegex.test(name)) {

            alert("Enter a valid name.");

            return;
        }

        if (!emailRegex.test(email)) {

            alert("Enter a valid email address.");

            return;
        }

        if (!mobileRegex.test(mobile)) {

            alert("Enter a valid 10-digit mobile number.");

            return;
        }

        if (!passwordRegex.test(password)) {

            alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.");

            return;
        }

        if (password !== confirmPassword) {

            alert("Password and Confirm Password do not match.");

            return;
        }

        alert("Registration successful! Please login to continue.");

        window.location.href = "login.php";

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


        //   HAMBURGER MENU

    const menuButton = document.getElementById("menuButton");
    const menu = document.getElementById("menu");

    if (menuButton && menu) {

        menuButton.addEventListener("click", function () {

            menu.classList.toggle("show-menu");

        });

    }


        //   LIGHT / DARK THEME SWITCHER

    const themeButton =
        document.getElementById("themeButton");

    if (themeButton) {

        themeButton.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {

                themeButton.textContent = "Light Mode";

                localStorage.setItem("theme", "dark");

            } else {

                themeButton.textContent = "Dark Mode";

                localStorage.setItem("theme", "light");

            }

        });

    }
});



        //  JSON    

    fetch("../data/student.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            document.getElementById("studentName").textContent = data.name;
            document.getElementById("enrollment").textContent = data.enrollment;
            document.getElementById("course").textContent = data.course;
            document.getElementById("semester").textContent = data.semester;
            document.getElementById("department").textContent = data.department;

        })
        .catch(function(error) {

            console.log("Error loading JSON:", error);

        });


        // EVENT LIST

    let events = [];
    let currentPage = 1;
    let itemsPerPage = 3;

    fetch("../data/event.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            events = data;
            displayEvents();
        })
        .catch(function(error) {
            console.log("Error loading events:", error);
        });


    function displayEvents() {

        let search = document.getElementById("search").value.toLowerCase();
        let filter = document.getElementById("filter").value;
        let sort = document.getElementById("sort").value;

        let result = events.filter(function(event) {

            let matchesSearch =
                event.name.toLowerCase().includes(search);

            let matchesFilter =
                filter === "All" || event.category === filter;

            return matchesSearch && matchesFilter;
        });


        result.sort(function(a, b) {

            if (sort === "asc") {
                return new Date(a.date) - new Date(b.date);
            } else {
                return new Date(b.date) - new Date(a.date);
            }

        });


        let start = (currentPage - 1) * itemsPerPage;
        let end = start + itemsPerPage;

        let pageEvents = result.slice(start, end);

        let list = document.getElementById("eventList");

        list.innerHTML = "";


        pageEvents.forEach(function(event) {

            let li = document.createElement("li");

            li.innerHTML =
                "<strong>" + event.name + "</strong><br>" +
                "Category: " + event.category + "<br>" +
                "Date: " + event.date + "<br>" +
                "Location: " + event.location;

            list.appendChild(li);

        });
    }


    document.getElementById("search").addEventListener("input", function() {
        currentPage = 1;
        displayEvents();
    });


    document.getElementById("filter").addEventListener("change", function() {
        currentPage = 1;
        displayEvents();
    });


    document.getElementById("sort").addEventListener("change", function() {
        displayEvents();
    });


    document.getElementById("next").addEventListener("click", function() {

        let totalPages =
            Math.ceil(events.length / itemsPerPage);

        if (currentPage < totalPages) {
            currentPage++;
            displayEvents();
        }

    });


    document.getElementById("previous").addEventListener("click", function() {

        if (currentPage > 1) {
            currentPage--;
            displayEvents();
        }

    });