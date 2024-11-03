from .users_routes import users_bp
from .to_dos_routes import to_dos_bp

def register_blueprints(app):
    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(to_dos_bp, url_prefix="/api/to-dos")
