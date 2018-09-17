

var postModel = new app.postModel({id: 123, name: 'sdfsdf', author: 'Thi is the author'});
var postGroup = new app.postsCollection([postModel]);


fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(json =>{
// create model for all these posts 

  json.forEach(post => {
    var postModel =  new app.postModel({
      id: post.id,
      title: post.title,
      author: post.author
      
    });
    postGroup.add(postModel);
   
  });

  var postGroupView = new app.allPostsView({
    collection: postGroup
  }); 

  $("#allPosts").html(postGroupView.render().el);

})


var flowerRouter = new app.Router();
Backbone.history.start();