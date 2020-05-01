from flask import Flask, render_template, request, jsonify, redirect, url_for, make_response
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from CBC import *
import json
from cryptography.fernet import Fernet

load_dotenv()

# Generate Keys
key = bytes(os.getenv('KEY').encode("utf-8"))
encryption_type = Fernet(key)
user = ''

app = Flask(__name__)

from flask_webpackext.project import WebpackTemplateProject
from flask_webpackext import FlaskWebpackExt

project = WebpackTemplateProject(
    __name__,
    project_folder='static',
    config_path="config.json",
)

app.config.update(dict(
    WEBPACKEXT_PROJECT=project,
))

# Initialize extension
FlaskWebpackExt(app)

number_of_users = 2

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/login',methods=['GET','POST'])
def login():
    return render_template('login.html')

@app.route('/', methods=['POST'])
def keyCheck():
    key1 = request.form['key1']  # getting usernames

    if key1 == "password":
        return render_template('quill.html')


@app.route('/editor')
def editor():
    return render_template('quill.html')


@app.route('/set_user', methods=['POST'])
def set_user():
    global user
    user = request.data.decode('utf-8')
    return "success", 201


@app.route('/get_user', methods=['GET'])
def get_user():
    global user
    return {'user' : user}


@app.route('/set_text', methods=['POST'])
def set_text():
    global key
    global encryption_type

    data = request.get_json()

    # Encrypt
    encrypted_message = encryption_type.encrypt(json.dumps(data).encode())

    # Write to file
    f = open("database.txt", "wb")
    f.write(encrypted_message)
    f.close()

    return "success", 201


@app.route('/get_text', methods=['GET'])
def get_text():
    global key
    global encryption_type
    # Read from file and decrypt
    with open('database.txt', "rb") as f:
        encrypted_message = f.readline()
        global key
        global encryption_type
        decrypted_message = encryption_type.decrypt(encrypted_message)

    return {'data': decrypted_message.decode('utf-8')}

if __name__ == '__main__':
    app.run()
