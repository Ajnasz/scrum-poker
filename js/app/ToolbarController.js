(function (stampit, spoker) {
    spoker.ToolbarController = stampit.compose(spoker.Controller, stampit().enclose(function (){
        this.setup = function () {
            this.view.on('selectCardSet', function (cardSetName) {
                this.emit('selectCardSet', cardSetName)
            }.bind(this));

            var view = this.view;
            this.model.on('change.cardSet', function () {
                view.selectCardSet(this.get('cardSet'));
            });
        };
    }));
}(window.stampit, window.spoker || {}));
