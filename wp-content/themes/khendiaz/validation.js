function sendContact() {
  var valid;
  valid = validateContact();
  if(valid) {
    jQuery.ajax({
        url: "wp-content/themes/khendiaz/contact_mail.php",
        data:'userName='+$("#userName").val()+'&userEmail='+
        $("#userEmail").val()+'&content='+
        $(content).val(),
        type: "POST",
        success:function(data){
          $("#mail-status").html(data);
        },
        error:function (){}
    });
  }
}

function validateContact() {
	var valid = true;
	$(".demoInputBox").css('background-color','');
	$(".info").html('');

	if(!$("#userName").val()) {
		$("#userName-info").html("The field is required!");
		$("#userName").css('background-color','#FFFFDF');
		valid = false;
	}
	if(!$("#userEmail").val()) {
		$("#userEmail-info").html("The field is required!");
		$("#userEmail").css('background-color','#FFFFDF');
		valid = false;
	}
	if(!$("#userEmail").val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
		$("#userEmail-info").html("Invalid email address");
		$("#userEmail").css('background-color','#FFFFDF');
		valid = false;
	}
	if(!$("#content").val()) {
		$("#content-info").html("The field is required!");
		$("#content").css('background-color','#FFFFDF');
		valid = false;
	}

	return valid;
}
