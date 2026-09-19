import { useState, useEffect } from "react";
import LoginForm from "../auth/LoginForm";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

function Topbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    // refresh to update UI
    location.reload();
  };
  return (
    <header className="topbar">
      <div className="search-box">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search events..."
        />
      </div>

      <div className="topbar-right">
        <div className="live-status">
          <span className="live-dot" />
          Connected
        </div>

        <button className="notification-button">
          🔔
          <span className="notification-count">
            2
          </span>
        </button>

        <button className="primary-button" onClick={() => setShowLogin(true)}>Log in</button>
        {user && (
          <>
            <div className="topbar-avatar">{(user.email || "").substring(0,2).toUpperCase()}</div>
            <span style={{ marginLeft: 8 }}>{user.email}</span>
            <button className="text-button" onClick={logout}>Log out</button>
          </>
        )}
      </div>

      {showLogin && <LoginForm onClose={() => setShowLogin(false)} onSuccess={() => setShowLogin(false)} />}
    </header>
  );
}

export default Topbar;