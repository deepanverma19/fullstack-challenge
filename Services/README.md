# WEB SERVICES FOLDER

This folder basically consists of an webservices.js file, cert.pem and key.pem.

cert.pem and key.pem
--------------------
These two files are the self-signed certificate and keys being generated using OpenSSL.
 https://localhost:8081/
 https: denotes that the website is secured using self-signed certificate

 This ensures that the web servies are secured.

 webservices.js
 --------------

 This .js file consists of four various web services requests i.e. :
1)'/getExistingContacts'- GET Existing Contacts web service
2)'/createContact'- POST i.e. Create new Contacts web service
3)'/createConversation'- POST i.e. Create new Conversation web service
4)'/getExistingConversations'- GET Existing Conversations web service

These webservices further make calls to microservices.
