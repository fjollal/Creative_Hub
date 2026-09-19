from fastapi import APIRouter, Depends, HTTPException, Security
from ..db import get_db
from sqlalchemy.orm import Session
from ..models.models import User
from jose import jwt
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import os

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY", "devsecret")
ALGORITHM = "HS256"
auth_scheme = HTTPBearer()


def get_current_user(credentials: HTTPAuthorizationCredentials = Security(auth_scheme)) -> User:
    token = credentials.credentials
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = int(payload.get("sub"))
    role = payload.get("role")
    user = User(id=user_id, email="", hashed_password="", role=role)
    return user


def require_admin(current_user: User = Depends(get_current_user)):
    if not current_user or current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admins only")


@router.get("/attendees/{event_id}")
def attendees(event_id: int, db: Session = Depends(get_db), _=Depends(require_admin)):
    # placeholder implementation since events not implemented in backend
    return {"attendees": []}
