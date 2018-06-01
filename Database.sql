
## First step is to create the database which is named as ggg_fse
## ggg_fse stands for Griffin Group Global Full Stack Engineer :)

CREATE DATABASE `ggg_fse`;

USE ggg_fse;

## After creating the database, what I can think as per the requirements is to have two different tables
## i.e. Table No. 1 Contacts for storing the details of Contacts

CREATE TABLE `contacts` (
   `Contact_ID` int(11) NOT NULL AUTO_INCREMENT,
   `First_Name` varchar(45) NOT NULL,
   `Last_Name` varchar(45) NOT NULL,
   `Email_ID` varchar(45) NOT NULL,
   PRIMARY KEY (`Contact_ID`)
 );

## Inserting dummy data into table CONTACTS
INSERT INTO contacts VALUES (1,'Deepan','Verma','deepan.verma19@gmail.com');
INSERT INTO contacts VALUES (2,'Raghav','Mathur','mastraghav@gmail.com');
INSERT INTO contacts VALUES (3,'Pranav','Bhatia','prav10194@gmail.com');

## Table No. 2 Conversation for storing Conversation Details

CREATE TABLE `conversations` (
   `Conversation_ID` int(11) NOT NULL AUTO_INCREMENT,
   `Email_ID` varchar(45) NOT NULL,
   `First_Name` varchar(45) NOT NULL,
   `Last_Name` varchar(45) NOT NULL,
   `Conversation_Topic` varchar(45) NOT NULL,
   `Conversation_Content` varchar(500) NOT NULL,
   PRIMARY KEY (`Conversation_ID`)
 );

## Inserting dummy data into table CONVERSATION
INSERT INTO conversations VALUES (1,'deepan.verma19@gmail.com','Deepan','Verma','Music','Hi! We would like to discuss about music. Music is everything.');
INSERT INTO conversations VALUES (2,'mastraghav@gmail.com','Raghav','Mathur','Hollywood','Hi! We would like to discuss about Hollywood. Universal Studios is awesome.');
INSERT INTO conversations VALUES (3,'prav10194@gmail.com','Pranav','Bhatia','Science','Hi! We would like to converse about Science. We are surrounded by Science & Technology even this web app :)');

select * from ggg_fse.contacts;
select * from ggg_fse.conversations;
