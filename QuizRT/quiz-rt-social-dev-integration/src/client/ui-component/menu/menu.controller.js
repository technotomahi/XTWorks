import {MDCTemporaryDrawer} from "@material/drawer/index"
import {getMenuTemplate, renderViewToContainer} from "./menu.view"
import {Store} from "../../boot/Store"
import {updateTopicCtr} from "../topics/topic-controller"

const menuData = [{
  "id": 1,
  "Name": "Dashboard",
  "Status": "Active",
  "href": "Redirect Action",
  "Icon": "dashboard",
},
{
  "id": 2,
  "Name": "Topics",
  "Status": "InActive",
  "href": "Redirect Action",
  "Icon": "sort",
},
{
  "id": 3,
  "Name": "Challenges",
  "Status": "InActive",
  "href": "Redirect Action",
  "Icon": "games",
},
{
  "id": 4,
  "Name": "Friends",
  "Status": "InActive",
  "href": "Redirect Action",
  "Icon": "supervisor_account",
},
]

let drawer = null
export const createMenu = () => {
  const currentState = Store.getState()
  const menuContent = getMenuTemplate(menuData, currentState.menuReducer.currentUserInfo)
  const menuList = menuContent.querySelectorAll(".headermenu")
  menuList.forEach((menu) => {
    menu.addEventListener("click", (event) => {
      menuNavigation(event)
    })
  })
  renderViewToContainer(menuContent, "#quiz-header")
  // console.log("currentState = ", currentState.menuReducer.currentUserInfo.email)
  // document.getElementById("loggedInEmail").innerText = currentState.menuReducer.currentUserInfo.email
  const drawerEl = document.querySelector(".mdc-drawer")
  drawer = new MDCTemporaryDrawer(drawerEl)
  document.querySelector(".sidemenu").addEventListener("click", function() {
    drawer.open = true
  })
  drawerEl.addEventListener("MDCTemporaryDrawer:open", function() {
    console.log("Received MDCTemporaryDrawer:open")
  })
  drawerEl.addEventListener("MDCTemporaryDrawer:close", function() {
    console.log("Received MDCTemporaryDrawer:close")
  })

  {}
}

const menuNavigation = (evt) => {
  const menuId = evt.currentTarget.id.split("_")[1]
  const menuItem = menuData.filter((x) => {
    return x.id === parseInt(menuId)
  })[0]
  console.log("Clicked - " + menuItem.Name)
  drawer.open = false
  const currentState = Store.getState()
  if (currentState.menuReducer.currentView !== menuItem.Name.toLowerCase()) {
    document.querySelector("#quiz-maincontent").innerHTML = ""
    if (menuItem.Name.toLowerCase() === "topics") {
      updateTopicCtr()
    }
    Store.dispatch({type: "CurrentViewUpdate", dataItem: {Name: menuItem.Name.toLowerCase()}})
  }
}

