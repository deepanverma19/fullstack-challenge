$(document).ready(function(){
  var cookieInformation = document.cookie.match(/session1=(.*?)userinformation/g).toString();
  cookieInformation = cookieInformation.replace("userinformation","")
  cookieInformation = cookieInformation.replace("session1=","")

  var first_name = cookieInformation.split(",")[0]
  var last_name = cookieInformation.split(",")[1]
  var email_id = cookieInformation.split(",")[2]

  $("#first_name").val(first_name);
  $("#last_name").val(last_name);
  $("#email_id").val(email_id);

  $("#send_email").click(function(){
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://localhost:8081/createConversation?first_name="+$('#first_name').val()+"&last_name="+$('#last_name').val()+"&email_id="+$('#email_id').val()+"&topic="+document.getElementById("topics").value+"&message_content="+$("#message_content").val(),
        "method": "POST",
        }

      $.ajax(settings).done(function (response) {
        console.log(response);
        window.location.href = "conversationsuccessfullycreated.html";
      });
  });
});
