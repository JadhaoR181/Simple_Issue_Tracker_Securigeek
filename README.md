# 🚀 Simple Issue Tracker - Securigreek Internship

A full-stack **Issue Tracker** built with **FastAPI** (backend) and **Angular** (frontend) to efficiently manage and track issues.  

---

## 📝 Overview

This project demonstrates a complete full-stack web application with a REST API backend and a modern Angular frontend.

- ⚙️ **Backend (FastAPI):** Provides RESTful APIs for issue CRUD, search, filtering, sorting, and pagination.  
- 🖥️ **Frontend (Angular):** Material Design UI to list, filter, sort, and manage issues with forms and detail views.  

---

## ✨ Features

### 🔹 Backend (FastAPI)
- `GET /health` → Health check endpoint  
- `GET /issues` → List, search, filter, sort, paginate issues  
- `GET /issues/{id}` → Retrieve detailed issue information  
- `POST /issues` → Create new issue (auto-generated ID + timestamps)  
- `PUT /issues/{id}` → Update issue details (updates timestamp)  

### 🔹 Frontend (Angular)
- 📋 Issue table with columns: ID, Title, Status, Priority, Assignee, Updated At  
- 🔍 Search bar & filters for **status**, **priority**, **assignee**  
- ↕️ Column sorting  
- 📄 Pagination with custom page size  
- ➕ Create new issue form  
- ✏️ Edit issue form  
- 🔎 Detailed issue view on row click  

---

## 📂 Project Structure

```
root/
│
├── backend/              # FastAPI backend
│   ├── app/              # Application code
│   ├── requirements.txt  # Python dependencies
│   ├── Procfile          # Deployment config for Heroku
│   ├── runtime.txt       # Python runtime version
│   └── issues.db         # SQLite DB (dev only)
│
└── frontend/             # Angular frontend
    ├── src/              # Angular source code
    ├── angular.json      # Angular config
    └── ...
```

---

## 💻 Local Development Setup

### Backend (FastAPI)
cd backend
python -m venv .venv
Activate venv:
#Linux/macOS → source .venv/bin/activate
#Windows     → .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

## Frontend (Angular)
cd frontend
npm install
ng serve --open

```

---

## 📚 Tech Stack

**Backend**  
- Python, FastAPI, Uvicorn  
- SQLModel / SQLAlchemy  
- SQLite (dev), PostgreSQL (prod)  

**Frontend**  
- Angular, Angular Material  
- TypeScript, RxJS  

---

## 🙌 Acknowledgements
Special thanks to the open-source community and contributors whose tools and libraries power this project.

---

## 📬 Contact

**Ravindra Jadhav**  
📧 Email: jadhaor181@gmail.com  
🌐 Portfolio: [https://ravindra-portfolio-vite.vercel.app]( https://ravindra-portfolio-vite.vercel.app/)  
💼 LinkedIn: [linkedin.com/in/ravindrajadhav08](https://www.linkedin.com/in/ravindrajadhav08/)


---

