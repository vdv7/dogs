const VERSION = "1.1";

const CACHE_NAME = "offline 1.1";
const OFFLINE_URL = "offline.html";


async function cacheOffline(){
    const cache = await caches.open(CACHE_NAME);
    await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
}

async function onlineOrOffline(req){
    try {
        // Always try the network first.
        return await fetch(req);
    } catch (error) {
        // if there is a network error, respond with offline files
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return cachedResponse;
    }
}

self.addEventListener("activate", (event) => {
    console.log('sw activated '+VERSION);
});

self.addEventListener("install", (event) => {
    console.log('sw installed '+VERSION);
    event.waitUntil( cacheOffline() );
});

self.addEventListener("fetch", (event) => {
    if (event.request.mode === "navigate") {
        event.respondWith( onlineOrOffline(event.request) );
    }
});
