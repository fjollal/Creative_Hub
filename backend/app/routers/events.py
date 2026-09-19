from fastapi import APIRouter, Depends, HTTPException, Security
from sqlalchemy.orm import Session
from ..db import get_db
from ..models.models import Event, EventAttendee, User
from ..models.models import Notification
from typing import List
from pydantic import BaseModel
from jose import jwt
import os
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY", "devsecret")
ALGORITHM = "HS256"
auth_scheme = HTTPBearer()


def get_current_user_from_token(credentials: HTTPAuthorizationCredentials = Security(auth_scheme)) -> User:
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = int(payload.get("sub"))
    role = payload.get("role")
    return User(id=user_id, email="", hashed_password="", role=role)


class JoinResp(BaseModel):
    success: bool


@router.post("/{event_id}/join", response_model=JoinResp)
def join_event(event_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user_from_token)):
    # check existing
    existing = db.query(EventAttendee).filter(EventAttendee.event_id == event_id, EventAttendee.user_id == current_user.id).first()
    if existing:
        raise HTTPException(status_code=409, detail="Already joined")

    # ensure event exists
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    attendee = EventAttendee(user_id=current_user.id, event_id=event_id)
    db.add(attendee)
    db.commit()

    # notify admins
    admins = db.query(User).filter(User.role == "admin").all()
    for a in admins:
        note = Notification(user_id=a.id, message=f"{current_user.id} registered for {event.title}")
        db.add(note)

    # notify user
    user_note = Notification(user_id=current_user.id, message=f"You have successfully registered for {event.title}")
    db.add(user_note)
    db.commit()

    return {"success": True}


@router.delete("/{event_id}/leave", response_model=JoinResp)
def leave_event(event_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user_from_token)):
    existing = db.query(EventAttendee).filter(EventAttendee.event_id == event_id, EventAttendee.user_id == current_user.id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Not joined")
    db.delete(existing)
    db.commit()
    # optional: notify admins about leave
    event = db.query(Event).filter(Event.id == event_id).first()
    admins = db.query(User).filter(User.role == "admin").all()
    for a in admins:
        note = Notification(user_id=a.id, message=f"{current_user.id} left {event.title}")
        db.add(note)
    db.commit()
    return {"success": True}


class AttendeeOut(BaseModel):
    id: int
    email: str | None = None


@router.get("/{event_id}/attendees", response_model=List[AttendeeOut])
def attendees(event_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user_from_token)):
    # only admin can view full list
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admins only")

    rows = db.query(EventAttendee).filter(EventAttendee.event_id == event_id).all()
    result = []
    for r in rows:
        user = db.query(User).filter(User.id == r.user_id).first()
        result.append({"id": user.id, "email": user.email})
    return result
