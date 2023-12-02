<?php
// Check if data is received through a POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve the sent JSON data and decode it
    $receivedData = json_decode(file_get_contents('php://input'), true);

    // Your MySQL database connection details
    $servername = 'localhost';
    $username = 'root';
    $password = '';
    $dbname = 'test'; // Name of your database

    // Create a connection to MySQL
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check the connection
    if ($conn->connect_error) {
        die('Connection failed: ' . $conn->connect_error);
    }

    // Access the received data
    $email = $receivedData['email']
    $electricBill = $receivedData['electricBill'];
    $gasBill = $receivedData['gasBill'];
    $oilBill = $receivedData['oilBill'];
    $mileage = $receivedData['mileage'];
    $flights = $receivedData['flights'];
    $flights2 = $receivedData['flights2'];
    $recycle = $receivedData['recycle'];
    $total = $receivedData['total'];

    // Insert the received data into a table within the database
    $sql = "INSERT INTO carbon_data (email,electric_bill, gas_bill, oil_bill, mileage, flights, flights2, recycle, total_footprint) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        // Bind parameters and execute the statement
        $stmt->bind_param("ddddiisd", $email,$electricBill, $gasBill, $oilBill, $mileage, $flights, $flights2, $recycle, $total);
        $stmt->execute();

        // Check if the insertion was successful
        if ($stmt->affected_rows > 0) {
            echo 'Data inserted into carbon_data table successfully';
        } else {
            echo 'Error inserting data into carbon_data table';
        }

        $stmt->close();
    } else {
        echo 'Statement preparation error: ' . $conn->error;
    }

    // Close the database connection
    $conn->close();
} else {
    // Respond with an error message for invalid requests
    echo 'Invalid request';
}
?>
