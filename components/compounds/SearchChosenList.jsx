import React, { useState, useEffect } from 'react'
import SongSearchChosen from './Song/SongSearchChosen'
import styled from 'styled-components'
import *as vars from '../../vars'
import RightArrow from '../primitives/Icons/RightArrow'
import LeftArrow from '../primitives/Icons/LeftArrow'

const Wrapper = styled.section`
    height:fit-content;
    position:relative;
    /* width:100%; */
    border-radius:2px ;

        margin-inline:-15px;

    `
const ChosenSongsContOut = styled.div`
        background-color: ${vars.GREY};
        border:solid 1px ${vars.LIGHT_GREY};
        border-radius: 2px;
        margin-top:30px;
        overflow:hidden;
    `

const ChosenSongsCont = styled.div`
    display: flex;
    transition: all 0.2s;
    position: relative;
    overflow-x: auto;
    width:100%;

    height: fit-content;
    height:100px;

    &::-webkit-scrollbar
    {
      
        display: none;
       
    }

    `
const ButtonCont = styled.div`
    height:100%;
    background-color: ${vars.LIGHT_GREY};
    transition: all 0.2s;
    background:linear-gradient(90deg,${vars.LIGHT_GREY}, #00000000);
    :hover{
        background:linear-gradient(90deg,${vars.DARK_GREY}, #00000000);

    }
    :nth-child(2){
        background:linear-gradient(270deg,${vars.LIGHT_GREY}, #00000000);
        :hover{
        background:linear-gradient(270deg,${vars.DARK_GREY}, #00000000);

    }
    }
    position: absolute;
    width:50px;display: flex;
    align-items: center;
    justify-content: center;
    z-index:10;


    `
const DirectionButton = styled.button`
    height:30px;
    width:30px;
    @media (max-width:650px) {
        display: none;
    }
    border:none;
    background: transparent;
    /* background:${vars.DARK_GREY}; */
    /* background:${vars.MAIN_BLUE}; */
transition: .2s;
    opacity:.6;
    cursor:pointer;
    &:hover{
        opacity:1;
    }
    /* left:0; */
    fill:${vars.MAIN_WHITE};
    /* background-color:#00000077; */
    /* fill:${vars.MAIN_BLUE}; */

    border-radius: 4px;
    `


export default function SearchChosenList(props) {


    function ScrollRight(e) {
        document.getElementById(e).scrollLeft += 20;
    }
    function ScrollLeft(e) {
        document.getElementById(e).scrollLeft -= 20;
    }

    return (
        <>

            <Wrapper>
                <ButtonCont style={{ left: '-2px' }}>
                    <DirectionButton onClick={() => { ScrollLeft('chosensongs') }} >
                        <LeftArrow />
                    </DirectionButton>
                </ButtonCont>
                <ButtonCont style={{ right: '-2px' }}>
                    <DirectionButton onClick={() => { ScrollRight('chosensongs') }}>
                        <RightArrow />
                    </DirectionButton>
                </ButtonCont>
                <ChosenSongsContOut>
                    <ChosenSongsCont {...props} key={props.songs} id='chosensongs'>

                    </ChosenSongsCont>
                </ChosenSongsContOut>
            </Wrapper>

        </>
    )
}

