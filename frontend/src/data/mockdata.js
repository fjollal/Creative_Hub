export const mockUser = {
  id: "u1",
  first_name: "Ardit",
  last_name: "Daku",
};

export const analytics = {
  total_events: 24,
  total_registrations: 8420,
  total_revenue: 128400,
  active_users: 1520,
  monthly: [
    { month: "Jan", registrations: 520 },
    { month: "Feb", registrations: 610 },
    { month: "Mar", registrations: 740 },
    { month: "Apr", registrations: 820 },
    { month: "May", registrations: 900 },
    { month: "Jun", registrations: 680 },
  ],
};

export const events = [
  {
    id: "e1",
    category: "Technology",
    title: "Intro to React",
    date: "2026-10-12",
    time: "18:00",
    location: "Main Hall",
    registered: 85,
    capacity: 100,
    status: "almost_full",
    price: 0,
    tags: ["react", "frontend"],
  },
  {
    id: "e2",
    category: "Music",
    title: "Live Jazz Night",
    date: "2026-11-03",
    time: "20:30",
    location: "Auditorium",
    registered: 120,
    capacity: 120,
    status: "full",
    price: 15,
    tags: ["jazz", "live"],
  },
  {
    id: "e3",
    category: "Art",
    title: "Watercolor Workshop",
    date: "2026-12-01",
    time: "10:00",
    location: "Studio 2",
    registered: 30,
    capacity: 60,
    status: "upcoming",
    price: 5,
    tags: ["art", "workshop"],
  },
];

export default { analytics, events, mockUser };

export const tickets = [
  {
    id: "t1",
    eventId: "e1",
    holder: "Ardit Daku",
    seat: "A12",
    price: 0,
    status: "confirmed",
  },
  {
    id: "t2",
    eventId: "e2",
    holder: "Besart Hoxha",
    seat: "B5",
    price: 15,
    status: "checked_in",
  },
];

export const users = [
  { id: "u1", name: "Ardit Daku", role: "Administrator", email: "ardit@example.com" },
  { id: "u2", name: "Besart Hoxha", role: "Member", email: "besart@example.com" },
];
