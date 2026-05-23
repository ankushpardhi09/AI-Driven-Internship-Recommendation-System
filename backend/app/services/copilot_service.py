import json
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from flask import current_app

from app.services.auth_service import AuthService
from app.services.recommendation_engine import RecommendationEngine


class CopilotService:
    """Combine profile-based internship ranking with optional Tavily web search."""

    @staticmethod
    def _build_search_query(student_profile, custom_query=''):
        skills = student_profile.get('skills', [])
        if isinstance(skills, list):
            skills_text = ', '.join(skills)
        else:
            skills_text = str(skills)

        preferences = student_profile.get('preferences', '')
        city = student_profile.get('city', '')
        college = student_profile.get('college', '')

        parts = [
            custom_query,
            'internship jobs',
            skills_text,
            preferences,
            city,
            college,
        ]
        return ' '.join(part for part in parts if str(part).strip())

    @staticmethod
    def _search_tavily(query, top_n=5):
        api_key = current_app.config.get('TAVILY_API_KEY', '')
        api_url = current_app.config.get('TAVILY_API_URL', 'https://api.tavily.com/search')

        if not api_key:
            return [], 'Set TAVILY_API_KEY to enable live web job search.'

        payload = {
            'query': query,
            'search_depth': 'basic',
            'topic': 'general',
            'max_results': top_n,
            'include_answer': True,
            'include_favicon': True,
        }

        request = Request(
            api_url,
            data=json.dumps(payload).encode('utf-8'),
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json',
            },
            method='POST',
        )

        try:
            with urlopen(request, timeout=10) as response:
                data = json.loads(response.read().decode('utf-8'))
        except (HTTPError, URLError, TimeoutError, ValueError) as exc:
            return [], f'Tavily search unavailable: {exc}'

        results = []
        for item in data.get('results', [])[:top_n]:
            results.append({
                'title': item.get('title', ''),
                'url': item.get('url', ''),
                'summary': item.get('content', ''),
                'score': item.get('score', 0),
                'source': 'tavily',
            })

        return results, data.get('answer', '')

    @staticmethod
    def get_recommendations(student_id, top_n=5, custom_query=''):
        profile_result, status_code = AuthService.get_profile(student_id)
        if status_code != 200:
            return profile_result, status_code

        student = profile_result['user']
        if student.get('role') != 'student':
            return {'error': 'Only students can get job recommendations'}, 403

        local_engine = RecommendationEngine()
        local_result, local_status = local_engine.get_recommendations(student_id, top_n=top_n)
        if local_status != 200:
            return local_result, local_status

        query = CopilotService._build_search_query(student, custom_query=custom_query)
        web_recommendations, web_summary = CopilotService._search_tavily(query, top_n=top_n)

        return {
            'student': {
                'user_id': student_id,
                'name': student.get('name', ''),
                'skills': student.get('skills', []),
                'preferences': student.get('preferences', ''),
                'city': student.get('city', ''),
                'college': student.get('college', ''),
            },
            'query': query,
            'local_recommendations': local_result.get('recommendations', []),
            'web_recommendations': web_recommendations,
            'web_summary': web_summary,
            'tavily_enabled': bool(current_app.config.get('TAVILY_API_KEY', '')),
            'allocation_note': 'Local internship matches respect open seat availability.',
        }, 200