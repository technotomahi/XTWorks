import {MDCDialog} from "@material/dialog"
import {renderViewToContainer, getTopicModalbox, getToipcModalBodyContent} from "./topic-modal.view"
import {Store} from "../../boot/Store"
import {updateFollow} from "../topics/topics.service"
import {displayLeaderBoard} from "../leader-board/leader-controller"
import {showLoader, hideLoader} from "../loader/loader.controller"

export const createTopicmodal = () => {
  const topicModaltemplate = getTopicModalbox()
  renderViewToContainer(topicModaltemplate, "#quiz-maincontent")
}
export const topicModalInitializeShow = (evt) => {
  const targetId = evt.currentTarget.id.split("_")[1]
  console.log(targetId)
  // const state = topicDataList[targetId]
  const state = Store.getState()

  // .topics["" + targetId]
  // .topics["" + targetId]
  if (state.menuReducer.currentView === "dashboard") {
    openTopicModal(state.dashboardReducer.TopicList["" + targetId], targetId, evt.target, state.menuReducer.currentUserInfo.email)
  }
  else if (state.menuReducer.currentView === "topics") {
    openTopicModal(state.topicReducer.Topics["" + targetId], targetId, evt.target, state.menuReducer.currentUserInfo.email)
  }
  evt.preventDefault()
}

const openTopicModal = (state, id, target, emailId) => {
  const dialogElement = document.querySelector("#topic-mdc-dialog")
  const dialog = new MDCDialog(dialogElement)
  const dialogHeader = dialogElement.querySelector("#topic-mdc-dialog-label")
  dialogHeader.innerHTML = `Topic : ${state.topicText}`
  render(state, id, emailId)
  dialog.listen("MDCDialog:cancel", function() {
    console.log("canceled")
  })

  dialog.listen("MDCDialog:cancel", function() {
    console.log("canceled")
  })

  // ///////////////////////// Leader Board Related Code///////////////////////////////
  document.querySelector(".btnLeaderBoard").addEventListener("click", function(event) {
    showLoader()
    const btnData = event.target.id.split("-")
    const topicId = btnData[1]
    const state = Store.getState()
    let topicData = ""
    if (state.menuReducer.currentView === "dashboard") {
      topicData = state.dashboardReducer.TopicList
    }
    else if (state.menuReducer.currentView === "topics") {
      topicData = state.topicReducer.Topics
    }
    displayLeaderBoard("games", topicData[topicId].topicText)
  })
  // ////////////////////////////////////////////////////////////////////////////////////

  dialog.lastFocusedTarget = target
  dialog.show()
}

const render = (state, id, emailId) => {
  const dialogBody = document.querySelector("#topic-mdc-dialog-description")
  const topicModalBodyTemp = getToipcModalBodyContent(state, id, emailId)
  const modalBtnList = topicModalBodyTemp.querySelectorAll("button")
  modalBtnList.forEach((item) => {
    item.addEventListener("click", (event) => {
      topicModalbtnClick(event)
    })
  })
  dialogBody.innerHTML = ""
  dialogBody.appendChild(topicModalBodyTemp)
}

const topicModalbtnClick = (event) => {
  showLoader()
  const btnData = event.target.id.split("-")
  const topicId = btnData[1]
  const state = Store.getState()
  let topicData = ""
  if (state.menuReducer.currentView === "dashboard") {
    topicData = state.dashboardReducer.TopicList
  }
  else if (state.menuReducer.currentView === "topics") {
    topicData = state.topicReducer.Topics
  }
  const data = {"id": topicId, "data": []}
  let topic = ""
  const userid = state.menuReducer.currentUserInfo.email
  switch (btnData[2]) {
  case "play":
    const url = "https://game-engine-beta.herokuapp.com/?topicId=" + topicData[topicId].topicText
    window.open(url, "_blank")
    hideLoader()
    break
  case "leader":
    console.log("leader" + topicId)
    break
  case "unfollow":
    topic = topicData["" + topicId]
    const ind = topic.users.indexOf(userid)
    if (ind > -1) {
      topic.users.splice(ind, 1)
    }
    data.data = topic.users
    updateFollow(data).then(result => {
      console.log(result)
      topic.users = data.data
      topicData["" + topicId]["users"] = topic.users
      if (state.menuReducer.currentView !== "dashboard") {
        Store.dispatch({"type": "UPDATE_TOPIC", "payload": topicData})
        document.getElementById("topic_follower_" + topicId).innerHTML = topic.users.length
      }
      else {
        Store.dispatch({"type": "UPDATE_Dashboard_Topic", "dataItem": topicData})
      }
      render(topic, topicId, userid)
      hideLoader()
    }, error => {
      console.log(error)
      hideLoader()
    })

    break
  case "follow":
    topic = topicData["" + topicId]
    if (topic.users !== undefined) {
      topic.users.push(userid)
    }
    else {
      topic.users = [userid]
    }
    data.data = topic.users
    updateFollow(data).then(result => {
      topicData["" + topicId]["users"] = topic.users
      render(topic, topicId, userid)
      if (state.menuReducer.currentView !== "dashboard") {
        Store.dispatch({"type": "UPDATE_TOPIC", "payload": topicData})
        document.getElementById("topic_follower_" + topicId).innerHTML = topic.users.length
      }
      else {
        Store.dispatch({"type": "UPDATE_Dashboard_Topic", "dataItem": topicData})
      }
      hideLoader()
    }, error => {
      console.log(error)
      hideLoader()
    })
    break
  }
}
