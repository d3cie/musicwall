import React from 'react'
import styled from 'styled-components'
import * as vars from '../../../vars'

const PlayPauseCont = styled.span`
    background: #00000000;
    border:none;
    height: 100%;
    width:100%;
    /* width:fit-content; */
    
    `

const PlayButton = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 384 512" {...props}>
    <path d="M361 215c14.3 8.8 23 24.3 23 41s-8.7 32.2-23 40.1l-287.97 176c-14.82 9.9-33.37 10.3-48.51 1.8A48.02 48.02 0 0 1 0 432V80a48.02 48.02 0 0 1 24.52-41.87 48.019 48.019 0 0 1 48.51.91L361 215z" />
  </svg>
)
const PauseButton = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 384 512" {...props}>
    <path d="M384 128v255.1c0 35.35-28.65 64-64 64H64c-35.35 0-64-28.65-64-64V128c0-35.35 28.65-64 64-64h256c35.3 0 64 28.65 64 64z" />
  </svg>
)

  




export default function PlayPause(props) {
  return (
    <PlayPauseCont {...props} style = {{height: props.size, }}>
        {(props.isPlay)? <PlayButton style = {{fill: props.color}} />:<PauseButton style = {{fill: props.color}}/>}
    </PlayPauseCont>
  )
}
