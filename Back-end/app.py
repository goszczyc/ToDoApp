from flask import Flask, jsonify, request, session
from flask_cors import CORS, cross_origin
from routes import register_blueprints


app = Flask(__name__)
CORS(app)
# app.config["CORS_HEADERS"] = "Content-Type"
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


register_blueprints(app)


@app.route("/")
def get_data():
    pass


if __name__ == "__main__":
    app.run(debug=True)
