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
