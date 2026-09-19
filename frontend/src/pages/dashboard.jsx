import EventCard from "../components/events/EventCard";

import {
  analytics,
  events,
  mockUser,
} from "../data/mockData";

import { categoryConfig } from "../config/eventConfig";

function Dashboard() {
  const maxRegistrations = Math.max(
    ...analytics.monthly.map((item) => item.registrations)
  );

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, {mockUser.first_name} — here's your overview</p>
        </div>

        <div className="header-actions">
          <div className="live-status">
            <span className="live-dot" /> Live
          </div>

          <button className="primary-button">+ New Event</button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard icon="📅" title="Total Events" value={analytics.total_events} change="+3 this month" />

        <StatCard
          icon="👥"
          title="Registrations"
          value={analytics.total_registrations.toLocaleString()}
          change="+520 this month"
        />

        <StatCard
          icon="📈"
          title="Revenue (€)"
          value={`€${analytics.total_revenue.toLocaleString()}`}
          change="+€4,200 this month"
        />

        <StatCard icon="⚡" title="Active Users" value={analytics.active_users.toLocaleString()} change="+142 this week" />
      </div>

      <div className="dashboard-charts">
        <div className="dashboard-card">
          <h3>Monthly Registrations</h3>

          <div className="bar-chart">
            {analytics.monthly.map((item) => {
              const height = (item.registrations / maxRegistrations) * 100;

              return (
                <div className="bar-column" key={item.month}>
                  <div className="bar-area">
                    <div className="chart-bar" style={{ height: `${height}%` }} />
                  </div>

                  <span className="month">{item.month}</span>

                  <span className="bar-number">{item.registrations}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Events by Category</h3>

          <div className="categories">
            {Object.entries(categoryConfig).map(([name, config]) => {
              const count = events.filter((event) => event.category === name).length;

              const percentage = events.length === 0 ? 0 : (count / events.length) * 100;

              return (
                <div className="category-row" key={name}>
                  <span className="category-name" style={{ color: config.accent }}>
                    {name}
                  </span>

                  <div className="category-track">
                    <div className="category-progress" style={{ width: `${percentage}%`, background: config.accent }} />
                  </div>

                  <span className="category-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="recent-section">
        <div className="section-header">
          <h2>Recent Events</h2>

          <button className="text-button">View all →</button>
        </div>

        <div className="events-grid">
          {events.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, change }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <span className="stat-title">{title}</span>
      <strong className="stat-value">{value}</strong>
      <span className="stat-change">{change}</span>
    </div>
  );
}

export default Dashboard;
