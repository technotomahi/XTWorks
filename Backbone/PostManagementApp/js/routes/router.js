var app = app || {};

app.Router = Backbone.Router.extend({
  routes: {
    "": "noCopy", // this is how it woks ofr home page
    heirloomRose: "heirloomRoseMessage",
    rainbowRose: "rainbowRoseMessage",
    redRose: "redRoseMessage",
    home: "homeRoute",
    about: "aboutRoute"
  },
  noCopy: function() {
    $("#copy").html("");
  },

  heirloomRoseMessage: function() {
    $("#copy").html("Heirloom Roses are great Mother's Day flowers");
  },

  rainbowRoseMessage: function() {
    $("#copy").html("Choose Rainbow Roses for your wedding");
  },

  redRoseMessage: function() {
    $("#copy").html("On Valentine's Day, give that special someone Red Roses");
  },
  homeRoute: function() {
    var homeView = new HomeView();
    $("#content").html(homeView.el);
  },
  aboutRoute: function() {
    var aboutView = new AboutView();
    $("#content").html(aboutView.el);
  }
});
