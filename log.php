<?php
session_start();

// Your MySQL database connection details
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'test'; // Name of your database

// Create a connection to MySQL using MySQLi
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Retrieve username and password from the form
$email = $_POST['email'];
$password = $_POST['pswd'];

// SQL query to check if the username and password exist in the database
$sql = "SELECT * FROM details WHERE email = '$email' AND password = '$password'";
$result = $conn->query($sql);

if ($result->num_rows == 1) {
    // Login successful
    $_SESSION['username'] = $username;
    echo "Login successful! Welcome, $username!";
    header("Location: navbar.html");
    exit();
    // Redirect to a logged-in page or perform other actions
} else {
    // Login failed
    echo "Invalid username or password. Please try again.";
    header("Location: login.html?error=invalid"); // Redirect to login with error message
    exit();
}

// Close the database connection
$conn->close();
?>
