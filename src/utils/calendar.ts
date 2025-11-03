
// Calendar fetch logic enforces cache busting and always uses America/New_York timezone for display.
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
	'https://calendar.google.com/calendar/ical/admin%40team10989.org/private-56ce5cce0ea423375f0383dec6afa218/basic.ics';

export const fetchCalendarEvents = async (): Promise<CalendarEvent[]> => {
	try {
		// Add cache-busting timestamp to prevent stale data in production
		// This ensures fresh calendar data on every request
		const cacheBuster = new Date().getTime();
		const urlWithCacheBuster = `${CALENDAR_URL}?_=${cacheBuster}`;
		
		// Fetch with no-cache headers to prevent CDN/browser caching
		const events = await fromURL(urlWithCacheBuster, {
			headers: {
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				'Pragma': 'no-cache',
				'Expires': '0'
			}
		});
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

					// Preserve the original time from the event
					const originalStart = new Date(event.start);
					const start = new Date(date);
					start.setHours(originalStart.getHours(), originalStart.getMinutes(), originalStart.getSeconds(), originalStart.getMilliseconds());
					
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

	// Always display in EST (America/New_York)
	const timeZone = 'America/New_York';

	if (!end || start.getTime() === end.getTime()) {
		return start.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			timeZone: timeZone,
		});
	}

	const startStr = start.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		timeZone: timeZone,
	});

	const endStr = end.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		timeZone: timeZone,
	});

	return `${startStr} – ${endStr}`;
};
