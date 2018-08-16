const htmlToTemplate = (htmlstr) => {
  const template = document.createElement("template")
  template.innerHTML = htmlstr
  return template.content
}
export const renderViewToContainer = (content, containerKey) => {
  const container = document.querySelector(containerKey)
  container.appendChild(content)
}

export const getChallengeModalbox = () => {
  const challengeModalHtmlStr = `<aside id="challenge-mdc-dialog"
      class="mdc-dialog"
      role="alertdialog"
      aria-labelledby="my-mdc-dialog-label"
      aria-describedby="my-mdc-dialog-description">
      <div class="mdc-dialog__surface">
        <header class="mdc-dialog__header">
          <h2 id="challenge-mdc-dialog-label" class="mdc-dialog__header__title">
          </h2>
        </header>
        <section id="challenge-mdc-dialog-description" class="mdc-dialog__body">
          
        </section> 
        <footer class="mdc-dialog__footer">
          <button type="button" class="mdc-button mdc-button--raised close-btn  mdc-dialog__footer__button mdc-dialog__footer__button--cancel">Close</button>
        </footer>     
      </div>
      <div class="mdc-dialog__backdrop"></div>
    </aside>`
  return htmlToTemplate(challengeModalHtmlStr)
}

export const getChallengeModalBodyContent = (state, id) => {
  const modalBodyContentStr = `  
    <div class="mdc-layout-grid">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4 mdc-layout-grid__cell--span-8-tablet">
          <div class="challengeCardContainer">
              <div id="challenge_${id}" class="mdc-card demo-card demo-card--photo">
                <a class="mdc-card__primary-action demo-card__primary-action" href="#">
                  <div class="mdc-card__media mdc-card__media--square demo-card__media chall-img">
                  </div>
                </a>  
              </div>   
          </div>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4 mdc-layout-grid__cell--span-8-tablet">
            <button id="challenge-${id}-play" class="mar-btm-10px mdc-button mdc-button--raised">Play Challenge</button>
            <button id="challenge-${id}-leader" class="mar-btm-10px mdc-button mdc-button--raised btnLeaderBoard">Leader Board</button>
        </div>      
      </div>
    </div>  
    `
  return htmlToTemplate(modalBodyContentStr)
}
