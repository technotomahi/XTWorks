import {loadFriends, loadPendingFriendReq, searchUsers, sendFriendRequest, acceptFriendRequest, rejectFriendRequest} from "./service"

export const friendReducer = (currentState = { }, action) => {
  console.log("inside friendReducer")
  const newState = currentState
  let friends = []
  if (currentState.friendsAndChat && currentState.friendsAndChat.friends) {
    friends = currentState.friendsAndChat.friends
  }

  let pendingFrndReq = []
  if (currentState.friendsAndChat && currentState.friendsAndChat.pendingFriendRequest) {
    pendingFrndReq = currentState.friendsAndChat.pendingFriendRequest
  }

  let searchResult = []
  if (currentState.friendsAndChat && currentState.friendsAndChat.searchResult) {
    searchResult = currentState.friendsAndChat.searchResult
  }
  switch (action.type) {
  case "SHOW_FRIENDS_CHAT" :
    console.log("inside SHOW_FRIENDS_CHAT")
    // newState.SELECTED_PAGE = "FRIENDS_AND_CHAT"
    newState.friendsAndChat = {
      page: "DEFAULT",
      friends: friends,
      pendingFriendRequest: pendingFrndReq,
      searchResult: searchResult,
    }
    break
  case "FETCH_FRIENDS_REQ" :
    console.log("inside FETCH_FRIENDS_REQ")
    newState.friendsAndChat = {
      page: "FRIENDS_NOT_LOADED",
      friends: [],
      pendingFriendRequest: pendingFrndReq,
      searchResult: searchResult,
    }
    loadFriends(action.userName)
    break
  case "FETCH_FRIENDS_RES" :
    console.log("inside FETCH_FRIENDS_RES")
    console.log(action.users)
    newState.friendsAndChat = {
      page: "FRIENDS_LOADED",
      friends: action.users,
      pendingFriendRequest: pendingFrndReq,
      searchResult: searchResult,
    }
    break
  case "FETCH_FRIENDS_PENDING_REQUEST_REQ":
    console.log("inside FETCH_FRIENDS_PENDING_REQUEST_REQ")
    newState.friendsAndChat = {
      page: "FRIENDS_PENDING_REQUEST_NOT_LOADED",
      friends: friends,
      pendingFriendRequest: pendingFrndReq,
      searchResult: searchResult,
    }
    loadPendingFriendReq(action.userName)
    break
  case "FETCH_FRIENDS_PENDING_REQUEST_RES":
    console.log("inside FETCH_FRIENDS_PENDING_REQUEST_RES")
    newState.friendsAndChat = {
      page: "FRIENDS_PENDING_REQUEST_LOADED",
      friends: friends,
      pendingFriendRequest: action.users,
      searchResult: searchResult,
    }
    break
  case "SEARCH_FRIENDS_REQ":
    console.log("inside SEARCH_FRIENDS_REQ")
    console.log(action)
    newState.friendsAndChat = {
      page: "SEARCH_FRIENDS_NOT_LOADED",
      friends: friends,
      pendingFriendRequest: pendingFrndReq,
      searchResult: [],
    }
    searchUsers(action.value)
    break
  case "SEARCH_FRIENDS_RES":
    console.log("inside SEARCH_FRIENDS_RES")
    newState.friendsAndChat = {
      page: "SEARCH_FRIENDS_LOADED",
      friends: friends,
      pendingFriendRequest: pendingFrndReq,
      searchResult: action.users,
    }
    break
  case "SEND_FRIEND_REQ":
    console.log("inside SEND_FRIEND_REQ")
    sendFriendRequest(action.userName, action.reciever)
    break
  case "SEND_FRIEND_RES":
    console.log("inside SEND_FRIEND_RES")
    newState.friendsAndChat = {
      page: "SEND_FRIEND_RES",
      friends: friends,
      pendingFriendRequest: pendingFrndReq,
      searchResult: searchResult,
    }
    break
  case "ACCEPT_FRINED_REQUEST":
    console.log("inside accept friend req")
    acceptFriendRequest(action.req_id)
    break
  case "REJECT_FRINED_REQUEST":
    console.log("inside reject friend req")
    rejectFriendRequest(action.req_id)
    break
  default:
  }

  return newState
}
