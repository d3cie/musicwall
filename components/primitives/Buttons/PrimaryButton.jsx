import React from 'react'
import styled from 'styled-components'
import * as vars from '../../../vars'
import BouncyDots from '../../primitives/Animations/Elipsis'

const ButtonStyle  = styled.button`
    font-size: 1.2rem;
    border-radius:2px;
    margin:5px;
    display: flex;
    align-items:center;
    justify-content: center;
    width:fit-content;
    height: 40px;
    /* font-weight: 300; */
    background-color:${vars.DARK_BLUE};
    border:solid 1px #0956ab;
    /* border:none; */
    cursor: pointer;
    transition: all 0.2s;
    &:active{
        filter:brightness(95%);
    }
    &.active{
        cursor: not-allowed;
        color:white;
        &:active{
            filter:brightness(100%);}
    }

    color:${vars.MAIN_WHITE};
    padding: 6px 20px;
    position:absolute;

    &:hover{
        filter:brightness(105%);
    }
    &:disabled{
      cursor: not-allowed;
      background:grey;
      border-color:grey;
    }
   font-weight: 600px;
    `

export default function PrimaryButton(props) {
    
  return (
    <ButtonStyle 
        {...props}
        className = {props.isWorking ? 'active' : 'normal'} 
        
        >
        {(props.isWorking) ? <BouncyDots
        color = {vars.MAIN_WHITE}
        
        
        /> : props.buttonTitle}

    </ButtonStyle>
  )
}