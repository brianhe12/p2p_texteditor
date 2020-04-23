from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os

import sys
#will need to change when putting it in the website
sys.path.insert(0, '/Users/jennasun/Desktop/ec500/final_p2p/p2p_texteditor/encryption')
from CBC import *


load_dotenv()

app = Flask(__name__)

@app.route('/', methods=['GET'])
def quill():
    print("RENDERING QUILL")
    return render_template('quill.html')

@app.route('/process', methods=['POST'])
def get_post_json():
    # Connect with Mongodb Atlas.
    print("POSTING JSON")
    client = MongoClient(os.getenv('MONGO_STRING'))
    db=client.p2p_docs

    data = request.get_json()
    print(data)
    
    #Need the save button to save a file into mongodatabse
    #Need the filename to create File
    #Need an option to choose filename
    #Need have option to create and register yourself as a user
    
    #place holder for save
    myfile=test.txt
    with open("test.txt", 'wb') as myfile:
        myfile.write(data)
    
    #actual encryption when you save a document
    
    user1=User("user1")
    user1.generate_userkeys()

    file1=File(user1, myfile)
    file1.generate_filekey()
    file1.cipher_gen()
    file1.encrypt_file()

    #actual decryption when you are loading a document
    ek = encrypt_key(file1, user1)
    decrypt_file(ek, user1, file1)
    
    # Insert into database
    db.documents.insert_one(data)

    return jsonify(status="success", data=data)

if __name__ == '__main__':
    app.run()
