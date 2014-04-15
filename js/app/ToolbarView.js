(function (stampit, spoker) {
    var CARD_TYPES, CLASS_NAMES, ToolbarView;

    CARD_TYPES = {
        FIBONACCI:'fibonacci',
        STANDARD: 'standard',
        TSHIRT: 'tshirt'
    };

    CLASS_NAMES = {
        STANDARD: 'active-standard',
        TSHIRT: 'active-tshirt',
        FIBONACCI: 'active-fibonacci'
    };

    ToolbarView = stampit.compose(spoker.View, stampit().enclose(function () {

        function getToolbar() {
            return this.byId(this.toolbar);
        }

        this.selectCardSet = function (cardSetName) {
            var toolbar = getToolbar.call(this);

            if (cardSetName === CARD_TYPES.STANDARD) {
                toolbar.classList.add(CLASS_NAMES.STANDARD);
            } else {
                toolbar.classList.remove(CLASS_NAMES.STANDARD);
            }

            if (cardSetName === CARD_TYPES.TSHIRT) {
                toolbar.classList.add(CLASS_NAMES.TSHIRT);
            } else {
                toolbar.classList.remove(CLASS_NAMES.TSHIRT);
            }

            if (cardSetName === CARD_TYPES.FIBONACCI) {
                toolbar.classList.add(CLASS_NAMES.FIBONACCI);
            } else {
                toolbar.classList.remove(CLASS_NAMES.FIBONACCI);
            }
        };

        this.getSelectedCardSet = function () {
            var toolbar = getToolbar.call(this),
                output = null;

            if (toolbar.classList.contains(CLASS_NAMES.FIBONACCI)) {
                output = CARD_TYPES.FIBONACCI;
            } else if (toolbar.classList.contains(CLASS_NAMES.TSHIRT)) {
                output = CARD_TYPES.TSHIRT;
            } else {
                output = CARD_TYPES.STANDARD;
            }

            return output;
        };

        function getCardSetName(toolbarButton) {
            return toolbarButton.dataset.cardtype;
        }

        function onToolbarUserSelect(event) {
            if (event.target.classList.contains('toolbar-button')) {
                this.selectCardSet(getCardSetName(event.target));
                this.emit('selectCardSet');
            }
        }

        this.setup = function () {
            this.listen(this.toolbar, this.DOM_EVENTS.TOUCHSTART, onToolbarUserSelect.bind(this));
            this.listen(this.toolbar, this.DOM_EVENTS.CLICK, onToolbarUserSelect.bind(this));
            setTimeout(function () {
                getToolbar.call(this).classList.add('loaded');
            }.bind(this), 500);
        };
    }));

    ToolbarView.CARD_TYPES = CARD_TYPES;

    spoker.ToolbarView = ToolbarView;
}(window.stampit, window.spoker || {}));
