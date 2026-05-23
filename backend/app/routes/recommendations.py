from flask import Blueprint, request, jsonify
from app.services.recommendation_engine import RecommendationEngine
from app.services.auth_service import token_required
from app.utils.db_utils import get_collection, object_id

recommendations_bp = Blueprint('recommendations', __name__)


def _get_request_data():
    data = request.get_json(silent=True)
    if data is None:
        data = request.form.to_dict()
    return data or {}

@recommendations_bp.route('/recommendations', methods=['GET'])
@token_required
def get_recommendations():
    """Get recommendations for logged-in student"""
    
    # Ensure user is student
    if request.user['role'] != 'student':
        return {'error': 'Only students can get recommendations'}, 403
    
    student_id = request.user['user_id']
    top_n = request.args.get('top_n', 10, type=int)
    
    engine = RecommendationEngine()
    result, status_code = engine.get_recommendations(student_id, top_n=top_n)
    
    return jsonify(result), status_code

@recommendations_bp.route('/internships', methods=['GET'])
def get_internships():
    """Get all open internships"""
    internships_col = get_collection('internships')
    
    internships = list(internships_col.find({
        'status': 'open',
        'seats_available': {'$gt': 0}
    }).limit(50))
    
    # Convert ObjectIds to strings
    for internship in internships:
        internship['_id'] = str(internship['_id'])
        internship['company_id'] = str(internship['company_id'])
    
    return jsonify({'internships': internships}), 200

@recommendations_bp.route('/internships', methods=['POST'])
@token_required
def create_internship():
    """Create new internship (employer only)"""
    
    # Ensure user is employer
    if request.user['role'] != 'employer':
        return {'error': 'Only employers can post internships'}, 403
    
    data = _get_request_data()
    
    # Validate input
    required_fields = ['title', 'description', 'required_skills', 'seats_available']
    if not all(field in data for field in required_fields):
        return {'error': 'Missing required fields'}, 400
    
    # Create internship
    from app.models import Internship
    internship_data = Internship.create(
        company_id=object_id(request.user['user_id']),
        title=data['title'],
        description=data['description'],
        required_skills=data['required_skills'],
        seats_available=data['seats_available'],
        duration_weeks=data.get('duration_weeks', 12),
        stipend=data.get('stipend', 0)
    )
    
    result = get_collection('internships').insert_one(internship_data)
    
    return jsonify({
        'internship_id': str(result.inserted_id),
        'title': data['title']
    }), 201