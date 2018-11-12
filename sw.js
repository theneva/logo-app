console.log('hello from sw');

self.addEventListener('install', function(event) {
  // Perform install steps
  console.log('install');
});

let i = 0;
onmessage = async e => {
  console.log('e in sw', e);
  const clients = await self.clients.matchAll();
  clients.map(client => client.postMessage(`hello ${++i}`));
}

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
