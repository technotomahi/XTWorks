import { ReduxConstants } from '../shared/constants';

export const currentView = (state = null, action) => {
  if (action.type === ReduxConstants.CURRENT_VIEW) {
    return action.payload;
  }
  return state;
};

export const restaurant = (state = null, action) => {
  if (action.type === ReduxConstants.DETAIL_RESTAURANT) {
    return action.payload;
  }
  return state;
};

export const allRestaurants = (state = null, action) => {
  switch (action.type) {
    case ReduxConstants.ADD_RESTAURANTS:
      return action.payload;
    default:
      return state;
  }
};

export default { restaurant, allRestaurants, currentView };
