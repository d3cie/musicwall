import React from 'react'
import styled from 'styled-components'

import * as vars from '../../../vars'

const InputStyle = styled.input`


    font-size: 1.2em;
    border-radius:4px;
    font-weight: 400;
    border:none;
    background-color: ${vars.DARK_GREY};
    color:${vars.MAIN_WHITE};
   padding: 10px 10px;
    min-width:150px;
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

    &:focus {
        outline: none;
        color:${vars.GREY};
        background-color:${vars.MAIN_WHITE};
    }
    `
const Label = styled.label`
        position:absolute;
        left:10px;
        transform: translateY(-20px);
        opacity: .8;
        font-size:.8rem;
        & ::placeholder{
            color:${vars.MAIN_WHITE};
        }
        text-transform:uppercase;
        /* background-color:${vars.DARK_GREY}; */
        color:${vars.MAIN_WHITE};

`
export default function Date(props) {
  return (
    <div style={{ width: 'fit-content', margin: '10px', position: 'relative' }}>
      <InputStyle type='date' required={true} {...props}>
      </InputStyle>
      <Label>{props.placeholderText}</Label>

    </div>

  )
}
