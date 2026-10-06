<?php

/* Database Connection */

$host = "localhost";
$username = "root";
$password = "";
$database = "studenthub";

$conn = new mysqli(
    $host,
    $username,
    $password,
    $database
);

/* Check Connection */

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

?>