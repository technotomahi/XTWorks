export class Constants {

    static get ZOMATO_API_BASE() {
        return 'https://developers.zomato.com/api/v2.1/';;
    }

    static get COLLECTIONS_API_BASE() {
        return 'http://localhost:3004/';;
    }

    static get COLLECTIONS_API() {
        return this.COLLECTIONS_API_BASE + 'collections';;
    }

    static get ADD_COLLECTIONS_URL() {
        return this.COLLECTIONS_API_BASE + 'collections';;
    }

    static get RESTAURANTS_SEARCH_URL() {
        return this.ZOMATO_API_BASE + 'search';;
    }
    
    static get ZOMATO_AUTH_KEY() {
        return 'd9ccd37d2d650e0f24917ab3ea4126be';;
    }
}


