import DomManager from './views/domManager';
import { RestaurantController } from './controllers/restaurantController';
import { CollectionController } from './controllers/collectionController';
import { StoreManager } from './store/store';

require('../scss/styles.scss');

const restaurantController = new RestaurantController();
let collectionController = new CollectionController();
const searchBotton = document.getElementById('searchRestaurant');
const myCollectionsLink = document.getElementById('MyCollections');
const restaurantsLink = document.getElementById('RestaurantsLink');
const restaurantsSearchModlaLink = document.getElementById(
  'restaurant-name-search',
);
const addCollectionBotton = document.getElementById('add-collection');
const updateCollectionBotton = document.getElementById('update-collection');

searchBotton.addEventListener('click', searchRestaurants);
myCollectionsLink.addEventListener('click', searchCollections);
restaurantsLink.addEventListener('click', onClickSearchRestaurants);
restaurantsSearchModlaLink.addEventListener('keyup', onKeyUpSearchRestaurants);
addCollectionBotton.addEventListener('click', addCollection);
updateCollectionBotton.addEventListener('click', updateCollection);

function onClickSearchRestaurants() {
  activateView('restaurants');
  $('#searchForm').show();
  document.getElementById('inputSearch').focus();
}

function onKeyUpSearchRestaurants() {
  const searchParam = document.getElementById('restaurant-name-search').value;
  restaurantController.searchRestaurantsForModal(searchParam);
}

function searchRestaurants() {
  activateView('restaurants');
  $('#ResultNavigationContainer').show();
  const searchParam = document.getElementById('inputSearch').value;
  if (searchParam === '') {
    alert('Please enter restaurant name to search');
    return;
  }
  restaurantController.searchRestaurants(searchParam, 0);
}

function searchCollections() {
  activateView('collections');
  collectionController = collectionController || new CollectionController();
  collectionController.searchCollections();
}

function addCollection() {
  const collectionName = document.getElementById('collection-name').value;
  const restaturantIds = $('.restaurantCheckbox:checked')
    .map(function () {
      return $(this).val();
    })
    .get();
  const payload = {
    title: collectionName,
    author: 'Mahi',
    restaurants: DomManager.getArrayOfObjects(restaturantIds),
  };
  collectionController.addCollection(payload);
}

function updateCollection() {
  const collectionName = document.getElementById('collection-name').value;

  const restaturantIds = $('.restaurantCheckbox:checked')
    .map(function () {
      return $(this).val();
    })
    .get();
  const collectionId = document
    .getElementById('collection-name')
    .getAttribute('data-info');
  const payload = {
    id: collectionId,
    title: collectionName,
    restaurants: DomManager.getArrayOfObjects(restaturantIds),
  };
  collectionController.updateCollection(payload);
}

$(document).ready(() => {});

function cleanResultContainer() {
  document.getElementById('ResultContainer').innerHTML = '';
}

function activateView(type) {
  cleanResultContainer();
  switch (type) {
    case 'collections':
      $('#ResultContainer').hide();
      $('#collection-section').show();
      $('#searchForm').hide();
      $('#ResultNavigationContainer').hide();
      break;
    case 'restaurant':
    case 'restaurants':
      $('#collection-section').hide();
      $('#ResultContainer').show();
      break;
    default:
  }
}
