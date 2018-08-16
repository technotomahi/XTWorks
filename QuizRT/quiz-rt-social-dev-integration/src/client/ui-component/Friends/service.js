import {Store} from "../../boot/Store"

function loadFriends(userName) {
  var settings = {
    "url": "/api/friends",
    "data": {"userName": userName},
    "type": "GET",
    "mode": "no-cors",
    "headers": {
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
  }

  $.ajax(settings).done(function(response) {
    console.log("Response.recieved from server")
    console.log(response)
    // const friends = JSON.parse(response.data)
    const friends = response
    Store.dispatch({type: "FETCH_FRIENDS_RES", users: friends})
  })
}

function loadPendingFriendReq(userName) {
  var settings = {
    "url": "/api/friends/pendingReq",
    "data": {"userName": userName},
    "type": "GET",
    "mode": "no-cors",
    "headers": {
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
  }

  $.ajax(settings).done(function(response) {
    console.log("Response.recieved from server")
    console.log(response)
    // const friends = JSON.parse(response.data)
    const friends = response
    Store.dispatch({type: "FETCH_FRIENDS_PENDING_REQUEST_RES", users: friends})
  })
}

function acceptFriendRequest(req_id) {
  console.log("friend service - accptFrinedRequest " + req_id)
  var settings = {
    "url": "/api/friends/accept",
    "data": JSON.stringify({req_id: req_id}),
    "type": "POST",
    "mode": "no-cors",
    "headers": {
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
  }

  $.ajax(settings).done(function(response) {
    console.log("Response.recieved from server")
    console.log(response)
    // const friends = JSON.parse(response.data)
    Store.dispatch({type: "FETCH_FRIENDS_PENDING_REQUEST_REQ"})
  })
}

function rejectFriendRequest(req_id) {
  console.log("friend service - rejectFriendRequest " + req_id)
  var settings = {
    "url": "/api/friends/reject",
    "data": JSON.stringify({req_id: req_id}),
    "type": "POST",
    "mode": "no-cors",
    "headers": {
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
  }

  $.ajax(settings).done(function(response) {
    console.log("Response.recieved from server")
    console.log(response)
    // const friends = JSON.parse(response.data)
    Store.dispatch({type: "FETCH_FRIENDS_PENDING_REQUEST_REQ"})
  })
}

function searchUsers(inputStr) {
  console.log("friend service - searchUsers " + inputStr)
  var settings = {
    "url": "/api/friends/search",
    "data": {"value": inputStr},
    "type": "GET",
    "mode": "no-cors",
    "headers": {
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
  }

  $.ajax(settings).done(function(response) {
    console.log("Response.recieved from server")
    console.log(response)
    // const friends = JSON.parse(response.data)
    Store.dispatch({type: "SEARCH_FRIENDS_RES", users: response})
  })
}

function sendFriendRequest(currentUser, reciever) {
  console.log("sendFriendRequest called")
  // console.log(Store.getState())
  var settings = {
    "url": "/api/friends/sendFrndReq",
    "data": JSON.stringify({"sender": currentUser, "reciever": reciever}),
    "type": "POST",
    "mode": "no-cors",
    "headers": {
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
  }

  $.ajax(settings).done(function(response) {
    console.log("Response.recieved from server")
    console.log(response)
    // const friends = JSON.parse(response.data)
    Store.dispatch({type: "SEND_FRIEND_RES"})
  })
}

/*
function acceptFriendRequest(req_id) {
  console.log("friend service - accptFrinedRequest " + req_id)
  setTimeout(function() {
    Store.dispatch({type: "FETCH_FRIENDS_PENDING_REQUEST_REQ"})
  })
}*/

export {loadFriends, loadPendingFriendReq, searchUsers, sendFriendRequest, acceptFriendRequest, rejectFriendRequest}
