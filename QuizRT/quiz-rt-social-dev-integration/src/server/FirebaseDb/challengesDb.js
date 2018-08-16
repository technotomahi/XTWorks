import firebase from "firebase"
import {config} from "../config"

export const addChallengeToDB = (req, resp) => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
 const challenges = firebase.database().ref("Challenges");
 let nextChallengSeq =0;
 const promise = new Promise(function(resolve, reject) {
       challenges.once("value", function(challengesNode) {
          nextChallengSeq = Math.max.apply(Math,(Object.keys(challengesNode.val())));
          nextChallengSeq = +nextChallengSeq+1;
          let requestBody = req.body;
          requestBody.challengeId = nextChallengSeq ;
          challenges.child(`${nextChallengSeq}`).set(requestBody);
          
          //Get Updated challenge record
          const lastChallenge = firebase.database().ref(`Challenges/${nextChallengSeq}`);
        lastChallenge.once("value", function(lastchallengesNode) {
        let lastchallenges = lastchallengesNode.val();
          console.log("nextChallengSeq key"+nextChallengSeq + "lastchallenges :"+lastchallenges);
          resolve(lastchallenges);
         });


        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
    },
     function (errorObject) {
          reject(errorObject);
        });
  return promise;
}

export const updateUserTransaction = (req, resp) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
 const challenges = firebase.database().ref("User_Transaction");

 const promise = new Promise(function(resolve, reject) {
       challenges.once("value", function(userTranNode) {
          let requestBody = req.body;
         let nextUserTranSeq = Math.max.apply(Math,(Object.keys(userTranNode.val())));
          console.log("nextUserTranSeq before :",nextUserTranSeq);
          nextUserTranSeq = +nextUserTranSeq+1;
          console.log("nextUserTranSeq :",nextUserTranSeq);
          challenges.child(`${nextUserTranSeq}`).set(requestBody);
        
          resolve(requestBody);
         });

        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
  return promise;
}

export const getAllChallengesFromDB = (req, resp) => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
 const challengesRef = firebase.database().ref();
 const promise = new Promise(function(resolve, reject) {
    challengesRef.child("Challenges").once("value", function(challengesNode) {
        resolve(challengesNode.val());
  }, function (errorObject) {
         reject(errorObject);
         
  });
});
  return promise;
}

//  adding particular challenge API
export const getParticularChallengeFromDB = (challengeId) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  const challengesRef = firebase.database().ref("Challenges")

  const promise = new Promise(function(resolve, reject) {
    challengesRef.orderByChild("challengeId").equalTo(parseInt(challengeId)).on("value", function(snapshot) {
      console.log("chal value: ", snapshot.val())
      resolve(snapshot)
    }, function(errorObj) {
      console.log(errorObj)
      reject(errorObj)
    })
  })
  return promise
}

export const getUserDetail = (req, resp) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  const userTranRef = firebase.database().ref()
  const promise = new Promise(function(resolve, reject) {
    userTranRef.child("User_Master").once("value", function(userTranNode) {
      resolve(userTranNode.val())
    }, function(errorObject) {
      reject(errorObject)
    })
  })
  return promise
}

// get user specific challenges
export const getUserSpecificChallengesFromDB = (req, resp) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  var userChallenges = []
  const challengesRef = firebase.database().ref()
  const promise = new Promise(function(resolve, reject) {
    challengesRef.child("User_Transaction").orderByChild("userID").equalTo(req.body.userId).on("child_added", function(users) {
      userChallenges.push(users)
      resolve(userChallenges)
    }, function(errorObject) {
      reject(errorObject)
    })
  })
  return promise
}

export const getUserFromUserMasterDB = (req, resp) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  const userMaster = firebase.database().ref()
  const promise = new Promise(function(resolve, reject) {
    userMaster.child("User_Master").orderByChild("email").equalTo(req.body.email).on("child_added", function(users) {
      //console.log("users:", JSON.stringify(users))
      resolve(users)
    }, function(errorObject) {
      reject(errorObject)
    })
  })
  return promise
}

export const getChallengeDetails = (req, resp) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }  
  const challengesRef = firebase.database().ref()
  const promise = new Promise(function(resolve, reject) {
    challengesRef.child("User_Transaction").once("value", function(users) { 
      resolve(users.val())
    }, function(errorObject) {
      reject(errorObject)
    })
  })
  return promise
 }