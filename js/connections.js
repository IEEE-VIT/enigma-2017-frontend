$(function() {
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
      success: function(message, textStatus, request) {

        //sets session cookie. TODO: Check domain and timeout problems
        Cookies.set('x-access-token', message.token);

        //redirect to the question page on successful login
        //TODO: Check for successful login else show error
        window.location.replace("./r/ques.html");

        $('#success').html("<div class='alert alert-success'>");
        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
        $('#success > .alert-success')
        .append("<strong>" + message.message + "</strong>");
        $('#success > .alert-success')
        .append('</div>');
      },
      error: function() {
        // Fail message
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
        $('#success > .alert-danger').append("<strong>Oops! Something went wrong!</strong>");
        $('#success > .alert-danger').append('</div>');
        //clear all fields
        $('#contactForm').trigger("reset");
      },
    });
  });

  $("#registerForm").submit(function(e) {
    e.preventDefault();
    var name = $("input#name").val();
    var email = $("input#emailReg").val();
    var phone = $("input#contact").val();
    var pass = $("input#passwordReg").val();
    var conf_pass = $("input#conf_pass").val();
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
        contact: phone,
        password: pass
      }),
      cache: false,
      success: function(message) {
        // Success message
        $('#success').html("<div class='alert alert-success'>");
        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
        $('#success > .alert-success')
        .append("<strong>" + message.message + "</strong>");
        $('#success > .alert-success')
        .append('</div>');
      },
      error: function() {
        // Fail message
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
        $('#success > .alert-danger').append("<strong>Oops! Something went wrong!</strong>");
        $('#success > .alert-danger').append('</div>');
        //clear all fields
        $('#contactForm').trigger("reset");
      },
    });
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
