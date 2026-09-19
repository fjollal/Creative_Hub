import os
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from ..db import SessionLocal
from ..models.models import User

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_admin():
    email = os.getenv("ADMIN_EMAIL")
    password = os.getenv("ADMIN_PASSWORD")
    if not email or not password:
        print("ADMIN_EMAIL and ADMIN_PASSWORD must be set")
        return

    db: Session = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()
        if user:
            if user.role != "admin":
                user.role = "admin"
                db.add(user)
                db.commit()
                print("Promoted existing user to admin")
            else:
                print("Admin already exists")
            return

        hashed = pwd.hash(password)
        new = User(email=email, hashed_password=hashed, role="admin")
        db.add(new)
        db.commit()
        print("Admin created")
    finally:
        db.close()


if __name__ == "__main__":
    create_admin()
