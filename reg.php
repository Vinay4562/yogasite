<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $typeOfProblem = $_POST["typeOfProblem"];

    $typeOfProblemNames = [
        'item1' => 'Overweight',
        'item2' => 'Underweight',
        'item4' => 'Diabetes Type',
        'item5' => 'Thyroid',
        'item6' => 'Fatty Liver',
        'item7' => 'PCOS/PCOD',
        'item8' => 'Low Energy Levels',
    ];

    $selectedProblem = $typeOfProblemNames[$typeOfProblem];

    $emailContent = "Name: $name\n";
    $emailContent .= "Email: $email\n";
    $emailContent .= "Type of Problem: $selectedProblem\n";
    $emailContent .= "Message: $message";

    // Attempt to send the email
    $result = mail("vkvinaykumar391@gmail.com", "Contact Form Submission", $emailContent);

    if ($result) {
        // Redirect or perform other actions after successful form submission
        header("Location: index.html");
        exit();
    } else {
        // Display an error message or log the error
        echo "Error: Unable to send email. Please try again later.";
    }
}
?>
