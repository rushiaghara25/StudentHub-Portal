document.addEventListener("DOMContentLoaded", function () {

    // LOGIN

    const loginForm = document.getElementById("login-form");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email =
                document.getElementById("email").value.trim();

            const password =
                document.getElementById("password").value.trim();

            const notification =
                document.getElementById("notification");

            if (email === "" || password === "") {

                notification.textContent =
                    "Please fill in all fields.";

                notification.style.display = "block";

                setTimeout(function () {
                    notification.style.display = "none";
                }, 3000);

            } else {

                notification.textContent =
                    "Login successful! Redirecting...";

                notification.style.display = "block";

                setTimeout(function () {

                    window.location.href =
                        "dashboard.html";

                }, 2000);
            }
        });
    }


    // REGISTRATION

    const registerForm =
        document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const mobile =
                document.getElementById("mobile").value.trim();

            const password =
                document.getElementById("password").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;


            // Name validation
            const nameRegex =
                /^[A-Za-z ]{2,50}$/;


            // Email validation
            const emailRegex =
                /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;


            // Indian mobile number validation
            const mobileRegex =
                /^[6-9]\d{9}$/;


            // Password validation
            const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


            if (!nameRegex.test(name)) {

                event.preventDefault();

                alert("Enter a valid name.");

                return;
            }


            if (!emailRegex.test(email)) {

                event.preventDefault();

                alert("Enter a valid email address.");

                return;
            }


            if (!mobileRegex.test(mobile)) {

                event.preventDefault();

                alert("Enter a valid 10-digit mobile number.");

                return;
            }


            if (!passwordRegex.test(password)) {

                event.preventDefault();

                alert(
                    "Password must contain at least 8 characters, " +
                    "one uppercase letter, one lowercase letter, " +
                    "one number and one special character."
                );

                return;
            }


            if (password !== confirmPassword) {

                event.preventDefault();

                alert(
                    "Password and Confirm Password do not match."
                );

                return;
            }

        });
    }


    // STUDENT JSON

    const studentName =
        document.getElementById("studentName");

    if (studentName) {

        fetch("../data/student.json")

            .then(function (response) {

                if (!response.ok) {

                    throw new Error(
                        "Student data could not be loaded."
                    );
                }

                return response.json();
            })

            .then(function (data) {

                document.getElementById("studentName").textContent =
                    data.name;

                document.getElementById("enrollment").textContent =
                    data.enrollment;

                document.getElementById("course").textContent =
                    data.course;

                document.getElementById("semester").textContent =
                    data.semester;

                document.getElementById("department").textContent =
                    data.department;
            })

            .catch(function (error) {

                console.log(
                    "Student JSON Error:",
                    error
                );
            });
    }


    // EVENT JSON

    const eventList =
        document.getElementById("eventList");

    if (eventList) {

        let events = [];

        let currentPage = 1;

        const itemsPerPage = 3;


        const search =
            document.getElementById("search");

        const filter =
            document.getElementById("filter");

        const sort =
            document.getElementById("sort");

        const previous =
            document.getElementById("previous");

        const next =
            document.getElementById("next");


        // Fetch event JSON

        fetch("../data/event.json")

            .then(function (response) {

                if (!response.ok) {

                    throw new Error(
                        "Event data could not be loaded."
                    );
                }

                return response.json();
            })

            .then(function (data) {

                events = data;

                displayEvents();
            })

            .catch(function (error) {

                console.log(
                    "Event JSON Error:",
                    error
                );

                eventList.innerHTML =
                    "<li>Unable to load events.</li>";
            });


        // DISPLAY EVENTS

        function displayEvents() {

            let searchText =
                search.value.toLowerCase();

            let filterValue =
                filter.value;

            let sortValue =
                sort.value;


            // SEARCH

            let result =
                events.filter(function (event) {

                    return event.name
                        .toLowerCase()
                        .includes(searchText);
                });


            // FILTER

            if (filterValue !== "All") {

                result =
                    result.filter(function (event) {

                        return event.category ===
                            filterValue;
                    });
            }


            // SORT

            if (sortValue === "name") {

                result.sort(function (a, b) {

                    return a.name.localeCompare(
                        b.name
                    );
                });

            } else if (sortValue === "date") {

                result.sort(function (a, b) {

                    return new Date(a.date) -
                        new Date(b.date);
                });
            }


            // PAGINATION

            const totalPages =
                Math.ceil(
                    result.length / itemsPerPage
                );


            if (
                currentPage > totalPages &&
                totalPages > 0
            ) {

                currentPage = totalPages;
            }


            if (totalPages === 0) {

                currentPage = 1;
            }


            const start =
                (currentPage - 1) *
                itemsPerPage;


            const end =
                start + itemsPerPage;


            const pageEvents =
                result.slice(start, end);


            // CLEAR EVENT LIST

            eventList.innerHTML = "";


            // DISPLAY EVENTS

            pageEvents.forEach(function (event) {

                const li =
                    document.createElement("li");


                li.innerHTML =
                    "<strong>" +
                    event.name +
                    "</strong>" +
                    " - " +
                    event.category +
                    " - " +
                    event.date +
                    " - " +
                    event.location;


                eventList.appendChild(li);
            });


            // NO EVENT FOUND

            if (pageEvents.length === 0) {

                eventList.innerHTML =
                    "<li>No events found.</li>";
            }


            // PREVIOUS BUTTON

            previous.disabled =
                currentPage === 1;


            // NEXT BUTTON

            next.disabled =
                currentPage >= totalPages ||
                totalPages === 0;
        }


        // SEARCH EVENT

        search.addEventListener(
            "input",
            function () {

                currentPage = 1;

                displayEvents();
            }
        );


        // FILTER EVENT

        filter.addEventListener(
            "change",
            function () {

                currentPage = 1;

                displayEvents();
            }
        );


        // SORT EVENT

        sort.addEventListener(
            "change",
            function () {

                currentPage = 1;

                displayEvents();
            }
        );


        // PREVIOUS PAGE

        previous.addEventListener(
            "click",
            function () {

                if (currentPage > 1) {

                    currentPage--;

                    displayEvents();
                }
            }
        );


        // NEXT PAGE

        next.addEventListener(
            "click",
            function () {

                currentPage++;

                displayEvents();
            }
        );
    }


    // FAQ

    const faqItems =
        document.querySelectorAll("details");


    faqItems.forEach(function (faq) {

        faq.addEventListener(
            "toggle",
            function () {

                if (faq.open) {

                    console.log(
                        "FAQ answer opened."
                    );


                    faqItems.forEach(
                        function (otherFaq) {

                            if (otherFaq !== faq) {

                                otherFaq.removeAttribute(
                                    "open"
                                );
                            }
                        }
                    );
                }
            }
        );
    });


    // NOTIFICATION

    const notificationButton =
        document.getElementById(
            "notificationButton"
        );


    const notification =
        document.getElementById(
            "notification"
        );


    const closeNotification =
        document.getElementById(
            "closeNotification"
        );


    if (
        notificationButton &&
        notification
    ) {

        notificationButton.addEventListener(
            "click",
            function () {

                notification.style.display =
                    "block";
            }
        );
    }


    if (
        closeNotification &&
        notification
    ) {

        closeNotification.addEventListener(
            "click",
            function () {

                notification.style.display =
                    "none";
            }
        );
    }


    // HAMBURGER MENU

    const menuButton =
        document.getElementById(
            "menuButton"
        );


    const menu =
        document.getElementById(
            "menu"
        );


    if (
        menuButton &&
        menu
    ) {

        menuButton.addEventListener(
            "click",
            function () {

                menu.classList.toggle(
                    "show-menu"
                );
            }
        );
    }


    // DARK MODE

    const themeButton =
        document.getElementById(
            "themeButton"
        );


    if (themeButton) {

        themeButton.addEventListener(
            "click",
            function () {

                document.body.classList.toggle(
                    "dark-mode"
                );


                if (
                    document.body.classList.contains(
                        "dark-mode"
                    )
                ) {

                    themeButton.textContent =
                        "Light Mode";

                    localStorage.setItem(
                        "theme",
                        "dark"
                    );

                } else {

                    themeButton.textContent =
                        "Dark Mode";

                    localStorage.setItem(
                        "theme",
                        "light"
                    );
                }
            }
        );

        // Load saved theme

        const savedTheme =
            localStorage.getItem(
                "theme"
            );


        if (savedTheme === "dark") {

            document.body.classList.add(
                "dark-mode"
            );

            themeButton.textContent =
                "Light Mode";
        }
    }

});