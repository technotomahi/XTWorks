const updateChat = (message) => {
  const promise = new Promise(function(resolve, reject) {
    fetch("/api/chat/updateMessage", {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      method: "post",
      body: JSON.stringify(message),
    }).then(
      // res => res.json()
    ).then(json => {
      resolve(json)
    }, error => {
      reject(error)
    })
  })
  return promise
}

export {
  updateChat,
}
