(function (stampit, spoker) {
    spoker.ToolbarController = stampit.compose(spoker.Controller, stampit().enclose(function (){
        this.setup = function () {
            this.view.on('selectCardSet', function () {
                this.model.set('cardSet', this.view.getSelectedCardSet());
            }.bind(this));
        };
    }));
}(window.stampit, window.spoker || {}));
