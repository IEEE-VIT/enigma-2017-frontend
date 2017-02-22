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
      success: function(message) {
        $('#success').html("<div class='alert alert-success'>");
        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
        $('#success > .alert-success')
        .append("<strong>" + JSON.parse(message).message + "</strong>");
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
      url: "http://127.0.0.1:3000/auth/save",
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
        .append("<strong>" + JSON.parse(message).message + "</strong>");
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
  // $("input,textarea").jqBootstrapValidation({
  //     preventSubmit: true,
  //     submitError: function($form, event, errors) {
  //         // additional error messages or events
  //     },
  //     submitSuccess: function($form, event) {
  //         event.preventDefault(); // prevent default submit behaviour
  //         // get values from FORM
  //         var name = $("input#name").val();
  //         var email = $("input#email").val();
  //         var phone = $("input#contact").val();
  //         var pass = $("input#password").val();
  //         var conf_pass = $("input#conf_pass").val();
  //         var firstName = name; // For Success/Failure Message
  //         // Check for white space in name for Success/Fail message
  //         if (firstName.indexOf(' ') >= 0) {
  //             firstName = name.split(' ').slice(0, -1).join(' ');
  //         }
  //         $.ajax({
  //             url: "http://127.0.0.1:3000/auth/save",
  //             type: "POST",
  //             datatype: "json",
  //             contentType: "application/json; charset=utf-8",
  //             data: JSON.stringify({
  //                 name: name,
  //                 email: email,
  //                 contact: phone,
  //                 password: pass
  //             }),
  //             cache: false,
  //             success: function(message) {
  //                 // Success message
  //                 $('#success').html("<div class='alert alert-success'>");
  //                 $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
  //                     .append("</button>");
  //                 $('#success > .alert-success')
  //                     .append("<strong>" + JSON.parse(message).message + "</strong>");
  //                 $('#success > .alert-success')
  //                     .append('</div>');
  //
  //                 //clear all fields
  //                 $('#contactForm').trigger("reset");
  //             },
  //             error: function() {
  //                 // Fail message
  //                 $('#success').html("<div class='alert alert-danger'>");
  //                 $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
  //                     .append("</button>");
  //                 $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that our mail is not responding. Please try again later!");
  //                 $('#success > .alert-danger').append('</div>');
  //                 //clear all fields
  //                 $('#contactForm').trigger("reset");
  //             },
  //         })
  //         console.log("Test2");
  //     },
  //     filter: function() {
  //         return $(this).is(":visible");
  //     },
  // });
  //
  // $("a[data-toggle=\"tab\"]").click(function(e) {
  //     e.preventDefault();
  //     $(this).tab("show");
  // });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
