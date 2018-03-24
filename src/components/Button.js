import React from 'react'
import './Button.css'

const button = (props) => {
  return (
    <a className="button" onClick={props.click} >+{props.duration}</a>
  )
}

export default button