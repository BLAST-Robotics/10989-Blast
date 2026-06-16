import type { APIRoute } from 'astro';
import { fetchCalendarEvents } from '../../utils/calendar';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const events = await fetchCalendarEvents();
    const serialized = events.map((event) => ({
      start: event.start.toISOString(),
      end: event.end ? event.end.toISOString() : null,
      summary: event.summary,
      description: event.description ?? '',
      location: event.location ?? '',
      allDay: event.allDay,
    }));

    return new Response(JSON.stringify(serialized), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Failed to fetch calendar events:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch events' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
