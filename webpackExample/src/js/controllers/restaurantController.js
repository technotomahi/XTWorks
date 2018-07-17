import { Constants } from "../shared/constants";
import { DomManager } from "../shared/domManager";
import { RestaurantService } from "../services/restaurantService";
import { DataService } from "../services/dataService";
export class RestaurantController {
  constructor() {
    this.restaurantService = new RestaurantService();
    this.dataService = new DataService(Constants.ZOMATO_AUTH_KEY);
  }

  searchRestaurants(searchParam, skipCount = 0) {
    this.restaurantService
      .searchRestaurants(searchParam, skipCount)
      .then(data => {
        this.displayRestaurants(data, searchParam);
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

  displayRestaurants(restData, searchParam) {
    let searchResultsPlaceholder = document.getElementById("ResultContainer");
    searchResultsPlaceholder.innerHTML = "";
    var totalitemsFound = restData.results_found;
    debugger;
    if (totalitemsFound == 0 || restData.results_shown == 0) {
      var paraNode = DomManager.getAParaNode(
        "Oops, Your search returned no results !!",
        "text-danger"
      );

      searchResultsPlaceholder.appendChild(paraNode);
      return;
    } else {
      var paraNode = DomManager.getAParaNode(
        `Showing ${restData.results_start} - ${restData.results_start +
          10} of ${totalitemsFound} restaurants found.`,
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
      anchor.appendChild(text);
      var self = this;
      anchor.addEventListener("click", function() {
        var id = restaurantItem.restaurant.id;
        //activateView("restaurant");
        let url =
          "https://developers.zomato.com/api/v2.1/restaurant?res_id=60192";
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

    var prevAnchor = document.createElement("a");
    prevAnchor.className = "previous btn";
    prevAnchor.innerHTML = "&laquo; Previous";

    var nextAnchor = document.createElement("a");
    nextAnchor.className = "next btn";
    nextAnchor.innerHTML = "Next &raquo;";

    // Next Element
    var lastNextSkippCount = 0;
    
    nextAnchor.setAttribute("data-info", `${document.getElementById("pagingSkip").value}`);

    nextAnchor.addEventListener("click", function() {
      var restaurantController = new RestaurantController();
       var skipCount = parseInt(document.getElementById("pagingSkip").value) + 10;
      restaurantController.searchRestaurants(searchParam, skipCount );
      document.getElementById("pagingSkip").value = skipCount ;
    });

    // Prev Element 
    prevAnchor.addEventListener("click", function() {
      var restaurantController = new RestaurantController();
      var skipCount = parseInt(document.getElementById("pagingSkip").value) -10;
      if(skipCount < 0) skipCount = 0;
      document.getElementById("pagingSkip").value = skipCount ;
      restaurantController.searchRestaurants(
        searchParam,
        skipCount
      );
    });

    searchResultsPlaceholder.appendChild(ulElement);
    searchResultsPlaceholder.appendChild(prevAnchor);
    searchResultsPlaceholder.appendChild(nextAnchor);
  }

  displayRestaurantsInModal(restData) {
    console.log(restData);
    let searchResultsPlaceholder = document.getElementById(
      "restaurants-container-modal"
    );
    searchResultsPlaceholder.innerHTML = "";
    var totalitemsFound = restData.results_found;
    if (totalitemsFound == 0) {
      var paraNode = DomManager.getAParaNode(
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
      inputElement.setAttribute(
        "value",
        `${restaurantItem.restaurant.id}#${restaurantItem.restaurant.name}`
      );

      var textNode = document.createTextNode(`  ${restaurantItem.restaurant
        .name} (
              ${restaurantItem.restaurant.location.locality} )`);

      labelElement.appendChild(inputElement);
      labelElement.appendChild(textNode);
      divElement.appendChild(labelElement);
      var self = this;
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
    var restaurant = {
      "Average cost for two": restData.average_cost_for_two,
      "Phone Numbers": restData.phone_numbers
    };
    restaurant.Name = restData.name;
    restaurant.Address = restData.location.address;
    restaurant.Rating = restData.user_rating.aggregate_rating;

    var getDetailedCard = DomManager.getADetailedCard(
      restData.name,
      restData.thumb,
      restaurant
    );

    searchResultsPlaceholder.appendChild(getDetailedCard);
  }
}
