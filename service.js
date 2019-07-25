/*global self, caches, fetch*/

var urlsToCache = [
	'/offline.html',
	'/style.css',
	'/fonts/FiraSans-Regular.woff',
	'/fonts/FiraSans-Regular.woff2',
	'/fonts/FiraSans-Bold.woff',
	'/fonts/FiraSans-Bold.woff2',
	'/images/CoffeeCup.svg',
	'/images/icon-120.png',
	'/images/icon-128.png',
	'/images/icon-152.png',
	'/images/icon-16.png',
	'/images/icon-180.png',
	'/images/icon-192.png',
	'/images/icon-256.png',
	'/images/icon-32.png',
	'/images/icon-57.png',
	'/images/icon-60.png',
	'/images/icon-76.png',
	'/images/icon-90.png',
	'/images/icon.svg',
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
	'/js/app/HistoryController.js',
	'/js/app/CardsController.js',
	'/js/app/app.js'
];


var cacheName = 'scrumpoker-v1.0.19';

self.addEventListener('activate', function (event) {
	'use strict';
	var cacheWhitelist = [cacheName];

	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}

					return Promise.resolve();
				})
			);
		}).then(() => self.clients.claim())
	);
});
self.addEventListener('install', function (e) {
	'use strict';
	e.waitUntil(caches.open(cacheName).then(function (cache) {
		return cache.addAll(urlsToCache).catch();
	}));
}, false);

function serveRightFromCache(event) {
	'use strict';

	return caches.open(cacheName).then(function (cache) {
		return cache.match(event.request);
	}).then(function (response) {
		if (typeof response === 'undefined') {
			return fetch(event.request);
		}

		return Promise.resolve(response);
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
