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
    background-color:${vars.MAIN_WHITE};
    z-index: 3;
    border-radius: 100%;
    overflow: hidden;
`

const NoProfile = (props) => (

  <svg style = {{paddingTop:'10%', margin:'10%'}} fill = "#101019" viewBox="0 0 448 512" {...props}>
    <path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0 96 57.31 96 128s57.3 128 128 128zm50.7 48H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3c0-95.7-77.6-173.3-173.3-173.3z" />
  </svg>

)

export default function Profile(props) {

  return (
      <Wrapper style = {{padding:props.padding}}>
      <ProfileImage style = {{width: props.width, height: props.height}}>
        {(props.profileImage != null)?<Image alt = 'profile image' imagesrc = {props.profileImage} height = {props.height} width ={props.width}/>:<NoProfile/>}
      </ProfileImage>
      </Wrapper>
  )
}

Profile.defaultProps = {
    height : '120px',
    width : '120px'
  }