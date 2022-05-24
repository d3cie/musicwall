import React from 'react'
import styled from 'styled-components'
import * as vars from '../../../vars'
import BouncyDots from '../../primitives/Animations/Elipsis'

const ButtonStyle = styled.button`
    font-size: 1.2rem;
    border-radius:2px;
    margin:5px;
    display: flex;
    align-items:center;
    justify-content: center;
    position: relative;
    width:fit-content;
    height: 30px;
    font-weight: 500;
    width:80px;

    background-color:${vars.MAIN_BLUE};
    border:none;
    border:solid 1px ${vars.PALE_BLUE};
    cursor: pointer;
    transition: all .2s;
  
    &:active{
        filter:brightness(95%);
    }

    &#active{
        width:100px;
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
   &.active{
           border:solid 2px ${vars.PALE_BLUE};

        background-color:${vars.GREY};
        color:${vars.PALE_BLUE};
    }
    `

export default function SecondaryButton(props) {

    return (
        <ButtonStyle
            {...props}
            id={props.isWorking ? 'active' : 'normal'}
            className={props.state}

        >
            {(props.isWorking) ? <BouncyDots
                color={(props.state == 'active') ? vars.MAIN_BLUE : vars.MAIN_WHITE}

            /> : props.buttonTitle}

        </ButtonStyle>
    )
}