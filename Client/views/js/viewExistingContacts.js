// This file contains the javascript code for dealing with the table data stored in the html table for existing contacts table.
// And a cookie has been initialised over here which helps use to automatically transfer the details of the person whom we need
// to start conversation with by clicking the appropriate contact's row.

$(document).ready(function(){
      $('#displayresults').show();
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://localhost:8081/getExistingContacts",
        "method": "GET",
        }

      $.ajax(settings).done(function (response) {
        for (var key in response) {
          if (response.hasOwnProperty(key)) {
              $('#resultstable tbody').append('<tr id="'+response[key].Contact_ID+'"><th scope="row">'+response[key].Contact_ID+'</th><td>'+response[key].First_Name+'</td><td>'+response[key].Last_Name+'</td><td>'+response[key].Email_ID+'</td></tr>');
          }
        }
      });

      $(document).on("click", "#resultstable tr", function(e) {
        var tableData = $(this).children("td").map(function() {
            return $(this).text();
        }).get();
        document.cookie="session1="+tableData[0]+","+tableData[1]+","+tableData[2]+"userinformation";
        console.log(tableData);
        window.location.href = 'createconversation.html';
    });
});
