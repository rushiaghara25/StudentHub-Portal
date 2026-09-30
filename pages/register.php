<?php

/* Registration */

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $mobile = trim($_POST["mobile"]);
    $password = $_POST["password"];
    $confirmPassword = $_POST["confirmPassword"];

    /* Validation */

    if (
        empty($name) ||
        empty($email) ||
        empty($mobile) ||
        empty($password) ||
        empty($confirmPassword)
    ) {
        die("Please fill all fields.");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email address.");
    }

    if (!preg_match("/^[6-9][0-9]{9}$/", $mobile)) {
        die("Invalid mobile number.");
    }

    if (strlen($password) < 8) {
        die("Password must contain at least 8 characters.");
    }

    if ($password !== $confirmPassword) {
        die("Passwords do not match.");
    }


    /* CSV File */

    $file = "../data/registrations.csv";

    $handle = fopen($file, "a");

    if ($handle === false) {
        die("Unable to open CSV file.");
    }


    /* Store Data */

    fputcsv(
        $handle,
        [$name, $email, $mobile, $password]
    );


    fclose($handle);


    /* Redirect */

    header("Location: login.html");
    exit();
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>StudentHub Registration</title>

    <link rel="stylesheet" href="../CSS/style.css">
</head>

<body>

<h1>Student Registration</h1>

<p>
    Create your StudentHub account to access student services.
</p>

<form id="registerForm" method="POST" action="register.php">

    <label>Name:</label>
    <input type="text" id="name" name="name" required>

    <label>Email:</label>
    <input type="email" id="email" name="email" required>

    <label>Mobile:</label>
    <input type="text" id="mobile" name="mobile" required>

    <label>Password:</label>
    <input type="password" id="password" name="password" required>

    <label>Confirm Password:</label>
    <input type="password" id="confirmPassword" name="confirmPassword" required>

    <input type="submit" value="Register">
    <input type="reset" value="Clear">

</form>

<script src="../js/script.js"></script>

<p>
    Already registered?
    <a href="login.html">Login</a>
</p>

<p>
    <a href="../index.html">Back to StudentHub</a>
</p>

</body>
</html>