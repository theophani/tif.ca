<?php

$to = "tif@tif.ca";
$headers  = "From: \"$fromName\" <$fromAddr>\n";
$headers .= "X-Sender: <tif@tif.ca>\n";
$headers .= "X-Mailer: PHP\n";
$headers .= "Reply-To: <$fromAddr>\n";

mail( $to, $subject, $message, $headers );

header("Location: thankyou.html\n");
?>
