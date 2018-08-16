import {config} from "../../../server/config"
import firebase from "firebase"
import {Store} from "../../boot/Store"
const firebaseAp = firebase.initializeApp(config)
export const goToSignin = (user) => {
  if (user) {
    Store.dispatch({type: "LoggedInUserInfo", dataItem: {UserInfo: user, Name: "dashboard"}})
    app(user)
  }
  else {
    Store.dispatch({type: "CurrentViewUpdate", dataItem: {Name: "login"}})
    var provider = new firebase.auth.GoogleAuthProvider()
    firebaseAp.auth().signInWithPopup(provider).then(function(user) {
      console.log("result aa gya =>", user)
    }
    )
  }
}
function app(user) {
  console.log("user display name:", user.displayName)
  let nextUserID = 0
  let lastUserId = 0
  var UserMaster = firebase.database().ref("User_Master")
  UserMaster.orderByChild("userID").limitToLast(1)
    .on("child_added", function(snapshot) {
      lastUserId = snapshot.val().userID
    })
  UserMaster.once("value", function(userNode) {
    let NodeName = user.email
    NodeName = NodeName.replace(/[^a-zA-Z0-9-. ]/g, "").replace(/[.]/g, "")

    UserMaster.child(NodeName).once("value", function(myNode) {
      console.log("value of this node:", myNode.val())
      if (!myNode.val()) {
        nextUserID = lastUserId + 1
        var myUser = {}
        myUser.userID = nextUserID
        myUser.email = user.email
        myUser.displayName = user.displayName
        myUser.Photo = user.photoURL
        UserMaster.child(NodeName).set(myUser)
      }
    })
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code)
  })
}

export const goToLogout = () => {
  // window.location.href = "https://accounts.google.com/logout"
  window.open(
    "https://accounts.google.com/logout",
    "_blank" // <- This is what makes it open in a new window.
  )
  firebaseAp.auth().signOut().then(function() {
    console.log("successfully signed out")
  }).catch(function(error) {
    console.log(error)
  })
}

firebaseAp.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    goToSignin(firebaseUser)
  }
  else {
    Store.dispatch({type: "CurrentViewUpdate", dataItem: {Name: "login"}})
  }
})

