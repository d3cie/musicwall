import React, { useState } from 'react'
import styled from 'styled-components'
import * as vars from '../../../vars'
import Ellipsis from '../../primitives/Animations/Elipsis'
import XIcon from '../../primitives/Icons/XIcon'
import Head from "next/head"

const Wrapper = styled.div`
    position: fixed;
    width:100%;
  bottom:-10px;
  height:calc(100% + 10px);
  /* padding:5px; */
  background: #000000aa;
  display:flex;
  flex-direction:column;
  align-items: center;
  transition: all .2s;
  justify-content: flex-end;
    z-index:12;
    & button{
      height:30px;
      width:30px;
      position:absolute;
      right:20px;
      border:none;
      bottom:390px;
      background: transparent;
      fill:${vars.MAIN_WHITE};
    }
   

    `

export default function PlaySongSpotify(props) {
  const [isLoading, setIsLoading] = useState(true)


  return (
    <Wrapper>
      <button onClick={() => props.closePlayer()}> <XIcon /> </button>
      {(isLoading) ? <Ellipsis color={vars.MAIN_WHITE} /> : ''}
      <iframe id="frame" onLoad={() => { setIsLoading(false) }} style={{ maxWidth: vars.MAX_WIDTH, borderRadius: 2 }} src={`https://open.spotify.com/embed/track/${props.id}?utm_source=generator`} width={"100%"} height="380px" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
    </Wrapper>
  )
}
