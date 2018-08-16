import {Store} from "../../boot/Store"

// Reducer
export const dashboardReducer = (state = {Action: "Init"}, action) => {
  const statePrev = state
  const newState = Object.assign({}, statePrev)
  switch (action.type) {
  case "GET_TopicData":
    newState.TopicList = action.dataItem.Topics
    newState.Action = action.type
    return newState
    break
  case "GET_ChallengeData":
    newState.ChallegeList = action.dataItem.Challeges
    newState.Action = action.type
    return newState
    break
  case "UPDATE_Dashboard_ChallengeData":
    newState.ChallegeList = [...newState.ChallegeList, action.dataItem]
    newState.Action = action.type
    return newState
    break
  case "UPDATE_Dashboard_Topic":
    newState.TopicList = action.dataItem
    newState.Action = action.type
    return newState
    break
  default:
    return state
  }
}

