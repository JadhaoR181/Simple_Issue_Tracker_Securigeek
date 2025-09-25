# app/models.py
from typing import Optional
from datetime import datetime
from enum import Enum
from sqlmodel import SQLModel, Field

class Status(str, Enum):
    open = "open"
    in_progress = "in_progress"
    closed = "closed"

class Priority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class IssueBase(SQLModel):
    title: str = Field(index=True)
    description: Optional[str] = None
    status: Status = Field(default=Status.open)
    priority: Priority = Field(default=Priority.medium)
    assignee: str = Field(index=True)

class Issue(IssueBase, table=True):
    """
    Full DB model (table=True). Fields auto-mapped by SQLModel.
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow, index=True)
    updated_at: datetime = Field(default_factory=datetime.utcnow, index=True)

class IssueCreate(IssueBase):
    """
    Input schema for POST /issues (same as IssueBase).
    """
    pass

class IssueUpdate(SQLModel):
    """
    Input schema for PUT /issues/{id} - all fields optional
    """
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[Status] = None
    priority: Optional[Priority] = None
    assignee: Optional[str] = None
