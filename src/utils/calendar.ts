import { fromURL } from 'node-ical';

export interface CalendarEvent {
	start: Date;
	end: Date | null;
	summary: string;
	description?: string;
	location?: string;
	allDay: boolean;
}

const CALENDAR_URL =
	'https://calendar.google.com/calendar/ical/c_5ced3b5d7c83e41617dce78e1925c590e8b03a35909a6b66de06a517de2fb0d2%40group.calendar.google.com/public/basic.ics';

export const fetchCalendarEvents = async (): Promise<CalendarEvent[]> => {
	try {
		const events = await fromURL(CALENDAR_URL);
		const processedEvents: CalendarEvent[] = [];

		const now = new Date();
		// Look 6 months in the past and 6 months in the future for events
		const startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
		const endDate = new Date(now.getFullYear(), now.getMonth() + 6, 1);

		for (const key in events) {
			const event = events[key];
			if (event.type !== 'VEVENT') continue;

			const title = event.summary || 'Untitled Event';

			if (event.rrule) {
				const dates = event.rrule.between(startDate, endDate);

				for (const date of dates) {
					// Handle exceptions
					if (event.exdate) {
						const exdates = Object.keys(event.exdate).map((d) => new Date(d).getTime());
						if (exdates.includes(date.getTime())) {
							continue; // Skip this occurrence
						}
					}

					const start = new Date(date);
					const duration = event.end ? event.end.getTime() - event.start.getTime() : 0;
					const end = duration > 0 ? new Date(start.getTime() + duration) : start;

					processedEvents.push({
						summary: title,
						start: start,
						end: end,
						description: event.description,
						location: event.location,
						allDay: event.datetype === 'date',
					});
				}
			} else {
				// Non-recurring event
				if (event.start && new Date(event.start) >= startDate && new Date(event.start) <= endDate) {
					processedEvents.push({
						summary: title,
						start: new Date(event.start),
						end: event.end ? new Date(event.end) : null,
						description: event.description,
						location: event.location,
						allDay: event.datetype === 'date',
					});
				}
			}
		}

		return processedEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
	} catch (error) {
		console.error('Failed to fetch or parse calendar events:', error);
		return [];
	}
};

export const getFirstUpcomingEvent = (events: CalendarEvent[]): CalendarEvent | undefined => {
	const now = new Date();
	return events.find((event) => event.start > now);
};

export const formatEventTimeRange = (event: CalendarEvent): string => {
	if (event.allDay) {
		return 'All day';
	}

	const start = event.start;
	const end = event.end;

	if (!end || start.getTime() === end.getTime()) {
		return start.toLocaleTimeString(undefined, {
			hour: 'numeric',
			minute: '2-digit',
		});
	}

	const startStr = start.toLocaleTimeString(undefined, {
		hour: 'numeric',
		minute: '2-digit',
	});

	const endStr = end.toLocaleTimeString(undefined, {
		hour: 'numeric',
		minute: '2-digit',
	});

	return `${startStr} – ${endStr}`;
};
