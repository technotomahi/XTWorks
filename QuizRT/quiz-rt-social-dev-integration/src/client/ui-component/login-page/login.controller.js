import {getUserTemplate, renderViewToContainer} from "./login.view"
import {goToSignin, goToSignup} from "./login.service"
import {Store} from "../../boot/Store"
import {emitCurrentUser} from "../chat/chat.controller"
export const createUserLogin = () => {
  const userContent = getUserTemplate()
  const signInBtn = userContent.querySelector("#signin")
  // const signUpBtn = userContent.querySelector("#signup")
  signInBtn.addEventListener("click", (event) => {
    // const username = document.getElementById("username")
    // const password = document.getElementById("password")
    goToSignin()
  })
  // signUpBtn.addEventListener("click", (event) => {
  //   const username = document.getElementById("username")
  //   const password = document.getElementById("password")
  //   goToSignup(username.value, password.value)
  // })
  renderViewToContainer(userContent, "#quiz-maincontent")
}
let ctr = 0

Store.subscribe(() => {
  const currentState = Store.getState()
  if (currentState.menuReducer.currentView === "dashboard" && ctr === 0) {
    console.log(ctr)
    emitCurrentUser()
    ctr++
  }
  if (currentState.menuReducer.currentView === "login") {
    document.querySelector("#quiz-header").innerHTML = ""
    document.querySelector("#quiz-maincontent").innerHTML = ""
    document.querySelector("#quiz-footer").innerHTML = ""
    createUserLogin()
  }
})
