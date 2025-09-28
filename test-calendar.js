import https from 'https';

const CALENDAR_URL = 'https://calendar.google.com/calendar/ical/c_5ced3b5d7c83e41617dce78e1925c590e8b03a35909a6b66de06a517de2fb0d2%40group.calendar.google.com/public/basic.ics';

https.get(CALENDAR_URL, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Data length:', data.length);
    console.log('Contains VEVENT:', data.includes('VEVENT'));
    console.log('First 500 chars:', data.substring(0, 500));
  });
}).on('error', (err) => {
  console.error('Error:', err);
});