import { Constants } from '../shared/constants';
import { DataService } from './dataService';

export class CollectionService {
  constructor() {
    this.dataService = new DataService(Constants.ZOMATO_AUTH_KEY);
  }

  getCollections() {
    this.dataService.fetchOptions.method = 'GET';
    const collectionUrl = Constants.COLLECTIONS_API;
    return this.dataService.getJSON(collectionUrl);
  }

  addCollection(payload) {
    this.dataService.fetchOptions.method = 'POST';
    const collectionAddUrl = Constants.ADD_COLLECTIONS_URL;
    return this.dataService.postJSON(collectionAddUrl, payload);
  }

  updateCollection(payload) {
    const collectionUrl = Constants.COLLECTIONS_API;
    return this.dataService
      .getJSON(`${collectionUrl}/${payload.id}`)
      .then((data) => {
        data.title = payload.title;
        data.restaurants = payload.restaurants;
        return this.UpdateCollection(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  UpdateCollections(
    sourceCollectionId,
    targetCollectionId,
    restaurant,
    targetPositionId,
  ) {
    const collectionUrl = Constants.COLLECTIONS_API;
    // Remove from Source Collection
    this.dataService
      .getJSON(`${collectionUrl}/${sourceCollectionId}`)
      .then((data) => {
        // console.log(data);
        const index = data.restaurants.findIndex(item => item.id == restaurant.id);

        data.restaurants.splice(index, 1);
        this.UpdateCollection(data);
      })
      .catch((err) => {
        console.log(err);
      });

    // Add to target Collection
    this.dataService
      .getJSON(`${collectionUrl}/${targetCollectionId}`)
      .then((data) => {
        data.restaurants.splice(targetPositionId, 0, restaurant);
        this.UpdateCollection(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  UpdateCollection(data) {
    const collectionUrl = Constants.COLLECTIONS_API;
    return this.dataService.putJSON(`${collectionUrl}/${data.id}`, data);
  }
}
