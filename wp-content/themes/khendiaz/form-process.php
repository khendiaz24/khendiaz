<?php

$errorMSG = "";

// NAME
if (empty($_POST["userName"])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_POST["userName"];
}

// EMAIL
if (empty($_POST["userEmail"])) {
    $errorMSG .= "Email is required ";
} else {
    $email = $_POST["userEmail"];
}

// MESSAGE
if (empty($_POST["content"])) {
    $errorMSG .= "Message is required ";
} else {
    $message = $_POST["content"];
}


$EmailTo = "khendiaz@gmail.com";
$Subject = "New Message Received";

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Body, "From:".$email);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}

?>
