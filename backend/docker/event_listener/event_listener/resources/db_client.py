from sqlalchemy import create_engine
from event_listener.settings import settings
from sqlalchemy.orm import Session

class DatabaseClient:
    def __init__(self):
        self.engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
    
    def update(self, stmt: str):
        
        with Session(self.engine) as session:

            result = session.execute(stmt)
            session.commit()

            return result