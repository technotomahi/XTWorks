var app= app || {};

app.postModel = Backbone.Model.extend({
    defaults: {
        id:"",
        title: "",
        body: ""
    }

});