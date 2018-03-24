class Timer {
  /**
   * @param {number} duration in ms
   */
  constructor (duration) {
    this.startedAt = new Date()
    this.duration = duration
  }

  elapsed () {
    const now = new Date()
    return now - this.startedAt
  }

  remaining () {
    return this.duration - this.elapsed()
  }

  async finished () {
    const remaining = this.remaining()
    await new Promise(resolve => setTimeout(resolve, remaining))
    return true
  }
}

export default Timer