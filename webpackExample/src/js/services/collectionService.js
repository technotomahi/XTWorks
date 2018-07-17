import { Constants } from "../shared/constants";
import { DataService } from "./dataService";
export class CollectionService {
    constructor() {         
        this.dataService = new DataService(Constants.ZOMATO_AUTH_KEY);
    }

    getCollections() {
        this.dataService.fetchOptions.method = "GET";
        let collectionUrl = Constants.COLLECTIONS_API;
         return this.dataService.getJSON(collectionUrl);            
    }

    addCollection(payload) {
        this.dataService.fetchOptions.method = "POST";
        let collectionAddUrl = Constants.ADD_COLLECTIONS_URL;
         return this.dataService.postJSON(collectionAddUrl, payload);            
    }
}


