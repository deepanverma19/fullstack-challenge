# CLIENT SIDE FOLDER

This folder basically consists of a views folder, an index.js file, cert.pem and key.pem.

cert.pem and key.pem
--------------------
These two files are the self-signed certificate and keys being generated using OpenSSL.
 https://localhost:8080/
 https: denotes that the website is secured using self-signed certificate

 index.js
 --------
 This file is used to create first Server that runs on port no 8080 and contains all the client side code.

 views FOLDER
 ------------
This folder consists of various html pages:

1) contacts.html - html page used to redirect to Contacts page
2) contactsuccessfullycreated.html - Confirmation page for contact creation and existing contacts viewable by clicking on it
3) conversations.html - Clicking on any row of existing contacts opens up conversations.html to fill the subject and message to be sent
4) conversationssuccessfullycreated.html -Confirmation page for contact creation and existing conversations including sent and received messages(once the server starts new recieved messages can be seen) viewable by clicking on it
5) createcontact.html- Filling the details to create a new contact page
6) createconversation.html- Filling the details to create a new conversation.
7) error.html- 404 error page
8) existingcontacts.html - To view the existingcontacts in the database
9) existingconversations.html- To view the existing conversations in the database
10) index.html - Homepage

css FOLDER
----------
The .css files used for developing appealing UX.

img FOLDER
----------
The various images used.

js FOLDER
---------
The various js files used for doing specific operations as listed:
1) createContact.js - js file used for doing manipulations in the table and calling createContact webservice
2) createConversation.js - js file used for doing manipulations in the table and calling createConversation webservice
3) viewExistingContacts.js - js file used for viewing existing contacts calling createContact webservice
4) viewExistingConversations.js - js file used for viewing existing conversations calling createConversation webservice
