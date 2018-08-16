export const topicReducer = (state = {}, action) => {
  switch (action.type) {
  case "GET_TOPIC":
    return state
    break
  case "ADD_TOPIC":
    return Object.assign({}, state, {"Topic_Action": "ADD_TOPIC"}, {"Topics": action.payload})
  case "UPDATE_TOPIC":
    return Object.assign({}, state, {"Topic_Action": "UPDATE_TOPIC"}, {"Topics": action.payload})
  default:
    return state
  }
  return state
}

