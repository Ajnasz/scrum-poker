/*global self, caches, fetch*/

var urlsToCache = [
	// '/index.html',
	'/offline.html',
	'/style.css',
	'/fonts/FiraSans-Regular.woff',
	'/fonts/FiraSans-Regular.woff2',
	'/images/CoffeeCup.svg',
	'/js/stampit.min.js',
	'/js/Util.js',
	'/js/Events.js',
	'/js/View.js',
	'/js/Controller.js',
	'/js/Model.js',
	'/js/app/CardsModel.js',
	'/js/app/ToolbarView.js',
	'/js/app/cardHelper.js',
	'/js/app/CardsView.js',
	'/js/app/BigCardView.js',
	'/js/app/BigCardController.js',
	'/js/app/ToolbarController.js',
	'/js/app/CardsController.js',
	'/js/app/app.js'
];


var cacheName = 'scrumpoker-v1.0.2';

self.addEventListener('activate', function (event) {
	'use strict';
	var cacheWhitelist = [cacheName];

	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		}).then(self.clients.claim())
	);
});
self.addEventListener('install', function (e) {
	'use strict';
	e.waitUntil(caches.open(cacheName).then(function (cache) {
		return cache.addAll(urlsToCache);
	}));
}, false);

function serveRightFromCache(event) {
	'use strict';
	return caches.open(cacheName).then(function (cache) {
		return cache.match(event.request);
	}).catch(function () {
		return fetch(event.request);
	});
}

function serveOnline(event, alias) {
	'use strict';

	return fetch(event.request, {cache: 'no-cache'}).catch(function() {
		return caches.open(cacheName).then(function (cache) {
			return cache.match(alias || event.request);
		});
	});
}

self.addEventListener('fetch', function (event) {
	'use strict';

	if (new URL(event.request.url).pathname === '/') {
		event.respondWith(serveOnline(event, '/offline.html'));
	} else {
		event.respondWith(serveRightFromCache(event));
	}
}, false);
