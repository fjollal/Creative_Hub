import { analytics } from "../data/mockData";

function AnalyticsPage() {
	return (
		<div>
			<div className="page-header">
				<div>
					<h1>Analytics</h1>
					<p>Key metrics and charts</p>
				</div>
			</div>

			<div className="dashboard-charts">
				<div className="dashboard-card">
					<h3>Monthly Registrations</h3>
					<div className="bar-chart">
						{analytics.monthly.map((m) => (
							<div className="bar-column" key={m.month}>
								<div className="bar-area">
									<div className="chart-bar" style={{ height: `${(m.registrations / Math.max(...analytics.monthly.map(x=>x.registrations))) * 100}%` }} />
								</div>

								<span className="month">{m.month}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AnalyticsPage;
