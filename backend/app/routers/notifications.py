from fastapi import APIRouter, Depends, Security, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from ..db import get_db
from ..models.models import Notification, User
from jose import jwt
import os
from pydantic import BaseModel
from typing import List

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY", "devsecret")
ALGORITHM = "HS256"
auth_scheme = HTTPBearer()


def get_current_user(credentials: HTTPAuthorizationCredentials = Security(auth_scheme)) -> User:
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = int(payload.get("sub"))
    role = payload.get("role")
    return User(id=user_id, email="", hashed_password="", role=role)


class NotificationOut(BaseModel):
    id: int
    message: str
    is_read: bool
    created_at: str


@router.get("/me", response_model=List[NotificationOut])
def my_notifications(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    rows = db.query(Notification).filter(Notification.user_id == current_user.id).order_by(Notification.created_at.desc()).all()
    return [{"id": r.id, "message": r.message, "is_read": bool(r.is_read), "created_at": r.created_at.isoformat()} for r in rows]
