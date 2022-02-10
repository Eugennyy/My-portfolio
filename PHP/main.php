<?php
    $sendTo = 'krechunyakk00@gmail.com';
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $subject = 'Сообщение от пользователя сайта-портфолио';
    $msg = trim($_POST['message']);
    $fullMessage = "$name: $msg";
    $headers = 'Content-type: text/plain; charset=utf-8' . PHP_EOL;
    $headers .= "From: " . $email . PHP_EOL;

    mail($sendTo, $subject, $fullMessage, $headers);
?>