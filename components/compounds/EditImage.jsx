import React, { useState } from 'react'

import AvatarEditor from 'react-avatar-editor'
import styled from 'styled-components'
import * as vars from '../../vars'
import Ellipsis from '../primitives/Animations/Elipsis'
import SecondaryButton from '../primitives/Buttons/SecondaryButton'
import RightArrow from '../primitives/Icons/RightArrow'
import XIcon from '../primitives/Icons/XIcon'
// import Slider from '../primitive/Slider'


const OutCont = styled.div`
       width: 100%;
       height: 100%;
    overflow:hidden;
    background-color:#000000aa;
    /* position:absolute; */
    position: fixed;
    left:0;

    top:0;
        z-index:5;

 
    
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    @media (max-width: 600px) {
      /* top:-30%; */
          height: 120vh;

      background-color: ${vars.GREY};
      /* justify-content: left;
    align-items: left; */
    }
    `

const ExitButton = styled.button`
    /* position:absolute; */
    height:20px;
    background-color:${vars.GREY}!important;
    border:none!important;
    z-index:10;
    transform: rotate(180deg);
    fill:${vars.MAIN_WHITE};
    /* top:5%; */
`

const Cont = styled.div`
      width:fit-content;
          border:solid 1px ${vars.LIGHT_GREY};
    height: fit-content;
    align-self:center;

    /* position: absolute; */
      @media (max-width: 600px) {
        /* height: 100%; */
        margin-bottom:40%;

        border:none;
    
    }
    @keyframes fadein {
      from{
        opacity:0;
        /* transform:scale(0); */
      }
      to{
        opacity:1;
        /* transform:scale(1); */
      }
    }
    animation: fadein 0.2s ease-in-out forwards;
    background-color: ${vars.GREY};
    padding:0px;
    /* padding-bottom:35px; */

    @media (max-width: 350px) {
      /* width:100%; */
    }
    border-radius: 4px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  `
const TopBar = styled.div`
    display:flex;
   position:relative;
   height:35px;
   align-items:center;
    justify-content:center;
    padding: 10px;
    padding-left:20px;
    padding-right:20px;
    `

const Title = styled.h2`
    margin:0px;
    font-size: 1rem;
    font-weight: 600;
    color:${vars.MAIN_WHITE};
    `
const Next = styled.div`
    margin:0px;
    border:none;
    position:absolute;
    right:20px;
        font-size: .9rem;
    
        & button{
          height:24px;
          width:60px;
          font-size: 16px;
        }
   

   
    `
const Zoom = styled.span`
    position:absolute;
    left:10px;
    display: flex;

    & button{
        color:${vars.MAIN_BLUE};
        background:${vars.DARK_GREY};
        border:none;
        margin-inline:2px;
        font-weight: 600;

        cursor:pointer;
        padding-inline:10px ;
    }`

class EditImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      zoomValue: 1,
      isWorking: false,
    };
  }

  onClickSave = () => {
    if (this.editor) {
      this.setState({ isWorking: true })
      // const canvas = this.editor.getImage().toDataURL();
      const canvasScaled = this.editor.getImageScaledToCanvas().toDataURL();
      this.props.closeEditImage(canvasScaled)

    }
  }
  setEditorRef = (editor) => (this.editor = editor)

  render() {

    return (<>

      <OutCont>
        <Cont>
          <TopBar>

            <Zoom>
              <ExitButton onClick={this.props.exitButton} >

                <RightArrow /> </ExitButton>

              <button type="button" onClick={(e) => this.setState({ zoomValue: 1 })} >x1</button>
              <button type="button" onClick={(e) => this.setState({ zoomValue: 1.5 })} >x1.5</button>
              <button type="button" onClick={(e) => this.setState({ zoomValue: 2 })}>x2</button>
            </Zoom>
            {/* <Title>Crop</Title> */}
            {/* <ExitButton onClick={this.props.exitButton} > Cancel </ExitButton> */}
            {/* <Next  style={{color: vars.MAIN_WHITE, right:70}} onClick={this.props.exitButton}> Cancel</Next> */}
            <Next>
              <SecondaryButton isWorking={this.state.isWorking} onClick={this.onClickSave} type="button" buttonTitle={'Next'} />

            </Next>
          </TopBar>
          <AvatarEditor
            ref={this.setEditorRef}
            image={this.props.uncroppedPhoto}
            width={400}
            height={400}
            border={2}
            style={{ transition: 'all .2s' }}
            borderRadius={500}
            color={[66, 73, 82, .4]}
            scale={this.state.zoomValue}
            disableHiDPIScaling={true}
            rotate={0}
          >
          </AvatarEditor>
        </Cont>
      </OutCont>
    </>

    )
  }
}


export default EditImage