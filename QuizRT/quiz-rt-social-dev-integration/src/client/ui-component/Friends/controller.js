import {Store} from "../../boot/Store"
import {showSearchPageWithResult, showFriendList, showPendingFriendRequests} from "./view"
import {loadChatContainer} from "../chat/chat.controller"
var userName = ""
function addFriendLinkClicked(event) {
  console.log("add friend link clicked")
  Store.dispatch({type: "SHOW_FRIENDS_CHAT"})
}

export const listOfFriendsClicked = function(event) {
  console.log("list of friend link clicked")
  Store.dispatch({type: "FETCH_FRIENDS_REQ", userName: userName})
}

function showPendingFriendReq(event) {
  console.log("show pending friend req clicked")
  Store.dispatch({type: "FETCH_FRIENDS_PENDING_REQUEST_REQ", userName: userName})
}

function acceptFriendRequest(event) {
  console.log("accept Friend Request controller")
  console.log(event)
  Store.dispatch({type: "ACCEPT_FRINED_REQUEST", req_id: event.target.getAttribute("req-id")})
}

function rejectFriendRequest(event) {
  console.log("reject Friend Request controller")
  console.log(event)
  Store.dispatch({type: "REJECT_FRINED_REQUEST", req_id: event.target.getAttribute("req-id")})
}

function sendFriendRequest(event) {
  console.log("sendFriendRequest controller")
  console.log(event)
  Store.dispatch({type: "SEND_FRIEND_REQ", reciever: event.target.getAttribute("user_email"), userName: userName})
}

function searchUser(event) {
  console.log("search user")
  if (event.keyCode === 13) {
    console.log("search user hit enter")
    event.preventDefault()
    // console.log('in controller updateCard enter');
    console.log("inside searchUser")
    console.log(event.target.value)
    Store.dispatch({type: "SEARCH_FRIENDS_REQ", value: event.target.value, userName: userName})
    return false
  }
  return true
}

function showSnackBar(msg) {
  var snackbarContainer = document.querySelector("#msg-snack-bar")
  var data = {message: msg}
  snackbarContainer.MaterialSnackbar.showSnackbar(data)
}

function render() {
  console.log("in friends new controller")
  const menuReducer = Store.getState().menuReducer
  const state = Store.getState().friendReducer
  console.log(menuReducer)
  console.log(state)

  if (menuReducer.currentUserInfo) {
    userName = menuReducer.currentUserInfo.email
  }
  if (menuReducer.currentView === "friends") {
    if (state && state.friendsAndChat) {
      console.log("in friends controller selected page")
      if (state.friendsAndChat.page === "DEFAULT") {
        console.log("in friends controller DEFAULT page")
        showSearchPageWithResult([])
      }
      else if (state.friendsAndChat.page === "SEARCH_FRIENDS_NOT_LOADED") {
        console.log("in friends controller DEFAULT page")
        showSearchPageWithResult([], true)
      }
      else if (state.friendsAndChat.page === "SEARCH_FRIENDS_LOADED") {
        console.log("in friends controller SEARCH_FRIENDS_LOADED page")
        showSearchPageWithResult(state.friendsAndChat.searchResult)
        if (!state.friendsAndChat.searchResult || state.friendsAndChat.searchResult.length == 0) {
          showSnackBar("No user found ...")
        }
      }
      else if (state.friendsAndChat.page === "SEND_FRIEND_RES") {
        console.log("in friends controller SEND_FRIEND_RES page")
        showSearchPageWithResult(state.friendsAndChat.searchResult)
        showSnackBar("Friend request sent...")
      }
      else if (state.friendsAndChat.page === "FRIENDS_NOT_LOADED") {
        console.log("in friends controller FRIENDS not loaded page")
        showFriendList([], true)
      }
      else if (state.friendsAndChat.page === "FRIENDS_LOADED") {
        console.log("in friends controller FRIENDS loaded page")
        showFriendList(state.friendsAndChat.friends)
      }
      else if (state.friendsAndChat.page === "FRIENDS_PENDING_REQUEST_LOADED") {
        console.log("in friends controller FRIENDS pending request loaded page")
        showPendingFriendRequests(state.friendsAndChat.pendingFriendRequest, false)
      }
      else if (state.friendsAndChat.page === "FRIENDS_PENDING_REQUEST_NOT_LOADED") {
        console.log("in friends controller FRIENDS pending request not loaded page")
        showPendingFriendRequests(state.friendsAndChat.pendingFriendRequest, true)
      }
    }
    else {
      showSearchPageWithResult([])
    }
  }
}
function showChatBox(event) {
  const user = {}
  user.email = event.target.getAttribute("email")
  const temdisplayName = event.target.getAttribute("displayName")
  user.displayName = temdisplayName.replace("___", " ")
  user.photoURL = event.target.getAttribute("photoURL")
  loadChatContainer(user)
}
Store.subscribe(render)

$("body").on("click", "#add_friend", addFriendLinkClicked)
$("body").on("click", "#list_of_friend", listOfFriendsClicked)
$("body").on("click", "#frnd_req", showPendingFriendReq)
$("body").on("click", ".accept-Friend-Request", acceptFriendRequest)
$("body").on("click", ".reject-Friend-Request", rejectFriendRequest)
$("body").on("keydown", "#fixed-header-drawer-exp", searchUser)
$("body").on("click", ".sendFriendRequest", sendFriendRequest)
$("body").on("click", ".start_chat", showChatBox)
