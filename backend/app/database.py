# app/database.py
from sqlmodel import SQLModel, create_engine, Session
from typing import Iterator

DATABASE_URL = "sqlite:///./issues.db"
# check_same_thread False is required for SQLite + multiprocessing dev use
engine = create_engine(DATABASE_URL, echo=False, connect_args={"check_same_thread": False})

def init_db() -> None:
    """
    Create DB tables (idempotent).
    """
    SQLModel.metadata.create_all(engine)

def get_session() -> Iterator[Session]:
    """
    Dependency generator for endpoints. Usage: session: Session = Depends(get_session)
    """
    with Session(engine) as session:
        yield session
