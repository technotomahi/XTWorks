var app = app || {};

app.allPostsView = Backbone.View.extend({
  tagName: "section",
  render: function() {
    // this line belwo looks at the items of my collection and performs a task
    this.collection.each(this.addPost, this);

    return this;
  },
  addPost: function(post) {
    var postView = new app.postView({ model: post });
    this.$el.append(postView.render().el);
  }
});


 
