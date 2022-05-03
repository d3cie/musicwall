import React from 'react'
import styled from 'styled-components'

import * as vars from '../../../vars'

const InputStyle  = styled.input`


    font-size: 1.2em;
    border-radius:4px;
    font-weight: 400;
    border:none;
    background-color: ${vars.GREY};
    color:${vars.MAIN_WHITE};
   padding: 10px 10px;
    width:100%;
     
    &:focus {
        outline: none;
        color:${vars.GREY};
        background-color:${vars.MAIN_WHITE};
    }
    `

export default function SecondaryBox(props) {
  return (
        <InputStyle required = {true} {...props}>
        </InputStyle>
    
    
  )
}
