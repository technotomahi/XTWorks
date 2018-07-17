import { Constants } from "../shared/constants";
import { DomManager } from "../shared/domManager";
import { RestaurantService } from "../services/restaurantService";
import { DataService } from "../services/dataService";
export class RestaurantController {
  constructor() {
    this.restaurantService = new RestaurantService();
    this.dataService = new DataService(Constants.ZOMATO_AUTH_KEY);
  }

  searchRestaurants(searchParam) {

    this.restaurantService
      .searchRestaurants(searchParam)
      .then(data => {
        this.displayRestaurants(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  searchRestaurantsForModal(searchParam) {

    this.restaurantService
      .searchRestaurants(searchParam)
      .then(data => {
        this.displayRestaurantsInModal(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  displayRestaurants(restData) {
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
      var paraNode = DomManager.getAParaNode(
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
      var self = this;
      anchor.addEventListener("click", function () {
        var id = restaurantItem.restaurant.id;
        //activateView("restaurant");
        let url = "https://developers.zomato.com/api/v2.1/restaurant?res_id=60192";
        self.dataService
          .getJSON(url)
          .then(data => {
            console.log(data);
            self.displayRestaurantDetail(data);
          })
          .catch(err => {
            console.log(err);
          });
      });

      //liElement.inneerHTML =  restaurantItem.restaurant.name;
      liElement.appendChild(anchor);
      ulElement.appendChild(liElement);
    });
    searchResultsPlaceholder.appendChild(ulElement);
  }

  displayRestaurantsInModal(restData) {
    console.log(restData);
    let searchResultsPlaceholder = document.getElementById("restaurants-container-modal");
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
      var paraNode = DomManager.getAParaNode(
        `${totalitemsFound} restaurants found. Showing 10 restaurants.`,
        "text-success"
      );
      searchResultsPlaceholder.appendChild(paraNode);
    }

    restData.restaurants.forEach(restaurantItem => {
      var divElement = document.createElement("div");
      var labelElement = document.createElement("label");
      var inputElement = document.createElement("input");
      inputElement.setAttribute("type", "checkbox");
      inputElement.className = "restaurantCheckbox";
      inputElement.setAttribute("value", `${restaurantItem.restaurant.id}#${restaurantItem.restaurant.name}`);
     
      var textNode = document.createTextNode(`  ${restaurantItem.restaurant.name} (
              ${restaurantItem.restaurant.location.locality} )`);
      
      labelElement.appendChild(inputElement);
      labelElement.appendChild(textNode);
      divElement.appendChild(labelElement);
      var self = this;
      // anchor.addEventListener("click", function () {
      //   var id = restaurantItem.restaurant.id;
      //   //activateView("restaurant");
      //   let url = "https://developers.zomato.com/api/v2.1/restaurant?res_id=60192";
      //   self.dataService
      //     .getJSON(url)
      //     .then(data => {
      //       console.log(data);
      //       self.displayRestaurantDetail(data);
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // });

      //liElement.inneerHTML =  restaurantItem.restaurant.name;
      searchResultsPlaceholder.appendChild(divElement);
    });

  }


  /**
   * Displays Restaurant Information
   * @param {*} restData 
   */
  displayRestaurantDetail(restData) {
    console.log(restData);
    let searchResultsPlaceholder = document.getElementById("ResultContainer");
    searchResultsPlaceholder.innerHTML = "";

    var divElement = document.createElement("div");
    var textNode = DomManager.getAParaNode(restData.name);
    var addressNode = DomManager.getAParaNode(restData["location"].address);
    divElement.appendChild(textNode);
    divElement.appendChild(addressNode);


    searchResultsPlaceholder.appendChild(divElement);
  }




}


