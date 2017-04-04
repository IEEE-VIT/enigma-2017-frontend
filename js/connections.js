$(document).ready(function(){

  var external_checked;

  $("question_id").html("Testing");
  //$("#table_body").append("<tr><td>Lol</td><td>HI</td><td>HI</td><td>HI</td></tr>");

  // if(Cookies.get('x-access-token')){
  //   window.location.replace("./r/countdown.html");
  // }

  $("#loginForm").submit(function(e) {
    e.preventDefault();
    var email = $("input#email").val();
    var pass = $("input#password").val();

    $.ajax({
      url: "https://enigma2.herokuapp.com/auth/login",
      type: "POST",
      datatype: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        email: email,
        password: pass
      }),
      cache: false,

      beforeSend: function(){
        $('#loginButton').hide();
        $('#loader_login').show();
      },

      success: function(message, textStatus, request) {

        //Loader
        $('#loader_login').hide();
        $('#loginButton').show();

        //sets session cookie. TODO: Check domain and timeout problems
        Cookies.set('x-access-token', message.token);

        //redirect to the question page on successful login
        //For now, redirecting to Countdown page
        if(message.code == '0'){
          window.location.replace("./r/countdown.html");
        }
        $('#success_login').html("<div class='alert alert-success'>");
        $('#success_login > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
        $('#success_login > .alert-success')
        .append("<strong style='font-size: 14px;'>" + message.message + "</strong>");
        $('#success_login > .alert-success')
        .append('</div>');
      },
      error: function() {
        $('#loader_login').hide();
        $('#loginButton').show();
        // Fail message
        $('#success_login').html("<div class='alert alert-danger'>");
        $('#success_login > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
        $('#success_login > .alert-danger').append("<strong>Oops! Something went wrong!</strong>");
        $('#success_login > .alert-danger').append('</div>');
        //clear all fields
        $('#contactForm').trigger("reset");
      },
    });
  });

  $("#registerForm").submit(function(e) {
    e.preventDefault();
    var name = $("input#name").val();
    var email = $("input#emailReg").val();
    var reg_no = $("input#reg_no").val();
    var phone = $("input#contact").val();
    var pass = $("input#passwordReg").val();
    var reg = $("input#registration").val();
    var conf_pass = $("input#conf_pass").val();
    var college_name = $("#cb_is_vit").attr("checked") ? $("#txt_external_college").val() : null;
    var firstName = name; // For Success/Failure Message
    // Check for white space in name for Success/Fail message
    if (firstName.indexOf(' ') >= 0) {
      firstName = name.split(' ').slice(0, -1).join(' ');
    }
    $.ajax({
      url: "https://enigma2.herokuapp.com/auth/save",
      type: "POST",
      datatype: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        name: name,
        email: email,
        reg_no: reg_no,
        contact: phone,
        password: pass,
        registration_id: reg,
        college_id: college_name
      }),
      cache: false,

      beforeSend: function(){
        $('#signupButton').hide();
        $('#loader_reg').show();
      },

      success: function(message) {
        // Success message
        $("#loader_reg").hide();
        $('#success').html("<div class='alert alert-success'>");
        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' onclick='btn_reapp()' aria-hidden='true'>&times;")
        .append("</button>");
        $('#success > .alert-success')
        .append("<strong style='font-size: 14px;'>" + message.message + "</strong>");
        $('#success > .alert-success')
        .append('</div>');
        $('#registerForm').trigger("reset");

        setTimeout(function(){
           document.getElementById("myModal").style.display = "none";
           $('#success').hide();
           $('#signupButton').show();
        },2000);

        $('.refresh_image').html('<img src="img/blank.png" width="25" height="25"/>');
        $('#registerForm').trigger("reset");

      },
      error: function() {
        $('#loader_reg').hide();
        $('#signupButton').show();

        // Fail message
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
        $('#success > .alert-danger').append("<strong style='font-size: 14px;'>Oops! Something went wrong!</strong>");
        $('#success > .alert-danger').append('</div>');
        //clear all fields

      },
    });
  });
});
