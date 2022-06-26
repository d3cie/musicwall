import React from 'react'
import styled from 'styled-components'

import * as vars from '../../../vars'

const InputStyle = styled.input`


    font-size: 1em;
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
     
    &:focus {
        outline: none;
        color:${vars.MAIN_WHITE};
        background-color:${vars.LIGHT_GREY};
    }
    `
const Send = styled.div`
    position:absolute;
    color:${vars.MAIN_BLUE};
    right:0;
    top:0;
    height:100%;
    text-align:center;
    display:flex;align-items:center;
    justify-content:center;
    text-justify: center;
    font-weight: 500;

    padding-inline:20px;
    
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
export default function CommentBox(props) {

    return (
        <div style={{ width: '100%', marginTop: '20px', position: 'relative' }}>
            <InputStyle autoComplete="off" required={true} {...props}>
            </InputStyle>
            <Send>Send</Send>
            <Label>{props.placeholderText}</Label>

        </div>

    )
}
