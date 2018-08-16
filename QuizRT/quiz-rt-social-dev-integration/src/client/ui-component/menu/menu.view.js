
const htmlToTemplate = (htmlstr) => {
  const template = document.createElement("template")
  template.innerHTML = htmlstr
  return template.content
}
export const renderViewToContainer = (content, containerKey) => {
  const container = document.querySelector(containerKey)
  container.appendChild(content)
}
export const getMenuTemplate = (menuData, userInfo) => {
  let menuItemStr = ""
  if (menuData.length > 0) {
    menuData.forEach((item) => {
      menuItemStr += `<a id="menu_${item.id}" class="headermenu mdc-list-item mdc-list-item--selected demo-drawer-list-item" href="#" dir="ltr">
            <i class="material-icons mdc-list-item__graphic quiz-menuIcon" aria-hidden="true">${item.Icon}</i>${item.Name}
          </a>`
    })
  }

  const menuHtmlStr = `<aside class="mdc-drawer mdc-drawer--temporary" dir="ltr">
    <nav class="mdc-drawer__drawer">
      <header class="mdc-drawer__header">
      <div class="mdc-drawer__header-content">
      <div class="mdc-typography--headline6">
      <span class="mdl-list__item-primary-content">
      <img class="material-icons userIcon" src="${userInfo.photoURL}" style="">
      </span>    
      </div>
      <div id="loggedInEmail" class="mdc-typography--subtitle2" style="font-weight: bold">${userInfo.email}</div>
      </div>
      </header>
      <nav class="mdc-drawer__content mdc-list-group">
        <div id="icon-with-text-demo" class="mdc-list">
        ${menuItemStr}
        </div>
      </nav>
    </nav>
  </aside>`
  return htmlToTemplate(menuHtmlStr)
}
