# Student Tech Hub

Student Tech Hub is a beginner-friendly full-stack web application designed to show upcoming technical events and allow students to register for them. 

The project is built using fundamental web technologies for the frontend (HTML, CSS, JavaScript) and a modern, fast Python framework (FastAPI) for the backend. It intentionally avoids complex frameworks or databases to keep things simple and easy to understand.

## Project Structure

- `frontend/`: Contains the user interface (HTML, CSS, JS).
- `backend/`: Contains the API logic (Python, FastAPI).

## Prerequisites
- Python 3.7+ installed on your computer.

## Setup Instructions

### 1. Install Python Dependencies
Open your terminal or command prompt, navigate to the `backend` folder, and install the required packages:

```bash
cd backend
pip install -r requirements.txt
```

### 2. Start the FastAPI Backend
While still in the `backend` folder, run the server using `uvicorn`:

```bash
uvicorn main:app --reload
```
The backend will start running on `http://127.0.0.1:8000`. Leave this terminal open.

### 3. Start the Frontend
There are several ways to serve the frontend:
- **Simplest method:** Just double-click the `frontend/index.html` file in your file explorer to open it in your browser.
- **Using VS Code:** Right-click `index.html` and select "Open with Live Server" (requires Live Server extension).
- **Using Python's built-in server:** Open a **new** terminal, navigate to the `frontend` folder, and run:
  ```bash
  cd frontend
  python -m http.server 5500
  ```
  Then open your browser and go to `http://localhost:5500`.

## How the Frontend Communicates with the Backend

The frontend uses JavaScript's built-in `fetch` API to communicate with the FastAPI backend over HTTP.

1. **Loading Events (GET Request):**
   When you click the "Load Events" button, `script.js` sends an HTTP GET request to `http://127.0.0.1:8000/api/events`. 
   The backend's `get_events` function receives this, returns a list of events in JSON format, and the frontend dynamically creates HTML elements to display them.

2. **Registration (POST Request):**
   When you fill out the registration form and click "Register", `script.js` intercepts the form submission. It gathers your Name and Email, packs them into a JSON object, and sends an HTTP POST request to `http://127.0.0.1:8000/api/register`. 
   The backend's `register_student` function receives this data, prints it to the terminal, and sends back a JSON success message which the frontend displays to you.
   
3. **CORS (Cross-Origin Resource Sharing):**
   Because the frontend (running as a file or on port 5500) and the backend (running on port 8000) are on different "origins", the backend uses a `CORSMiddleware` to explicitly allow the frontend to talk to it. Without this, the browser would block the requests for security reasons.
