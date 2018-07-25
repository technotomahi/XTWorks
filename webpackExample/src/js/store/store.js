import { createStore, combineReducers } from 'redux';
import { Constants, ReduxConstants } from '../shared/constants';
import { ViewHandler } from '../views/viewHandler';
import {
  restaurant,
  allRestaurants,
} from './reducers';

import initialState from './initialState.json';

const appReducers = combineReducers({
  allRestaurants,
  restaurant,
});

const state = initialState;
const store = createStore(appReducers, state);

store.subscribe(() => {
  console.log('Subscription data Received: ');
  const state = store.getState();
  if (state.restaurant.name) {
    ViewHandler.displayRestaurantDetail(state.restaurant);
  } else {
    ViewHandler.displayRestaurants(state.allRestaurants);
  }
});

export class StoreManager {
  static dispatch(action) {
    store.dispatch(action);
  }
}
