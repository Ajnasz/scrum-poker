(function (stampit, spoker) {
    spoker.HistoryController = stampit.compose(spoker.Controller, stampit().enclose(function () {
        var DEFAULT_SET = spoker.ToolbarView.CARD_TYPES.STANDARD;

        function getStateFromURL() {
            var url = new URL(window.location.href);
            var cardSet = url.searchParams.get('cardSet');

            if (cardSet) {
                return {
                    cardSet: cardSet
                };
            }

            return null;
        }

        function isValidCardSet(cardSet) {
            return [
                spoker.ToolbarView.CARD_TYPES.FIBONACCI,
                spoker.ToolbarView.CARD_TYPES.STANDARD,
                spoker.ToolbarView.CARD_TYPES.TSHIRT,
            ].indexOf(cardSet) > -1;
        }

        function onStateChange(model, state) {
            if (!state || !state.cardSet) {
                model.set('cardSet', DEFAULT_SET);
            } else {
                model.set('cardSet', state.cardSet);
            }
        }

        this.setup = function () {
            var state;

            this.toolbarController.on('selectCardSet', function (cardSet) {
                if (isValidCardSet(cardSet)) {
                    history.pushState({
                        cardSet: cardSet,
                    }, '', '?cardSet=' + cardSet)
                    onStateChange(this.model, history.state);
                }
            }.bind(this));


            window.addEventListener('popstate', function (event) {
                onStateChange(this.model, event.state);
            }.bind(this));


            state = history.state || getStateFromURL() || { cardSet: DEFAULT_SET };

            if (isValidCardSet(state.cardSet)) {
                history.replaceState({
                    cardSet: state.cardSet
                }, '', '?cardSet=' + state.cardSet);
                onStateChange(this.model, state);
            }
        };
    }))
}(window.stampit, window.spoker || {}));
