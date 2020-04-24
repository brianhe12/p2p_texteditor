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

    # Insert into database
    db.documents.insert_one(data)

    return jsonify(status="success", data=data)


if __name__ == '__main__':
    app.run()
