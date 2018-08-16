const htmlToTemplate = (htmlstr) => {
  const formDiv = document.createElement("div")
  formDiv.innerHTML = htmlstr
  return formDiv.firstElementChild
}

// first
export const getUserTemplate = () => {
  const userHtmlContent = `<div>
  <div class="login-hero-img"></div>
  <div class="mdl-card__supporting-text login-form">
  <div class="lbl_login">Quiz RT</div>
  <button id="signin" class="demo-button mdc-button mdc-button--raised mdc-ripple-upgraded" style="--mdc-ripple-fg-size:55.2094px; --mdc-ripple-fg-scale:1.97081; --mdc-ripple-fg-translate-start:20.8172px, -13.7922px; --mdc-ripple-fg-translate-end:18.4031px, -9.60469px;">
  <i class="material-icons mdc-button__icon">https</i> 
  <lable id="signinLbl">Signin  With  Google</label>
  </button> 
  </div>
  </div>`
  return htmlToTemplate(userHtmlContent)
}

// second
export const renderViewToContainer = (content, containerKey) => {
  const container = document.querySelector(containerKey)
  container.appendChild(content)
}
