import {getLeaderBoardTemplate, renderViewToContainer} from "./leader-view"
import {Store} from "./../../boot/Store"
import {MDCSelect} from "@material/select/index"
import {MDCDialog} from "@material/dialog"
import {serviceCall} from "./service-methods"
import {showLoader, hideLoader} from "../loader/loader.controller"
import moment from "moment"

export const createLeaderBoardForChallenges = () => {
  const leaderBoardContent = getLeaderBoardTemplate()
  renderViewToContainer(leaderBoardContent, "main")
}

const getFilteredDetails = (arry, days) => {
  debugger
  let newArray = new Array()
  const startValue = new Date()
  const endValue = days == 1 ? new Date() : new Date(startValue.getTime() - (days * 24 * 60 * 60 * 1000))

  if (days == 1) {
    newArray = arry.filter(item => {
      const markerDate = new Date(item.heldOn)
      return (moment(markerDate).isSameOrAfter(new Date(), "day"))
    })
  }
  else {
    newArray = arry.filter(item => {
      const markerDate = new Date(item.heldOn
      )
      return (markerDate.getTime() < startValue.getTime() && markerDate.getTime() > endValue.getTime())
    })
  }

  let filteredArray = new Array()
  let tempArray = new Array()
  let score = 0

  // merging all arrays
  for (const item of newArray) {
    tempArray = tempArray.concat(item.players)
  }

  // grouping the array by id
  tempArray = tempArray.reduce((h, a) => Object.assign(h, {[a.name]: (h[a.name] || []).concat(a)}), {})

  tempArray = Object.keys(tempArray).map(function(key) {
    return [Number(key), tempArray[key]]
  })

  // forming the filtered array
  for (let j = 0; j < tempArray.length; j++) {
    score = tempArray[j]["1"].reduce((a, b) => Math.max(+a, +b.score), 0)
    filteredArray.push({
      playerName: tempArray[j]["1"][0].name,
      playerId: tempArray[j]["1"][0].id,
      score: score,
    })
  }

  // sorting according to the score
  filteredArray = filteredArray
    .sort((a, b) => {
      const scoreA = +a.score
      const scoreB = +b.score

      let comparison = 0
      if (scoreB > scoreA) {
        comparison = 1
      }
      else if (scoreB < scoreA) {
        comparison = -1
      }
      return comparison
    })

  return filteredArray
}

const renderRankings = filteredArray => {
  let rank = 0
  let html = ""
  for (const item of filteredArray) {
    rank++
    html = html + `<tr id="${item.playerName.replace(" ", "").toLowerCase()}">
                     <td class="mdl-data-table__cell--non-numeric material">${rank}</td>
                     <td class="mdl-data-table__cell--non-numeric material">${item.playerName}</td>
                     <td>${item.score}</td>
                   </tr>`
  }
  document.getElementById("leaderBody").innerHTML = html
  const currentState = Store.getState()
  const userName = currentState.menuReducer.currentUserInfo.displayName.replace(" ", "").toLowerCase()
  const selection = document.querySelector(`tr[id=${userName}]`)
  if (selection) {
    selection.className = "selectedRow"
  }
}

export const displayLeaderBoard = (type, id) => {
  serviceCall(`https://game-engine-beta.herokuapp.com/api/${type}/${id}`)
    .then(function(data) {
      var array = new Array()
      for (const item of Object.values(data)) {
        if (item) {
          array.push(item)
        }
      }
      const filteredArray1 = getFilteredDetails(array, 1)
      renderRankings(filteredArray1)

      const dialogElement1 = document.querySelector("#topic-mdc-dialog")
      const dialog1 = new MDCDialog(dialogElement1)
      dialog1.close()

      const dialogElement2 = document.querySelector("#leaderBrd-mdc-dialog")
      const dialog2 = new MDCDialog(dialogElement2)
      dialog2.show()
      hideLoader()

      dialog2.listen("MDCDialog:cancel", function() {
        document.getElementById("leaderBody").innerHTML = ""
        const select2 = new MDCSelect(document.querySelector(".mdc-select"))
        select2.value = "1"
        dialog1.close()
        document.getElementById("challenge-mdc-dialog").classList.remove("mdc-dialog--animating")
        document.getElementById("topic-mdc-dialog").classList.remove("mdc-dialog--animating")
      })
      const select = new MDCSelect(document.querySelector(".mdc-select"))
      select.listen("change", () => {
        showLoader()
        const filteredArray2 = getFilteredDetails(array, select.value)
        renderRankings(filteredArray2)
        hideLoader()
      })
    })
}

// export let getFilteredDetails = (arry, days) => {
//   const startValue = new Date()
//   const endValue = new Date(startValue.getTime() - (days * 24 * 60 * 60 * 1000))
//   let html = ""
//   let rank = 0

//   const filteredArray = arry.filter(item => {
//     const markerDate = new Date(item.playedOn
//     )
//     return (markerDate.getTime() <= startValue.getTime() && markerDate.getTime() >= endValue.getTime())
//   }).sort((a, b) => {
//     const scoreA = +a.score

//     const scoreB = +b.score

//     let comparison = 0
//     if (scoreB > scoreA) {
//       comparison = 1
//     }
//     else if (scoreB < scoreA) {
//       comparison = -1
//     }
//     return comparison
//   })

//   for (const item of filteredArray) {
//     rank++
//     html = html + `<tr id="${item.userName.replace(" ", "").toLowerCase()}">
//                      <td class="mdl-data-table__cell--non-numeric material">${rank}</td>
//                      <td class="mdl-data-table__cell--non-numeric material">${item.userName}</td>
//                      <td>${item.score}</td>
//                    </tr>`
//   }

//   document.getElementById("leaderBody").innerHTML = html
//   const currentState = Store.getState()
//   const userName = currentState.menuReducer.currentUserInfo.displayName.replace(" ", "").toLowerCase()
//   const selection = document.querySelector(`tr[id=${userName}]`)
//   if (selection) {
//     selection.className = "selectedRow"
//   }
// }
