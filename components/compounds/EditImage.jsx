import React, {useState} from 'react'

import AvatarEditor from 'react-avatar-editor'
import styled from 'styled-components'
import * as vars from '../../vars'
import XIcon from '../primitives/Icons/XIcon'
// import Slider from '../primitive/Slider'


const OutCont = styled.div`
       width: 100vw;
    height: 100vh;
    overflow:hidden;
    background-color:#000000aa;
    position:absolute;
    left:0;

    top:0;
        z-index:5;

    @media (max-width: 600px) {
      background-color: ${vars.GREY};

    }
    
    display:flex;
    justify-content: center;
    align-items: center;`

const ExitButton = styled.button`
    position:absolute;
    right:5%;
    height:30px;
    background-color:#00000000;
    border:none;
    fill:${vars.MAIN_WHITE};
    top:5%;
`

const Cont = styled.div`
      width:fit-content;
    height: fit-content;
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
   
    @media (max-width: 350px) {
      /* width:100%; */
      transform:scale(.8);
    }
    border-radius: 4px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  `
const TopBar = styled.div`
    display:flex;
   position:relative;
   align-items:center;
    justify-content:center;
    padding: 10px;
    padding-left:20px;
    padding-right:20px;
    `

const Title = styled.h2`
    margin:0px;
    font-size: 1rem;
    font-weight: 200;
    color:${vars.MAIN_WHITE};
    `
const Next = styled.button`
    margin:0px;
    border:none;
    background:#00000000;
    position:absolute;
    right:20px;
    cursor:pointer;

    font-size: 1rem;
    font-weight: 100;
    color:${vars.MAIN_BLUE};
    `
const Zoom = styled.span`
    position:absolute;
    left:20px;
    & button{
        color:${vars.MAIN_BLUE};
        background:${vars.DARK_GREY};
        border:none;
        margin-inline:2px;
        cursor:pointer;
        padding-inline:10px ;
    }`

class EditImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      zoomValue:1,
    };
  }
  
  onClickSave = () => {
    if (this.editor) {
    
      const canvas = this.editor.getImage().toDataURL();
      
          console.log(this.props.closeEditImage(canvas))
      
           const canvasScaled = this.editor.getImageScaledToCanvas()
    }
  }
  setEditorRef = (editor) => (this.editor = editor)
  
  render(){

  return (
    <OutCont>
      <ExitButton onClick={this.props.exitButton} > <XIcon/> </ExitButton>
      <Cont>
        <TopBar>
            <Zoom>
            <button onClick = {(e) => this.setState({zoomValue:1 })} >x1</button> 
            <button onClick = {(e) => this.setState({zoomValue:1.5 })} >x1.5</button>
             <button onClick = {(e) => this.setState({zoomValue:2 })}>x2</button>
            </Zoom>
          <Title>Crop</Title>
          <Next   onClick = {this.onClickSave}> Next</Next>
        </TopBar>
        <AvatarEditor
            ref={this.setEditorRef}
            image={this.props.uncroppedPhoto}
            width={400}
            height={400}
            border={2}
            style = {{transition:'all .2s'}}
            borderRadius={500}
            color={[66, 73, 82, .4]} // RGBA
            scale={this.state.zoomValue} //zoomValue
            disableHiDPIScaling = {true}
            rotate={0}
        >   
        </AvatarEditor>
      </Cont>
    </OutCont>
  )
}
}


export default EditImage