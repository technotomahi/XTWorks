import $ from "jquery"
import io from "socket.io-client"
import {Store} from "../../boot/Store"
import {createChatContainer, subsribeRender} from "./chat.view"

const socket = io()

export const emitCurrentUser = () => {
  subsribeRender()
  socket.on("newUser", function(newUser) {
    Store.dispatch({
      type: "NEW-USER", myUser: newUser,
    })
  })
  if (Store.getState().makeChat.myUser.user === undefined) {
    const currentState = Store.getState()
    const myUser = {}
    myUser.email = currentState.menuReducer.currentUserInfo.email
    myUser.displayName = currentState.menuReducer.currentUserInfo.displayName
    myUser.Photo = currentState.menuReducer.currentUserInfo.photoURL
    socket.emit("newUser", myUser)
  }
  $("body").on("keyup", "#txtChatMessage", notifyTyping)
  $("body").on("keypress", "#txtChatMessage", submitfunction)

  socket.on("notifyTyping", function(sender, recipient) {
    if (Store.getState().makeChat.myFriend.socketId === sender.socketId) {
      $("#notifyTyping").text(sender.user.displayName + " is typing ...")
    }
    setTimeout(function() {
      $("#notifyTyping").text("")
    }, 5000)
  })

  socket.on("onlineUsers", function(onlineUsers) {
    Store.dispatch({
      type: "ONLINE-USERS", onlineUsers: onlineUsers,
    })
  })

  socket.on("userIsDisconnected", function(socketId) {
    delete Store.getState().makeChat.allChatMessages[socketId]
    if (socketId === Store.getState().makeChat.myFriend.socketId) {
      $(".chat-module").hide()
      $("ol.discussion").html("").hide()
    }
  })
  socket.on("chatMessage", function(message) {
    Store.dispatch({
      type: "RECIEVE-MSG", message: message,
    })
  })
}

export const loadChatContainer = (user) => {
  createChatContainer(user)
  // $(".chat-module").hide()

  // loginMe()
}

// $(document).ready(function() {
//
// //   if (Store.getState().myUser.id === undefined) {
// //     loginMe()
// //   }
// })

function loginMe() {
  var person = prompt("Please enter your name:", "Test")
  if (/([^\s])/.test(person) && person !== null && person !== "") {
    document.title = person
  }
  else {
    location.reload()
  }
}

function notifyTyping() {
  socket.emit("notifyTyping", Store.getState().makeChat.myUser, Store.getState().makeChat.myFriend)
}

function submitfunction(event) {
  const keycode = (event.keyCode ? event.keyCode : event.which)
  if (keycode === 13) {
    var message = {}; var text = $("#txtChatMessage").val()

    if (text !== "") {
      const state = Store.getState()
      message.type = "text"
      message.text = text
      message.sender = state.makeChat.myUser.socketId
      message.receiver = state.makeChat.myFriend.socketId
      message.sdisplayName = state.makeChat.myUser.user.displayName
      message.rdisplayName = state.makeChat.myFriend.user.displayName
      Store.dispatch({
        type: "SEND-MSG", message: message,
      })
      socket.emit("chatMessage", message)
    }
    $("#txtChatMessage").val("").focus()
  }
}

