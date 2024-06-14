import os

from flask import Flask, request
from flask_cors import CORS
import json
from dotenv import load_dotenv

from translation.src.translation_agent.utils import translate

app = Flask(__name__)
CORS(app)

load_dotenv()
ACCESS_CODE = os.getenv('ACCESS_CODE')

@app.route("/api/translate", methods=['POST'])
def translation():
    if request.method == "POST":
        accessCode = request.json["accessCode"]
        if accessCode != ACCESS_CODE:
            result = "Invalid Access Code"
        else:
            from_text = request.json.get("from")
            to_text = request.json.get("to")
            source_text = request.json.get("source")
            country = request.json.get("country")
            if country == "NO_COUNTRY":
                country = ""
            result = translate(from_text, to_text, source_text, country, model_name="gpt-3.5-turbo")
    else:
        result = "!!!ERROR!!!"
    data = {"translation": result}
    return json.dumps(data)


if __name__ == "__main__":
    app.run()
