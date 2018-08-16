// import {Store} from "../../../boot/Store"


// export const createchallengeReducer = (state = {}, action) => {
//     const statePrev = {...state}
//     const newState = Object.assign({}, statePrev)
//     switch (action.type) {
//     case "next":
//       newState.currentQuestion = action.dataItem;
//       newState.currentList =  [...newState.currentList,action.dataItem];
//       newState.currentAction = "next";
     
//       return newState
//     case "previous":
//       newState.currentQuestion =  newState.currentList[newState.currentList.length-1];
//       newState.currentList = newState.currentList.splice(newState.currentList.length-1,1);
//       newState.currentAction = "previous";
//       return newState
//     default:
//       return Object.assign({}, ...state)
//     }
// }