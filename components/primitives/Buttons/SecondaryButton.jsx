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
    height: 30px;
    font-weight: 500;
    background-color:${vars.MAIN_BLUE};
    border:none;
    border:solid 1px ${vars.PALE_BLUE};
transition: all .2s;
    cursor: pointer;
    transition: all 0.2s;
    &:active{
        filter:brightness(95%);
    }
    &.working{
        cursor: not-allowed;
        color:white;
        &:active{
            filter:brightness(100%);}
    }

    &#active{
        cursor: not-allowed;
        color:${vars.MAIN_WHITE};
       
        &:active{
            filter:brightness(100%);}
    }

    color:${vars.MAIN_WHITE};
    padding: 8px 15px;

    &:hover{
        filter:brightness(105%);
    }
    &:disabled{
      cursor: not-allowed;
      background:grey;
      border-color:grey;
    }
   font-weight: 500px;
    `

export default function SecondaryButton(props) {
    
  return (
    <ButtonStyle 
        {...props}
        id = {props.isWorking ? 'active' : 'normal'} 
        className = {props.state} 
        
        >
       {(props.isWorking) ? <BouncyDots
        color = {vars.MAIN_WHITE}
        
        
        /> : props.buttonTitle}

    </ButtonStyle>
  )
}