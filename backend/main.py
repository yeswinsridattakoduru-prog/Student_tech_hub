from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Student Tech Hub API")

# Configure CORS so the frontend can make requests to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (good for local dev)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Sample Data
events_db = [
    {
        "id": 1,
        "title": "Intro to Web Development",
        "date": "2026-10-15",
        "speaker": "Alice Johnson",
        "description": "Learn the basics of HTML, CSS, and JS to build your first website."
    },
    {
        "id": 2,
        "title": "Python for Data Science",
        "date": "2026-10-22",
        "speaker": "Dr. Bob Smith",
        "description": "A beginner's guide to using Python for data analysis and visualization."
    },
    {
        "id": 3,
        "title": "Building APIs with FastAPI",
        "date": "2026-11-05",
        "speaker": "Charlie Davis",
        "description": "Discover how to build fast and robust backend APIs using Python and FastAPI."
    }
]

# Model for registration payload
class Registration(BaseModel):
    name: str
    email: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the Student Tech Hub API"}

@app.get("/api/events")
def get_events():
    """Returns a list of technical events."""
    return events_db

@app.post("/api/register")
def register_student(student: Registration):
    """Accepts a student's name and email for registration."""
    # In a real app, you would save this to a database
    print(f"Received registration for: {student.name} ({student.email})")
    return {
        "status": "success",
        "message": f"Welcome, {student.name}! You have successfully registered."
    }
