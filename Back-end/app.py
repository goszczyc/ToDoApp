from flask import Flask, jsonify, request, session
from flask_cors import CORS, cross_origin
from routes import register_blueprints


app = Flask(__name__)
CORS(app)
# app.config["CORS_HEADERS"] = "Content-Type"
app.config['SECRET_KEY'] = '_5#y2L"SF4Q8znxec]'
app.secret_key = 'KUTAS123456789ACADDASSADDAS'
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['SESSION_COOKIE_SECURE'] = True  # Requires HTTPS
# app.config['SESSION_COOKIE_NAME'] = 'to_do_secure_session'  # Custom cookie name (optional)
# app.config['SESSION_COOKIE_SECURE'] = True  # Use secure cookies (HTTPS only in production)
# app.config['SESSION_COOKIE_HTTPONLY'] = True  # Prevent JavaScript access to cookies
# app.config['PERMANENT_SESSION_LIFETIME'] = 3600  # Session lifetime in seconds (e.g., 1 hour)
@app.after_request
def middleware_for_response(response):
    # Allowing the credentials in the response.
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

register_blueprints(app)


@app.route("/")
def get_data():
    pass


if __name__ == "__main__":
    app.run(debug=True)
