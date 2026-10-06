<?php

/* Login Process */

$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = trim($_POST["email"] ?? "");
    $password = $_POST["password"] ?? "";

    if (empty($email) || empty($password)) {

        $error = "Please fill in all fields.";

    } else {

        include "../php/db.php";

        $sql = "SELECT password FROM registrations WHERE email = ?";

        $stmt = $conn->prepare($sql);

        $stmt->bind_param("s", $email);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows == 1) {

            $user = $result->fetch_assoc();

            if (password_verify($password, $user["password"])) {

                header("Location: dashboard.html");
                exit();

            } else {

                $error = "Invalid email or password.";
            }

        } else {

            $error = "Invalid email or password.";
        }

        $stmt->close();
        $conn->close();
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>StudentHub Login</title>

    <link rel="stylesheet"
        href="../CSS/style.css">

</head>

<body>

<h1>StudentHub Login</h1>

<p>
    Login to continue to your StudentHub dashboard.
</p>

<?php

if ($error != "") {

    echo "<p>" . htmlspecialchars($error) . "</p>";

}

?>

<form method="POST" action="login.php">

    <label>Email Address:</label>

    <input
        type="email"
        name="email"
        placeholder="Enter Your Email"
        required
    >

    <label>Password:</label>

    <input
        type="password"
        name="password"
        placeholder="Enter Your Password"
        required
    >

    <button type="submit">
        Login
    </button>

    <button type="reset">
        Clear
    </button>

</form>

<p>
    New student?
    <a href="register.php">Register here</a>
</p>

<p>
    <a href="../index.html">Back to StudentHub</a>
</p>

</body>

</html>