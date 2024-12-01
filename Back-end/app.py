from flask import Flask, jsonify, request, session
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt

app = Flask(__name__)

CORS(app)
app.config["SECRET_KEY"] = '_5#y2L"SF4Q8znxec]'
app.secret_key = "KUTAS123456789ACADDASSADDAS"
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True
app.config["SESSION_COOKIE_HTTPONLY"] = True

# Initialize bcrypt
bcrypt = Bcrypt(app)

# Import endpoints
from routes import register_blueprints


@app.after_request
def middleware_for_response(response):
    # Allowing the credentials in the response.
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response


register_blueprints(app)

if __name__ == "__main__":
    app.run(debug=True)
