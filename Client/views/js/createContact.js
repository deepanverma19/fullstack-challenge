$(document).ready(function(){
  $("#contact_form").click(function(){
       var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://localhost:8081/createContact?first_name="+$('#first_name').val()+"&last_name="+$('#last_name').val()+"&email_id="+$('#email_id').val(),
        "method": "POST",
        }
      $.ajax(settings).done(function (response) {
        console.log(response);
        window.location.href = 'contactsuccessfullycreated.html';
      });
  });
});
