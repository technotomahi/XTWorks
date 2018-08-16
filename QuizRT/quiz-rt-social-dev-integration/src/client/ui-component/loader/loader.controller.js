import {getLoaderHtml, renderViewToContainer} from "./loader.view"

export const createLoader = () => {
  const loaderTemplate = getLoaderHtml()
  renderViewToContainer(loaderTemplate, "body")
}

export const showLoader = () => {
  const qLoader = document.querySelector("#quiz-loader")
  qLoader.removeAttribute("style")
}
export const hideLoader = () => {
  const qLoader = document.querySelector("#quiz-loader")
  qLoader.setAttribute("style", "display: none;")
}
