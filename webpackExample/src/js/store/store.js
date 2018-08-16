import { createStore, combineReducers } from "redux";
import { ReduxConstants } from "../shared/constants";
import ViewHandler from "../views/viewHandler";
import { restaurant, allRestaurants, currentView } from "./reducers";

import initialState from "./initialState.json";

const appReducers = combineReducers({
  allRestaurants,
  restaurant,
  currentView
});

var state = initialState;
//state = (localStorage["redux-store"])  ? JSON.parse(localStorage["redux-store"])   : initialState;

const store = createStore(appReducers, state);
 


console.log(`
=========== Initial state 
${JSON.stringify(state)}
`);

store.subscribe(() => {
  const curState = store.getState();
  console.log(`
      =========== Current  state 
      `);
  console.log(curState);
  localStorage.setItem("redux-store", JSON.stringify(curState));

  if (curState.currentView === ReduxConstants.DETAIL_RESTAURANT) {
    ViewHandler.displayRestaurantDetail(curState.restaurant);
  } else if (curState.currentView === ReduxConstants.ADD_RESTAURANTS) {
    ViewHandler.displayRestaurants(curState.allRestaurants);
  }
});

class StoreManager {
  static dispatch(action) {
    store.dispatch(action);
    store.dispatch({ type: ReduxConstants.CURRENT_VIEW, payload: action.type });
  }
}

export default StoreManager;
