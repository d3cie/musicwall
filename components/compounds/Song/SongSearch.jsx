import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Image from '../../primitives/Image'
import * as vars from '../../../vars'
import DualRing from '../../primitives/Animations/DualRing'
import SecondaryButton from '../../primitives/Buttons/SecondaryButton'
import PlayPause from '../../primitives/Toggles/PlayPause'
import Plus from '../../primitives/Icons/Plus'

const Wrapper = styled.div`
    border-radius:4px;
    overflow:hidden;
    padding:5px;
    width:100%;
    max-width:700px;
    /* padding-right:40px; */
    /* min-width: 350px; */
    /* @media (max-width: 450px) {
        min-width: 330px;

    } */
    margin:10px;
    margin-inline:0px;
    position:relative;

    background: ${vars.LIGHT_GREY};
    outline:solid 1px ${vars.LIGHT_GREY};
    @media (prefers-color-scheme: dark) {
        background: ${vars.GREY};
}
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

const Exclamation = (props) => (
    <svg fill={vars.MAIN_WHITE} style={{ margin: '20px' }} height={'40%'} viewBox="0 0 192 512" {...props}>
        <path d="M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z" />
    </svg>
)

export default function SongSearch(props) {
    const [isBuffering, setIsBuffering] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const [songFile, setSongFile] = useState()
    const [isError, setError] = useState(false)

    useEffect(() => {
        if(props.SongPreview != null){
        setSongFile(new Audio(props.SongPreview));
        () => {
            songFile.load();

        }

    }},
        [])


    function playSong() {
        songFile.addEventListener('ended', () => { setIsPlaying(false) })

        if (!isPlaying) {
            songFile.play()
            setIsPlaying(true)
            return
        }

        setIsPlaying(false)
        songFile.pause()
    }


    return (
        <Wrapper>
            <audio id='sound' src={songFile}></audio>
            {(!isBuffering) ? <Loading><DualRing /></Loading> : ''}
            {(isError) ? <Loading><Exclamation /><a style={{ color: vars.ACCENT_COLOR, cursor: 'pointer' }} onClick={() => { playSong(testfile) }}></a></Loading> : ''}

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
            {(props.SongPreview != null)?
            <SecondaryButton onClick ={()=>playSong()} style ={{backgroundColor:vars.ACCENT_COLOR}} buttonTitle = {<PlayPause isPlay={!isPlaying} color = {vars.MAIN_WHITE}/>}/>
            :''
            }
            <SecondaryButton buttonTitle = { <Plus/> }/>
          
            </ButtonCont>





        </Wrapper>

    )
}
SongSearch.defaultProps = {
    isPreview: true
}