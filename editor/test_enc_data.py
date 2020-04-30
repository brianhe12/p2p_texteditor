from flask import Flask, render_template, request, jsonify, redirect, url_for, make_response
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import rsa
from cryptography.fernet import Fernet
import keyring
import os
from CBC import *

print("POSTING JSON but we are not retrieving information")
client = MongoClient(os.getenv('MONGO_STRING'))
db=client.p2p_docs

#did not insert into the database yet...
print("setting data as 'blah' 'blah'")
#    data = request.get_json()
data = "blah blah"

#creating file and user objects
print("creating file 1 and user1")
myfile="file1"
user1=User("user1")
user1.generate_userkeys()
file1=File(user1, myfile)

#creating cipher, userkey, and filekeys
---------------------------------------------------
print("creating cipher, userkeys, and filekeys ")
file1.generate_filekey()
file1.cipher_gen()
user1.generate_userkeys()

#encrypting the data
----------------------------------------------------
print("encrypting" + data)
enc_data = file1.encrypt_data(data)
print("this is the encrypted data" + str(enc_data, 'utf-8'))
#print("putting encrypted data into database")
#db.documents.insert_one(enc_data)

#decrypting the data
----------------------------------------------------
print("decrypting")
print("generating encryption key")
ek = encrypt_key(file1, user1)
dec_data = decrypt_data(ek, user1, file1, enc_data)
print ("this is decrypted data: "+str(dec_data, 'utf-8'))

# Insert into database
#print("inserting decrypted data to database")
#db.documents.insert_one(data)
