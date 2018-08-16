import {MDCTopAppBar} from "@material/top-app-bar/index"
import {getHeaderTemplate, renderViewToContainer} from "./header.view"
import {createMenu} from "../menu/menu.controller"
import {goToLogout} from "../login-page/login.service"
import {Store} from "../../boot/Store"
import {listOfFriendsClicked} from "../Friends/controller"

export const createHeader = () => {
  const headerContent = getHeaderTemplate()
  const appNameLbl = headerContent.querySelector("#appName")
  appNameLbl.addEventListener("click", function() {
    const currentState = Store.getState()
    if (currentState.menuReducer.currentView !== "dashboard") {
      Store.dispatch({type: "CurrentViewUpdate", dataItem: {Name: "dashboard"}})
    }
  })

  const logoutBtn = headerContent.querySelector("#logout")
  logoutBtn.addEventListener("click", function() {
    goToLogout()
    if (document.querySelector("#quiz-maincontent").classList.contains("mainContainer")) {
      document.querySelector("#quiz-maincontent").classList.remove("mainContainer")
    }
  })

  const chatIconBtn = headerContent.querySelector(".chatIcon")
  chatIconBtn.addEventListener("click", function() {
    Store.dispatch({type: "CurrentViewUpdate", dataItem: {Name: "friends"}})
    listOfFriendsClicked()
  })

  renderViewToContainer(headerContent, "#quiz-header")
  const topAppBarElement = document.querySelector(".mdc-top-app-bar")
  const topAppBar = new MDCTopAppBar(topAppBarElement)
  console.log("from header =", topAppBar)
}

Store.subscribe(() => {
  const currentState = Store.getState()
  if (currentState.menuReducer.currentView !== "login") {
    document.querySelector("#quiz-header").innerHTML = ""
    createHeader()
    createMenu()
  }
})

