from flask import Flask, send_from_directory
from flask_cors import CORS
from app.config import config_by_name
import os

def create_app(config_name=None):
    """Application factory"""
    
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')
    
    app = Flask(__name__)
    config_class = config_by_name.get(config_name, config_by_name['development'])
    app.config.from_object(config_class)

    # Ensure upload directory exists for profile media files.
    os.makedirs(app.config['UPLOAD_DIR'], exist_ok=True)
    
    # Enable CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": app.config['CORS_ORIGINS'],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Register blueprints (routes)
    from app.routes import auth_bp, recommendations_bp, copilot_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(recommendations_bp, url_prefix='/api')
    app.register_blueprint(copilot_bp, url_prefix='/api')
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return {'status': 'healthy'}, 200

    @app.route('/api/uploads/<path:filename>', methods=['GET'])
    def serve_upload(filename):
        return send_from_directory(app.config['UPLOAD_DIR'], filename)
    
    return app