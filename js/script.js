document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function () {

            alert("Login successful. Welcome to StudentHub!");

        });

    }})