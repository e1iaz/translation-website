from flask import Flask, request
from flask_cors import CORS
import json

from translation.src.translation_agent.utils import translate

app = Flask(__name__)
CORS(app)


@app.route("/api/translate", methods=['POST'])
def translation():
    if request.method == "POST":
        from_text = request.json.get("from")
        to_text = request.json.get("to")
        source_text = request.json.get("source")
        result = translate(from_text, to_text, source_text, "")
    else:
        result = "!!!ERROR!!!"
    data = {"translation": result}
    return json.dumps(data)


if __name__ == "__main__":
    app.run()
