import TemplateGenerator from "../../common/TemplateGenerator"
import {Store} from "../../../../boot/Store"
import {getTopics} from "../service/CreateChallengeService"
import {showLoader} from "../../../loader/loader.controller"
const Material = require("exports-loader?componentHandler&MaterialRipple!material-design-lite/material.js")

function createChallengeHeaderPanel() {
  const challenegSideBarTemp = `<div id="challengePanel">
  <span class="mdc-typography--headline6" id="challenegeLabel">Challenges</span>
  </div>`

  const challengeSideBarTemplate = TemplateGenerator.createAllChildHTMLElement(challenegSideBarTemp)
  const container = document.querySelector("#quiz-maincontent")
  container.appendChild(challengeSideBarTemplate)

  componentHandler.upgradeAllRegistered()
  document.getElementsByTagName("body")[0].className = ""
}

function callCreateChallenge() {
  Store.dispatch({type: "CurrentViewUpdate", dataItem: {Name: "createChallenge"}})
}

function createChallengeContainer() {
  const challengeContainer = `<section class="mdl-grid" id="challengeSection">

    </section>`
  const challengeContainerTemp = TemplateGenerator.createAllChildHTMLElement(challengeContainer)

  const container = document.querySelector("#quiz-maincontent")

  container.appendChild(challengeContainerTemp)
  componentHandler.upgradeAllRegistered()
  document.getElementsByTagName("body")[0].className = ""
}
function renderCreateChallengeComponent() {
  showLoader()
  getTopics()
}

function createChallengeHeaderTemplate(topicsArray) {
  let topics = ""
  for (let index = 0; index < topicsArray.length; index += 1) {
    if (topicsArray[index] != null) {
      topics = topics.concat(` <option value="${topicsArray[index].topicText}">
                     ${topicsArray[index].topicText}
                    </option>`)
    }
  }

  const challengeTemplate = `<div class="createChallContent" id="firstPage">
     <main class="mdl-layout__content mdl-cell mdl-cell--12-col">
       <div class="mdl-card mdl-shadow--6dp mdl-cell mdl-cell--12-col">
         <div class="mdl-card__title mdl-color--primary mdl-color-text--white">
           <h2 class="mdl-card__title-text" id="createChallHeader"> Create Challenge</h2>
         </div>
         <div class="mdl-card__supporting-text">
           <form action="#" id="form">
           <div class="mdc-select mdl-cell mdl-cell--12-col">
             <select class="mdc-select__native-control" id="selectChallTopic">
               <option value="" disabled selected>Select your Topic</option>
                 ${topics}
             </select>
             <!--<label class="mdc-floating-label">Select your Topic</label>-->
             <div class="mdc-line-ripple"></div>
           </div>
            <span id ="topicErr" style="display:none" class="challFormValidator">Please select a topic</span>
             <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col">
               <input class="mdl-textfield__input" type="text" id="challengeName" placeholder="Challenge Name"/>
               <span id ="ChallengeNameErr" style="display:none" class="challFormValidator">Challenge Name is mandatory field</span>
             </div>
             <div>
             <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="create">Create</button>      
             
               </div>
               </form>
               </div>
               </div>
               </main>
             </div>`
  const challengeTemplt = TemplateGenerator.createAllChildHTMLElement(challengeTemplate)
  const challengeSection = document.getElementById("challengeSection")
  challengeSection.appendChild(challengeTemplt)
  componentHandler.upgradeAllRegistered()
  document.getElementsByTagName("body")[0].className = ""
  // }
  // })
}
function createQuestion(challengeJsonObj, count) {
  let questionTemplate = ` 
    <div class="createChallContent">
        <main class="mdl-layout__content mdl-cell mdl-cell--12-col">
          <div class="mdl-card mdl-shadow--6dp mdl-cell mdl-cell--12-col">
            <div class="mdl-card__title mdl-color--primary mdl-color-text--white" id="createChallHeaderLabelDiv">
            <span id="challengelabel" class="createChallHeaderLabel">${challengeJsonObj.challengeName}</span><span class="createChallHeaderLabel"> ${count} out of 7</span>
            </div>
            <div class="mdl-card__supporting-text">
              <form action="#" id="form">
              <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--12-col">
                <input class="mdl-textfield__input" type="text" id="ques${count}" placeholder="Question ${count}"/>
                <span id ="questionErr" style="display:none" class="challFormValidator">Question is mandatory field</span>
              </div>
              <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--6-col">
                <input class="mdl-textfield__input" type="text" id="ques${count}opt1" placeholder="Option1" />              
               <span id ="option1Err" style="display:none" class="challFormValidator">Option1 is mandatory field</span>
              </div>
              <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--6-col">
                <input class="mdl-textfield__input" type="text" id="ques${count}opt2" placeholder="Option2" />
               <span id ="option2Err" style="display:none" class="challFormValidator">Option2 is mandatory field</span>
              </div>
              <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--6-col">
                <input class="mdl-textfield__input" type="text" id="ques${count}opt3" placeholder="Option3" />
                <span id ="option3Err" style="display:none" class="challFormValidator">Option3 is mandatory field</span>
              </div>
            <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--6-col">
              <input class="mdl-textfield__input" type="text" id="ques${count}opt4" placeholder="Option4" />
             <span id ="option4Err" style="display:none" class="challFormValidator">Option4 is mandatory field</span>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--6-col">
              <input class="mdl-textfield__input" type="text" id="ques${count}ans" placeholder="Answer" />
             <span id ="answerErr" style="display:none" class="challFormValidator">Answer is mandatory field</span>
            </div>`
  if (count < 7) {
    questionTemplate = questionTemplate.concat(" <div class=\"mdl-card__action\">")
  }
  if (count > 1 && count < 7) {
    questionTemplate = questionTemplate.concat(`
         <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="prevQuestion">Previous</button>`)
  }
  if (count < 7) {
    questionTemplate = questionTemplate.concat(`             
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="nextQuestion">Next</button>
                     </div>
                     </form>
                     </div>
                     </div>
                     </main>
                     </div>`)
  }
  if (count === 7) {
    questionTemplate = questionTemplate.concat(` 
              <div class="mdl-card__actions">
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="prevQuestion">Previous</button>
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="save">Submit</button>
              </div>
          </form>
          </div>
          </div>
          </main>
          </div>`)
  }
  const challengeTemplt = TemplateGenerator.createAllChildHTMLElement(questionTemplate)
  const formSection = document.getElementById("challengeSection")
  formSection.innerHTML = ""
  formSection.appendChild(challengeTemplt)
  componentHandler.upgradeAllRegistered()
  document.getElementsByTagName("body")[0].className = ""
}

export {createChallengeContainer, renderCreateChallengeComponent, createQuestion, createChallengeHeaderPanel, createChallengeHeaderTemplate, callCreateChallenge}
