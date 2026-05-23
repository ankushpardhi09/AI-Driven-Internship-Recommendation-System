from pymongo import MongoClient
from app.config import Config
from bson.objectid import ObjectId

class Database:
    """MongoDB database helper"""
    
    _client = None
    _db = None
    
    @classmethod
    def connect(cls):
        """Connect to MongoDB"""
        if cls._client is None:
            cls._client = MongoClient(Config.MONGO_URI)
            cls._db = cls._client[Config.MONGO_DB_NAME]
            
            # Create indexes for better performance
            cls._db.users.create_index('email', unique=True)
            cls._db.internships.create_index('company_id')
            cls._db.applications.create_index([('student_id', 1), ('internship_id', 1)], unique=True)
            cls._db.recommendations.create_index([('student_id', 1), ('rank', 1)])
        
        return cls._db
    
    @classmethod
    def get_db(cls):
        """Get database instance"""
        if cls._db is None:
            cls.connect()
        return cls._db
    
    @classmethod
    def close(cls):
        """Close database connection"""
        if cls._client is not None:
            cls._client.close()
            cls._client = None
            cls._db = None

# Helper functions
def get_collection(collection_name):
    """Get a specific collection"""
    db = Database.get_db()
    return db[collection_name]

def object_id(id_str):
    """Convert string to ObjectId"""
    try:
        return ObjectId(id_str)
    except:
        return None