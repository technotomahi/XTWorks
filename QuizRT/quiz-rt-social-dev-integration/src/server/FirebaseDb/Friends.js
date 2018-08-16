import firebase from "firebase"
import {config} from "../config"

export const searchMasterUser = (searchValue) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  const userMaster = firebase.database().ref("User_Master")
  //console.log(userMaster); .startAt(searchValue)
  const promise = new Promise(function(resolve, reject) {
    userMaster.orderByChild("displayName").on("value", function(snapshot) {
      resolve(snapshot)
    }, function(errorObj) {
      reject(errorObj)
    })
  })
  return promise;
    
  // const users = []
  // userMaster.orderByChild('displayName').on("value", function(snapshot) {
  // console.log(snapshot.val())
  // const val = snapshot.val()
  // console.log("********************")
  // snapshot.forEach(function(data) {
  //   console.log("----------")
  //   console.log(data.key)
  //   const tempVal = val[data.key]
  //   tempVal["key"] = data.key
  //   users.push(tempVal)
  // })

  // } )
  // return  users
}

export const getUser = (key, value) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  const userMaster = firebase.database().ref("User_Master")

  const promise = new Promise(function(resolve, reject) {
    userMaster.orderByChild(key).equalTo(value).on("value", function(snapshot) {
      resolve(snapshot)
    }, function(errorObj) {
      reject(errorObj)
    })
  })
  return promise
}

export const getUserByEmailId = (email) => {
  return getUser("email", email)
}

export const getUserByUserId = (userID) => {
  console.log("Search by userID - "+userID);
  return getUser("userID", userID)
}

export const sendFriendRequest = (senderUserID, receiverUserID) => {
  console.log("In sendFriendRequest ", senderUserID, receiverUserID)
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  const frndReq = firebase.database().ref("Frnd_Req")
  const frnd_req = {
    sender: senderUserID,
    receiver: receiverUserID,
    status: 'P'
  }
  var frndReqPush = frndReq.push(frnd_req)
  console.log("Pushed frnd req")
  console.log(frndReqPush)
}

export const getFriendRequest = (reqId) => {
  console.log("In sendFriendRequest ", reqId)
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  const frndReq = firebase.database().ref("Frnd_Req")
  const promise = new Promise(function(resolve, reject) {
    frndReq.orderByKey().equalTo(reqId).on("value", function(snapshot) {
      console.log("result in getFriendRequest")
      resolve(snapshot)
    }, function(errorObj) {
      console.log("Error in getFriendRequest")
      console.log(errorObj)
      reject(errorObj)
    })
  })
  return promise
}

export const acceptFriendReq = (reqId, owner, friend) => {
  console.log("------------------")
  console.log("In acceptFriendReq ", reqId, owner, friend)
  console.log("------------------")
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  const frndRow = {
    owner: owner,
    friend: friend,
  }
  const newFriendKey = firebase.database().ref("Frnd_List").push().key

  const frndRow2 = {
    owner: friend,
    friend: owner,
  }
  const newFriendKey2 = firebase.database().ref("Frnd_List").push().key

  const updates = {}
  updates["/Frnd_Req/" + reqId + "/status"] = "A"
  updates["/Frnd_List/" + newFriendKey] = frndRow
  updates["/Frnd_List/" + newFriendKey2] = frndRow2
  return firebase.database().ref().update(updates)
}

export const rejectFriendReq = (reqId) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  
  const updates = {}
  updates["/Frnd_Req/"+reqId+"/status"] = 'R'
  return firebase.database().ref().update(updates)
}

export const getListOfFriend = (email) => {
  console.log("In getPendingFriendRequest ", email)
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  const frndReq = firebase.database().ref("Frnd_List")

  const promise = new Promise(function(resolve, reject) {
    frndReq.orderByChild('owner/email').equalTo(email).on("value", function(snapshot) {
      resolve(snapshot)
    }, function(errorObj) {
      console.log(errorObj)
      reject(errorObj)
    })
  })
  return promise
}
export const getPendingFriendRequest = (email) => {
  console.log("In getPendingFriendRequest ", email)
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  const frndReq = firebase.database().ref("Frnd_Req")

  const promise = new Promise(function(resolve, reject) {
    frndReq.orderByChild('receiver/email').equalTo(email).on("value", function(snapshot) {
      resolve(snapshot)
    }, function(errorObj) {
      console.log(errorObj)
      reject(errorObj)
    })
  })
  return promise

}