from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import os
import uuid
from app.services.auth_service import AuthService, token_required

auth_bp = Blueprint('auth', __name__)


def _get_request_data():
    data = request.get_json(silent=True)
    if data is None:
        data = request.form.to_dict()
    return data or {}


def _save_user_file(file_storage, prefix, allowed_extensions):
    filename = secure_filename(file_storage.filename or '')
    if not filename:
        return None

    ext = os.path.splitext(filename)[1].lower()
    if ext not in allowed_extensions:
        return None

    safe_name = f"{prefix}_{uuid.uuid4().hex}{ext}"
    abs_path = os.path.join(current_app.config['UPLOAD_DIR'], safe_name)
    file_storage.save(abs_path)
    return f"/api/uploads/{safe_name}"

@auth_bp.route('/register/student', methods=['POST'])
def register_student():
    """Register new student"""
    data = _get_request_data()
    
    # Validate input
    required_fields = ['email', 'password', 'name', 'skills']
    if not all(field in data for field in required_fields):
        return {'error': 'Missing required fields'}, 400
    
    # Register
    result, status_code = AuthService.register_student(
        email=data['email'],
        password=data['password'],
        name=data['name'],
        skills=data['skills'],  # List of skills
        gpa=data.get('gpa', 0),
        preferences=data.get('preferences', ''),
        college=data.get('college', ''),
        city=data.get('city', ''),
    )
    
    return jsonify(result), status_code

@auth_bp.route('/register/employer', methods=['POST'])
def register_employer():
    """Register new employer"""
    data = _get_request_data()
    
    # Validate input
    required_fields = ['email', 'password', 'company_name', 'company_email']
    if not all(field in data for field in required_fields):
        return {'error': 'Missing required fields'}, 400
    
    # Register
    result, status_code = AuthService.register_employer(
        email=data['email'],
        password=data['password'],
        company_name=data['company_name'],
        company_email=data['company_email']
    )
    
    return jsonify(result), status_code

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login user"""
    data = _get_request_data()
    
    # Validate input
    if not all(field in data for field in ['email', 'password', 'role']):
        return {'error': 'Missing required fields'}, 400
    
    # Login
    result, status_code = AuthService.login(
        email=data['email'],
        password=data['password'],
        role=data['role']  # 'student' or 'employer'
    )
    
    return jsonify(result), status_code

@auth_bp.route('/verify', methods=['GET'])
def verify_token():
    """Verify if token is valid"""
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return {'error': 'Token missing'}, 401
    
    try:
        token = auth_header.split(" ")[1]
        payload = AuthService.verify_token(token)
        if payload:
            return {'valid': True, 'user': payload}, 200
    except:
        pass
    
    return {'error': 'Invalid token'}, 401


@auth_bp.route('/profile', methods=['GET'])
@token_required
def get_profile():
    """Get profile for logged in user"""
    result, status_code = AuthService.get_profile(request.user['user_id'])
    return jsonify(result), status_code


@auth_bp.route('/profile', methods=['PUT'])
@token_required
def update_profile():
    """Update profile for logged in user"""
    data = _get_request_data()
    result, status_code = AuthService.update_profile(request.user['user_id'], data)
    return jsonify(result), status_code


@auth_bp.route('/profile/upload/photo', methods=['POST'])
@token_required
def upload_profile_photo():
    """Upload profile photo and auto-save URL"""
    if 'file' not in request.files:
        return {'error': 'No file provided'}, 400

    saved_url = _save_user_file(request.files['file'], 'photo', {'.jpg', '.jpeg', '.png', '.webp'})
    if not saved_url:
        return {'error': 'Invalid file or unsupported type'}, 400

    result, status_code = AuthService.update_profile(
        request.user['user_id'],
        {'profile_photo_url': saved_url}
    )
    return jsonify({'file_url': saved_url, **result}), status_code


@auth_bp.route('/profile/upload/resume', methods=['POST'])
@token_required
def upload_resume():
    """Upload resume and auto-save URL"""
    if 'file' not in request.files:
        return {'error': 'No file provided'}, 400

    saved_url = _save_user_file(request.files['file'], 'resume', {'.pdf', '.doc', '.docx'})
    if not saved_url:
        return {'error': 'Invalid file or unsupported type'}, 400

    result, status_code = AuthService.update_profile(
        request.user['user_id'],
        {'resume_url': saved_url}
    )
    return jsonify({'file_url': saved_url, **result}), status_code