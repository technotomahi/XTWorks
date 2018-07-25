import { Constants } from '../shared/constants';
import { DataService } from './dataService';

export class RestaurantService {
  constructor() {
    this.dataService = new DataService(Constants.ZOMATO_AUTH_KEY);
  }

  searchRestaurants(query, offset) {
    const cityId = 4;
    this.dataService.fetchOptions.method = 'GET';
    const queryParams = `?entity_id=${cityId}&entity_type=city&q=${encodeURI(
      query,
    )}&count=${Constants.PAGING_COUNT}&start=${offset}`;
    let searchUrl = Constants.RESTAURANTS_SEARCH_URL;
    searchUrl += queryParams;
    return this.dataService.getJSON(searchUrl);
  }

  getRestaurantDetail(id) {
    const url = `${Constants.ZOMATO_API_BASE}restaurant?res_id=${id}`;
    return this.dataService.getJSON(url);
  }
}
