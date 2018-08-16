const htmlToTemplate = (htmlstr) => {
  const template = document.createElement("template")
  template.innerHTML = htmlstr
  return template.content.firstElementChild
}
export const renderViewToContainer = (content, containerKey) => {
  const container = document.querySelector(containerKey)
  container.appendChild(content)
}

export const getLeaderBoardTemplate = () => {
  const modalHtmlStr = `<aside id="leaderBrd-mdc-dialog"
      class="mdc-dialog"
      role="alertdialog"
      aria-labelledby="my-mdc-dialog-label"
      aria-describedby="my-mdc-dialog-description">
      <div class="mdc-dialog__surface">
        <header class="mdc-dialog__header">
          <h2 id="leaderBrd-mdc-dialog-label" class="mdc-dialog__header__title">
          </h2>
        </header>
        <section id="leaderBrd-mdc-dialog-description" class="mdc-dialog__body">
        <div class="group display-flex display-column">
        <div class="mdc-select mdc-select--outlined">
            <select class="mdc-select__native-control selectRange">                          
              <option value="1" selected>
                Daily
              </option>
              <option value="7">
                Weekly
              </option>
              <option value="30">
                Monthly
              </option>
            </select>
            <label class="mdc-floating-label">Rank By</label>
            <div class="mdc-notched-outline">
              <svg>
                <path class="mdc-notched-outline__path"></path>
              </svg>
            </div>
            <div class="mdc-notched-outline__idle"></div>
        </div> 
        <div class="rankingTable mdl-shadow--2dp mdl-color--customTheme display-row justify-content-center" >       
            
        <div class="rankingTable mdl-table mdl-shadow--2dp mdl-color--customTheme display-flex display-row justify-content-center" >       
       <!-- <div id="mdl-table" class="mdl-table display-flex justify-content-center">-->
                    <table id='mdl-table' class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                        <thead>
                            <tr class="mdl-color--grey-400">
                                <th class="mdl-data-table__cell--non-numeric material">Rank</th>
                                <th class="mdl-data-table__cell--non-numeric material">Player Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody id="leaderBody">
                        
                        </tbody>
                    </table>
                    <!-- </div>-->
            </div>
            <!-- </div>-->
    </div>
        </section>
        <footer class="mdc-dialog__footer">
        <button type="button" class="mdc-button mdc-button--raised close-btn  mdc-dialog__footer__button mdc-dialog__footer__button--cancel">Close</button>
      </footer>          
      </div>
      <div class="mdc-dialog__backdrop"></div>
    </aside>`
  return htmlToTemplate(modalHtmlStr)
}
