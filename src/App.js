import React, { Component } from 'react';
import './App.css';
import Button from './components/Button'
import TimePrinter from './components/TimePrinter'
import Timer from './services/Timer'
import notifyBrowser from './services/Notify'
import playSound from './services/Sound'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      duration: null,
      printedRemaining: null,
      Timer: null,
      interval: null
    }
  }

  timesUp () {
    window.clearInterval(this.state.interval)
    this.setState({
      printedRemaining: 0
    })
    notifyBrowser('Time up!')
    playSound()
  }

  updatePrintedRemainingTime () {
    const remaining = this.state.Timer.remaining() < 0 ? 0 : this.state.Timer.remaining()
    this.setState({
      printedRemaining: remaining
    })
  }

  durationChangeHandler (newDuration) {
    if (this.state.interval) {
      window.clearInterval(this.state.interval)
    }
    this.setState({
      duration: newDuration,
      Timer: new Timer(newDuration * 60 * 1000),
      interval: window.setInterval(this.updatePrintedRemainingTime.bind(this), 1000)
    }, async () => {
      await this.state.Timer.finished()
      this.timesUp()
    })
  }

  render () {
    return (
      <div className="App">
        <TimePrinter duration={this.state.printedRemaining}/>
        <Button duration="5'" click={this.durationChangeHandler.bind(this, 0.1)} />
        <Button duration="5" click={this.durationChangeHandler.bind(this, 5)} />
        <Button duration="15" click={this.durationChangeHandler.bind(this, 15)} />
        <Button duration="25" click={this.durationChangeHandler.bind(this, 25)} />
      </div>
    );
  }
}

export default App;
