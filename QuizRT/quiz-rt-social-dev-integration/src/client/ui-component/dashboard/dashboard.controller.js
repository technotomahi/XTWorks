import {renderViewToContainer, getNoListMsg, getDashboardContainerTemplate, getPopularTopicTemplate, getFavTopicTemplate, getChallengesTemplate, getMyChallengesTemplate} from "./dashboard.view"
import {topicModalInitializeShow, createTopicmodal} from "../topic-modal/topic-modal.controller"
import {challengeModalInitializeShow, createChallengemodal} from "../challenge-modal/challenge-modal.controller"
import {showLoader, hideLoader} from "../loader/loader.controller"
import {getTopics, getChallenges} from "../dashboard/dashboard.service"
import {Store} from "../../boot/Store"
import {createLeaderBoardForChallenges} from "../leader-board/leader-controller"

// const topicData = {
//   "test1": {
//     "topicText": "Politics",
//     "topicUrl": "",
//     "topicImage": "https://vignette.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png",
//     "createdDate": "11/11/2018",
//     "createdBy": 1,
//     "modifiedBy": 1,
//     "modifiedDate": "11/11/2018",
//     "published": true,
//     "follow": true,
//   },
//   "test2": {
//     "topicText": "Sports",
//     "topicUrl": "",
//     "topicImage": "https://vignette.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png",
//     "createdDate": "11/11/2018",
//     "createdBy": 1,
//     "modifiedBy": 1,
//     "modifiedDate": "11/11/2018",
//     "published": true,
//     "follow": true,
//   },
//   "test3": {
//     "topicText": "Environments",
//     "topicUrl": "",
//     "topicImage": "https://vignette.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png",
//     "createdDate": "11/11/2018",
//     "createdBy": 1,
//     "modifiedBy": 1,
//     "modifiedDate": "11/11/2018",
//     "published": true,
//     "follow": true,
//   },
// }
// const popularTopicData = [
//   {
//     "id": "1",
//     "Name": "Cricket",
//     "Img": "topic002.png",
//     "Route": "NavigateToTopic",
//     "Title": "Cricket",
//   },
//   {
//     "id": "2",
//     "Name": "JavaScript",
//     "Img": "topic002.png",
//     "Route": "NavigateToTopic",
//     "Title": "JavaScript",
//   },
//   {
//     "id": "3",
//     "Name": "Information Tech",
//     "Img": "topic002.png",
//     "Route": "NavigateToTopic",
//     "Title": "Information Tech",
//   },
//   {
//     "id": "4",
//     "Name": "Cricket",
//     "Img": "topic002.png",
//     "Route": "NavigateToTopic",
//     "Title": "Cricket",
//   },
//   {
//     "id": "5",
//     "Name": "JavaScript",
//     "Img": "topic002.png",
//     "Route": "NavigateToTopic",
//     "Title": "JavaScript",
//   },
//   {
//     "id": "6",
//     "Name": "Information Tech",
//     "Img": "topic002.png",
//     "Route": "NavigateToTopic",
//     "Title": "Information Tech",
//   },
//   {
//     "id": "7",
//     "Name": "Cricket",
//     "Img": "topic002.png",
//     "Route": "NavigateToTopic",
//     "Title": "Cricket",
//   },
//   {
//     "id": "8",
//     "Name": "JavaScript",
//     "Img": "topic002.png",
//     "Route": "NavigateToTopic",
//     "Title": "JavaScript",
//   },
//   {
//     "id": "9",
//     "Name": "Information Tech",
//     "Img": "topic002.png",
//     "Route": "NavigateToTopic",
//     "Title": "Information Tech",
//   },
// ]

