# app/main.py
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
from datetime import datetime
from sqlmodel import Session, select
from sqlalchemy import func, or_

from .database import init_db, get_session, engine
from .models import Issue, IssueCreate, IssueUpdate, Status, Priority
from pydantic import BaseModel
from sqlmodel import SQLModel

app = FastAPI(title="Issue Tracker API", version="0.1.0")

# Dev CORS - allow all (for the Angular app during dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Response model for list endpoint
class IssueListResponse(BaseModel):
    total: int
    page: int
    page_size: int
    items: List[Issue]

    class Config:
        from_attributes = True


@app.on_event("startup")
def on_startup():
    # Create tables and seed sample data (if empty)
    init_db()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/issues", response_model=Issue, status_code=201)
def create_issue(issue_in: IssueCreate, session: Session = Depends(get_session)):
    """
    Create a new issue.
    """
    issue = Issue(**issue_in.dict())
    session.add(issue)
    session.commit()
    session.refresh(issue)
    return issue

@app.get("/issues", response_model=IssueListResponse)
def list_issues(
    q: Optional[str] = Query(None, description="search title assignee or description "),
    status: Optional[Status] = Query(None, description="filter by status"),
    priority: Optional[Priority] = Query(None, description="filter by priority"),
    sort_by: str = Query("created_at", description="created_at/updated_at/priority/status/title"),
    sort_order: str = Query("desc", regex="^(asc|desc)$"),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    session: Session = Depends(get_session)
):
    """
    List issues with optional search (q), filters, sorting and pagination.
    """
    conditions = []

    # search (case-insensitive)
    if q:
        q_like = f"%{q.lower()}%"
        title_cond = func.lower(Issue.title).like(q_like)
        # coalesce description to avoid NULL issues
        desc_cond = func.lower(func.coalesce(Issue.description, "")).like(q_like)
        conditions.append(or_(title_cond, desc_cond))

    if status:
        conditions.append(Issue.status == status)

    if priority:
        conditions.append(Issue.priority == priority)

    # base select
    stmt = select(Issue)
    if conditions:
        stmt = stmt.where(*conditions)

    # total count for pagination
    count_stmt = select(func.count()).select_from(Issue)
    if conditions:
        count_stmt = count_stmt.where(*conditions)
    total = session.exec(count_stmt).one()

    # sorting safe map
    allowed_sort = {
        "created_at": Issue.created_at,
        "updated_at": Issue.updated_at,
        "priority": Issue.priority,
        "status": Issue.status,
        "title": Issue.title,
        "assignee": Issue.assignee,
    }
    sort_col = allowed_sort.get(sort_by, Issue.created_at)
    if sort_order == "desc":
        stmt = stmt.order_by(sort_col.desc())
    else:
        stmt = stmt.order_by(sort_col)

    # pagination
    offset = (page - 1) * page_size
    stmt = stmt.offset(offset).limit(page_size)
    results = session.exec(stmt).all()

    return IssueListResponse(total=total, page=page, page_size=page_size, items=results)

@app.get("/issues/{issue_id}", response_model=Issue)
def get_issue(issue_id: int, session: Session = Depends(get_session)):
    issue = session.get(Issue, issue_id)
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    return issue

@app.put("/issues/{issue_id}", response_model=Issue)
def update_issue(issue_id: int, issue_in: IssueUpdate, session: Session = Depends(get_session)):
    issue = session.get(Issue, issue_id)
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")

    update_data = issue_in.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(issue, key, value)

    issue.updated_at = datetime.utcnow()
    session.add(issue)
    session.commit()
    session.refresh(issue)
    return issue
