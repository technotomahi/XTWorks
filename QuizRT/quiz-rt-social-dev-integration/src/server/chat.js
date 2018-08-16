import firebase from "firebase"
import { config } from "./config";

export class Chat {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    addMessage(message) {
        let dbRef = firebase.database().ref();
        let messages = dbRef.child('messages').push();
        var key = messages.key;
        message.key = key;
        messages.set(message)
        return message;
    }

    getMessages(displayName) {
        let dbRef = firebase.database().ref();
        //let unreadMessages = [];
        let messages = dbRef.child('messages');
        const promise = new Promise(function(resolve, reject) {
            messages.orderByChild("rdisplayName").equalTo(displayName).on("value", function(snapshot) {
              resolve(snapshot)
            }, function(errorObj) {
              reject(errorObj)
            })
          })
          return promise;
        // messages.orderByKey()
        //     .on('child_added', function (snapshot) {
        //         console.log(" displayName  from db " + snapshot.val().rdisplayName + " displayName  expected " + displayName)
        //         console.log(snapshot.val().rdisplayName === displayName)
                
        //         console.log( snapshot.val().readYn)
        //         if (snapshot.val().rdisplayName === displayName && snapshot.val().readYn === 'no') {
        //             unreadMessages.push(snapshot.val());
        //         }
        //     });           
        // return unreadMessages;
    }

    updateMessage(message) {
        message.readYn = 'yes';
        let dbRef = firebase.database().ref();
        let path = 'messages/' + message.key
        let readMessage = dbRef.child(path);
        readMessage.set(message);
    }

}