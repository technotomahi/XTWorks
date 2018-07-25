import { ReduxConstants } from '../shared/constants';
import DomManager from '../views/domManager';
import RestaurantService from '../services/restaurantService';
import StoreManager from '../store/store';

const document = window.document;
export class RestaurantController {
  constructor() {
    this.restaurantService = new RestaurantService();
  }

  getRestaurantDetail(id) {
    this.restaurantService
      .getRestaurantDetail(id)
      .then((data) => {
        console.log(data);
        StoreManager.dispatch({
          type: ReduxConstants.DETAIL_RESTAURANT,
          payload: data,
        });
        document.getElementById('ResultNavigationContainer').innerHTML = '';
      })
      .catch((err) => {
        console.log(err);
      });
  }

  searchRestaurants(searchParam, skipCount = 0) {
    this.restaurantService
      .searchRestaurants(searchParam, skipCount)
      .then((data) => {
        data.searchParam = searchParam;

        StoreManager.dispatch({
          type: ReduxConstants.ADD_RESTAURANTS,
          payload: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  searchRestaurantsForModal(searchParam) {
    this.restaurantService
      .searchRestaurants(searchParam)
      .then((data) => {
        this.displayRestaurantsInModal(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  displayRestaurantsInModal(restData) {
    console.log(restData);
    var paraNode;
    const searchResultsPlaceholder = document.getElementById(
      'restaurants-container-modal',
    );
    searchResultsPlaceholder.innerHTML = '';
    const totalitemsFound = restData.results_found;
    if (totalitemsFound == 0) {
      paraNode = DomManager.getAParaNode(
        'Oops, Your search returned no results !!',
        'text-danger',
      );

      searchResultsPlaceholder.appendChild(paraNode);
      return;
    }
    var paraNode = DomManager.getAParaNode(
      `${totalitemsFound} restaurants found. Showing 10 restaurants.`,
      'text-success',
    );
    searchResultsPlaceholder.appendChild(paraNode);

    restData.restaurants.forEach((restaurantItem) => {
      const divElement = document.createElement('div');
      const labelElement = document.createElement('label');
      const inputElement = document.createElement('input');
      inputElement.setAttribute('type', 'checkbox');
      inputElement.className = 'restaurantCheckbox';
      inputElement.setAttribute(
        'value',
        `${restaurantItem.restaurant.id}#${restaurantItem.restaurant.name}`,
      );

      const textNode = document.createTextNode(`  ${
        restaurantItem.restaurant.name
      } (
              ${restaurantItem.restaurant.location.locality} )`);

      labelElement.appendChild(inputElement);
      labelElement.appendChild(textNode);
      divElement.appendChild(labelElement);
      searchResultsPlaceholder.appendChild(divElement);
    });
  }

  /**
   * Displays Restaurant Information
   * @param {*} restData
   */
  displayRestaurantDetail(restData) {
    console.log(restData);
    const searchResultsPlaceholder = document.getElementById('ResultContainer');
    searchResultsPlaceholder.innerHTML = '';

    const getDetailedCard = DomManager.getADetailedCard(
      restData.name,
      restData.thumb,
      this.getRequiredRestaurantDetails(restData),
    );

    searchResultsPlaceholder.appendChild(getDetailedCard);
  }

  getRequiredRestaurantDetails(restData) {
    const restaurant = {
      'Average cost for two': restData.average_cost_for_two,
      'Phone Numbers': restData.phone_numbers,
    };
    restaurant.Name = restData.name;
    restaurant.Address = restData.location.address;
    restaurant.Rating = restData.user_rating.aggregate_rating;

    return restaurant;
  }
}
