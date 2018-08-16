export const htmlToTemplate = (htmlstr) => {
  const template = document.createElement("template")
  template.innerHTML = htmlstr
  return template.content
}

export const topicView = (topicObj, topicId) => {
  let userNum = ""
  if (topicObj.users !== undefined) {
    userNum = topicObj.users.length
  }
  let image = "https://vignette.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png"

  if (topicObj.topicUrl !== "") {
    image = topicObj.topicUrl
  }
  return `<li class="mdc-grid-tile pointer" id="grid_${topicId}">
    <div class="mdc-grid-tile__primary">
        <img class="mdc-grid-tile__primary-content mdc-image-list__image" src="${image}" />
        
    </div>
    <span class="mdc-grid-tile__secondary">
        <span class="mdc-grid-tile__title">${topicObj.topicText} &nbsp;&nbsp;<span id="topic_follower_${topicId}">${userNum}</span> </span>
    </span>
</li>`
}

