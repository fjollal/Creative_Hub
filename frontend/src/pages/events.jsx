import EventCard from "../components/events/EventCard";
import { events } from "../data/mockData";

function EventsPage() {
	return (
		<div>
			<div className="page-header">
				<div>
					<h1>Events</h1>
					<p>All upcoming and past events</p>
				</div>
			</div>

			<div className="events-grid">
				{events.map((e) => (
					<EventCard key={e.id} event={e} />
				))}
			</div>
		</div>
	);
}

export default EventsPage;
