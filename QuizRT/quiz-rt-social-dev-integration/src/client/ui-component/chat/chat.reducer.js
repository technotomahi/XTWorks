export const makeChat = (state = {
  allChatMessages: [],
  chatNotificationCount: [],
  myUser: {},
  myFriend: {},
  onlineUsers: [],
},
action) => {
  if (typeof state === "undefined") {
    return "undefined"
  }

  switch (action.type) {
  case "NEW-USER":
  {
    const s = {
      allChatMessages: state.allChatMessages,
      chatNotificationCount: state.chatNotificationCount,
      myUser: action.myUser,
      myFriend: state.myFriend,
      onlineUsers: state.onlineUsers,
    }
    return s
  }
  case "SEND-MSG":
  {
    const tempAllChatMessages = state.allChatMessages
    if (tempAllChatMessages[state.myFriend.user.displayName] !== undefined) {
      tempAllChatMessages[state.myFriend.user.displayName].push(action.message)
    }
    else {
      tempAllChatMessages[state.myFriend.user.displayName] = new Array(action.message)
    }
    const s = {
      allChatMessages: tempAllChatMessages,
      chatNotificationCount: state.chatNotificationCount,
      myUser: state.myUser,
      myFriend: state.myFriend,
      onlineUsers: state.onlineUsers,
    }
    return s
  }
  case "ONLINE-USERS":
  {
    const s = {
      allChatMessages: state.allChatMessages,
      chatNotificationCount: state.chatNotificationCount,
      myUser: state.myUser,
      myFriend: state.myFriend,
      onlineUsers: action.onlineUsers,
    }
    return s
  }

  case "RECIEVE-MSG":
  {
    const tempAllChatMessages = state.allChatMessages
    if (tempAllChatMessages[action.message.sdisplayName] !== undefined) {
      tempAllChatMessages[action.message.sdisplayName].push(action.message)
    }
    else {
      tempAllChatMessages[action.message.sdisplayName] = new Array(action.message)
    }
    const tempChatNotificationCount = state.chatNotificationCount
    const count = (tempChatNotificationCount[action.message.sdisplayName] === undefined) ? 1 : tempChatNotificationCount[action.message.sdisplayName] + 1
    tempChatNotificationCount[action.message.sdisplayName] = count

    const s = {
      allChatMessages: tempAllChatMessages,
      chatNotificationCount: tempChatNotificationCount,
      myUser: state.myUser,
      myFriend: state.myFriend,
      onlineUsers: state.onlineUsers,
    }
    return s
  }
  case "SELECT-FRIEND":
  {
    const s = {
      allChatMessages: state.allChatMessages,
      chatNotificationCount: state.chatNotificationCount,
      myUser: state.myUser,
      myFriend: action.myFriend,
      onlineUsers: state.onlineUsers,
    }
    return s
  }

  default: { return state }
  }
}

