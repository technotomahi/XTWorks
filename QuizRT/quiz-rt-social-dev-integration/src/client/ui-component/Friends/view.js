var Material = require("exports-loader?componentHandler&MaterialRipple!material-design-lite/material.js")

const mainContainer = document.getElementById("quiz-maincontent")

const htmlToTemplate = (htmlstr) => {
  const template = document.createElement("template")
  template.innerHTML = htmlstr
  const retElement = template.content.firstElementChild
  console.log("Inside HTML to Template")
  // console.log(componentHandler)
  // componentHandler.upgradeElement(retElement)
  return retElement
}

const createSnackBar = (msg) => {
  const messageContainer = htmlToTemplate(`<div id="msg-snack-bar" class="mdl-js-snackbar mdl-snackbar">
  <div class="mdl-snackbar__text"></div>
  <button class="mdl-snackbar__action" type="button"></button>
</div>`)
  return messageContainer
}

const createFriendsComponent = () => {
  const friendContainer = htmlToTemplate(`<div class="mdl-js-layout mdl-layout--fixed-drawer">
    </div>`)
  return friendContainer
}

const createFriendsSideNav = () => {
  // const friendSideNav = htmlToTemplate(`<div class="mdl-layout__drawer">
  //   <span class="mdl-layout-title">Friends</span>
  //   <nav class="mdl-navigation">
  //   <a class="mdl-navigation__link" id="add_friend" href="#">Add a Friend</a>
  //   <a class="mdl-navigation__link" id="list_of_friend" href="#">List of Friends</a>
  //   <a class="mdl-navigation__link" id="frnd_req" href="#">Friend Requests</a>
  //   </nav>
  //   </div>`)

  const friendSideNav = htmlToTemplate(`<div class="mdc-tab-bar" role="tablist">
  <div class="mdc-tab-scroller">
    <div class="mdc-tab-scroller__scroll-area">
      <div class="mdc-tab-scroller__scroll-content frnd_header_menu">
        <button class="mdc-tab" role="tab" aria-selected="true" tabindex="0" id="add_friend">
          <span class="mdc-tab__content">
            <span class="mdc-tab__text-label">Add a Friend</span>
          </span>
          <span class="mdc-tab-indicator mdc-tab-indicator--active">
            <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
          </span>
          <span class="mdc-tab__ripple"></span>
        </button>
         <button class="mdc-tab" role="tab" aria-selected="true" tabindex="0" id="list_of_friend">
          <span class="mdc-tab__content">
            <span class="mdc-tab__text-label">List of Friends</span>
          </span>
          <span class="mdc-tab-indicator mdc-tab-indicator--active">
            <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
          </span>
          <span class="mdc-tab__ripple"></span>
        </button>
        <button class="mdc-tab" role="tab" aria-selected="true" tabindex="0" id="frnd_req">
          <span class="mdc-tab__content">
            <span class="mdc-tab__text-label">Friends request</span>
          </span>
          <span class="mdc-tab-indicator mdc-tab-indicator--active">
            <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
          </span>
          <span class="mdc-tab__ripple"></span>
        </button>
      </div>
    </div>
  </div>
</div>`)
  return friendSideNav
}

// const createFriendHeaderWithOutSearchBox = (headerName) => {
//   const friendHeader = htmlToTemplate(`<div class="mdl-layout__content mdl-grid">
//     <header class="mdl-layout__header frnd_header_bg">
//         <div class="mdl-layout__header-row">
//           <div class="mdl-layout-spacer">
//             <span class="mdl-layout-title">${headerName}</span>
//           </div>
//         </div>
//     </header>
//   </div>`)
//   return friendHeader
// }

const createFriendHeaderWithOutSearchBox = (headerName) => {
  const friendHeader = htmlToTemplate(`<div class="subHeeader">
    <p>${headerName}</p>
  </div>`)
  return friendHeader
}

const createFriendHeaderWithSearchBox = () => {
  const friendHeader = htmlToTemplate(`<div class="subHeeader">
            <form action="#">
              <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" id="fixed-header-drawer-exp">
                <label class="mdl-textfield__label" for="sample3">Search friends..</label>
              </div>
            </form>
        </div>`)
  return friendHeader
}

