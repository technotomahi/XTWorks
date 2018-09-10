var app = app || {};
app.allFlowersView = Backbone.View.extend({
    tagname: "section",
    render: function() {
        // this line belwo looks at the items of my collection and performs a task
        this.collection.each(this.addFlower, this);

        return this;
    },
    addFlower: function(flower) {
        var flowerView = new app.singleFlowerView({model: flower});
        this.$el.append(flowerView.render().el);
    }
});