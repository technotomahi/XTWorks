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
var restaurantsSearchModlaLink = document.getElementById(
  "restaurant-name-search"
);
var addCollectionBotton = document.getElementById("add-collection");
var updateCollectionBotton = document.getElementById("update-collection");

searchBotton.addEventListener("click", searchRestaurants);
myCollectionsLink.addEventListener("click", searchCollections);
restaurantsLink.addEventListener("click", onClickSearchRestaurants);
restaurantsSearchModlaLink.addEventListener("keyup", onKeyUpSearchRestaurants);
addCollectionBotton.addEventListener("click", addCollection);
updateCollectionBotton.addEventListener("click", updateCollection);

function onClickSearchRestaurants() {
  activateView("restaurants");
  $("#searchForm").show();
  document.getElementById("inputSearch").focus();
}

function onKeyUpSearchRestaurants() {
  var searchParam = document.getElementById("restaurant-name-search").value;
  restaurantController.searchRestaurantsForModal(searchParam);
}

function searchRestaurants() {
  activateView("restaurants");
  let searchParam = document.getElementById("inputSearch").value;
  if (searchParam === "") {
    alert("Please enter restaurant name to search");
    return;
  }
  restaurantController.searchRestaurants(searchParam, 0);
}

function searchCollections() {
  activateView("collections");
  collectionController = collectionController
    ? collectionController
    : new CollectionController();
  collectionController.searchCollections();
}

function addCollection() {
  let collectionName = document.getElementById("collection-name").value;
  var restaturantIds = $(".restaurantCheckbox:checked")
    .map(function() {
      return $(this).val();
    })
    .get();
  let payload = {
    title: collectionName,
    author: "Mahi",
    restaurants: DomManager.getArrayOfObjects(restaturantIds)
  };
  collectionController.addCollection(payload);
}

function updateCollection() {
  let collectionName = document.getElementById("collection-name").value;
  ;
  var restaturantIds = $(".restaurantCheckbox:checked")
    .map(function() {
      return $(this).val();
    })
    .get();
  let collectionId = document
    .getElementById("collection-name")
    .getAttribute("data-info");
  let payload = {
    id: collectionId,
    title: collectionName,
    restaurants: DomManager.getArrayOfObjects(restaturantIds)
  };
  collectionController.updateCollection(payload);
}

$(document).ready(function() {});

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
    case "restaurant":
    case "restaurants":
      $("#collection-section").hide();
      $("#ResultContainer").show();
      break;
    default:
  }
}
