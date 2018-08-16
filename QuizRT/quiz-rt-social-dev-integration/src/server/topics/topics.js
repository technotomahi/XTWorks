import firebase from "firebase"
import { config } from "../config";
import {getStatus} from "../status";


export class Topics{
    constructor(){
        if (!firebase.apps.length){
            firebase.initializeApp(config);
        }
    }
   
    addTopic(topics){
        let dbRef = firebase.database().ref();
        let topic = dbRef.child('topics');
        topic.set(topics);        
        return getStatus("Success","201",'');
    }

    getTopics(){
        let dbRef = firebase.database().ref();
        let topic = dbRef.child('topics');
        const promise = new Promise(function(resolve, reject) {
            topic.once("value", function(snapshot) {                 
                resolve(snapshot.val());
            }, function (errorObject) {
                reject(errorObject);
            });
        });
        return promise;
    }

    updateFollow(id,data){
        let dbRef = firebase.database().ref();
        let path = 'topics/'+id+'/users'
        let users = dbRef.child(path);
        users.set(data);
    }

}