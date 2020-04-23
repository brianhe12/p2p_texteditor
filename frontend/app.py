from flask import Flask, render_template, request, url_for, redirect
from flask_restful import reqparse, Api, Resource


app = Flask(__name__)

@app.route('/') #creates the flask html route
def root():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def keyCheck():
    key1 = request.form['key1']  # getting usernames

    if key1 == "password":
        return redirect(url_for('editor'))

@app.route('/editor')
def editor():
    return render_template('editor.html')

if __name__ == '__main__':
	app.run(host = '0.0.0.0',port=80,debug=True)
