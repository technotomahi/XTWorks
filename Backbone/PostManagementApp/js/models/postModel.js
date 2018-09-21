var app= app || {};

app.postModel = Backbone.Model.extend({
    defaults: {
        id:"",
        title: "",
        body: ""
    },
    urlRoot: 'http://localhost:3000/posts'

});