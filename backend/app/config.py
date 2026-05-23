import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Base configuration"""
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    
    # MongoDB Configuration
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/internmatch')
    MONGO_DB_NAME = os.getenv('MONGO_DB_NAME', 'internmatch')
    
    # JWT Configuration
    JWT_SECRET = os.getenv('JWT_SECRET', 'jwt-secret-key')
    JWT_EXPIRATION_HOURS = 24

    # Optional Tavily web search integration for AI Copilot
    TAVILY_API_KEY = os.getenv('TAVILY_API_KEY', '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')
    TAVILY_API_URL = os.getenv('TAVILY_API_URL', 'https://api.tavily.com/search')
    
    # CORS Configuration
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:5173').split(',')

    # File Upload Configuration
    BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    UPLOAD_DIR = os.getenv('UPLOAD_DIR', os.path.join(BASE_DIR, 'uploads'))
    MAX_CONTENT_LENGTH = int(os.getenv('MAX_CONTENT_LENGTH', 8 * 1024 * 1024))

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False

config_by_name = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}