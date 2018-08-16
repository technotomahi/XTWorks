
import {Store} from "../../boot/Store"
import {updateChat} from "./chat.service"
function createHTMLElement(html) {
  const template = document.createElement("template")
  template.innerHTML = html
  return template.content.firstElementChild
}

// function createOnlineUsersView() {
//   const onlineUsersView = `<div class="onlineUsersContainer">
//         <div class="onlineUsersWraper">
//             <ul id="onlineUsers" class="mdc-list" aria-orientation="vertical"></ul>
//         </div>
//     </div>`

//   return createHTMLElement(onlineUsersView)
// }

function createchatSection() {
  const chatSection = `<section class="chat-module">

        <header class="chat-top-bar">
        </header>

        <ol class="discussion mdc-list">
        </ol>
        <div class="text-field-container">
            <div class="mdc-text-field text-field mdc-text-field--textarea mdc-text-field--upgraded chat-text-field-margin">
                <span id="notifyTyping"></span>
                <textarea id="txtChatMessage" class="mdc-text-field__input" placeholder="Type your message"></textarea>
                <div class="mdc-line-ripple" style="transform-origin: 105px center 0px;"></div>
            </div>
        </div>

    </section>`
  return createHTMLElement(chatSection)
}

function createChatHeaderLeft(name) {
  const headerLeft = `<div class="left">
          <span>
              <i class="material-icons chat-icon-message">
                  message
              </i>
          </span>
          <h1>${name}</h1>
          </div>`
  return createHTMLElement(headerLeft)
}

function chatboxScrollBottom() {
  $("ol.discussion").animate({scrollTop: $("ol.discussion").prop("scrollHeight")})
}

function appendMessage(message, cssClass) {
  var messageTimestamp = new Date().toLocaleString("en-US", {hour: "numeric", minute: "numeric", hour12: true})
  var chatMessageTimestamp = "<label class=\"chatMessageTimestamp\">" + messageTimestamp + "</label>"
  if (message.type === "text") {
    const ol = document.querySelector("ol.discussion")
    ol.appendChild(createMsgLiElementSelf(message.text + chatMessageTimestamp, cssClass, message.sdisplayName))
  }
  chatboxScrollBottom()
}

function loadChatBox(messages) {
  $(".chat-module").show()
  $("ol.discussion").html("").show()
  messages.forEach(function(message) {
    var cssClass = (message.sdisplayName === Store.getState().makeChat.myUser.user.displayName) ? "self mdc-list-item" : "other mdc-list-item"
    updateChat(message).then(function() {
    })
    appendMessage(message, cssClass, message.name)
  })
  chatboxScrollBottom()
}

function clearChatNotificationCount(chatNotificationCount, userName) {
  chatNotificationCount[userName] = 0
  const temdisplayName = userName
  const replaced = temdisplayName.replace(" ", "___")
  $("#" + replaced + " label.chatNotificationCount").hide()
}

function selectUerChatBox(selectedUser) {
  const myFriend = {}
  const user = {}
  myFriend.socketId = selectedUser.socketId
  user.email = selectedUser.email
  user.displayName = selectedUser.displayName
  user.Photo = selectedUser.photoURL
  myFriend.user = user
  Store.dispatch({
    type: "SELECT-FRIEND", myFriend: myFriend,
  })
  // $(evt.target).addClass("active")
  clearChatNotificationCount(Store.getState().makeChat.chatNotificationCount, myFriend.user.displayName)
}

// function createLiElement(id, name) {
//   const dynamicLiElement = `<li id="${name}" class="mdc-list-item selectUerChatBox">
//     <span class="mdc-list-item__graphic material-icons green" aria-hidden="true">fiber_manual_record</span>${name}<label class="chatNotificationCount"></label></li>`
//   const liElement = createHTMLElement(dynamicLiElement)
//   liElement.addEventListener("click", selectUerChatBox)
//   liElement.userId = id
//   liElement.userName = name
//   return liElement
// }

function createMsgLiElementSelf(msg, cssClass, name) {
  const dynamicMsgLiElement = `<li >
      <div class="messages">
          <p>${msg}</p>
      </div>
      </li>`
  const liMsgElement = createHTMLElement(dynamicMsgLiElement)
  liMsgElement.className += cssClass
  return liMsgElement
}

function render() {
  const state = Store.getState()
  // $("#onlineUsers").empty()
  let chatCount = 0
  state.makeChat.onlineUsers.forEach(function(user) {
    if (user.user.displayName !== state.makeChat.myUser.user.displayName) {
      // var liElement = createLiElement(user.id, user.name)
      // document.querySelector("#onlineUsers").appendChild(liElement)
      const temdisplayName = user.user.displayName
      const replaced = temdisplayName.replace(" ", "___")
      if (state.makeChat.chatNotificationCount[user.user.displayName] !== undefined &&
        state.makeChat.chatNotificationCount[user.user.displayName] !== 0) {
        chatCount = chatCount + state.makeChat.chatNotificationCount[user.user.displayName]
        $("#" + replaced + " label.chatNotificationCount").html(state.makeChat.chatNotificationCount[user.user.displayName])
        $("#" + replaced + " label.chatNotificationCount").show()
      }
      $("#" + replaced + " span.chatOnline").html("fiber_manual_record")
      $("#" + replaced + " span.chatOnline").show()

      if (state.makeChat.myFriend && state.makeChat.myFriend.user &&
        state.makeChat.myFriend.user.displayName === user.user.displayName) {
        clearChatNotificationCount(state.makeChat.chatNotificationCount, user.user.displayName)
      }
    }
  })
  if (chatCount > 0) {
    $(".chatIcon").attr("data-badge", chatCount)
  }
  if (state.makeChat.myFriend && state.makeChat.myFriend.user &&
  state.makeChat.myFriend.user.displayName) {
    const body = document.querySelector(".chatSection")
    if ($(".chat-module")[0] === undefined) {
      body.appendChild(createchatSection())
    }
    $(".chat-module").show()
    $("ol.discussion").show()
    $(".chat-top-bar").html("").show()
    document.querySelector(".chat-top-bar").appendChild(createChatHeaderLeft(state.makeChat.myFriend.user.displayName))
    if (state.makeChat.allChatMessages[state.makeChat.myFriend.user.displayName] !== undefined) {
      loadChatBox(state.makeChat.allChatMessages[state.makeChat.myFriend.user.displayName])
    }
    else {
      $("ol.discussion").html("")
    }
  }

  // if (state.makeChat.onlineUsers.length >= 2 && state.makeChat.myFriend.name !== undefined) {
  //   $(".chat-module").show()
  //   $("ol.discussion").show()
  //   $(".chat-top-bar").html("").show()
  //   document.querySelector(".chat-top-bar").appendChild(createChatHeaderLeft(state.makeChat.myFriend.name))
  // }
  // $("#onlineUsers li").removeClass("active")
  $("#notifyTyping").text("")
  $("#txtChatMessage").val("").focus()
}

export const subsribeRender = () => {
  Store.subscribe(render)
}

export const createChatContainer = (selectedUser) => {
  const state = Store.getState()
  state.makeChat.onlineUsers.forEach(function(user) {
    if (selectedUser.displayName === user.user.displayName) {
      selectedUser.socketId = user.socketId
    }
  })
  selectUerChatBox(selectedUser)
}

