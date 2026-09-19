from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt
import os
import datetime
from fastapi.security import OAuth2PasswordRequestForm
from ..db import get_db
from ..models.models import User
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi import Security

auth_scheme = HTTPBearer()

SECRET_KEY = os.getenv("SECRET_KEY", "devsecret")
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()


class RegisterIn(BaseModel):
    email: str
    password: str


@router.post("/register")
def register(data: RegisterIn, db: Session = Depends(get_db)):
    # ignore any role from the client — always create regular users
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="User exists")

    user = User(email=data.email, hashed_password=pwd_context.hash(data.password), role="user")
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"id": user.id, "email": user.email}


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not pwd_context.verify(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    to_encode = {"sub": str(user.id), "role": user.role, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=4)}
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me")
def me(credentials: HTTPAuthorizationCredentials = Security(auth_scheme), db: Session = Depends(get_db)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, os.getenv("SECRET_KEY", "devsecret"), algorithms=[os.getenv("ALGORITHM", "HS256")])
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = int(payload.get("sub"))
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {"id": user.id, "email": user.email, "role": user.role}
