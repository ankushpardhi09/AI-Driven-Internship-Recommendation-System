from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta, timezone
from functools import wraps
from flask import request, jsonify, current_app
from app.utils.db_utils import get_collection, object_id
from app.models import User

class AuthService:
    """Authentication service"""

    @staticmethod
    def _utcnow():
        return datetime.now(timezone.utc)
    
    @staticmethod
    def hash_password(password):
        """Hash password"""
        return generate_password_hash(password, method='pbkdf2:sha256')
    
    @staticmethod
    def verify_password(password_hash, password):
        """Verify password"""
        return check_password_hash(password_hash, password)
    
    @staticmethod
    def generate_token(user_id, email, role):
        """Generate JWT token"""
        expiration_hours = current_app.config.get('JWT_EXPIRATION_HOURS', 24)
        payload = {
            'user_id': str(user_id),
            'email': email,
            'role': role,
            'exp': AuthService._utcnow() + timedelta(hours=expiration_hours),
            'iat': AuthService._utcnow()
        }
        token = jwt.encode(payload, current_app.config['JWT_SECRET'], algorithm='HS256')
        return token
    
    @staticmethod
    def verify_token(token):
        """Verify JWT token"""
        try:
            payload = jwt.decode(token, current_app.config['JWT_SECRET'], algorithms=['HS256'])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
    
    @staticmethod
    def register_student(email, password, name, skills, gpa=0, preferences="", college="", city=""):
        """Register new student"""
        users_col = get_collection('users')
        
        # Check if email already exists
        if users_col.find_one({'email': email}):
            return {'error': 'Email already registered'}, 400
        
        # Create user
        password_hash = AuthService.hash_password(password)
        user_data = User.create_student(email, password_hash, name, skills, gpa, preferences, college, city)
        
        result = users_col.insert_one(user_data)
        
        # Generate token
        token = AuthService.generate_token(result.inserted_id, email, 'student')
        
        return {
            'user_id': str(result.inserted_id),
            'email': email,
            'name': name,
            'role': 'student',
            'token': token
        }, 201
    
    @staticmethod
    def register_employer(email, password, company_name, company_email):
        """Register new employer"""
        users_col = get_collection('users')
        
        # Check if email already exists
        if users_col.find_one({'email': email}):
            return {'error': 'Email already registered'}, 400
        
        # Create user
        password_hash = AuthService.hash_password(password)
        user_data = User.create_employer(email, password_hash, company_name, company_email)
        
        result = users_col.insert_one(user_data)
        
        # Generate token
        token = AuthService.generate_token(result.inserted_id, email, 'employer')
        
        return {
            'user_id': str(result.inserted_id),
            'email': email,
            'company_name': company_name,
            'role': 'employer',
            'token': token
        }, 201
    
    @staticmethod
    def login(email, password, role):
        """Login user"""
        users_col = get_collection('users')
        
        # Find user
        user = users_col.find_one({'email': email, 'role': role})
        if not user:
            return {'error': 'Invalid email or password'}, 401
        
        # Verify password
        if not AuthService.verify_password(user['password_hash'], password):
            return {'error': 'Invalid email or password'}, 401
        
        # Generate token
        token = AuthService.generate_token(user['_id'], email, role)
        
        return {
            'user_id': str(user['_id']),
            'email': email,
            'name': user.get('name') or user.get('company_name'),
            'role': role,
            'token': token
        }, 200

    @staticmethod
    def get_profile(user_id):
        """Get user profile by user id"""
        users_col = get_collection('users')
        user = users_col.find_one({'_id': object_id(user_id)})

        if not user:
            return {'error': 'User not found'}, 404

        user['_id'] = str(user['_id'])
        user.pop('password_hash', None)
        return {'user': user}, 200

    @staticmethod
    def update_profile(user_id, data):
        """Update user profile fields"""
        users_col = get_collection('users')
        user = users_col.find_one({'_id': object_id(user_id)})

        if not user:
            return {'error': 'User not found'}, 404

        update_fields = {}
        role = user.get('role')

        # Shared field update
        if 'email' in data and data['email'] != user.get('email'):
            if users_col.find_one({'email': data['email']}):
                return {'error': 'Email already registered'}, 400
            update_fields['email'] = data['email']

        if role == 'student':
            allowed_fields = [
                'name',
                'gpa',
                'preferences',
                'resume_url',
                'profile_photo_url',
                'experience_years',
                'college',
                'city',
            ]
            for field in allowed_fields:
                if field in data:
                    if field == 'resume_url' and not str(data[field]).strip():
                        continue
                    update_fields[field] = data[field]

            if 'skills' in data:
                if isinstance(data['skills'], list):
                    update_fields['skills'] = data['skills']
                elif isinstance(data['skills'], str):
                    update_fields['skills'] = [s.strip() for s in data['skills'].split(',') if s.strip()]

        elif role == 'employer':
            allowed_fields = ['company_name', 'company_email']
            for field in allowed_fields:
                if field in data:
                    update_fields[field] = data[field]

        if not update_fields:
            user['_id'] = str(user['_id'])
            user.pop('password_hash', None)
            return {'user': user, 'message': 'No changes detected'}, 200

        update_fields['updated_at'] = AuthService._utcnow()

        users_col.update_one({'_id': user['_id']}, {'$set': update_fields})
        updated_user = users_col.find_one({'_id': user['_id']})
        updated_user['_id'] = str(updated_user['_id'])
        updated_user.pop('password_hash', None)

        return {'user': updated_user}, 200

def token_required(f):
    """Decorator to check JWT token"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Check for token in headers
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]
            except IndexError:
                return {'error': 'Invalid token format'}, 401
        
        if not token:
            return {'error': 'Token missing'}, 401
        
        # Verify token
        payload = AuthService.verify_token(token)
        if not payload:
            return {'error': 'Invalid or expired token'}, 401
        
        # Pass user info to route handler
        request.user = payload
        return f(*args, **kwargs)
    
    return decorated