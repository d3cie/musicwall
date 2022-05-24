import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Image from '../../primitives/Image'
import * as vars from '../../../vars'
import SecondaryButton from '../../primitives/Buttons/SecondaryButton'
import Plus from '../../primitives/Icons/Plus'
import Minus from '../../primitives/Icons/Minus'

const Wrapper = styled.div`
    overflow:hidden;
    padding:5px;
    width:fit-content;
    min-width: 90px;
    margin:5px;
    margin-inline: 5px;
    position:relative;
    display:flex;
   
    & div{
        overflow:hidden;
        border-radius:4px;
    }
    /* width:fit-content; */
    height:fit-content;
    `
const ButtonCont = styled.div`
    display:flex;
    flex-direction:row;
    position:absolute;
    z-index: 3;
    right:-0px;
    top:-0px;
    justify-content:center;
    height: 100%;
    
    & button{
        font-size:15px;
        padding:0;
        margin:2px;
        height:20px;
        padding:2px;
        background-color: ${vars.MAIN_RED};
        width:20px;
        border:1px solid ${vars.SECONDARY_RED};

    }
    `

export default function AlbumSearchChosen(props) {

    return (
        <Wrapper>

            <div style={{ minWidth: '60px' }}>
                <Image
                    width='80px'
                    alt={props.AlbumName}
                    height='80px'
                    imagesrc={props.AlbumCover}
                />
            </div>





        </Wrapper>

    )
}
