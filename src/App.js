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
      printedRemaining: null,
      timer: null,
      intervalId: null,
      selectedMode: null,
      pomodoros: [
        { label: 'Dev', duration: 0.1 },
        { label: 'Short break', duration: 5 },
        { label: 'Long break', duration: 15 },
        { label: 'Work', duration: 25 },
      ]
    }
  }

  timesUp () {
    window.clearInterval(this.state.intervalId)
    this.setState({
      printedRemaining: 0
    })
    notifyBrowser('Time up!')
    playSound()
  }

  updatePrintedRemainingTime () {
    const remaining = this.state.timer.remaining() < 0 ? 0 : this.state.timer.remaining()
    this.setState({
      printedRemaining: remaining
    })
  }

  durationChangeHandler (pomodoro) {
    if (this.state.intervalId) {
      window.clearInterval(this.state.intervalId)
    }
    this.setState({
      selectedMode: pomodoro,
      timer: new Timer(pomodoro.duration * 60 * 1000),
      intervalId: window.setInterval(this.updatePrintedRemainingTime.bind(this), 1000)
    }, async () => {
      await this.state.timer.finished()
      this.timesUp()
    })
  }

  render () {
    const pomodoros = this.state.pomodoros.map((pomodoro) =>
      <Button 
        key={pomodoro.label}
        duration={pomodoro.duration}
        label={pomodoro.label}
        click={this.durationChangeHandler.bind(this, pomodoro)} />
    )

    return (
      <div className="App">
        <TimePrinter duration={this.state.printedRemaining}/>
        {pomodoros}
      </div>
    );
  }
}

export default App;
