import express from "express"
import bodyParser from "body-parser"
import {addChallengeToDB, getUserDetail, updateUserTransaction, getChallengeDetails, getAllChallengesFromDB, getParticularChallengeFromDB, getUserSpecificChallengesFromDB, getUserFromUserMasterDB} from "./FirebaseDb/challengesDb"
import {searchMasterUser, getUserByEmailId, sendFriendRequest, getPendingFriendRequest, getFriendRequest, acceptFriendReq, rejectFriendReq, getListOfFriend} from "./FirebaseDb/Friends"
import {Topics} from "./topics/topics"
import {Chat} from "./chat"

const app = express()

app.use(express.static("dist"))

var http = require("http").Server(app)
var io = require("socket.io")(http)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

app.post("/api/challenge", (req, res) => {
  const data = addChallengeToDB(req, res)
  data.then(
    result => {
      res.send(result)
    },
    error => {
      res.send(error)
    }
  )
})

//  expose API to Question Generator and Game Engine
app.use("/api/allChallenges", (req, res) => {
  const data = getAllChallengesFromDB(req, res)
  data.then(
    result => {
      res.send(result)
    },
    error => {
      res.send(error)
    }
  )
})

//  send given challenge to Game Engine
app.get("/api/getParticularChallenge", (req, res) => {
  const chalPromise = getParticularChallengeFromDB(req.query.challengeId)
  chalPromise.then(
    result => {
      res.send(result)
    },
    error => {
      res.send(error)
    }
  )
})

//udate User Transaction
app.use("/api/userTransaction",(req, res)=> {
    let data = updateUserTransaction(req, res);
    data.then(
        result=>{
            res.send(result);
        },
        error=>{
            res.send(error);
        }        
    )
})

app.get("/api/friends", (req, res) => {
    const frndPromise = getListOfFriend(req.query.userName)
    frndPromise.then(
        result => {
            const frnList = []
            const val = result.val()
            result.forEach(function(data) {
                frnList.push(val[data.key]['friend'])
            })
            res.send(frnList)
        },
        error => {
            res.sendStatus(500)
        })
});

app.get("/api/friends/pendingReq", (req, res) => {
    let frndReq = []
    const frndRequest = getPendingFriendRequest(req.query.userName)
    frndRequest.then(
        result => {
            let frndReq = []
            const val = result.val()
            result.forEach(function(data){
                const tempVal =  {}
                tempVal['displayName'] = val[data.key]['sender']['displayName']
                tempVal['reqId'] = data.key

                if(val[data.key]["status"] && val[data.key]["status"] === 'P'){
                    frndReq.push(tempVal)
                }
            })
            res.send(frndReq)
        },
        error => {
            res.sendStatus(500)
        })
});

app.get("/api/friends/search", (req, res) => {
    const friendPromise = searchMasterUser(req.query.value)
    friendPromise.then(
        result => {
            const users = []
            const val = result.val()
            result.forEach(function(data) {
                const tempVal = val[data.key]
                tempVal["key"] = data.key
                if(tempVal['displayName'] &&  tempVal['displayName'].toLowerCase().includes(req.query.value.toLowerCase())){
                    users.push(tempVal)
                }
            })
            res.send(users)
        },
        error => {
            res.send(error)
        })
});



app.post("/api/friends/accept", (req, res) => {
    //console.log(req.body.req_id)
    //console.log("Friend request accpeted")
    const reqDetails = getFriendRequest(req.body.req_id)
    reqDetails.then(
        result => {
            //console.log(result.val())
            const val = result.val()
            result.forEach(function(data) {
                const tempVal = val[data.key]
                //console.log("*********")
                //console.log(tempVal)
                //console.log("*********")
                const ret = acceptFriendReq(data.key, tempVal['sender'], tempVal['receiver'])
                ret.then(
                    result => {
                        res.sendStatus(200)
                    },
                    error => {
                        //console.log("/api/friends/accept 22")
                        //console.log(error)
                        res.sendStatus(200)            
                    })
            })
        },
        error => {
            //console.log("/api/friends/accept")
            //console.log(error)
            res.sendStatus(200)
        });
    
});

