import os
import sys
import unittest
from unittest.mock import patch
from types import SimpleNamespace

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app import create_app


class ApiEndpointTests(unittest.TestCase):
    def setUp(self):
        self.app = create_app("development")
        self.client = self.app.test_client()

    def test_health_endpoint(self):
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {"status": "healthy"})

    def test_register_student_missing_fields_returns_400(self):
        response = self.client.post("/api/auth/register/student", json={})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.get_json(), {"error": "Missing required fields"})

    def test_login_missing_fields_returns_400(self):
        response = self.client.post("/api/auth/login", json={"email": "a@example.com"})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.get_json(), {"error": "Missing required fields"})

    def test_recommendations_requires_token(self):
        response = self.client.get("/api/recommendations")
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.get_json(), {"error": "Token missing"})

    @patch("app.services.auth_service.AuthService.generate_token")
    @patch("app.services.auth_service.get_collection")
    def test_register_student_success_with_mocked_db(self, get_collection_mock, generate_token_mock):
        users_col = get_collection_mock.return_value
        users_col.find_one.return_value = None
        inserted_id = "507f1f77bcf86cd799439011"
        users_col.insert_one.return_value = SimpleNamespace(inserted_id=inserted_id)
        generate_token_mock.return_value = "mocked-student-token"

        payload = {
            "email": "student@example.com",
            "password": "secure-pass-123",
            "name": "Student Name",
            "skills": ["python", "flask"],
            "gpa": 3.7,
            "preferences": "backend internships",
        }
        response = self.client.post("/api/auth/register/student", json=payload)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            response.get_json(),
            {
                "user_id": str(inserted_id),
                "email": "student@example.com",
                "name": "Student Name",
                "role": "student",
                "token": "mocked-student-token",
            },
        )

    @patch("app.services.auth_service.AuthService.generate_token")
    @patch("app.services.auth_service.AuthService.verify_password")
    @patch("app.services.auth_service.get_collection")
    def test_login_success_with_mocked_db(self, get_collection_mock, verify_password_mock, generate_token_mock):
        users_col = get_collection_mock.return_value
        user_id = "507f1f77bcf86cd799439012"
        users_col.find_one.return_value = {
            "_id": user_id,
            "email": "student@example.com",
            "password_hash": "mocked-hash",
            "name": "Student Name",
            "role": "student",
        }
        verify_password_mock.return_value = True
        generate_token_mock.return_value = "mocked-login-token"

        payload = {
            "email": "student@example.com",
            "password": "secure-pass-123",
            "role": "student",
        }
        response = self.client.post("/api/auth/login", json=payload)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.get_json(),
            {
                "user_id": str(user_id),
                "email": "student@example.com",
                "name": "Student Name",
                "role": "student",
                "token": "mocked-login-token",
            },
        )

    @patch("app.services.auth_service.AuthService.verify_token")
    def test_recommendations_student_only(self, verify_token_mock):
        verify_token_mock.return_value = {
            "user_id": "507f1f77bcf86cd799439011",
            "email": "company@example.com",
            "role": "employer",
        }

        response = self.client.get(
            "/api/recommendations",
            headers={"Authorization": "Bearer fake-token"},
        )

        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.get_json(), {"error": "Only students can get recommendations"})

    @patch("app.services.auth_service.AuthService.verify_token")
    def test_create_internship_forbidden_for_student(self, verify_token_mock):
        verify_token_mock.return_value = {
            "user_id": "507f1f77bcf86cd799439013",
            "email": "student@example.com",
            "role": "student",
        }

        payload = {
            "title": "Backend Intern",
            "description": "Build APIs",
            "required_skills": ["python", "flask"],
            "seats_available": 2,
        }
        response = self.client.post(
            "/api/internships",
            json=payload,
            headers={"Authorization": "Bearer fake-token"},
        )

        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.get_json(), {"error": "Only employers can post internships"})

    @patch("app.routes.recommendations.get_collection")
    @patch("app.services.auth_service.AuthService.verify_token")
    def test_create_internship_success_for_employer(self, verify_token_mock, get_collection_mock):
        verify_token_mock.return_value = {
            "user_id": "507f1f77bcf86cd799439014",
            "email": "company@example.com",
            "role": "employer",
        }
        internships_col = get_collection_mock.return_value
        internships_col.insert_one.return_value = SimpleNamespace(
            inserted_id="507f1f77bcf86cd799439015"
        )

        payload = {
            "title": "Backend Intern",
            "description": "Build APIs",
            "required_skills": ["python", "flask"],
            "seats_available": 2,
            "duration_weeks": 10,
            "stipend": 12000,
        }
        response = self.client.post(
            "/api/internships",
            json=payload,
            headers={"Authorization": "Bearer fake-token"},
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            response.get_json(),
            {
                "internship_id": "507f1f77bcf86cd799439015",
                "title": "Backend Intern",
            },
        )

    @patch("app.routes.copilot.CopilotService.get_recommendations")
    @patch("app.services.auth_service.AuthService.verify_token")
    def test_copilot_recommendations_for_student(self, verify_token_mock, copilot_mock):
        verify_token_mock.return_value = {
            "user_id": "507f1f77bcf86cd799439016",
            "email": "student@example.com",
            "role": "student",
        }
        copilot_mock.return_value = (
            {
                "student": {
                    "user_id": "507f1f77bcf86cd799439016",
                    "name": "Student Name",
                    "skills": ["python", "flask"],
                },
                "query": "internship jobs python flask",
                "local_recommendations": [],
                "web_recommendations": [],
                "web_summary": "Set TAVILY_API_KEY to enable live web job search.",
                "tavily_enabled": False,
                "allocation_note": "Local internship matches respect open seat availability.",
            },
            200,
        )

        response = self.client.get(
            "/api/copilot/recommendations?top_n=5",
            headers={"Authorization": "Bearer fake-token"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["student"]["name"], "Student Name")


if __name__ == "__main__":
    unittest.main()
