(function (stampit, spoker) {
	'use strict';

    spoker.BigCardView = stampit.compose(spoker.cardHelper, stampit.compose(spoker.View, stampit().init(function () {
        this.showCard = function (cardValue) {
            var card = this.byId(this.card),
				front;

            front = card.querySelector('.card-side.front');

			this.empty(front);

			front.insertAdjacentHTML('afterbegin', this.cardValueToHTML(cardValue));
            document.body.classList.add('show-in-big', 'animate-big');
        };

        this.hideCard = function () {
			var body = document.body;

            body.classList.remove('show-in-big');
            body.classList.add('animate-big');
        };

		this.onAnimationEnd = function (e) {
			switch (e.animationName) {
				case  'slide-card-up':
					this.emit('cardHide');
					break;
				case  'slide-card-down':
					this.emit('cardShow');
					break;
			}
		};


        this.setup = function () {
			var body = document.body,
				card = this.byId(this.card);

			this.onTouchEnd(body, function () {
				this.emit('requestHide');
			}.bind(this));

			this.onClick(body, function () {
                this.emit('requestHide');
			}.bind(this));

			card.addEventListener('webkitAnimationEnd', this.onAnimationEnd.bind(this), false);
			card.addEventListener('MSAnimationEnd', this.onAnimationEnd.bind(this), false);
			card.addEventListener('animationend', this.onAnimationEnd.bind(this), false);
        };
    })));
}(window.stampit, window.spoker || {}));
