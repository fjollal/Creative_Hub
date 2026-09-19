import { useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

import Dashboard from "./pages/dashboard";
import EventsPage from "./pages/events";
import TicketsPage from "./pages/tickets";
import AnalyticsPage from "./pages/anylitica";
import SettingsPage from "./pages/settings";
import UsersPage from "./pages/users";

function App() {
  const [activeTab, setActiveTab] =
    useState("dashboard");

  return (
    <div className="app">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="main-area">
        <Topbar />

        <main className="main-content">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "events" && <EventsPage />}
          {activeTab === "tickets" && <TicketsPage />}
          {activeTab === "analytics" && <AnalyticsPage />}
          {activeTab === "settings" && <SettingsPage />}
          {activeTab === "users" && <UsersPage />}
          {!["dashboard","events","tickets","analytics","settings","users"].includes(activeTab) && (
            <div className="coming-soon">
              <h1>{activeTab}</h1>

              <p>This page will be implemented next.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;