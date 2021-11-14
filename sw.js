self.addEventListener('install', evt => {
    console.log('service worker installed')
});

self.addEventListener('activate', evt => {
    console.log('service worker activated')
});

