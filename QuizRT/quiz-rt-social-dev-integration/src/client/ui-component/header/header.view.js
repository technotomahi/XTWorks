
const htmlToTemplate = (htmlstr) => {
  const template = document.createElement("template")
  template.innerHTML = htmlstr
  return template.content
}

export const renderViewToContainer = (content, containerKey) => {
  const container = document.querySelector(containerKey)
  container.appendChild(content)
}

export const getHeaderTemplate = () => {
  const headerHtmlStr = `<div class="mdc-top-app-bar">
  <div class="mdc-top-app-bar__row">
    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
    <a href="#" class="sidemenu material-icons mdc-top-app-bar__navigation-icon">menu</a>
    <span id="appName" class="mdc-top-app-bar__title">Quiz RT</span>
    </section>
    <section id="iconSection" class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">    
    <a href="#" class="material-icons logoutIcon" id="logout" >power_settings_new</a>
    <a href="#" class="material-icons mdl-badge chatIcon">chat</a>
    
    </section>
  </div>
  </div>`
  return htmlToTemplate(headerHtmlStr)
}

