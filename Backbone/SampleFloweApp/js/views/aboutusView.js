var HomeView = Backbone.View.extend({
    template: Handlebars.compile( $("#home-template").html() ),      
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.template({greeting:"Welcome to Backbone!"}));
    }
});


var AboutView = Backbone.View.extend({
    template: Handlebars.compile( $("#about-template").html() ),      
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.template({content:"As a software developer, I've always loved to build things..."}));
    }
});