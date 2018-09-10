var redRoses = new app.singleFlower({
  name: "Red Roses",
  price: 39.95,
  color: "Red",
  img: "images/redRoses.jpg",
  link: "redRose"
});

var rainbowRoses = new app.singleFlower({
  name: "Rainbow Roses",
  price: 29.95,
  color: "orange",
  link: "rainbowRose"
});

var heirloomRoses = new app.singleFlower({
  name: "Heirloom roses",
  price: 19.95,
  img: "images/heirloomPinkRoses.jpg",
  link: "heirloomRose"
});

var flowerGroup = new app.FlowerCollection([
  redRoses,
  rainbowRoses,
  heirloomRoses
]);

// flowerGroup.add(rainbowRoses);
// rainbowRoses.remove(rainbowRoses);

console.log(flowerGroup.toJSON());

rainbowRoses.set("price", 1231232);

var flowerGroupView = new app.allFlowersView({
  collection: flowerGroup
});

$("#allFlowers").html(flowerGroupView.render().el);


var flowerRouter = new app.Router();
Backbone.history.start();