from flask import Flask, render_template, request, jsonify, redirect, url_for, make_response
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

number_of_users = 2

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def keyCheck():
    key1 = request.form['key1']  # getting usernames

    if key1 == "password":
        return redirect('http://127.0.0.1:8080/quill.html', code=301)

@app.route('/editor')
def editor():
    return render_template('quill.html')

@app.route('/process', methods=['POST'])
def get_post_json():
    # Connect with Mongodb Atlas.
    client = MongoClient(os.getenv('MONGO_STRING'))
    db=client.p2p_docs

    data = request.get_json()
    print(data)
    
## in case if we don't use flask, we might need to move all operations to javascript
    user1=User("user1")
    user1.generate_userkeys()

    file1=File(user1, myfile)
    file1.generate_filekey()
    file1.cipher_gen()
    enc_data = file1.encrypt_data(data)
    
    # Insert into database
    # db.documents.insert_one(data)
    db.documents.insert_one(enc_data)

    return jsonify(status="success", data=data)

@app.route('/getData')
def get_data():
    # Connect with Mongodb Atlas.
    client = MongoClient(os.getenv('MONGO_STRING'))
    db=client.p2p_docs
    collection=db['documents']
    
    ek = encrypt_key(file1, user1)
    decrypt_data(ek, user1, file1, enc_data)
    
    cursor = collection.find({})
#    for document in cursor:
#        return str(document["ops"])
    
    for document in cursor:
        dec_content = decrypt_data(ek, user1, file1, str(document["ops"]))
        return dec_content

if __name__ == '__main__':
    app.run()

