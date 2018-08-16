
import {createHorizontalScrollableTopic, createHorizontalScrollableChallenges} from "../horizontal-scrollable-container/horizontalscrollablecontainer.controller"
const htmlToTemplate = (htmlstr) => {
  const template = document.createElement("template")
  template.innerHTML = htmlstr
  return template.content
}
export const renderViewToContainer = (content, containerKey) => {
  const container = document.querySelector(containerKey)
  container.appendChild(content)
}

const createDashboardContent = (dataList, headingText, idKey, isTopic) => {
  const hsSectionStr = `<section class="card-section">
    <h6 class="mdc-typography--headline6">
      ${headingText}
      </h6>
      </section>`
  const hsSection = htmlToTemplate(hsSectionStr)
  const appendListContainer = hsSection.querySelector(".card-section")
  let hsContentTemp = ""

  if (isTopic) {
    hsContentTemp = createHorizontalScrollableTopic(dataList, idKey)
  }
  else {
    hsContentTemp = createHorizontalScrollableChallenges(dataList, idKey)
  }
  appendListContainer.appendChild(hsContentTemp)
  return hsSection
}
export const getDashboardContainerTemplate = () => {
  const dashboardContainer = `<div id="dashboard_pTopic"></div>
  <div id="dashboard_fTopic"></div>
  <div id="dashboard_challenge"></div>
  <div id="dashboard_mychallenge"></div>`

  return htmlToTemplate(dashboardContainer)
}
export const getPopularTopicTemplate = (dataList, headingText) => {
  return createDashboardContent(dataList, headingText, "ptopic", true)
}

export const getFavTopicTemplate = (dataList, headingText) => {
  return createDashboardContent(dataList, headingText, "ftopic", true)
}

export const getChallengesTemplate = (dataList, headingText) => {
  return createDashboardContent(dataList, headingText, "chall", false)
}

export const getMyChallengesTemplate = (dataList, headingText) => {
  return createDashboardContent(dataList, headingText, "mychall", false)
}
export const getNoListMsg = (headingText, msg) => {
  const NolistStr = `<section class="card-section">
  <h6 class="mdc-typography--headline6">
    ${headingText}
    </h6>
    </section>
    <div class="noListItem">
    <h6 class="mdc-typography--headline6">
      ${msg}
      </h6>
      </div>`

  return htmlToTemplate(NolistStr)
}
