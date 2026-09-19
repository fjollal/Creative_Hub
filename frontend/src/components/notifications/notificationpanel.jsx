import { useEffect, useState } from "react";
import api from "../../services/api";

function NotificationPanel() {
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		// attempt to fetch from backend; fallback to demo static
		const token = null; // TODO: wire auth token
		api
			.fetchNotifications(token)
			.then((list) => setNotes(list))
			.catch(() => setNotes([{ id: 1, message: "Welcome to Creative Hub", is_read: false, created_at: new Date().toISOString() }]));
	}, []);

	return (
		<div className="notifications-panel dashboard-card">
			<h4>Notifications</h4>
			<div>
				{notes.length === 0 && <div className="muted">No notifications</div>}
				{notes.map((n) => (
					<div key={n.id} className="notification-row">
						<div className="notification-message">{n.message}</div>
						<div className="notification-time">{new Date(n.created_at).toLocaleString()}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default NotificationPanel;
