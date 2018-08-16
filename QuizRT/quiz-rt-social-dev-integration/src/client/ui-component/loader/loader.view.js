export const htmlToTemplate = (htmlstr) => {
  const template = document.createElement("template")
  template.innerHTML = htmlstr
  return template.content
}
export const renderViewToContainer = (content, containerKey) => {
  const container = document.querySelector(containerKey)
  container.appendChild(content)
}

export const getLoaderHtml = () => {
  const loaderHtml = `<div id="quiz-loader" style="display:none;">
    <div class="overlay"></div>
    <div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    </div>
    </div>`
  return htmlToTemplate(loaderHtml)
}
