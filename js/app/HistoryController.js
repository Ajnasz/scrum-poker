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
                model.set('cardSet', defaultSet);
            } else {
                model.set('cardSet', state.cardSet);
            }
        }

        this.setup = function () {
            var state;
            this.model.on('change.cardSet', function () {
                var cardSet = this.get('cardSet');

                if (isValidCardSet(cardSet)) {
                    history.pushState({
                        cardSet: cardSet,
                    }, '', '?cardSet=' + cardSet)
                }
            });


            window.addEventListener('popstate', function (event) {
                console.log('pop state', event);
                onStateChange(this.model, event.state);
            }.bind(this));


            state = history.state || getStateFromURL();

            if (state) {
                this.model.set('cardSet', state.cardSet);
                return;
            }

            history.replaceState({
                cardSet: defaultSet
            }, '', '?cardSet=' + defaultSet);
            this.model.set('cardSet', defaultSet);
        };
    }))
}(window.stampit, window.spoker || {}));
