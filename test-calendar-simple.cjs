const https = require('https');
const url = 'https://calendar.google.com/calendar/ical/c_5ced3b5d7c83e41617dce78e1925c590e8b03a35909a6b66de06a517de2fb0d2%40group.calendar.google.com/public/basic.ics';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const events = data.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) || [];
    console.log('Total VEVENT blocks:', events.length);

    const now = new Date();
    console.log('Current date:', now.toISOString());

    // Parse a few events
    events.slice(0, 3).forEach((event, i) => {
      const summary = event.match(/SUMMARY:(.*)/)?.[1] || 'No summary';
      const dtstart = event.match(/DTSTART.*:(.*)/)?.[1] || 'No start';
      console.log(`Event ${i+1}: ${summary.trim()} - ${dtstart.trim()}`);
    });
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});