import { Constants } from "../shared/constants";
import { DataService } from "./dataService";
export class RestaurantService {
  constructor() {
    this.dataService = new DataService(Constants.ZOMATO_AUTH_KEY);
  }

  searchRestaurants(query, offset) {
    const cityId = 4;
    this.dataService.fetchOptions.method = "GET";
    let queryParams = `?entity_id=${cityId}&entity_type=city&q=${encodeURI(
      query
    )}&count=10&start=${offset}`;
    let searchUrl = Constants.RESTAURANTS_SEARCH_URL;
    searchUrl = searchUrl + queryParams;
    return this.dataService.getJSON(searchUrl);
  }

  postJSON(url) {
    this.fetchOptions.method = "POST";
    var dataPromise = fetch(url, this.fetchOptions);
    return new Promise((resolve, reject) => {
      dataPromise
        .then(res => {
          res.json().then(data => {
            resolve(data);
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