const createFriendSuperContentContainer = () => {
  const superContent = htmlToTemplate(`<div class="mdl-layout__content demo-list-action "> 
    </div>`)
  return superContent
}

const createFriendMainContentContainer = () => {
  const mainContent = htmlToTemplate("<div class=\"mdl-grid\"> </div>")
  return mainContent
}

// const createFriendMainContentContainer = () => {
//   const mainContent = htmlToTemplate(`<div class="mdl-layout__content demo-list-action mdl-grid">
//     </div>`)
//   return mainContent
// }

const createUserListContainer = () => {
  const usersContainer = htmlToTemplate(`<div class="mdl-card mdl-shadow--2dp userListConatiner">
          </div>`)
  return usersContainer
}

// const createUserListContainer = () => {
//   const usersContainer = htmlToTemplate(`<div class="demo-list-action mdl-list" style="width:100%;">
//           </div>`)
//   return usersContainer
// }

const createSearchUserItem = (user) => {
  const item = htmlToTemplate(`<div class="mdl-list__item">
              <span class="mdl-list__item-primary-content">
                <i class="material-icons mdl-list__item-avatar"><img src="${user.Photo}" class="profile_pic"/></i>
                <span>${user.displayName}</span>
              </span>
              <a class="mdl-list__item-secondary-action sendFriendRequest" href="#" user_id=${user.id} user_email=${user.email}><i class="material-icons" user_id=${user.userID}  user_email=${user.email}>add</i></a>
            </div>`)
  return item
}

const createFriendItem = (user) => {
  const temdisplayName = user.displayName
  const replaced = temdisplayName.replace(" ", "___")
  const item = htmlToTemplate(`<div id= ${replaced} class="mdl-list__item start_chat" email=${user.email} displayName=${replaced} photoURL=${user.photoURL} >
              <span class="mdc-list-item__graphic material-icons green chatOnline" aria-hidden="true" email=${user.email} displayName=${replaced} photoURL=${user.photoURL}></span>
              <span class="mdl-list__item-primary-content" email=${user.email} displayName=${replaced} photoURL=${user.photoURL} >
                <i class="material-icons mdl-list__item-avatar" email=${user.email} displayName=${replaced} photoURL=${user.photoURL} ><img src="${user.Photo}" class="profile_pic"/></i>
                <span email=${user.email} displayName=${replaced} photoURL=${user.photoURL} >${user.displayName}</span>
              </span>
              <label class="chatNotificationCount"></label></li>
            </div>`)
  return item
}

const createFriendReqItem = (user) => {
  const item = htmlToTemplate(`<div class="mdl-list__item">
              <span class="mdl-list__item-primary-content">
                <i class="material-icons mdl-list__item-avatar"><img src="${user.Photo}" class="profile_pic"/></i>
                <span>${user.displayName}</span>
              </span>
              <span class="mdl-list__item-secondary-content" style="flex-direction: row;">
              <button class="mdl-list__item-secondary-action mdl-button mdl-js-button mdl-button--raised mdl-button--colored accept-Friend-Request" style="margin-right:10px;" req-id=${user.reqId}>
                Accept
              </button>
              <button class="mdl-list__item-secondary-action mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-button--accent reject-Friend-Request" req-id=${user.reqId}>
                Reject
              </button>
            </span>
            </div>`)
  return item
}
const showProgressBar = () => {
  const item = htmlToTemplate(`<div class="mdl-progress mdl-js-progress mdl-progress__indeterminate" style="width:100%;">
    </div>`)
  return item
}

const createchatSectionContainer = () => {
  const chatSectionContainer = htmlToTemplate(`<div class="chatSection" style="width:100%;">
          </div>`)
  return chatSectionContainer
}

const createCellContainer = () => {
  const createCell = htmlToTemplate("<div class = \"mdl-cell mdl-cell--4-col\"></div>")
  return createCell
}

