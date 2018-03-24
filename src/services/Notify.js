const notification = function (message) {
  var options = {
    body: message,
    icon: './img/icon.png'
  }
  return new Notification('Pomodoro Ninja', options);
}

const notifyBrowser = function (message = 'time up!') {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification")
  } else if (Notification.permission === "granted") {
    notification(message)
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission((permission) => {
      if (permission === "granted") {
        notification(message)
      }
    })
  }
}

export default notifyBrowser