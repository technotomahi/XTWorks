var app = app || {};

app.rectangle = Backbone.Model.extend({
    defaults: {
        length: 12,
        width: 12
    },
    area: function() {
        return this.get("length") * this.get("width")
    }
});