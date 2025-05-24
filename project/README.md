# Codepilot

A web app to run and learn JavaScript and Python code in the browser, with backend support for full Python features (including file I/O).

## Features
- Run JavaScript code directly in the browser
- Run Python code in the browser (Pyodide) or on a backend server (Flask)
- Supports Python file I/O and standard library via backend
- Modern React + Vite + TypeScript frontend
- Flask backend for secure Python execution

## Project Structure
- `project/` — Frontend (React, Vite, TypeScript)
- `python-backend/` — Backend (Flask, Python)

## Getting Started

### Frontend
1. Install dependencies:
   ```
   cd project
   npm install
   ```
2. Start the frontend:
   ```
   npm run dev
   ```

### Backend
1. Install Python dependencies:
   ```
   pip install flask flask_cors
   ```
2. Start the backend:
   ```
   cd python-backend
   python server.py
   ```

## Usage
- Open the frontend in your browser (usually http://localhost:5173)
- Select JavaScript or Python, write code, and click Run
- For Python, file I/O and full features are available when using the backend

## License
MIT
