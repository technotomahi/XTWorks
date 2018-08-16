import {MDCDialog} from "@material/dialog"
import {renderViewToContainer, getChallengeModalbox, getChallengeModalBodyContent} from "./challenge-modal.view"
import {Store} from "../../boot/Store"
import {displayLeaderBoard} from "../leader-board/leader-controller"
import {showLoader} from "../loader/loader.controller"

export const createChallengemodal = () => {
  const challengeModaltemplate = getChallengeModalbox()
  renderViewToContainer(challengeModaltemplate, "#quiz-maincontent")
}
export const challengeModalInitializeShow = (evt) => {
  const targetId = evt.currentTarget.id.split("_")[1]
  console.log(targetId)
  const state = Store.getState().dashboardReducer
  const dataItem = state.ChallegeList.filter((x) => {
    return x.challengeId.toString() === targetId
  })[0]
  openChallengeModal(dataItem, targetId, evt.target)
  evt.preventDefault()
}

const openChallengeModal = (state, id, target) => {
  const dialogElement = document.querySelector("#challenge-mdc-dialog")
  const dialog = new MDCDialog(dialogElement)
  const dialogHeader = dialogElement.querySelector("#challenge-mdc-dialog-label")
  const dialogBody = dialogElement.querySelector("#challenge-mdc-dialog-description")
  dialogHeader.innerHTML = `Challenge : ${state.challengeName}`
  dialogBody.innerHTML = ""
  const challengeModalBodyTemp = getChallengeModalBodyContent(state, id)
  const modalBtnList = challengeModalBodyTemp.querySelectorAll("button")
  modalBtnList.forEach((item) => {
    item.addEventListener("click", (event) => {
      challengeModalbtnClick(event)
    })
  })
  dialogBody.appendChild(challengeModalBodyTemp)

  dialog.listen("MDCDialog:cancel", function() {
    console.log("canceled")
  })

  // ///////////////////////// Leader Board Related Code///////////////////////////////
  document.querySelector(".btnLeaderBoard").addEventListener("click", function(event) {
    showLoader()
    const btnData = event.target.id.split("-")
    const challengeId = btnData[1]
    displayLeaderBoard("challenges", challengeId)
  })
  // ////////////////////////////////////////////////////////////////////////////////////

  dialog.lastFocusedTarget = target
  dialog.show()
}

const challengeModalbtnClick = (event) => {
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
