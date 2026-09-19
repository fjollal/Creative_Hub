from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import auth, events, admin
from .db import engine
from .models.models import Base

app = FastAPI()

# create tables for development convenience
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")
app.include_router(events.router, prefix="/events")
app.include_router(admin.router, prefix="/admin")
from .routers import notifications

app.include_router(notifications.router, prefix="/notifications")


@app.get("/")
def root():
    return {"status": "ok"}
