
export const getTopics = () => {
  const promise = new Promise(function(resolve, reject) {
    const topics = {}
    fetch("/api/topics/gettopics", {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      method: "get",
    }).then(
      res => res.json()
    ).then(json => {
      console.log(json)
      if (Array.isArray(json)) {
        if (json.data !== null) {
          json.data.forEach(item => {
            console.log(item)
            if (item !== null) {
              topics["" + item.id] = item
            }
          })
        }
        resolve(topics)
      }
      else {
        resolve(json.data || {})
      }
    }, error => {
      reject(error)
    })
  })
  return promise
}

export const getChallenges = () => {
  const promise = new Promise(function(resolve, reject) {
    fetch("/api/allChallenges", {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      method: "get",
    }).then(
      res => res.json()
    ).then(json => {
      resolve(json)
    }, error => {
      reject(error)
    })
  })
  return promise
}
