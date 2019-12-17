<?php
  $toEmail = "khendiaz@gmail.com";
  $mailHeaders = "From: " . $_POST["userName"] . "<". $_POST["userEmail"] .">\r\n";
  if(mail($toEmail, $_POST["content"], $mailHeaders)) {
      print "<p class='success'>Mail Sent.</p>";
  } else {
      print "<p class='Error'>Problem in Sending Mail.</p>";
  }
?>
