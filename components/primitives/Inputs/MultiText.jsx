import React from 'react'
import styled from 'styled-components'

import * as vars from '../../../vars'

const InputStyle = styled.textarea`
    resize:vertical;
    min-height:100px;
    max-height:200px;
    font-size: 1.2em;
    border-radius:4px;
    font-weight: 400;
    border:none;
    background-color: ${vars.DARK_GREY};
    color:${vars.MAIN_WHITE};
   padding: 10px 10px;
    min-width:350px;
    width:100%;
    border: solid 1px  ${vars.LIGHT_GREY};
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

    &:focus {
        outline: none;
        color:${vars.MAIN_WHITE};
        background-color:${vars.LIGHT_GREY};
    }

    `
const Label = styled.label`
        position:absolute;
        left:10px;
        transform: translateY(-20px);
        opacity: .8;
        font-size:.8rem;
        text-transform:uppercase;
        /* background-color:${vars.DARK_GREY}; */
        color:${vars.MAIN_WHITE};

`
export default function MultiText(props) {

  return (
    <div style={{ width: 'fit-content', margin: '10px', position: 'relative' }}>
      <InputStyle required={true} {...props}>
      </InputStyle>
      <Label>{props.placeholderText}</Label>

    </div>

  )
}
