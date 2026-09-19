import { events, users } from "../data/mockData";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export async function joinEventBackend(eventId, token) {
  const res = await apiFetch(`/events/${eventId}/join`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
}

export async function leaveEventBackend(eventId, token) {
  const res = await apiFetch(`/events/${eventId}/leave`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
}

export async function attendeesCountBackend(eventId, token) {
  const res = await apiFetch(`/events/${eventId}/attendees`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return Array.isArray(res) ? res.length : 0;
}

export async function fetchNotifications(token) {
  return apiFetch(`/notifications/me`, { headers: { Authorization: `Bearer ${token}` } });
}

// fallback in-memory API for demo when backend not available
const joins = new Map();

export function getAttendees(eventId) {
  return Array.from(joins.get(eventId) || []).map((uid) => users.find((u) => u.id === uid));
}

export function userJoined(eventId, userId) {
  const set = joins.get(eventId) || new Set();
  return set.has(userId);
}

export function joinEvent(eventId, userId) {
  if (!userId) throw new Error("Unauthorized");

  const set = joins.get(eventId) || new Set();

  if (set.has(userId)) {
    throw new Error("Already joined");
  }

  set.add(userId);
  joins.set(eventId, set);

  return { success: true };
}

export function leaveEvent(eventId, userId) {
  if (!userId) throw new Error("Unauthorized");

  const set = joins.get(eventId) || new Set();

  if (!set.has(userId)) {
    throw new Error("Not joined");
  }

  set.delete(userId);
  joins.set(eventId, set);

  return { success: true };
}

export function attendeesCount(eventId) {
  return (joins.get(eventId) || new Set()).size;
}

export default {
  joinEventBackend,
  leaveEventBackend,
  attendeesCountBackend,
  getAttendees,
  userJoined,
  joinEvent,
  leaveEvent,
  attendeesCount,
};
