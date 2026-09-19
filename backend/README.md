Backend scaffold

To run locally:

1. Create a virtualenv and install dependencies:

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

2. Run the app:

```bash
uvicorn app.main:app --reload --port 8000
```

3. Create admin:

```bash
set ADMIN_EMAIL=admin@example.com
set ADMIN_PASSWORD=secret
python -m app.scripts.create_admin
```
