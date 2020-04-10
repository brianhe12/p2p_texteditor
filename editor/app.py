from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route('/', methods=['GET'])
def quill():
    return render_template('quill.html')

@app.route('/process', methods=['POST'])
def get_post_json():
    data = request.get_json()
    print(data)
    return jsonify(status="success", data=data)


if __name__ == '__main__':
    app.run()
