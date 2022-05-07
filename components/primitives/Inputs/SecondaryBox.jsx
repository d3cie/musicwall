import React from 'react'
import styled from 'styled-components'

import * as vars from '../../../vars'

const InputStyle  = styled.input`


    width:100%;
   

    

    font-size: 1.2em;
    border-radius:4px;
    font-weight: 400;
    background-color: ${vars.GREY};
    color:${vars.MAIN_WHITE};
   padding: 10px 10px;
    border: solid 1px  ${vars.LIGHT_GREY};
    position: relative;
     
  
    &:focus {
        outline: none;
        color:${vars.MAIN_WHITE};
        background-color:${vars.LIGHER_GREY};
    }
    `

export default function SecondaryBox(props) {
  return (
        <InputStyle required = {true} {...props}>
        </InputStyle>
    
    
  )
}
