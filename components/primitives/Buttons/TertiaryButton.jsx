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
    background-color:${vars.LIGHT_GREY};
    border:none;
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

    &.active{
        cursor: not-allowed;
        color:${vars.MAIN_WHITE};
        border:solid 2px ${vars.MAIN_BLUE};
        background-color:${vars.LIGHT_GREY};
        &:active{
            filter:brightness(100%);}
    }

    color:${vars.MAIN_BLUE};
    padding: 18px 20px;

    &:hover{
        filter:brightness(110%);
    }
    &:disabled{
      cursor: not-allowed;
      background:grey;
      border-color:grey;
    }
   font-weight: 500px;
    `

export default function TertiaryButton(props) {
    
  return (
    <ButtonStyle 
        {...props}
        className = {props.state} 
        
        >
       {props.buttonTitle}

    </ButtonStyle>
  )
}