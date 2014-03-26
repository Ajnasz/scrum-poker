(function (stampit, spoker) {
    spoker.BigCardController = stampit.compose(spoker.Controller, stampit().enclose(function (){
        var showingBig = false;

        this.setup = function () {
            this.model.on('change.selectedCard', function (value) {
                if (value) {
                    if (!showingBig) {
                        this.view.showCard(value);
                        setTimeout(function () {
                            showingBig = true;
                        }, 300);
                    }
                } else {
                    if (showingBig) {
                        this.view.hideCard();
                        setTimeout(function () {
                            showingBig = false;
                        }, 300);
                    }
                }
            }.bind(this));

            this.view.on('requestHide', function () {
                if (this.model.get('isBigCardVisible') && showingBig) {
                    this.model.set('selectedCard', null);
                }
            }.bind(this));

            this.view.on('cardHide', function () {
                this.model.set('isBigCardVisible', false);
            }.bind(this));

            this.view.on('cardShow', function () {
                this.model.set('isBigCardVisible', true);
            }.bind(this));
        };
    }));
}(window.stampit, window.spoker || {}));
