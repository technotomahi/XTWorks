import { DataService } from "./services/dataService";
import { DomManager } from "./shared/domManager";
import { Constants } from "./shared/constants";
import { RestaurantService } from "./services/restaurantService.js";
import { RestaurantController } from "./controllers/restaurantController.js";
import { CollectionController } from "./controllers/collectionController";
require("../scss/styles.scss");

var dataService = new DataService(Constants.ZOMATO_AUTH_KEY);
var restaurantService = new RestaurantService();
var restaurantController = new RestaurantController();
var collectionController = new CollectionController();
var searchBotton = document.getElementById("searchRestaurant");
var myCollectionsLink = document.getElementById("MyCollections");
var restaurantsLink = document.getElementById("RestaurantsLink");

searchBotton.addEventListener("click", searchRestaurants);
myCollectionsLink.addEventListener("click", searchCollections);
restaurantsLink.addEventListener("click", onClickSearchRestaurants);

function onClickSearchRestaurants() {
  activateView("restaurants");
  $("#searchForm").show();
  document.getElementById("inputSearch").focus();
}

function searchRestaurants() {
  activateView("restaurants");
  let searchParam = document.getElementById("inputSearch").value;
  if (searchParam === "") {
    alert("Please enter restaurant name to search");
    return;
  }
  restaurantController.searchRestaurants(searchParam);
}

function searchCollections() {
  activateView("collections");
  collectionController.searchCollections();
}

$(document).ready(function () { });

function cleanResultContainer() {
  document.getElementById("ResultContainer").innerHTML = "";
}

function activateView(type) {
  cleanResultContainer();
  switch (type) {
    case "collections":
      $("#ResultContainer").hide();
      $("#collection-section").show();
      $("#searchForm").hide();
      break;
    case 'restaurant':
    case "restaurants":
      $("#collection-section").hide();
      $("#ResultContainer").show();
      break;
    default:
  }
}