export const showSearchPageWithResult = (users, showProgress) => {
  const friendComponent = createFriendsComponent()
  friendComponent.appendChild(createFriendsSideNav())
  friendComponent.appendChild(createFriendHeaderWithSearchBox())
  const mainContent = createFriendMainContentContainer()
  // const usersContainer = createUserListContainer()
  // mainContent.appendChild(usersContainer)

  // users.forEach((user) => {
  //   usersContainer.appendChild(createSearchUserItem(user))
  // })

  if (showProgress) {
    mainContent.appendChild(showProgressBar())
  }
  else if (users.length > 0) {
    const usersContainer = createUserListContainer()
    mainContent.appendChild(usersContainer)

    users.forEach((user) => {
      usersContainer.appendChild(createSearchUserItem(user))
    })
  }
  const superContainer = createFriendSuperContentContainer()
  superContainer.appendChild(mainContent)
  friendComponent.appendChild(superContainer)
  mainContainer.innerHTML = ""
  mainContainer.appendChild(friendComponent)
  mainContainer.appendChild(createSnackBar())
  componentHandler.upgradeAllRegistered()
  const add_friend_doc = document.getElementById("add_friend")
  const list_of_friend_doc = document.getElementById("list_of_friend")
  const frnd_req_doc = document.getElementById("frnd_req")
  add_friend_doc.className = "mdc-tab mdc-tab--active"
  list_of_friend_doc.className = "mdc-tab"
  frnd_req_doc.className = "mdc-tab"
  friendComponent.parentElement.className = ""
  document.getElementsByTagName("body")[0].className = ""
}

export const showFriendList = (users, showProgress) => {
  const friendComponent = createFriendsComponent()
  friendComponent.appendChild(createFriendsSideNav())

  let count = 0

  if (users && users.length > 0) {
    count = users.length
  }

  friendComponent.appendChild(createFriendHeaderWithOutSearchBox(`You have ${count} friends`))
  const mainContent = createFriendMainContentContainer()

  if (showProgress) {
    mainContent.appendChild(showProgressBar())
  }
  else {
    const usersContainer = createUserListContainer()
    const cell1 = createCellContainer()
    cell1.appendChild(usersContainer)
    mainContent.appendChild(cell1)

    users.forEach((user) => {
      usersContainer.appendChild(createFriendItem(user))
    })
    const cell2 = createCellContainer()
    cell2.appendChild(createchatSectionContainer())
    mainContent.appendChild(cell2)
    const superContainer = createFriendSuperContentContainer()
    superContainer.appendChild(mainContent)
    friendComponent.appendChild(superContainer)
    mainContainer.innerHTML = ""
    mainContainer.appendChild(friendComponent)
    mainContainer.appendChild(createSnackBar())
    componentHandler.upgradeAllRegistered()
    const add_friend_doc = document.getElementById("add_friend")
    const list_of_friend_doc = document.getElementById("list_of_friend")
    const frnd_req_doc = document.getElementById("frnd_req")
    add_friend_doc.className = "mdc-tab"
    list_of_friend_doc.className = "mdc-tab mdc-tab--active"
    frnd_req_doc.className = "mdc-tab"
    friendComponent.parentElement.className = ""
    document.getElementsByTagName("body")[0].className = ""
  }
}

export const showPendingFriendRequests = (users, showProgress) => {
  const friendComponent = createFriendsComponent()
  friendComponent.appendChild(createFriendsSideNav())
  let count = 0

  if (users && users.length > 0) {
    count = users.length
  }

  friendComponent.appendChild(createFriendHeaderWithOutSearchBox(`You have ${count} pending friend requests`))
  const mainContent = createFriendMainContentContainer()

  if (showProgress) {
    mainContent.appendChild(showProgressBar())
  }
  else if (users.length > 0) {
    const usersContainer = createUserListContainer()
    mainContent.appendChild(usersContainer)

    users.forEach((user) => {
      usersContainer.appendChild(createFriendReqItem(user))
    })
  }

  const superContainer = createFriendSuperContentContainer()
  superContainer.appendChild(mainContent)
  friendComponent.appendChild(superContainer)
  mainContainer.innerHTML = ""
  mainContainer.appendChild(friendComponent)
  mainContainer.appendChild(createSnackBar())
  componentHandler.upgradeAllRegistered()
  const add_friend_doc = document.getElementById("add_friend")
  const list_of_friend_doc = document.getElementById("list_of_friend")
  const frnd_req_doc = document.getElementById("frnd_req")
  add_friend_doc.className = "mdc-tab"
  list_of_friend_doc.className = "mdc-tab"
  frnd_req_doc.className = "mdc-tab mdc-tab--active"
  friendComponent.parentElement.className = ""
  document.getElementsByTagName("body")[0].className = ""
}
