const navigation = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "⌂",
  },
  {
    id: "events",
    label: "Events",
    icon: "▣",
  },
  {
    id: "tickets",
    label: "My Tickets",
    icon: "🎟",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: "▥",
  },
  {
    id: "users",
    label: "Users",
    icon: "♙",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "⚙",
  },
];

function Sidebar({
  activeTab,
  setActiveTab,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo">
          EventHub
        </div>

        
      </div>

      <div className="nav-title">
        Menu
      </div>

      <nav className="navigation">
        {navigation.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${
              activeTab === item.id
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab(item.id)
            }
          >
            <span>{item.icon}</span>

            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-user">
        <div className="user-avatar">
          AD
        </div>

        <div>
          <strong>Arlinda</strong>
          <span>Administrator</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;