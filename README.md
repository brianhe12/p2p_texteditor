# p2p_texteditor
Collaborative text editor design on encrypted channel

## Minimum Value Product
Users are able to collaborate with other people on documents and see the changes in real-time.

## User Stories
* As a user, I should be able to create documents and share the documents by sending links.
* I should be able to collaborate with other people 
* My documents should not be able to be read by unauthorized people
* As a user, I should be able to change the font and size of the text.
* My documents should be automatically saved when exited.

## Steps of using device:

1. User searches for website
   1. Need a domain name/website name for users to find
   1. Click on URl to website
1. User enters homepage & logins 
   1. Use google qlogin API
   1. Would require creating an account with information about each user
1. User brought to menu screen 
   1. Option to add friends
   1. Option to join a session/meeting
   1. Option to start a meeting
1. Starting a meeting
   1. Click on list of friends to invite
   1. Sends out an invitation with link (perhaps a code with public and private key)
   1. Use 2 factor authentication
   1. Use RSA encryption
   1. Have pending status for entering
1. Joining a meeting
   1. Will receive email of the code
   1. Enters the code into enter session code
   1. Enter interface
1. Inside the document interface
   1. Collaborative text editor
   1. Have a chat room (reach goals)
   1. Use api for text editor

1. Capabilities of the document interface:
   1. Each user will be able to access a cache of their changes they’ve
   1. Permissions to certain people to read and edit 
   1. Able to edit and read and write the documents
   1. Saves the documents inside the website
   1. Ability to download and upload document (reach goals)
   
 ## Software Architecture
   
