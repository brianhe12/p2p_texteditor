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
   1. Use 2 factor authentication (reach goals)
   1. Use AES encryption
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
 <img src = "images/Initial P2P System Architecture.png">
 
  # Encryption
  To ensure documents could not be read by the server owner or people without permission, we encrypt the files on the server.
  We use a hybrid cryptosystem which uses both public key cryptograpghy as well as a symmetric key. This allows the editor to be more efficient. Users on a document will each have a public and private key, while the document will be encrypted with a symmetric key. The symmetric key that encrypts the document will be shared to users that have permissions on the document, by encrypting it using their shared public key, therefore only they can decrypt it with their private key. Since the text editor is most likely to be used for file that can be large, this is more effective as most of the work is done with the efficient symmetric key decryption, while the more computational reliant public key scheme is only needed to decrypt a short key. On top of that, we use CBC (cipher block chaining) which XORs each block of plaintext with the previous ciphertext block before being encrypted, making each ciphertext dependent on its predecessor. This provides even more secrecy of data 
  We use fernet aes with 128bit keys for symmetric encryption, and rsa with 2048 bit keys. 
  
## To Run locally

p2p_texteditor\editor> python .\app.py

p2p_texteditor\editor\static\node_modules\y-websocket\bin> node .\server.js
