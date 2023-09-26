import {Component} from 'react'

class DigitalTimer extends Component {
  state = {
    timerInSec: 1500,
    running: false,
    TimerLimit: 25,
  }

  tick = () => {
    this.setState(prevState => ({
      timerInSec: prevState.timerInSec - 1,
      running: true,
    }))
  }

  onStartOrPauseTimer = () => {
    const {running} = this.state
    if (running === false) {
      this.timerID = setInterval(this.tick, 1000)
    } else {
      clearInterval(this.timerID)
      this.setState({running: false})
    }
  }

  resetTimer = () => {
    clearInterval(this.timerID)
    const {TimerLimit} = this.state

    this.setState({timerInSec: TimerLimit * 60, running: false})
  }

  IncreaseLimit = () => {
    const {running} = this.state

    if (running !== true) {
      this.setState(prevState => ({TimerLimit: prevState.TimerLimit + 1}))
    }
  }

  decreaseLimit = () => {
    const {running} = this.state

    if (running !== true) {
      this.setState(prevState => ({TimerLimit: prevState.TimerLimit - 1}))
    }
  }

  render() {
    const {timerInSec, TimerLimit, running} = this.state
    const timerinMin = parseInt(timerInSec / 60)
    const remainingSec = timerInSec % 60
    const stringifiedMinutes = timerinMin > 9 ? timerinMin : `0${timerinMin}`

    const stringifiedSeconds =
      remainingSec > 9 ? remainingSec : `0${remainingSec}`
    const startOrPauseImageUrl = running
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = running ? 'pause icon' : 'play icon'
    const startOrPauseText = running ? 'Pause' : 'Start'
    return (
      <div>
        <h1>Digital Timer</h1>
        <div>
          <h1>
            {stringifiedMinutes}:{stringifiedSeconds}
          </h1>
          <p>{running ? 'Running' : 'Paused'}</p>
        </div>
        <div>
          <button onClick={this.onStartOrPauseTimer} type="button">
            <img alt={startOrPauseAltText} src={startOrPauseImageUrl} />
            <p>{startOrPauseText}</p>
          </button>
          <button onClick={this.resetTimer} type="button">
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
            />
            Reset
          </button>
          <p>Set Timer Limit</p>
          <button type="button" onClick={this.decreaseLimit}>
            -
          </button>
          <p>{TimerLimit}</p>
          <button type="button" onClick={this.IncreaseLimit}>
            +
          </button>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
