(function (stampit, spoker) {
    var defaults = window.stampit().state({
        viewEvents: {
            placeClick: function (e) {
                this.onPlaceClick(e);
            }
        }
    }), controller;

    controller = window.spoker.Controller.enclose(function () {
        var showing = false,
            placeClickEnabled = true;

        function cardChangeDisabled() {
            return showing || !placeClickEnabled;
        }

        this.onPlaceClick = function (event) {
            if (cardChangeDisabled()) {
                return;
            }

            if (this.view.isBigCardVisible()) {
                this.view.hideBigCard();
            } else {
                this.view.showBigCard(event.target);
            }

            showing = true;

            setTimeout(function () {
                showing = false;
            }, 200);

        };
    });
    spoker.PlaceController = window.stampit.compose(defaults, controller);


}(window.stampit, window.spoker = window.spoker || {}));
