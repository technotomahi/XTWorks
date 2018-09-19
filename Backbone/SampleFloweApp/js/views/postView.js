var app = app || {};

app.postView = Backbone.View.extend({
  tagName: "article",
  template: _.template($("#postElement").html()),
  events: {
    "click .btn-right": "onclickEdit",
    "click .btn-delete": "onclickDelete"
  },
  render: function() {
    var postTemplate = this.template(this.model.toJSON());
    this.$el.html(postTemplate);
    return this;
  },
  onclickEdit: function() {
    var postId = this.model.attributes.id;
  alert("Going to update this post with id " + postId + "You can check that the title will be updated y appending '_updated' at teh title ");
    // Lets try to update 
    var postToUpdate = new app.postModel({ id: postId });
    postToUpdate.fetch({
      success: function(postResponse) {
        console.log("Found the post: " + postResponse.get("title"));

        // Let us update this retreived book now (doing it in the callback) [UPDATE]
        postResponse.set("title", postResponse.get("title") + "_updated");
        postResponse.save(
          {},
          {
            success: function(model, respose, options) {
              console.log("The model has been updated to the server");
              
            },
            error: function(model, xhr, options) {
              console.log("Something went wrong while updating the model");
            }
          }
        );
      }
    });
  },
  onclickDelete: function() {
    var postId = this.model.attributes.id;
    var response = confirm("Going to delete this post with id " + postId); 
    if(!response)
        return;

     // Let us delete the model with specific id  
     var postToDelete = new app.postModel({ id: postId });
     postToDelete.destroy({
         success: function (model, respose, options) {
             console.log("The model has deleted the server");
             alert("Succes !!!! The model has deleted the server")
         },
         error: function (model, xhr, options) {
             console.log("Something went wrong while deleting the model");
         }
     });
  }
});
