import { Constants } from "../shared/constants";
import { DataService } from "./dataService";
export class CollectionService {
    constructor() {         
        this.dataService = new DataService(Constants.ZOMATO_AUTH_KEY);
    }

    getCollections() {
        const cityId = 4;
        this.dataService.fetchOptions.method = "GET";
        let collectionUrl = Constants.COLLECTIONS_API;
         return this.dataService.getJSON(collectionUrl);            
    }
}


