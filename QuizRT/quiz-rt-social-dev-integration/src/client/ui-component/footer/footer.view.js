export const htmlToTemplate = (htmlstr) => {
  const template = document.createElement("template")
  template.innerHTML = htmlstr
  return template.content
}
export const renderViewToContainer = (content, containerKey) => {
  const container = document.querySelector(containerKey)
  container.appendChild(content)
}

export const getFooterHtml = () => {
  const footerHtml = `<div class="footer-container">
    <div class="copyRight-container">
    <div class="copyright">Copyright &copy; www.quizzapp.com
    <br>
    <p>Designed and Maintained by the core team with the help of our contributors. Currently v1.0.1</p>
    </div>
    </div>
    </div>`
  return htmlToTemplate(footerHtml)
}
