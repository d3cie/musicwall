import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import * as vars from '../../../vars'

const Wrapper = styled.div`
    border-radius:4px;
    overflow:hidden;
    position:relative;
    width:210px;
    /* width:100%; */
    background-color:${vars.LIGHT_GREY};
    padding:10px;
    margin:5px;
    height:fit-content;
    
    padding-top:20px;
    padding-bottom: 20px;
    `

const DetailsInner = styled.div`
    color:${vars.MAIN_WHITE};
    text-align: center;
    border-radius:4px;
background-color:${vars.LIGHER_GREY};
   height:20px;
   width:100px;
    
    `

const Details = styled.div`
    padding:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    
    
    /* opacity:.8; */
    padding:5px;
    margin-top:10px;
    transition: all .2s;
    /* cursor:pointer; */
    :hover{
        opacity: 1;

    }
    `


const ButtonCont = styled.div`
    display:flex;
    flex-direction:row;
    /* align-items:center; */
    position:absolute;
    bottom:18%;
    right:8%;
    padding:10px;
    width: fit-content;
    /* justify-content:center; */
    height: fit-content;
    
    & div{
        font-size:25px;
        padding:0;
        margin:2px;
        background: ${vars.MAIN_BLUE};
        height:40px;
        border-radius: 50%;
        padding:2px;
        width:40px;
        font-weight: 600;

        /* padding-inline:10px; */
    }
    

    justify-content:center;`




export default function ArtistSearchDummy(props) {

    return (
        <Wrapper>



            <ButtonCont>
                <div  />
            </ButtonCont>
            <div
                style={{ borderRadius: '50%',border:`solid ${vars.MAIN_BLUE}`, width: '190px',height:'190px',backgroundColor:vars.LIGHER_GREY, overflow: 'hidden' }}
            />
                
            <Details>

                <DetailsInner>
                </DetailsInner>

            </Details>
        </Wrapper>

    )
}
