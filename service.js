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


var cacheName = 'scrumpoker-v1.0.0';

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

self.addEventListener('fetch', function (event) {
	'use strict';
	
	event.respondWith(
	fetch(event.request).then(function (response) {
		var responseToCache = response.clone();

		caches.open(cacheName).then(function (cache) {
			cache.put(event.request, responseToCache);
		});

		return response;
	}).catch(function () {
		return caches.open(cacheName).then(function (cache) {
			if (/\.[a-z]{2,5}$/i.test(event.request.url)) {
				return caches.match(event.request);
			} else {
				return cache.match('offline.html');
			}
		});
	}));
}, false);