app.post("/api/friends/reject", (req, res) => {
    const reject = rejectFriendReq(req.body.req_id)
    reject.then(
        result => {
            res.sendStatus(200)
        },
        error => {
            res.sendStatus(500)
        })
});

app.post("/api/friends/sendFrndReq", (req, res) => {
    const searchSender = getUserByEmailId(req.body.sender)
    let sender
    let reciver
    searchSender.then(
        result => {
            const val = result.val()

            result.forEach(function(data) {
                const tempVal = val[data.key]
                sender = tempVal
                //console.log("Yeee")
                //break
            })

            const searchReciever = getUserByEmailId(req.body.reciever)
            searchReciever.then(
                result => {
                    const val = result.val()

                    result.forEach(function(data) {
                        const tempVal = val[data.key]
                        reciver = tempVal
                    })
                    if(sender && reciver){
                        sendFriendRequest(sender, reciver)
                        res.sendStatus(200)    
                    }
                    else{
                        //console.log("Some value is missing ",sender, reciver)
                    }
                    

                },
                error => {
                    res.send(error)
                })
        },
        error => {
            res.send(error)
        })
    
});
const chat = new Chat();
var onlineUsers = [];

io.on('connection', function (socket) {

    socket.on('chatMessage', function (message) {
        message.readYn = 'no';
        message = chat.addMessage(message);
        io.to(message.receiver).emit('chatMessage', message);
    });

    socket.on('notifyTyping', function (sender, receiver) {
        io.to(receiver.socketId).emit('notifyTyping', sender, receiver);
    });

    socket.on('newUser', function (user) {
        let newUser = { socketId: socket.id, user: user };
        onlineUsers.push(newUser);
        io.to(socket.id).emit('newUser', newUser);
        io.emit('onlineUsers', onlineUsers);
        let allMessages = chat.getMessages(user.displayName);
        allMessages.then(
            result => {               
                const val = result.val()
                result.forEach(function(data) {
                    const tempVal = val[data.key]
                    tempVal["key"] = data.key
                    if(tempVal['rdisplayName'] &&  tempVal['rdisplayName'].includes(user.displayName)
                && tempVal['readYn'].includes('no')){
                        console.log(tempVal);
                        io.to(socket.id).emit('chatMessage', tempVal);
                    }
                })
            },
            error => {
                
            })
        
    });

    socket.on('disconnect', function () {
        onlineUsers.forEach(function (user, index) {
            if (user.socketId === socket.id) {
                onlineUsers.splice(index, 1);
                io.emit('userIsDisconnected', socket.id);
                io.emit('onlineUsers', onlineUsers);
            }
        });
    });
});

app.use("/api/chat/updateMessage", (req, res) => {
    res.send(chat.updateMessage(req.body));
});

const topic = new Topics();

app.use("/api/topics/addtopics", (req, res) => {
    res.send(topic.addTopic(req.body));
});

app.use("/api/topics/gettopics", (req, res) => {
    let data = topic.getTopics();
    data.then(
        result=>{
           res.send({"status":"success","data":result});
        },
        error=>{
            res.send({"status":"fail","data":error});
        }        
    )
});

app.use("/api/topics/updatefollow", (req, res) => {
    topic.updateFollow(req.body.id,req.body.data);
    res.send({"status":"success"});
});

app.use("/api/getUserDetail",(req, res)=> {
    let data = getUserDetail(req, res);
    data.then(
        result=>{
            res.send(result);
        },
        error=>{
            res.send(error);
        }        
    )
})

app.use("/api/userChallenges", (req, res) => {    
    console.log("checking request val= ", req.body)
    let data = getUserSpecificChallengesFromDB(req, res)
    data.then(
      result => {
        res.send(result)
      },
      error => {
        res.send(error)
      })
  })
  
  app.post("/api/getUserFromUserMaster", (req, res) => {
    let data = getUserFromUserMasterDB(req, res)
    data.then(
      result => {
        res.send(result)
      },
      error => {
        res.send(error)
      })
  })
  
  app.use("/api/getChallengesByTopic",(req, res)=> {
    let data = getChallengeDetails(req, res)
    data.then(
      result => {          
        res.send(result)
      },
      error => {
        res.send(error)
      })
   })

http.listen(process.env.PORT || 8080, () => console.log(`Example app listening on ${process.env.PORT || 8080}!`));

module.exports = app
