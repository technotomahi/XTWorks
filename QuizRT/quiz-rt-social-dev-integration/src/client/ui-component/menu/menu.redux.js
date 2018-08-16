// Reducer
export const menuReducer = (state = {}, action) => {
  const statePrev = state
  const newState = Object.assign({}, statePrev)
  switch (action.type) {
  case "CurrentViewUpdate":
    newState.currentView = action.dataItem.Name
    return newState
  case "LoggedInUserInfo":
    newState.currentUserInfo = action.dataItem.UserInfo
    newState.currentView = action.dataItem.Name
    return newState
  default:
    return newState
  }
  return newState
}

