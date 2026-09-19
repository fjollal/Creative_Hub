import { tickets, events } from "../data/mockData";

function TicketsPage() {
	return (
		<div>
			<div className="page-header">
				<div>
					<h1>My Tickets</h1>
					<p>Your purchased tickets</p>
				</div>
			</div>

			<div className="events-grid">
				{tickets.map((t) => {
					const ev = events.find((e) => e.id === t.eventId) || {};

					return (
						<div className="event-card" key={t.id}>
							<div className="event-content">
								<h3>{ev.title || "Unknown event"}</h3>

								<div className="event-info">
									<span>{t.holder}</span>
									<span>Seat: {t.seat}</span>
								</div>

								<div className="event-footer">
									<strong>{t.price === 0 ? "Free" : `€${t.price}`}</strong>
									<div className="event-tags">
										<span>{t.status}</span>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default TicketsPage;
