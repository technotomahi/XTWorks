import {hideLoader} from "../loader/loader.controller"
const fetch = require("node-fetch")

export const serviceCall = (url) => {
  return fetch(url, {
    method: "get",
  }).then(
    res => res.json()
  ).then(function(response) {
    return response
  }).catch(function(error) {
    // console.log("Request failure: ", error);
    const sample = {
      sample: {
        heldOn: `${new Date()}`,
        id: 11,
        players: [
          {
            name: "No Record found",
            score: 0,
          },
        ],
        topicId: "",
        type: "game",
      },
    }
    return JSON.parse(JSON.stringify(sample))
  })
}
