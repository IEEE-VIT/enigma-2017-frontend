
var a=0,b=0,c=0,d=0,e=0;

function btn_disable() {
  var len=0;
  if($("#cb_is_vit:checked").length == 0)len=0;
  else len=1;
  
  if( !(a&b&c&d) && len ){
    document.getElementById("signupButton").disabled = true; 
    
  }
  else if(!(a&b&d&e) && !len) {
    document.getElementById("signupButton").disabled = true;
    
  }
  else {
    document.getElementById("signupButton").disabled = false; 
   
  }
}
function checkName(){
  
  if($('#name').val()!==''){
    $('#correct-name').html('<img src="img/tick.png" width="25" height="25"/>');
    a=1; 
  }
  else{
    $('#correct-name').html('<img src="img/cross.png" width="25" height="25"/>');
    a=0;
  }
  btn_disable();
}
function checkEmail(){
  checkName();
  var re=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(($('#emailReg').val()).match(re)){
    $('#correct-emailReg').html('<img src="img/tick.png" width="25" height="25"/>');
    b=1; 
    
  }
  else{
    $('#correct-emailReg').html('<img src="img/cross.png" width="25" height="25"/>');
    b=0; 
    
  }
  btn_disable();
}
function checkuni(){
  if($('#txt_external_college').val()!==''){
    $('#correct-uni').html('<img src="img/tick.png" width="25" height="25"/>');
    e=1; 
  }
  else{
    $('#correct-uni').html('<img src="img/cross.png" width="25" height="25"/>');
   e=0;
  }
  btn_disable();
}
function checkReg(){
  if($("#cb_is_vit:checked").length)
  { 
    
    var reg = /^[1][0-9][a-zA-Z]{3}\d{4}$/
    if(($('#registration').val()).match(reg)){
      $('#correct-reg').html('<img src="img/tick.png" width="25" height="25"/>');
      c=1;
    }
    else{
      $('#correct-reg').html('<img src="img/cross.png" width="25" height="25"/>');
      c=0;
    }
    btn_disable();
  }
}
function checkPh(){
  checkEmail();
  if($("#cb_is_vit:checked").length)checkReg();
  var phoneno=/^\d{10}$/;
  if(($('#contact').val()).match(phoneno)){
    $('#correct-contact').html('<img src="img/tick.png" width="25" height="25"/>');
    d=1;
  }
  else{
    $('#correct-contact').html('<img src="img/cross.png" width="25" height="25"/>');
    d=0;
  }
  btn_disable();
}
function confirmPass(){
     
  if((($('#passwordReg').val())!=($('#conf_pass').val()))){
    document.getElementById('conf_pass').style.color="red";
    $('#correct-conf_pass').html('<img src="img/cross.png" width="25" height="25"/>');
    document.getElementById("signupButton").disabled = true; 
  }
  else
  {
    document.getElementById('conf_pass').style.color="green";
    $('#correct-passwordReg').html('<img src="img/tick.png" width="25" height="25"/>');
    $('#correct-conf_pass').html('<img src="img/tick.png" width="25" height="25"/>');
    document.getElementById("signupButton").disabled = false; 
  }
}
function checkPassword(){
  checkPh();
  if((($('#conf_pass').val())=='')) {
    $('#correct-conf_pass').html('<img src="img/cross.png" width="25" height="25"/>');
    document.getElementById("signupButton").disabled = true; 
  }
  pass=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
  if(!($('#passwordReg').val()).match(pass)) {
    $('#correct-passwordReg').html('<img src="img/cross.png" width="25" height="25"/>');
    document.getElementById("signupButton").disabled = true;
  } 
  if(($('#passwordReg').val())=='') {
    $('#correct-passwordReg').html('<img src="img/cross.png" width="25" height="25"/>');
    document.getElementById("signupButton").disabled = true; 
  }
  else {
    $('#correct-passwordReg').html('<img src="img/tick.png" width="25" height="25"/>');
    document.getElementById("signupButton").disabled = false;
  } 
}

function refresh(){
  $('.refresh_image').html('<img src="img/blank.png" width="25" height="25"/>');
  $('#registerForm').trigger("reset");
  console.log("Test1");
  $('#success').hide();
  $('#signupButton').show();
  document.getElementById("registration").disabled = true;
  $("#txt_external_college").show();
  $("#uni_div").show();  
  

}