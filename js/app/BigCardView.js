(function (stampit, spoker) {
    spoker.BigCardView = stampit.compose(spoker.cardHelper, stampit.compose(spoker.View, stampit().enclose(function () {
        this.showCard = function (cardValue) {
            var card = this.byId(this.card);
            card.querySelector('.card-side.front').innerHTML = this.cardValueToHTML(cardValue);
            document.body.classList.add('show-in-big');
            this.emit('cardShow');
        };

        this.hideCard = function () {
            document.body.classList.remove('show-in-big');
            this.emit('cardHide');
        };

        this.isVisible = function () {
            return document.body.classList.contains('show-in-big');
        };

        this.setup = function () {
            this.listen(document.body, 'touchend', function () {
                this.emit('requestHide');
            }.bind(this));

            this.listen(document.body, 'click', function () {
                this.emit('requestHide');
            }.bind(this));
        };
    })));
}(window.stampit, window.spoker || {}));
