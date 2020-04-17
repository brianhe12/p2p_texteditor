from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)


@app.route('/', methods=['GET'])
def quill():
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
