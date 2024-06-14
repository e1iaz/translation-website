from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


@app.route("/api/translate", methods=['POST'])
def translate():
    if request.method == "POST":
        from_text = request.json.get("from")
        to_text = request.json.get("to")
        source_text = request.json.get("source")
        translation = "hello"
    else:
        translation = "!!!ERROR!!!"
    data = {"translation": translation}
    return json.dumps(data)


if __name__ == "__main__":
    app.run()
