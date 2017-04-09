$(document).ready(function(){

  console.log("Document Ready!");
  var x_access_token = Cookies.get('x-access-token');
  var num;
  $.ajax({
      url: "https://enigma2.herokuapp.com/results/all",
      type: "GET",
      datatype: "json",
      contentType: "application/json; charset=utf-8",
      cache: false,
      headers:{
        "x-access-token":x_access_token
      },

      beforeSend: function(){
        $("#ques-loader").show();
      },
      success: function(message, textStatus, request) {
        $("#ques-loader").hide();
        var i = 0;
        var string = "";
        for(i=0; i<=message.result.length-1; i++){
          if(message.result[i].ban_time)console.log("Test1");
          if(message.result[i].ban){
            string = string + "<tr style=\"background-color: rgba(187, 9, 9, 0.6);\"><td>" + (i+1)  + "</td><td>" + message.result[i].name + "</td><td>" + ((message.result[i].college_id == null || message.result[i].college_id == 'vit_university_vellore') ? "VIT University" : message.result[i].college_id) + "</td><td>" + message.result[i].score + "</td><td>" + (message.result[i].num+1) + "</td></tr>";
          }
          else {
            string = string + "<tr><td>" + (i+1)  + "</td><td>" + message.result[i].name + "</td><td>" + ((message.result[i].college_id == null || message.result[i].college_id == 'vit_university_vellore') ? "VIT University" : message.result[i].college_id) + "</td><td>" + message.result[i].score + "</td><td>" + (message.result[i].num+1) + "</td></tr>";
          }
        }
        $('#table_body').append(string);
      }
    });

    $('#logout_butt a').click(function(e) {
      Cookies.remove('x-access-token');
      window.location.replace("../index.php");
    });
});
