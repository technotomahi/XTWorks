import {getFooterHtml, renderViewToContainer} from "./footer.view"
import {Store} from "../../boot/Store"

export const createFooter = () => {
  const footerTemplate = getFooterHtml()
  renderViewToContainer(footerTemplate, "#quiz-footer")
}

Store.subscribe(() => {
  const currentState = Store.getState()
  if (currentState.menuReducer.currentView !== "login") {
    document.querySelector("#quiz-footer").innerHTML = ""
    createFooter()
  }
})
