class Constants {
  static get ZOMATO_API_BASE() {
    return 'https://developers.zomato.com/api/v2.1/';
  }

  static get COLLECTIONS_API_BASE() {
    return 'http://localhost:3004/';
  }

  static get COLLECTIONS_API() {
    return `${this.COLLECTIONS_API_BASE}collections`;
  }

  static get ADD_COLLECTIONS_URL() {
    return `${this.COLLECTIONS_API_BASE}collections`;
  }

  static get RESTAURANTS_SEARCH_URL() {
    return `${this.ZOMATO_API_BASE}search`;
  }

  static get ZOMATO_DEFAULT_IMAGE() {
    return 'https://b.zmtcdn.com/data/pictures/6/18011656/95177ed226010a6be13935df30d552e4.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A';
  }

  static get ZOMATO_AUTH_KEY() {
    return 'd9ccd37d2d650e0f24917ab3ea4126be';
  }

  static get PAGING_COUNT() {
    return 8;
  }
}

const ReduxConstants = {
  ADD_RESTAURANTS: 'ADD_RESTAURANTS',
  DETAIL_RESTAURANT: 'DETAIL_RESTAURANT',
  CURRENT_VIEW: 'CURRENT_VIEW',
};

export { ReduxConstants, Constants };
