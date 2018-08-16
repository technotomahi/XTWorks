const htmlToTemplate = (htmlstr) => {
  const template = document.createElement("template")
  template.innerHTML = htmlstr
  return template.content
}
export const renderViewToContainer = (content, containerKey) => {
  const container = document.querySelector(containerKey)
  container.appendChild(content)
}

export const getTopicModalbox = () => {
  const topicModalHtmlStr = `<aside id="topic-mdc-dialog"
    class="mdc-dialog"
    role="alertdialog"
    aria-labelledby="my-mdc-dialog-label"
    aria-describedby="my-mdc-dialog-description">
    <div class="mdc-dialog__surface">
      <header class="mdc-dialog__header">
        <h2 id="topic-mdc-dialog-label" class="mdc-dialog__header__title">
        </h2>
      </header>
      <section id="topic-mdc-dialog-description" class="mdc-dialog__body">
        
      </section> 
      <footer class="mdc-dialog__footer">
        <button type="button" class="mdc-button mdc-button--raised close-btn  mdc-dialog__footer__button mdc-dialog__footer__button--cancel">Close</button>
      </footer>     
    </div>
    <div class="mdc-dialog__backdrop"></div>
  </aside>`
  return htmlToTemplate(topicModalHtmlStr)
}

export const getToipcModalBodyContent = (state, id, emailId) => {
  console.log("state", state)
  let follow = ""
  let image = "https://vignette.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png"

  if (state.topicUrl !== "") {
    image = state.topicUrl
  }

  if (state.users !== undefined && state.users.indexOf(emailId) > -1) {
    follow = `<button id="topic-${id}-unfollow" class="mar-btm-10px mdc-button mdc-button--raised">
    Unfollow</button>`
  }
  else {
    follow = `<button id="topic-${id}-follow" class="mar-btm-10px mdc-button mdc-button--raised">
    Follow</button>`
  }

  const modalBodyContentStr = `  
  <div class="mdc-layout-grid">
    <div class="mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4 mdc-layout-grid__cell--span-8-tablet">
        <div class="topicCardContainer">
            <div id="topic_${id}" class="mdc-card demo-card demo-card--photo">
              <a class="mdc-card__primary-action demo-card__primary-action" href="#">
                <div class="mdc-card__media mdc-card__media--square demo-card__media" style="background-image: url('${image}');">
                </div>
              </a>  
            </div>   
        </div>
      </div>
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4 mdc-layout-grid__cell--span-8-tablet">
          <button id="topic-${id}-play" class="mar-btm-10px mdc-button mdc-button--raised">Play Game</button>
          ${follow}
          <button id="topic-${id}-leader" class="mar-btm-10px mdc-button mdc-button--raised btnLeaderBoard">Leader Board</button>
      </div>      
    </div>
  </div>  
  `
  return htmlToTemplate(modalBodyContentStr)
}
