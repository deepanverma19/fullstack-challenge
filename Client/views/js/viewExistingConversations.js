// This file contains the javascript code for dealing with the table data stored in the html table for existing contacts table.
// And a cookie has been initialised over here which helps use to automatically transfer the details of the person whom we need
// to start conversation with by clicking the appropriate contact's row.

$(document).ready(function(){
      $('#displayresults').show();
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://localhost:8081/getExistingConversations",
        "method": "GET",
        }

      $.ajax(settings).done(function (response) {
        for (var key in response) {
          if (response.hasOwnProperty(key)) {
              $('#resultstable tbody').append('<tr id="'+response[key].Conversation_ID+'"><th scope="row">'+response[key].Conversation_ID+'</th><td>'+response[key].Email_ID+'</td><td>'+response[key].First_Name+'</td><td>'+response[key].Last_Name+'</td><td>'+response[key].Conversation_Topic+'</td><td>'+response[key].Conversation_Content+'</td></tr>');
          }
        }
      });
});
