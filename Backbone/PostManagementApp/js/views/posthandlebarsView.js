var app = app || {};

app.postView = Backbone.View.extend({
  tagName: "article",
  // template: _.template($("#postElement").html()), // now template is a compiled executable function
  events: {
    "click .btn-right": "onClickEdit",
    "click .btn-delete": "onClickDelete",
    "click .btn-save": "onClickSave",
    "click .btn-cancel": "onClickCancel"
  },
  render: function () {
    var rendered = Handlebars.templates.post(this.model.toJSON());
       this.$el.html(rendered);
    return this;
  },
    
  // Templating with handlebars
  onClickCancel: function() {
    var postId = this.model.attributes.id;
    var idSelector = "#post-" + postId;
    $( idSelector +  " .btn-right").show();
    $( idSelector +  " .btn-delete").show();
    $( idSelector +  " .post-block").show();
    $( idSelector +  " .edit-post").hide(); 
    $( idSelector +  " .edit-actions").toggle();   
  }, 
  onClickEdit: function() {
    var postId = this.model.attributes.id;
    var idSelector = "#post-" + postId;
    $( idSelector +  " .btn-right").hide();
    $( idSelector +  " .btn-delete").hide();
    $( idSelector +  " .post-block").hide();
    // $( idSelector +  " .edit-post").show(); 
    this.$( ".edit-post").show(); 
    this.$(  " .edit-actions").show();   
  },

  onClickSave: function() {
    var postId = this.model.attributes.id;
        var postToUpdate = new app.postModel({ id: postId });
    postToUpdate.fetch({
      success: function(postResponse) {
        console.log("Found the post: " + postResponse.get("title"));

        // Let us update this retreived book now (doing it in the callback) [UPDATE]
        var idSelector = "#post-" + postId;
        
       
        var newTitle = $( idSelector +  " .title-input").val();
        var newBody = $( idSelector +  " .body-input").val();
        postResponse.set("title", newTitle);
        postResponse.set("body", newBody);
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
  onClickDelete: function() {
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
