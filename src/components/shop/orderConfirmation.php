<?php

if (isset($_POST['submit'])){

    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $adress = $_POST['adress'];
    $postalCode = $_POST['postalCode'];
    $City = $_POST['City'];
    $Country = $_POST['Country'];
    $State = $_POST['State'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $totalPriceMusic = $_POST['totalPriceMusic'];
    $costsOfShipping = $_POST['costsOfShipping'];
    $globalTotalPrice = $_POST['globalTotalPrice'];
    $orderNumber = $_POST['orderNumber'];
    $text = "Your order number is".$orderNumber." .";


    mail($email, $globalTotalPrice, $text);
}



?>