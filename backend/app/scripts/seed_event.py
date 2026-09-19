from ..db import SessionLocal
from ..models.models import Event

def seed():
    db = SessionLocal()
    try:
        e = db.query(Event).first()
        if e:
            print(f"Event exists: {e.id}")
            return
        ev = Event(title="Demo Event", description="Seeded event", capacity=100)
        db.add(ev)
        db.commit()
        print(f"Created event {ev.id}")
    finally:
        db.close()

if __name__ == '__main__':
    seed()
