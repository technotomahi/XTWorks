 var app = app || {};

 app.postView = Backbone.View.extend({
     tagName : "article",
     template : _.template($("#postElement").html()),
     render: function() {
         var postTemplate = this.template(this.model.toJSON());
         this.$el.html(postTemplate);
         return this;

     }
 });