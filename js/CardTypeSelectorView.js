(function (stampit, spoker) {
    spoker.CardTypeSelectorView = window.spoker.View.enclose(function () {
        this.setupCardTypeSelector = function () {
            var standardCardTypeSelector = this.byId('CardTypeSelectStandard'),
                tshirtCardTypeSelector = this.byId('CardTypeSelectTshirt'),
                fibonacciCardTypeSelector = this.byId('CardTypeSelectFibonacci');

            this.onClick(tshirtCardTypeSelector, function () {
                this.emit('tshirtSelected');
            }.bind(this));
            this.onClick(fibonacciCardTypeSelector, function () {
                this.emit('fibonacciSelected');
            }.bind(this));
            this.onTouchEnd(tshirtCardTypeSelector, function () {
                this.emit('tshirtSelected');
            }.bind(this));
            this.onTouchEnd(fibonacciCardTypeSelector, function () {
                this.emit('fibonacciSelected');
            }.bind(this));
            this.onClick(standardCardTypeSelector, function () {
                this.emit('standardSelected');
            }.bind(this));
            this.onTouchEnd(standardCardTypeSelector, function () {
                this.emit('standardSelected');
            }.bind(this));
        };
    });

}(window.stampit, window.spoker = window.spoker || {}));
