import React from 'react'
import styled from 'styled-components'
import * as vars from '../../../vars'
import Image from '../../primitives/Image'

const Wrapper = styled.div`
        padding:5px;
        border: solid 2px ${vars.MAIN_WHITE};
        width:fit-content;
        border-radius: 100%;
        display:flex;
        align-items:center;
        justify-content: center;
        height:fit-content;
    `   

const ProfileImage = styled.div`
    /* border-radius: 100%; */
    overflow: hidden;
    z-index: 3;
    border-radius: 100%;
    overflow: hidden;
`

export default function Profile(props) {

  return (
      <Wrapper style = {{padding:props.padding}}>
      <ProfileImage style = {{width: props.width, height: props.height}}>
        <Image alt = 'profile image' imagesrc = {props.profileImage} height = {props.height} width ={props.width}/>
      </ProfileImage>
      </Wrapper>
  )
}

Profile.defaultProps = {
    height : '140px',
    width : '140px'
  }