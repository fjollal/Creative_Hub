import { categoryConfig } from "../../config/eventConfig";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { mockUser } from "../../data/mockData";

function EventCard({ event }) {
  const category =
    categoryConfig[event.category] ||
    categoryConfig.Technology;

  const percentage = Math.round(
    (event.registered / event.capacity) * 100
  );

  const getStatusLabel = () => {
    if (event.status === "almost_full") {
      return "Almost Full";
    }

    if (event.status === "full") {
      return "Full";
    }

    return "Upcoming";
  };

  return (
    <div className="event-card">
      <div
        className="event-banner"
        style={{
          background: `linear-gradient(135deg, ${category.background}, ${category.accent}33)`,
        }}
      >
        <span className="event-emoji">{category.emoji}</span>

        <span className={`event-status ${event.status}`}>
          {getStatusLabel()}
        </span>
      </div>

      <div className="event-content">
        <div className="event-category" style={{ color: category.accent }}>
          {event.category}
        </div>

        <h3>{event.title}</h3>

        <div className="event-info">
          <span>📅 {event.date} · {event.time}</span>

          <span>📍 {event.location}</span>
        </div>

        <div className="capacity-bar">
          <div className="capacity-progress" style={{ width: `${percentage}%` }} />
        </div>

        <div className="capacity-info">
          <span>
            {event.registered}/{event.capacity} spots
          </span>

          <span>{percentage}%</span>
        </div>

        <div className="event-footer">
          <strong>{event.price === 0 ? "Free" : `€${event.price}`}</strong>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div className="event-tags">
              {event.tags.slice(0, 2).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div style={{ color: "#9ca3af", fontSize: 12 }}>{api.attendeesCount(event.id)} attending</div>

            {mockUser && (
              <JoinButton eventId={event.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function JoinButton({ eventId }) {
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = null; // TODO: wire real auth token

  useEffect(() => {
    setJoined(api.userJoined(eventId, mockUser.id));
  }, [eventId]);

  const toggle = async () => {
    setLoading(true);
    try {
      if (joined) {
        try { await api.leaveEventBackend(eventId, token); } catch (_) { api.leaveEvent(eventId, mockUser.id); }
        setJoined(false);
      } else {
        try { await api.joinEventBackend(eventId, token); } catch (_) { api.joinEvent(eventId, mockUser.id); }
        setJoined(true);
      }
    } catch (e) {
      alert(e.message || e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={toggle} disabled={loading} className="primary-button" style={{ padding: "6px 10px", fontSize: 12 }}>
      {loading ? "..." : (joined ? "Leave" : "Join")}
    </button>
  );
}

export default EventCard;
