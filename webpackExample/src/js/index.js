import { Greeter } from "./greeter.js";
import { DataService } from "./services/dataService";
require("../scss/styles.scss");

// document.write("Hello from Javascript");

var greeterObj = new Greeter("from Index hello");
//var greeterObj = new Greeter1("from greeter1 hello");
// document.write('<h1 class="green">Hello World from the server : '+ greeterObj.greet() +' </h1>');

var dataService = new DataService("d9ccd37d2d650e0f24917ab3ea4126be");
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
//alert(123);
function searchRestaurants() {
  //e.preventDefault();
  activateView("restaurants");
  const cityId = 4;
  let searchParam = document.getElementById("inputSearch").value;
  if (searchParam === "") {
    alert("Please enter restaurant name to search");
    return;
  }

  let queryParams = `?entity_id=4&entity_type=city&q=${encodeURI(
    searchParam
  )}&count=10`;
  let searchUrl = "https://developers.zomato.com/api/v2.1/search";
  searchUrl = searchUrl + queryParams;
  //dataService.logJSON(searchUrl );
  dataService
    .getJSON(searchUrl)
    .then(data => {
      //console.log(data);
      displayRestaurants(data);
    })
    .catch(err => {
      console.log(err);
    });
}

function searchCollections() {
  activateView("collections");
  let collectionUrl = "http://localhost:3004/collections";
  dataService
    .getJSON(collectionUrl)
    .then(data => {
      console.log(data);
      displayCollections(data);
    })
    .catch(err => {
      console.log(err);
    });
}

function onclickRestaurantDetail(id) {
  activateView("restaurant");
  let url = "https://developers.zomato.com/api/v2.1/restaurant?res_id=60192";
  dataService
    .getJSON(url)
    .then(data => {
      console.log(data);
      displayRestaurantDetail(data);
    })
    .catch(err => {
      console.log(err);
    });
}

$(document).ready(function() {});

/**
 * Displays Restaurant Information
 * @param {*} restData 
 */
function displayRestaurantDetail(restData) {
  console.log(restData);
  let searchResultsPlaceholder = document.getElementById("ResultContainer");
  searchResultsPlaceholder.innerHTML = "";

  var divElement = document.createElement("div");
  var textNode = getAParaNode( restData.name );
   var addressNode = getAParaNode(  restData["location"].address);
  divElement.appendChild(textNode);
  divElement.appendChild(addressNode);

   
  searchResultsPlaceholder.appendChild(divElement);
}

function displayRestaurants(restData) {
  console.log(restData);
  let searchResultsPlaceholder = document.getElementById("ResultContainer");
  searchResultsPlaceholder.innerHTML = "";
  var totalitemsFound = restData.results_found;
  if (totalitemsFound == 0) {
    var paraNode = getAParaNode(
      "Oops, Your search returned no results !!",
      "text-danger"
    );

    searchResultsPlaceholder.appendChild(paraNode);
    return;
  } else {
    var paraNode = getAParaNode(
      `${totalitemsFound} restaurants found. Showing 10 restaurants.`,
      "text-success"
    );
    searchResultsPlaceholder.appendChild(paraNode);
  }

  var ulElement = document.createElement("ul");

  restData.restaurants.forEach(restaurantItem => {
    var liElement = document.createElement("li");

    var anchor = document.createElement("a");
    var text = document.createTextNode(`${restaurantItem.restaurant.name} (
        ${restaurantItem.restaurant.location.locality} , ${restaurantItem
      .restaurant.location.city})`);
    anchor.setAttribute("href", "#");
    // anchor.setAttribute("onclick", "onclickRestaurantDetail()");
    anchor.appendChild(text);
    anchor.addEventListener("click", function() {
      onclickRestaurantDetail(restaurantItem.restaurant.id);
    });

    //liElement.inneerHTML =  restaurantItem.restaurant.name;
    liElement.appendChild(anchor);
    ulElement.appendChild(liElement);
  });
  searchResultsPlaceholder.appendChild(ulElement);
}

/**
 * Displays user's favourite collections
 * @param {*Collections Data} data 
 */
function displayCollections(data) {
  console.log(data);
  activateView("collections");
  let searchForm = document.getElementById("searchForm");

  //searchForm.className("hide");
  let resultscontainer = document.getElementById("ResultContainer");
  resultscontainer.innerHTML = "";
  var totalitemsFound = data.length;
  if (totalitemsFound == 0) {
    var paraNode = getAParaNode(
      "Oops, Your search returned no results !!",
      "text-danger"
    );

    resultscontainer.appendChild(paraNode);
    return;
  } else {
    var paraNode = getAParaNode(
      `${totalitemsFound} collections found. Showing ${totalitemsFound} only.`,
      "text-success"
    );
    resultscontainer.appendChild(paraNode);
  }

  let collectionContainer = document.getElementById("collectionContainer");
  document.getElementById("collectionContainer").innerHTML = "";
  data.forEach(dataItem => {
    var card = getACard(dataItem.title, dataItem.author);
    collectionContainer.appendChild(card);
  });
}

/**
 *  Utility Helper Methods 
 */

function getAParaNode(text, className) {
  var paraElement = document.createElement("p");
  paraElement.className = className;
  var textNode = document.createTextNode(text);
  paraElement.appendChild(textNode);
  return paraElement;
}

function getACard(title, text) {
  var card = document.createElement("div");
  var cardBody = document.createElement("div");
  var cardTitle = document.createElement("h5");
  cardTitle.appendChild(document.createTextNode(title));
  var cardText = document.createElement("p");
  cardText.appendChild(document.createTextNode(text));
  card.className = "card";
  cardBody.className = "card-body";
  cardTitle.className = "card-title";
  cardText.className = "card-text";
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  card.appendChild(cardBody);

  return card;
}

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
