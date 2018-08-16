import {getSnackbarHtml, renderViewToContainer} from "./snackbar.view"

export const createSnackBar = () => {
  const snackbarTemplate = getSnackbarHtml()
  renderViewToContainer(snackbarTemplate, "body")
}

export const showSnackBar = (text, msgtype) => {
  const snackBar = document.querySelector("div#quiz-snackbar")
  snackBar.innerHTML = text
  snackBar.style.display = "block"
  if (msgtype.toLowerCase() === "success") {
    snackBar.style.background = "#06a00c"
  }
  else {
    snackBar.style.background = "#e2291b"
  }
  setTimeout(function() {
    snackBar.style.display = "none"
  }, 1500)
}
