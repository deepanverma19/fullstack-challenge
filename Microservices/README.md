# MICROSERVICES FOLDER

This folder basically consists of an microservices.js file, cert.pem and key.pem.

cert.pem and key.pem
--------------------
These two files are the self-signed certificate and keys being generated using OpenSSL.
 https://localhost:8082/
 https: denotes that the website is secured using self-signed certificate

 This ensures that the microservies are secured.

 microservices.js
 --------------

 This .js file consists of four various microservices requests i.e. :
1)'/getExistingContacts-microservices'- GET Existing Contacts microservice
2)'/createContact-microservices'- POST i.e. Create new Contacts microservice
3)'/createConversation-microservices''- POST i.e. Create new Conversation microservice
4)'/getExistingConversations-microservices'- GET Existing Conversations microservice

These microservices further make calls to the database i.e. MySQL database and do caching as required.
