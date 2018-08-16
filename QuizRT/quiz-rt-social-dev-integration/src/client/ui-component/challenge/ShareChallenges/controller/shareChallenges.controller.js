import {getShareChallengeTemplate, getShareChallengeModalTemplate, renderViewToContainer, getshareChallengeModalContent} from "../view/shareChallenges.view"
import {Store} from "../../../../boot/Store"
import {getUserChallenges, getFriendsToShareChallenges, updateUserTransactionWithSharedChallenges} from "../service/shareChallenges.service"
import {showLoader} from "../../../loader/loader.controller"
import {loadFriends} from "../../../../ui-component/Friends/service"
import {updateUserTransaction} from "../../CreateChallenge/service/CreateChallengeService"
import {MDCDialog} from "@material/dialog"
import {setTimeout} from "timers"
import {showSnackBar} from "../../../snackbar/snackbar.controller"

export const createShareChallengesModal = () => {
  const shareChallengesModalTemp = getShareChallengeModalTemplate()
  renderViewToContainer(shareChallengesModalTemp, "#quiz-maincontent")
}

export const createShareChallengesSection = (userId) => {
  showLoader()
  getUserChallenges(userId).then(function(userChallenges) {
    const currentState = Store.getState()
    const shareChallengesData = getShareChallengeTemplate(userChallenges)
    const shareBtnList = shareChallengesData.querySelectorAll(".shareChalBtn")
    shareBtnList.forEach((item) => {
      item.addEventListener("click", (event) => {
        const curChallengeId = event.currentTarget.id.split("_")[1]
        const curChallengeItem = userChallenges.filter((x) => {
          return x.challengeId.toString() === curChallengeId
        })[0]
        const email = currentState.menuReducer.currentUserInfo.email
        getFriendsToShareChallenges(email).then(function(friends) {
          fetchFriendsToShareChallenges(friends, userId, curChallengeItem)
        })
      })
    })
    const challengeBtnList = shareChallengesData.querySelectorAll(".playChallengeBtnCls")
    challengeBtnList.forEach((item) => {
      item.addEventListener("click", (event) => {
        playChallengeOnPlayButton(event)
      })
    })
    renderViewToContainer(shareChallengesData, "#challengeSection")
  }, function(error) {
    const myArray = []
    const shareChallengesData = getShareChallengeTemplate(myArray)
    renderViewToContainer(shareChallengesData, "#challengeSection")
    console.log("No Record from firebase api", error)
  })
}

export const fetchFriendsToShareChallenges = (friends, userId, curChallengeItem) => {
  const shareChallengeModalContentTemp = getshareChallengeModalContent(friends)
  document.querySelector(".friendsUsernames").innerHTML = ""
  renderViewToContainer(shareChallengeModalContentTemp, ".friendsUsernames")
  const dialogElement = document.querySelector("#shareChall-mdc-dialog")
  const dialog = new MDCDialog(dialogElement)
  let isDialogOpen = false
  document.querySelector("#submitSharedChallenge").addEventListener("click", (event) => {
    if (isDialogOpen) {
      var friendsListUL = document.querySelector("#friendsUl")
      var frnds = friendsListUL.querySelectorAll(".friendsLi")
      const selectedFriends = []
      let shareUserTranObj = {"challengeId": "", "challengeName": "", "Created_By": "", "shared_by": "", "playedOn": "", "score": "", "userID": "", "userName": ""}
      for (const item of frnds) {
        if (item.querySelector(".mdl-checkbox__input").checked) {
          let friendUserId = item.children[1].children[1].id.split("_")[1]
          friendUserId = parseInt(friendUserId, 10)
          const friendDisplayName = item.children[1].children[1].id.split("_")[2]
          selectedFriends.push({"userID": friendUserId, "displayName": friendDisplayName, "email": item.children[1].children[1].innerText})
        }
      }
      if (selectedFriends.length > 0) {
        for (const selFriend of selectedFriends) {
          shareUserTranObj = {"challengeId": "", "challengeName": "", "Created_By": "", "shared_by": "", "playedOn": "", "score": "", "userID": "", "userName": ""}
          shareUserTranObj.Created_By = curChallengeItem.Created_By
          shareUserTranObj.challengeId = curChallengeItem.challengeId
          shareUserTranObj.challengeName = curChallengeItem.challengeName
          shareUserTranObj.shared_by = userId
          shareUserTranObj.userID = selFriend.userID
          shareUserTranObj.userName = selFriend.displayName
          console.log("updateUser call")
          updateUserTransactionWithSharedChallenges(shareUserTranObj)
        }
        console.log("selectedFriends" + JSON.stringify(selectedFriends))
        showSnackBar("challenge shared successfully", "Success")
        dialog.close()
        isDialogOpen = false
      }
      else {
        showSnackBar("Please select atlease one friend to share challenge or click on Close", "Error")
      }
    }
  })
  const target = document.querySelector("#shareChallengeButton")
  dialog.lastFocusedTarget = target
  isDialogOpen = true
  dialog.show()
}

const playChallengeOnPlayButton = (event) => {
  const btnData = event.target.id.split("-")
  const challengeId = btnData[1]
  const curState = Store.getState()
  const curChallengeInfo = curState.dashboardReducer.ChallegeList.filter((x) => {
    return x.challengeId.toString() === challengeId
  })[0]
  let topicId = ""
  for (const topickey in curState.dashboardReducer.TopicList) {
    if (curState.dashboardReducer.TopicList[topickey].topicText === curChallengeInfo.topicName) {
      topicId = curState.dashboardReducer.TopicList[topickey].id
      break
    }
  }
  switch (btnData[2]) {
  case "play":
    console.log("play" + challengeId)
    const url = "https://game-engine-beta.herokuapp.com/?challengeId="+ challengeId +"&type=challenge"
    window.open(url, "_blank")
    break
  case "leader":
    console.log("leader" + challengeId)
    break
  default:
    break
  }
}
