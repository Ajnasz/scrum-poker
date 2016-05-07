(function (spoker) {
    'use strict';
    function init() {
        var model, cardsView, bigCardView, toolbarView, bigCardController, toolbarController, cardsController;

        model = spoker.CardsModel();
        cardsView = spoker.CardsView({
            place: 'PokerPlace'
        });
        bigCardView = spoker.BigCardView({
            card: 'DisplayedCard'
        });
        toolbarView = spoker.ToolbarView({
            toolbar: 'Toolbar'
        });
        bigCardController = spoker.BigCardController({
            view: bigCardView,
            model: model
        });
        toolbarController = spoker.ToolbarController({
            view: toolbarView,
            model: model
        });
        cardsController = spoker.CardsController({
            view: cardsView,
            model: model
        });

		(function () {
			var down = {x: null, y: null, target: null};

			function isSwiping(e) {
				var x = e.touches[0].clientX;
				var y = e.touches[0].clientY;

				var xDiff = down.x - x;
				var yDiff = down.y - y;

				return xDiff !== 0 || yDiff !== 0;
			}

			function getSwipeDetails(e) {
				var x = e.touches[0].clientX;
				var y = e.touches[0].clientY;

				var xDiff = down.x - x;
				var yDiff = down.y - y;

				var direction;

				if (Math.abs(xDiff) > Math.abs(yDiff)) { // X move
					if (xDiff > 0) {
						direction = 'left';
					} else {
						direction = 'right';
					}
				} else {
					if (yDiff > 0) {
						direction = 'up';
					} else {
						direction = 'down';
					}
				}

				return {
					direction: direction,
					xDiff: xDiff,
					yDiff: yDiff,
					xStart: down.x,
					xEnd: x,
					yStart: y,
					yEnd: y
				};
			}

			document.addEventListener('touchstart', function (e) {

				down.x = e.touches[0].clientX;
				down.y = e.touches[0].clientY;
				down.target = e.target;
			});

			/*
			document.addEventListener('touchmove', function (e) {
				document.dispatchEvent(new CustomEvent('swipe', {
					detail: getSwipeDetails(e)
				}));
			});
			*/

			document.addEventListener('touchend', function (e) {
				if (isSwiping(e)) {
					document.dispatchEvent(new CustomEvent('swipeend', {
						detail: getSwipeDetails(e)
					}));
				}

				down.x = null;
				down.y = null;
				down.target = null;
			});

			document.addEventListener('swipeend', function (event) {
				var direction = event.detail.direction;

				if (direction === 'left') {
					toolbarView.selectNextCardSet();
				} else if (direction === 'right') {
					toolbarView.selectPrevCardSet();
				}
			}, false);

		}());

        bigCardView.setup();
        cardsView.setup();
        toolbarView.setup();
        bigCardController.setup();
        toolbarController.setup();
        cardsController.setup();
        toolbarView.selectCardSet(spoker.ToolbarView.CARD_TYPES.STANDARD);
        model.set('cardSet', toolbarView.getSelectedCardSet());
    }

	function isLoaded() {
		var readyState = document.readyState;

		return readyState === 'complete' || readyState === 'loaded' || readyState === 'interactive';
	}

	if (isLoaded()) {
		init();
	} else {
		window.addEventListener('DOMContentLoaded', function () {
			setTimeout(init, 100);
		}, false);
	}
}(window.spoker || {}));
