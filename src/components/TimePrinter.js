import React from 'react'
import {formatMilliseconds} from '../services/TimeFormatter'
import './TimePrinter.css'

const timer = (props) => {
  const formatedTime = formatMilliseconds(props.duration)
  return (
    <p className="TimePrinter">{formatedTime}</p>
  )
}

export default timer