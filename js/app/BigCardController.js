(function (stampit, spoker) {
	'use strict';

    spoker.BigCardController = stampit.compose(spoker.Controller, stampit().enclose(function (){
        this.setup = function () {
            this.model.on('change.selectedCard', function (value) {
                if (value) {
					this.view.showCard(value);
                } else {
					this.view.hideCard();
                }
            }.bind(this));

            this.view.on('requestHide', function () {
                if (this.model.get('isBigCardVisible')) {
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
