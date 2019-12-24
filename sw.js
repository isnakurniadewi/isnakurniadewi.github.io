importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if(workbox){
  console.log( `Workbox berhasil di load`);
} else {
  console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
  {url: '/', revision:'1'},
  {url: '/index.html', revision:'1'},
  {url: '/detail.html', revision:'1'},
  {url: '/nav.html', revision:'1'},
  {url: '/pages/beranda.html', revision:'1'},
  {url: '/pages/matches.html', revision:'1'},
  {url: '/pages/saved.html', revision:'1'},
  {url: '/pages/standing.html', revision:'1'},
  {url: '/css/materialize.min.css', revision:'1'},
  {url: '/js/materialize.min.js', revision:'1'},
  {url: '/js/api.js', revision:'1'},
  {url: '/idb.js', revision:'1'},
  {url: '/db.js', revision:'1'},
  {url: '/nav.js', revision:'1'},
  {url: '/push.js', revision:'1'},
  {url: '/manifest.json', revision:'1'},
  {url: '/icon.png', revision:'1'},
]);

workbox.routing.registerRoute(
  new RegExp('/'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate()
);

self.addEventListener("push", function(event){
  var body;
  if(event.data){
      body = event.data.text();
  }else{
      body = "Push message no payload";
  }

  var options = {
      body: body,
      icon: '/icon.png',
      vibrate: [100,50,100],
      data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
      }
  };

  event.waitUntil(
      self.registration.showNotification('Push Notification', options)
  );
});
