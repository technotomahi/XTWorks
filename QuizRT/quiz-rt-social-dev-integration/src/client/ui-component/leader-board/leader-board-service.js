const challengeData = {
  challengeId: "",
  topicName: "",
  challengeName: "",
  gameStatus:
       [{
         playerId: "1",
         playerName: "abc",
         score: "23423",
         playedOn: "07/03/2018",
       },
       {
         playerId: "2",
         playerName: "def",
         score: "1234",
         playedOn: "07/11/2018",
       },
       {
         playerId: "3",
         playerName: "ghi",
         score: "24466",
         playedOn: "07/29/2018",
       },
       {
         playerId: "4",
         playerName: "jkl",
         score: "32234",
         playedOn: "07/30/2018",
       },
       {
         playerId: "5",
         playerName: "mno",
         score: "56775",
         playedOn: "07/31/2018",
       },
       {
         playerId: "5",
         playerName: "pqr",
         score: "23235",
         playedOn: "07/30/2018",
       },
       {
         playerId: "6",
         playerName: "stu",
         score: "12311",
         playedOn: "08/01/2018",
       },
       {
         playerId: "7",
         playerName: "vwx",
         score: "45323",
         playedOn: "08/08/2018",
       },
       {
         playerId: "8",
         playerName: "yza",
         score: "36454",
         playedOn: "08/07/2018",
       },
       {
         playerId: "9",
         playerName: "bcd",
         score: "22223",
         playedOn: "08/07/2018",
       },
       ],
  createdBy: "userId",
}

const gameData = {
  games: [{
    heldOn: "",
    id: "",
    players: [
      {
        id: "1",
        name: "abc",
        score: "123",
      },
      {
        id: "2",
        name: "bcd",
        score: "120",
      },
      {
        id: "3",
        name: "cde",
        score: "142",
      },
      {
        id: "4",
        name: "def",
        score: "150",
      }],
  },
  {
    heldOn: "",
    id: "",
    players: [
      {
        id: "5",
        name: "aaa",
        score: "121",
      },
      {
        id: "2",
        name: "bcd",
        score: "520",
      },
      {
        id: "3",
        name: "cde",
        score: "140",
      },
      {
        id: "7",
        name: "ghi",
        score: "150",
      }],
  },
  {
    heldOn: "",
    id: "",
    players: [
      {
        id: "5",
        name: "aaa",
        score: "121",
      },
      {
        id: "2",
        name: "bcd",
        score: "520",
      },
      {
        id: "3",
        name: "cde",
        score: "140",
      },
      {
        id: "7",
        name: "ghi",
        score: "150",
      }],
  }],
}

export const getGameDetails = () => JSON.stringify(gameData)

export const getChallengeDetails = () => { 
  return JSON.stringify(challengeData)
}
