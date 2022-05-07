import React, { useState, useEffect } from 'react'
import SongSearchChosen from '../compounds/Song/SongSearchChosen'
import styled from 'styled-components'
import *as vars from '../../vars'
import RightArrow from '../primitives/Icons/RightArrow'
import LeftArrow from '../primitives/Icons/LeftArrow'

const Wrapper = styled.section`
    height:fit-content;
    position:relative;
    /* width:100%; */

        margin-inline:-15px;

    `
const ChosenSongsContOut = styled.div`
        background-color: ${vars.LIGHT_GREY};
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

    /* height: 100px; */
/* transform: translateX(-200px); */
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
const Title = styled.div`
    position:absolute;
    margin-left:20px;
    top:-20px;
    color: ${vars.MAIN_WHITE};`


export default function SearchChosenList(props) {

    const [showSongs, setShowSongs] = useState()
    const [showAlbums, setShowAlbums] = useState(false)
    const [showArtists, setShowArtists] = useState(false)
    
    // useEffect(()=>{console.log(props.songs)})

    // window.addEventListener('songsUpdate', ()=>{setShowSongs(props.songs);console.log(props.songs,'caughtit')})

    // useEffect(()=>{setShowSongs(props.songs); console.log(props.songs)}, [props.songs])
    function ScrollRight(e) {

        document.getElementById(e).scrollLeft += 20;
    }
    function ScrollLeft(e) {

        document.getElementById(e).scrollLeft -= 20;
    }

    function SongsList(){
        
        setShowSongs(props.songs)
        return showSongs
    }

    return (
        <>
            {/* {(showSongs || showAlbums || showArtists) ? */}
                <>
                    {/* {(showSongs) ? */}
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
                                <ChosenSongsCont {...props} key ={props.songs} id='chosensongs'>
                                   
                                   {/* {props.songs} */}

                                </ChosenSongsCont>
                            </ChosenSongsContOut>
                        </Wrapper>
                        {/* : null} */}
                                    </>
                {/* : <h1 style={{ color: vars.MAIN_WHITE }}>Search and add a song, artist or album to add to your wall.</h1>} */}
        </>
    )
}

