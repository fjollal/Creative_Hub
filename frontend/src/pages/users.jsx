import { users } from "../data/mockData";

function UsersPage() {
	return (
		<div>
			<div className="page-header">
				<div>
					<h1>Users</h1>
					<p>Manage users and roles</p>
				</div>
			</div>

			<div className="dashboard-card">
				{users.map((u) => (
					<div key={u.id} style={{ padding: 12, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
						<strong>{u.name}</strong>
						<div style={{ color: "#6b7280", fontSize: 12 }}>{u.role} · {u.email}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default UsersPage;
