<!DOCTYPE html>
<html>
<head>
    <title>Signup</title>
</head>
<body>
    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST['txt'];
        $email = $_POST['email'];
        $password = $_POST['pswd'];

        // Database connection
        $servername = 'localhost';
        $username = 'root';
        $password_db = '';
        $dbname = 'test';

        // Create connection
        $conn = new mysqli($servername, $username, $password_db, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die('Connection failed: ' . $conn->connect_error);
        }

        // Prepared statement to prevent SQL injection
        $sql = "INSERT INTO `details`(`name`, `email`, `password`) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        if ($stmt) {
            // Bind parameters and execute the statement
            $stmt->bind_param("sss", $name, $email, $password);
            $stmt->execute();
            echo "Registration successful";
            $stmt->close();

            header("Location: input1.html");
            exit();
        } else {
            echo "Statement preparation error: " . $conn->error;
        }
        $conn->close();

        
    } else {
        echo "Invalid request!";
    }
    ?>

    
</body>
</html>
