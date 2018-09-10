var app = app || {};

app.singleFlower = Backbone.Model.extend({
    defaults: {
        colof : "pink",
        img: "images/placeholder.jpg"
    },

    initialize: function() {

            console.log(" A model instance named " + this.get("name") +" hase been created");

        this.on("change", function() {
            console.log("someth8ing in the model value is chanved");

        });


    }
});