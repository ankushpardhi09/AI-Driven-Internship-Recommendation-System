import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from app.utils.db_utils import get_collection, object_id
from app.models import Recommendation

class RecommendationEngine:
    """AI-powered internship recommendation engine using TF-IDF + Cosine Similarity"""
    
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            max_features=500,
            stop_words='english',
            min_df=1,
            max_df=0.8
        )
    
    def _combine_text(self, skills_list, text_description):
        """Combine skills and text into single string"""
        skills_str = ' '.join(skills_list) if isinstance(skills_list, list) else str(skills_list)
        return f"{skills_str} {text_description}"
    
    def get_recommendations(self, student_id, top_n=10):
        """
        Generate top N internship recommendations for a student
        
        Args:
            student_id: MongoDB ObjectId of student
            top_n: Number of recommendations to return
        
        Returns:
            List of recommendations with scores
        """
        students_col = get_collection('users')
        internships_col = get_collection('internships')
        
        # Get student data
        student = students_col.find_one({'_id': object_id(student_id), 'role': 'student'})
        if not student:
            return {'error': 'Student not found'}, 404
        
        # Get all open internships with available seats
        internships = list(internships_col.find({
            'status': 'open',
            'seats_available': {'$gt': 0}
        }))
        
        if not internships:
            return {'recommendations': []}, 200
        
        # Prepare texts for TF-IDF
        student_text = self._combine_text(
            student.get('skills', []),
            student.get('preferences', '')
        )

        recommendations_col = get_collection('recommendations')
        recommendations_col.delete_many({'student_id': object_id(student_id)})
        
        internship_texts = [
            self._combine_text(
                internship.get('required_skills', []),
                internship.get('description', '')
            )
            for internship in internships
        ]
        
        # Vectorize all texts
        all_texts = [student_text] + internship_texts
        tfidf_matrix = self.vectorizer.fit_transform(all_texts)
        
        # Calculate cosine similarity
        similarities = cosine_similarity(
            tfidf_matrix[0:1],
            tfidf_matrix[1:]
        )[0]
        
        # Create recommendations
        recommendations = []
        for rank, (idx, score) in enumerate(
            sorted(enumerate(similarities), key=lambda x: x[1], reverse=True)[:top_n],
            start=1
        ):
            internship = internships[idx]
            recommendations.append({
                'rank': rank,
                'internship_id': str(internship['_id']),
                'title': internship['title'],
                'company_id': str(internship['company_id']),
                'match_score': float(score),
                'required_skills': internship['required_skills'],
                'seats_available': internship['seats_available']
            })
            
            # Save recommendation to database
            rec_data = Recommendation.create(
                student_id=object_id(student_id),
                internship_id=internship['_id'],
                score=float(score),
                rank=rank
            )
            recommendations_col.insert_one(rec_data)
        
        return {'recommendations': recommendations}, 200
    
    def allocate_students(self):
        """
        Allocate students to internships based on match scores
        Respects seat availability and prevents duplicate allocations
        """
        recommendations_col = get_collection('recommendations')
        internships_col = get_collection('internships')
        applications_col = get_collection('applications')
        
        # Get all recommendations sorted by score
        all_recs = list(
            recommendations_col.find().sort([('score', -1)])
        )
        
        allocations = []
        for rec in all_recs:
            internship = internships_col.find_one({'_id': rec['internship_id']})
            
            # Check seat availability
            if internship['seats_filled'] >= internship['seats_available']:
                continue
            
            # Check if student already allocated
            existing = applications_col.find_one({
                'student_id': rec['student_id'],
                'internship_id': rec['internship_id'],
                'status': 'accepted'
            })
            if existing:
                continue
            
            # Create application
            application = {
                'student_id': rec['student_id'],
                'internship_id': rec['internship_id'],
                'status': 'accepted',
                'match_score': rec['score']
            }
            applications_col.insert_one(application)
            
            # Update seat count
            internships_col.update_one(
                {'_id': rec['internship_id']},
                {'$inc': {'seats_filled': 1}}
            )
            
            allocations.append(application)
        
        return {'allocated': len(allocations), 'allocations': allocations}