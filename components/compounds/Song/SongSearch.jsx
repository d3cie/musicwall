import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Image from '../../primitives/Image'
import * as vars from '../../../vars'
import DualRing from '../../primitives/Animations/DualRing'
import SecondaryButton from '../../primitives/Buttons/SecondaryButton'
import PlayPause from '../../primitives/Toggles/PlayPause'
import Plus from '../../primitives/Icons/Plus'
import Minus from '../../primitives/Icons/Minus'
import PlaySongSpotify from './PlaySongSpotify'
const Wrapper = styled.div`
    border-radius:4px;
    overflow:hidden;
    padding:5px;
    width:100%;
    transition: all 0.2s;
    max-width:700px;
    width: 100%;
    :hover{
        background-color:${vars.LIGHER_GREY};
    }
    /* padding-right:40px; */
    /* min-width: 350px; */
    /* @media (max-width: 450px) {
        min-width: 330px;

    } */
    margin:10px;
    margin-inline:5px;
    position:relative;

    background: ${vars.LIGHT_GREY};
    border:solid 1px ${vars.LIGHER_GREY};

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
    align-items:center;
    position:absolute;
    z-index: 3;
    right:10px;
    justify-content:center;
    height: 90%;
    
    & button{
        font-size:15px;
        padding:0;
        margin:2px;
        height:20px;
        padding:2px;
        width:20px;
        font-weight: 600;

        /* padding-inline:10px; */
    }
    

    justify-content:center;`

const DetailsInner = styled.div`
    color:${vars.MAIN_WHITE};
    font-size:1.1rem;
    
 overflow:hidden;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap; 
   margin-left:20px;
   padding-right:80px;
   max-width:400px;
   
    font-weight: 500;
    & div{
        opacity:.8;
        font-size:.8rem;
        overflow:hidden;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap; 
        & a{
            margin-bottom:20px;

            color:${vars.MAIN_WHITE};
            transition: .2s;

            :hover{
                color:${vars.ACCENT_COLOR}
            }
            :active{
                filter:brightness(95%);
            }
        }
    }
    `


const Loading = styled.div`
    height:100px;
    width:100px;
    background-color:#000000aa;
    position:absolute;
    overflow: hidden;
    border-radius: 2px;
    display:flex;
    transition:all .2s;
    flex-direction:column;
    color:${vars.MAIN_WHITE};
    align-items:center;
    justify-content:center;
    z-index:3;`


export default function SongSearch(props) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isChosen, setIsChosen] = useState(props.isSongChosen)


    function addRemoveSong(){
        if(!isChosen){
            props.addSong()
            setIsChosen(true)
            return
        }
        setIsChosen(false)
        props.removeSong()
    }
  
    return (
        <>
        
        <Wrapper>
            

<div style = {{minWidth:'60px'}}>
<Image
                width='60px'
                alt={props.AlbumName}
                height='60px'
                imagesrc={props.AlbumCover}
            />
</div>
           
            <DetailsInner>

                {props.SongName}
                <div
                    style={{ marginTop: '0px' }}>
                    <a>
                        {props.SongArtist}
                    </a>
                    <div>{props.AlbumName}</div>

                </div>

            </DetailsInner>


             

            <ButtonCont>
            {/* {(props.SongPreview != null)? */}
            <SecondaryButton onClick ={()=>props.onPlay()} style ={{backgroundColor:vars.ORANGE, borderColor:vars.ACCENT_COLOR}} buttonTitle = {<PlayPause isPlay={!isPlaying} color = {vars.MAIN_WHITE}/>}/>
            {/* :'' */}
            {/* } */}
            <SecondaryButton style={{backgroundColor:(!isChosen)?vars.MAIN_BLUE:vars.MAIN_RED, borderColor:(!isChosen)?vars.MAIN_BLUE:'#bb7777'}} onClick = {addRemoveSong} buttonTitle = {(isChosen)?<Minus/>:<Plus/> }/>
          
            </ButtonCont>




                      

        </Wrapper>
                  {/* <PlaySongSpotify/> */}

        </>
    )
}
SongSearch.defaultProps = {
    isPreview: true
}