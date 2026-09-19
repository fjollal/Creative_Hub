import { useState } from "react";
import { mockUser } from "../data/mockData";

function SettingsPage() {
	const [firstName, setFirstName] = useState(mockUser.first_name || "");
	const [lastName, setLastName] = useState(mockUser.last_name || "");
	const [email, setEmail] = useState(mockUser.email || "");
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [saving, setSaving] = useState(false);

	const saveProfile = (e) => {
		e.preventDefault();
		setSaving(true);
		// mock save
		setTimeout(() => {
			setSaving(false);
			alert("Profile saved");
		}, 700);
	};

	const deleteAccount = () => {
		if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
		// mock delete
		alert("Account deletion requested (demo)");
	};

	return (
		<div className="settings-page">
			<div className="page-header">
				<div>
					<h1>Settings</h1>
					<p>Application and account settings</p>
				</div>
			</div>

			<div className="settings-grid">
				<section className="dashboard-card">
					<h3>Profile</h3>
					<form onSubmit={saveProfile}>
						<div className="form-row">
							<label>First name</label>
							<input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
						</div>

						<div className="form-row">
							<label>Last name</label>
							<input value={lastName} onChange={(e) => setLastName(e.target.value)} />
						</div>

						<div className="form-row">
							<label>Email</label>
							<input value={email} onChange={(e) => setEmail(e.target.value)} />
						</div>

						<div style={{ display: "flex", gap: 8, marginTop: 12 }}>
							<button className="primary-button" type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
							<button className="text-button" type="button" onClick={() => { setFirstName(mockUser.first_name); setLastName(mockUser.last_name); setEmail(mockUser.email); }}>Reset</button>
						</div>
					</form>
				</section>

				<section className="dashboard-card">
					<h3>Notifications</h3>
					<div className="form-row" style={{ alignItems: "center" }}>
						<label style={{ marginRight: 8 }}>Email notifications</label>
						<input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
					</div>

					<p style={{ color: "#6b7280", fontSize: 13 }}>Control how you receive updates about events and activity.</p>
				</section>

				<section className="dashboard-card">
					<h3>Account</h3>
					<div>
						<strong>Role:</strong> <span style={{ color: "#374151" }}>{mockUser.role || "User"}</span>
					</div>

					<div style={{ marginTop: 12 }}>
						<button className="danger-button" onClick={deleteAccount}>Delete account</button>
					</div>
				</section>
			</div>
		</div>
	);
}

export default SettingsPage;
