// processQueueEveryMinute.js
const fetch = require('node-fetch');

const endpoint = 'https://xzdrwkerysaugswnhrvx.supabase.co/functions/v1/process_email_queue';

function triggerQueue() {
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer [YOUR_SUPABASE_ANON_KEY]`
    },
    body: JSON.stringify({})
  })
    .then(response => response.json())
    .then(result => console.log('Queue processed:', result))
    .catch(err => console.error('Error processing queue:', err));
}

// Trigger every minute (10000 ms)
setInterval(triggerQueue, 10000);

// Optionally trigger immediately on startup:
triggerQueue();