// const challengeData = [
//   {
//     "Name": "Cricket",
//     "Img": "challenges001.png",
//     "Route": "NavigateToTopic",
//     "Title": "Cricket",
//   },
//   {
//     "Name": "JavaScript",
//     "Img": "challenges001.png",
//     "Route": "NavigateToTopic",
//     "Title": "JavaScript",
//   },
//   {
//     "Name": "Information Tech",
//     "Img": "challenges001.png",
//     "Route": "NavigateToTopic",
//     "Title": "Information Tech",
//   }, {
//     "Name": "Cricket",
//     "Img": "challenges001.png",
//     "Route": "NavigateToTopic",
//     "Title": "Cricket",
//   },
//   {
//     "Name": "JavaScript",
//     "Img": "challenges001.png",
//     "Route": "NavigateToTopic",
//     "Title": "JavaScript",
//   },
//   {
//     "Name": "Information Tech",
//     "Img": "challenges001.png",
//     "Route": "NavigateToTopic",
//     "Title": "Information Tech",
//   },
//   {
//     "Name": "Cricket",
//     "Img": "challenges001.png",
//     "Route": "NavigateToTopic",
//     "Title": "Cricket",
//   },
//   {
//     "Name": "JavaScript",
//     "Img": "challenges001.png",
//     "Route": "NavigateToTopic",
//     "Title": "JavaScript",
//   },
//   {
//     "Name": "Information Tech",
//     "Img": "challenges001.png",
//     "Route": "NavigateToTopic",
//     "Title": "Information Tech",
//   },
// ]

