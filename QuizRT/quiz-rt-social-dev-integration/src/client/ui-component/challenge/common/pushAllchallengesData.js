import firebase from "firebase"

const data = firebase.database().ref('Challenges');
  data.on('value',function(challengeData) {
    console.log("data is:", challengeData.val())
  })
