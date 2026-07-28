# WebDivers — Helldivers-Themed Concept Web Application (Django)

A themed web application inspired by the universe and UI design of *Helldivers*. Developed as an unconventional response to a Python web assignment, focusing on immersive concept styling, custom layout design, and Django backend integration.

---

## Concept & Highlights

- **Original Take:** Instead of standard generic cyberpunk tropes, the project adopts the tactical aesthetics, UI elements, and lore-driven presentation of Helldivers.
- **Full-Stack Foundation:** Built with Django to support dynamic template rendering, route management, and data models for future features.

---

## Tech Stack & Tools

- **Backend Framework:** Python / Django
- **Frontend Assets:** HTML5, Custom CSS3 Styling, JavaScript (located in `static/` & `templates/`)
- **Database & ORM:** SQLite / Django ORM

---

## Architecture & System Design

```
WebDivers/
├── manage.py               # Django execution script
├── WebDivers/              # Core project configuration (settings.py, urls.py)
├── main/                   # Application module
│   ├── models.py           # Domain models
│   ├── views.py            # Route request handlers
│   ├── urls.py             # App-level URL routing
│   ├── templates/          # HTML templates for Helldivers-styled pages
│   └── static/             # CSS styling, custom JS, and UI media assets
└── db.sqlite3              # Local development database
```

---

## Getting Started & Local Setup

### Prerequisites

- Python 3.10 or higher

### Installation & Execution

1. Clone the repository:
   ```
   git clone [https://github.com/maychenko/WebDivers.git](https://github.com/maychenko/WebDivers.git)
   cd WebDivers
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. Install requirements (if `requirements.txt` exists) or install Django:
   ```
   pip install django
   ```

4. Apply migrations:
   ```
   python manage.py migrate
   ```

5. Launch the local server:
   ```
   python manage.py runserver
   ```
   Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in your browser.
