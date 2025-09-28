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

const unfoldLines = (ics: string): string[] => {
	const lines = ics.split(/\r?\n/);
	const unfolded: string[] = [];

	for (const line of lines) {
		if (!line) continue;
		if (line.startsWith(' ') && unfolded.length) {
			unfolded[unfolded.length - 1] += line.slice(1);
		} else {
			unfolded.push(line);
		}
	}

	return unfolded;
};

const parseICalDate = (value?: string): Date | null => {
	if (!value) return null;
	const dateValue = value.trim();
	if (!dateValue) return null;

	if (dateValue.endsWith('Z')) {
		const d = new Date(dateValue);
		return Number.isNaN(d.getTime()) ? null : d;
	}

	if (/^\d{8}T\d{6}$/.test(dateValue)) {
		const year = Number(dateValue.slice(0, 4));
		const month = Number(dateValue.slice(4, 6)) - 1;
		const day = Number(dateValue.slice(6, 8));
		const hour = Number(dateValue.slice(9, 11));
		const minute = Number(dateValue.slice(11, 13));
		const second = Number(dateValue.slice(13, 15));
		return new Date(year, month, day, hour, minute, second);
	}

	if (/^\d{8}$/.test(dateValue)) {
		const year = Number(dateValue.slice(0, 4));
		const month = Number(dateValue.slice(4, 6)) - 1;
		const day = Number(dateValue.slice(6, 8));
		return new Date(year, month, day);
	}

	const fallback = new Date(dateValue);
	return Number.isNaN(fallback.getTime()) ? null : fallback;
};

const isAllDayValue = (value: string) => /^\d{8}$/.test(value.trim());

export const parseICalendar = (ics: string): CalendarEvent[] => {
	const events: CalendarEvent[] = [];
	const lines = unfoldLines(ics);
	let current: Record<string, string> | null = null;

	for (const rawLine of lines) {
		if (rawLine === 'BEGIN:VEVENT') {
			current = {};
			continue;
		}
		if (rawLine === 'END:VEVENT') {
			if (current) {
				const summary = current['SUMMARY'] || 'Untitled event';
				const start = parseICalDate(current['DTSTART']);
				const end = parseICalDate(current['DTEND']);
				if (start) {
					events.push({
						start,
						end,
						summary,
						description: current['DESCRIPTION'] ?? undefined,
						location: current['LOCATION'] ?? undefined,
						allDay: isAllDayValue(current['DTSTART'] ?? ''),
					});
				}
			}
			current = null;
			continue;
		}

		if (!current) continue;

		const [keyPart, value = ''] = rawLine.split(':', 2);
		const key = keyPart.split(';')[0];
		current[key] = value.replace(/\\n/g, '\n');
	}

	return events
		.filter((event) => !Number.isNaN(event.start.getTime()))
		.sort((a, b) => a.start.getTime() - b.start.getTime());
};

export const fetchCalendarEvents = async (): Promise<CalendarEvent[]> => {
	try {
		const response = await fetch(CALENDAR_URL, {
			headers: {
				'User-Agent':
					'BlastRoboticsSite/1.0 (+https://team10989.org; https://calendar.google.com) Mozilla/5.0',
				Accept: 'text/calendar, text/plain;q=0.9,*/*;q=0.8',
			},
		});
		if (!response.ok) {
			console.warn(`Calendar fetch failed with status ${response.status}`);
			return [];
		}

		const ics = await response.text();
		return parseICalendar(ics);
	} catch (error) {
		console.warn('Calendar fetch failed', error);
		return [];
	}
};

export const getFirstUpcomingEvent = (events: CalendarEvent[]): CalendarEvent | undefined => {
	const now = Date.now();
	return events.find((event) => event.start.getTime() >= now);
};

export const groupEventsByDateKey = (events: CalendarEvent[]): Record<string, CalendarEvent[]> => {
	const map: Record<string, CalendarEvent[]> = {};
	for (const event of events) {
		const key = formatDateKey(event.start);
		if (!map[key]) map[key] = [];
		map[key].push(event);
	}
	for (const key of Object.keys(map)) {
		map[key].sort((a, b) => a.start.getTime() - b.start.getTime());
	}
	return map;
};

export const formatDateKey = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

export const formatEventTimeRange = (event: CalendarEvent): string => {
	if (event.allDay) return 'All day';
	const start = event.start.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
	if (!event.end) return start;
	const end = event.end.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
	return `${start} – ${end}`;
};

export const getWeekRangeContaining = (date: Date): { start: Date; end: Date } => {
	const start = new Date(date);
	const day = start.getDay();
	const diff = (day + 6) % 7; // Monday as first day
	start.setDate(start.getDate() - diff);
	start.setHours(0, 0, 0, 0);

	const end = new Date(start);
	end.setDate(start.getDate() + 6);
	end.setHours(23, 59, 59, 999);

	return { start, end };
};