const challengeDataList = [
  {
    "challengeId": "01",
    "topicName": "sport",
    "challengeName": "chall",
    "questions": [
      {
        "qId": "1",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "2",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "3",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "4",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "5",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "6",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "7",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
    ],
  },
  {
    "challengeId": "06",
    "topicName": "sport",
    "challengeName": "ch2",
    "questions": [
      {
        "qId": "1",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "2",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "3",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "4",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "5",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "6",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "7",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
    ],
  },
  {
    "challengeId": "02",
    "topicName": "sport",
    "challengeName": "ch2",
    "questions": [
      {
        "qId": "1",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "2",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "3",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "4",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "5",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "6",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "7",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
    ],
  },
  {
    "challengeId": "03",
    "topicName": "sport",
    "challengeName": "ch2",
    "questions": [
      {
        "qId": "1",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "2",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "3",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "4",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "5",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "6",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "7",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
    ],
  },
  {
    "challengeId": "04",
    "topicName": "sport",
    "challengeName": "ch2",
    "questions": [
      {
        "qId": "1",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "2",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "3",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "4",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "5",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "6",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
      {
        "qId": "7",
        "question": "where are you from ?",
        "options": {
          "optionA": "Bangalore",
          "optionB": "Delhi",
          "optionC": "Kolkata",
          "optionD": "Mumbai",
        },
        "answer": "Bangalore",
      },
    ],
  },
]

// const getChallenges = () => {
//   let promise = new Promise((resolve, reject) => {
//     setTimeout(()=>{
//       resolve(challengeDataList)
//     }, 500)
//   })
//   return promise
// }

export const loadDashBoardData = () => {
  getTopics().then(topicdata => {
    Store.dispatch({type: "GET_TopicData", dataItem: {Topics: topicdata}})
  })
  getChallenges().then(challengedata => {
    challengedata.splice(0, 1)
    // const my_Challeges = challengedata
    // const my_Challeges = challengedata.filter((item) => {
    //     if ('users' in item){
    //         return (item.users.indexOf(curState.menuReducer.currentUserInfo.email) !== -1)
    //     }
    // })
    // const ChallegeList = challengedata.filter((item) => {
    //     if ('users' in item){
    //         return (item.users.indexOf(curState.menuReducer.currentUserInfo.email) === -1)
    //     }
    // })
    // console.log(my_Challeges)
    // console.log(ChallegeList)

    Store.dispatch({type: "GET_ChallengeData", dataItem: {Challeges: challengedata}})
  })
}

const loadDashboardContainer = () => {
  const dashboardContainerTemp = getDashboardContainerTemplate()
  renderViewToContainer(dashboardContainerTemp, "#quiz-maincontent")
}

export const createPopularTopicSection = (topicData) => {
  document.querySelector("#dashboard_pTopic").innerHTML = ""
  if (Object.keys(topicData).length > 0) {
    const pTopictemp = getPopularTopicTemplate(topicData, "Popular Topic")
    const pTopicitems = pTopictemp.querySelectorAll(".mdc-card")
    pTopicitems.forEach((item) => {
      item.addEventListener("click", (event) => {
        topicModalInitializeShow(event)
      })
    })
    renderViewToContainer(pTopictemp, "#dashboard_pTopic")
  }
  else {
    // renderViewToContainer(getNoListMsg("Popular Topic", "No Popular Topic List"), "#dashboard_pTopic")
  }
}
export const createFavoriteTopicSection = (topicData) => {
  document.querySelector("#dashboard_fTopic").innerHTML = ""
  const curState = Store.getState()
  const fav_Topic = {}
  for (const topickey in topicData) {
    if ("users" in topicData[topickey]) {
      if (topicData[topickey].users.indexOf(curState.menuReducer.currentUserInfo.email) !== -1) {
        fav_Topic["" + topicData[topickey].id] = topicData[topickey]
      }
    }
  }
  if (Object.keys(fav_Topic).length > 0) {
    const fTopictemp = getFavTopicTemplate(fav_Topic, "Favorite Topic")
    const fTopicitems = fTopictemp.querySelectorAll(".mdc-card")
    fTopicitems.forEach((item) => {
      item.addEventListener("click", (event) => {
        topicModalInitializeShow(event)
      })
    })
    renderViewToContainer(fTopictemp, "#dashboard_fTopic")
  }
  else {
    // renderViewToContainer(getNoListMsg("Favorite Topic", "No Favorite Topic List"), "#dashboard_fTopic")
  }
}
export const createChallengesSection = (challengeDataList) => {
  document.querySelector("#dashboard_challenge").innerHTML = ""
  if (challengeDataList.length > 0) {
    const challengestemp = getChallengesTemplate(challengeDataList, "Challenges")
    const challengeitems = challengestemp.querySelectorAll(".mdc-card")
    challengeitems.forEach((item) => {
      item.addEventListener("click", (event) => {
        challengeModalInitializeShow(event)
      })
    })
    renderViewToContainer(challengestemp, "#dashboard_challenge")
  }
  else {
    // renderViewToContainer(getNoListMsg("Challenges", "No Challenge List"), "#dashboard_challenge")
  }
}
export const createMyChallengesSection = (challengeDataList) => {
  document.querySelector("#dashboard_mychallenge").innerHTML = ""
  const curState = Store.getState()
  const mychallangeList = challengeDataList.filter((x) => {
    return x.Created_By == curState.menuReducer.currentUserInfo.email
  })
  if (mychallangeList.length > 0) {
    const mychallengestemp = getMyChallengesTemplate(mychallangeList, "My Challenges")
    const mychallengeitems = mychallengestemp.querySelectorAll(".mdc-card")
    mychallengeitems.forEach((item) => {
      item.addEventListener("click", (event) => {
        challengeModalInitializeShow(event)
      })
    })
    renderViewToContainer(mychallengestemp, "#dashboard_mychallenge")
  }
  else {
    // renderViewToContainer(getNoListMsg("My Challenges", "No My Challenge List"), "#dashboard_mychallenge")
  }
}

Store.subscribe(() => {
  const currentState = Store.getState()
  if (currentState.menuReducer.currentView === "dashboard") {
    if (!document.querySelector("#quiz-maincontent").classList.contains("mainContainer")) {
      document.querySelector("#quiz-maincontent").classList.add("mainContainer")
    }
    document.querySelector("#quiz-maincontent").innerHTML = ""
    showLoader()
    loadDashboardContainer()
    if (!currentState.dashboardReducer.Action || currentState.dashboardReducer.Action == "Init") {
      loadDashBoardData()
    }
    else {
      if (currentState.dashboardReducer.TopicList && Object.keys(currentState.dashboardReducer.TopicList).length > 0) {
        createPopularTopicSection(currentState.dashboardReducer.TopicList)
      }

      if (currentState.dashboardReducer.TopicList && Object.keys(currentState.dashboardReducer.TopicList).length > 0) {
        createFavoriteTopicSection(currentState.dashboardReducer.TopicList)
      }

      if (currentState.dashboardReducer.ChallegeList && currentState.dashboardReducer.ChallegeList !== []) {
        createChallengesSection(currentState.dashboardReducer.ChallegeList)
      }

      if (currentState.dashboardReducer.ChallegeList && currentState.dashboardReducer.ChallegeList !== []) {
        createMyChallengesSection(currentState.dashboardReducer.ChallegeList)
      }
    }
    createTopicmodal()
    createChallengemodal()
    createLeaderBoardForChallenges()
    hideLoader()
    // if (document.querySelector('#dashboard_pTopic').innerHTML !== ""
    //     && document.querySelector('#dashboard_fTopic').innerHTML !== ""
    //     && document.querySelector('#dashboard_challenge').innerHTML !== ""
    //     && document.querySelector('#dashboard_mychallenge').innerHTML !== "") {

    // }
  }
})

