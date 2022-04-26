import React from 'react'
import styled from 'styled-components'


const PlayPauseCont = styled.button`
    background: #00000000;
    border:none;
    height: 30px;
    width:fit-content;
    
    `

const PlayButton = (props) => (
    <svg height = {"100%"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path  d="M512 256c0 141.4-114.6 256-256 256S0 397.4 0 256 114.6 0 256 0s256 114.6 256 256zm-336-88v176c0 8.7 4.7 16.7 12.3 20.9 7.5 4.3 16.8 4.1 24.2-.4l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-5.4-16.7-4.7-24.2-.4-7.6 4.2-12.3 12.2-12.3 20.9z" />
    </svg>
  )
  const PauseButton = (props) => (
    <svg height = {"100%"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm-32 191.1v128c0 18.6-14.3 32.9-32 32.9s-32-14.3-32-32V191.1c0-16.8 14.3-31.1 31.1-31.1s32.9 14.3 32.9 31.1zm128 0v128c0 18.6-14.3 32.9-32 32.9s-32-14.3-32-32V191.1c0-16.8 14.3-31.1 31.1-31.1s32.9 14.3 32.9 31.1z" />
    </svg>
  )
  


export default function PlayPause(props) {
  return (
    <PlayPauseCont {...props} style = {{height: props.size}} >
        {(props.isPlay)? <PlayButton style = {{fill: props.color}} />:<PauseButton style = {{fill: props.color}}/>}
    </PlayPauseCont>
  )
}
