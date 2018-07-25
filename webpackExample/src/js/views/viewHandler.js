import { Constants } from '../shared/constants';
import { DomManager } from './domManager';
import { RestaurantController } from '../controllers/restaurantController';

function createHTMLElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild;
}

function createRestaurantCard(food) {
  const foodCard = createHTMLElement(`
  <div class="card" style="width: 23rem">
    <img class="card-img-top" alt="Card image cap" src="https://b.zmtcdn.com/data/pictures/9/53449/1926b6522d6ae29425546ec43dc3cd17.jpg?fit=around%7C200%3A200&amp;crop=200%3A200%3B%2A%2C%2A">
    <div class="card-body">
      <h5 class="card-title">Sri Udupi Park</h5>
      <div class="connectedSortable">
        <p class="card-text">Average cost for two : 450</p>
        <p class="card-text">Phone Numbers : undefined</p>
        <p class="card-text">Name : Sri Udupi Park</p><p class="card-text">Address : 25/1, NR Chambers, Old Airport Road, Bangalore</p>
        <p class="card-text">Rating : 3.2</p>
        </div>
    </div>
  </div>
  `);

  const addButton = foodCard.querySelector('button');
  addButton.addEventListener('click', function(){});

  return foodCard;
}

const onClickRestaurantDetail = (id) => {
  const restaurantController = new RestaurantController();
  restaurantController.getRestaurantDetail(id);
};

const onClickNextButtonhandler = (searchParam) => {
  const restaurantController = new RestaurantController();
  const skipCount = parseInt(document.getElementById('pagingSkip').value)
    + Constants.PAGING_COUNT;
  restaurantController.searchRestaurants(searchParam, skipCount);
  document.getElementById('pagingSkip').value = skipCount;
};

const onClickPrevButtonhandler = (searchParam) => {
  const restaurantController = new RestaurantController();
  let skipCount = parseInt(document.getElementById('pagingSkip').value)
    - Constants.PAGING_COUNT;
  if (skipCount < 0) skipCount = 0;
  document.getElementById('pagingSkip').value = skipCount;
  restaurantController.searchRestaurants(searchParam, skipCount);
};

export class ViewHandler {
  constructor() {
    this.restaurantController = new RestaurantController();
  }

  static getAParaNode(text, className) {
    const paraElement = document.createElement('p');
    paraElement.className = className;
    const textNode = document.createTextNode(text);
    paraElement.appendChild(textNode);
    return paraElement;
  }

  static displayRestaurantDetail(restData) {
    const searchResultsPlaceholder = document.querySelector('#ResultContainer');
    searchResultsPlaceholder.innerHTML = '';

    const getDetailedCard = DomManager.getADetailedCard(
      restData.name,
      restData.thumb,
      this.getRequiredRestaurantDetails(restData),
    );

    searchResultsPlaceholder.appendChild(getDetailedCard);
  }

  static displayRestaurants(restData) {
    const searchResultsPlaceholder = document.querySelector('#ResultContainer');
    const resultNavigationContainer = document.getElementById(
      'ResultNavigationContainer',
    );

    searchResultsPlaceholder.innerHTML = '';
    const totalitemsFound = restData.results_found;
    let paraNode;
    if (totalitemsFound === 0 || restData.results_shown === 0) {
      paraNode = DomManager.getAParaNode(
        'Oops, Your search returned no results !!',
        'text-danger',
      );

      searchResultsPlaceholder.appendChild(paraNode);
      return;
    }
    paraNode = DomManager.getAParaNode(
      `Showing ${restData.results_start} - ${restData.results_start
          + Constants.PAGING_COUNT} of ${totalitemsFound} restaurants found.`,
      'text-success',
    );


    restData.restaurants.forEach((restaurantItem) => {
      const restCard = DomManager.getADetailedCard(
        restaurantItem.restaurant.name,
        restaurantItem.restaurant.thumb,
        this.getRequiredRestaurantDetails(restaurantItem.restaurant),
      );

      restCard.addEventListener('click', () => {
        onClickRestaurantDetail(restaurantItem.restaurant.id);
      });

      searchResultsPlaceholder.appendChild(restCard);
    });

    const prevAnchor = createHTMLElement(
      '<a class="previous btn">« Previous</a>',
    );

    const nextAnchor = createHTMLElement(
      '<a class="next btn" data-info="0">Next »</a>',
    );

    nextAnchor.addEventListener('click', () => {
      onClickNextButtonhandler(restData.searchParam);
    });

    prevAnchor.addEventListener('click', () => {
      onClickPrevButtonhandler(restData.searchParam);
    });

    resultNavigationContainer.innerHTML = '';
    resultNavigationContainer.appendChild(paraNode);
    resultNavigationContainer.appendChild(prevAnchor);
    resultNavigationContainer.appendChild(nextAnchor);
  }

  static getRequiredRestaurantDetails(restData) {
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
