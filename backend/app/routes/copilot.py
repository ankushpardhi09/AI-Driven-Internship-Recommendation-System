from flask import Blueprint, jsonify, request

from app.services.auth_service import token_required
from app.services.copilot_service import CopilotService

copilot_bp = Blueprint('copilot', __name__)


@copilot_bp.route('/copilot/recommendations', methods=['GET'])
@token_required
def get_copilot_recommendations():
    if request.user['role'] != 'student':
        return {'error': 'Only students can get job recommendations'}, 403

    top_n = request.args.get('top_n', 5, type=int)
    custom_query = request.args.get('q', '', type=str)
    result, status_code = CopilotService.get_recommendations(
        request.user['user_id'],
        top_n=top_n,
        custom_query=custom_query,
    )
    return jsonify(result), status_code