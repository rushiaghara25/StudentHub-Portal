<?php

/* Process Registration */

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = trim($_POST["name"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $mobile = trim($_POST["mobile"] ?? "");
    $password = $_POST["password"] ?? "";
    $confirmPassword = $_POST["confirmPassword"] ?? "";

    /* Validate Name */

    if (!preg_match("/^[A-Za-z ]{2,50}$/", $name)) {
        die("Invalid name.");
    }

    /* Validate Email */

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email address.");
    }

    /* Validate Mobile */

    if (!preg_match("/^[6-9][0-9]{9}$/", $mobile)) {
        die("Invalid mobile number.");
    }

    /* Validate Password */

    if (!preg_match(
        "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/",
        $password
    )) {
        die("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.");
    }

    /* Confirm Password */

    if ($password !== $confirmPassword) {
        die("Passwords do not match.");
    }

    /* Connect MySQL */

    include "../php/db.php";

    /* Hash Password */

    $hashedPassword = password_hash(
        $password,
        PASSWORD_DEFAULT
    );

    /* Insert into MySQL */

    $sql = "INSERT INTO registrations
            (name, email, mobile, password)
            VALUES (?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Database error: " . $conn->error);
    }

    $stmt->bind_param(
        "ssss",
        $name,
        $email,
        $mobile,
        $hashedPassword
    );

    if (!$stmt->execute()) {

        if ($stmt->errno == 1062) {
            die("Email already registered.");
        }

        die("Registration failed: " . $stmt->error);
    }

    $stmt->close();

    /* Save into CSV */

    $file = __DIR__ .
        DIRECTORY_SEPARATOR . ".." .
        DIRECTORY_SEPARATOR . "data" .
        DIRECTORY_SEPARATOR . "registrations.csv";

    $fileExists = file_exists($file);

    $handle = fopen($file, "a");

    if ($handle === false) {
        die("Unable to open CSV file.");
    }

    if (!$fileExists) {
        fputcsv(
            $handle,
            ["Name", "Email", "Mobile", "Password", "Date"]
        );
    }

    fputcsv(
        $handle,
        [
            $name,
            $email,
            $mobile,
            $hashedPassword,
            date("Y-m-d H:i:s")
        ]
    );

    fclose($handle);

    /* Redirect to Login */

    header("Location: login.php");
    exit();
}

?>

<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>StudentHub Registration</title>

    <link
        rel="stylesheet"
        href="../CSS/style.css"
    >

</head>

<body>

<h1>StudentHub Registration</h1>


<form id="registerForm" method="POST" action="register.php">

    <label for="name">
        Name:
    </label>

    <input
        type="text"
        id="name"
        name="name"
        required
    >


    <label for="email">
        Email:
    </label>

    <input
        type="email"
        id="email"
        name="email"
        required
    >


    <label for="mobile">
        Mobile:
    </label>

    <input
        type="text"
        id="mobile"
        name="mobile"
        required
    >


    <label for="password">
        Password:
    </label>

    <input
        type="password"
        id="password"
        name="password"
        required
    >


    <label for="confirmPassword">
        Confirm Password:
    </label>

    <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        required
    >


    <input
        type="submit"
        value="Register"
    >

    <input
        type="reset"
        value="Clear"
    >

</form>


<p>
    Already registered?
    <a href="login.php">Login</a>
</p>


</body>

</html>