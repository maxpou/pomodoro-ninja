const sound = () => {
  const file = new Audio('ping.mp3')
  const play = () => {
    file.play()
  }
  play()
}

export default sound
