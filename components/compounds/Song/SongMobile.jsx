import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Image from '../../primitives/Image'
import PlayPause from '../../primitives/Toggles/PlayPause'
import * as vars from '../../../vars'
import DualRing from '../../primitives/Animations/DualRing'
import Youtube from '../../primitives/Icons/Youtube'
import Spotify from '../../primitives/Icons/Spotify'

const Wrapper = styled.div`
    border-radius:4px;
    overflow:hidden;
    padding:5px;
    /* padding-right:40px; */
    min-width: 300px;
    /* margin:5px; */
    @media (max-width: 450px) {
        min-width: 330px;

    }
    position:relative;

    background: ${vars.GREY};
    border:solid 1px ${vars.LIGHER_GREY};

    display:flex;
   
    & div{
        overflow:hidden;
        border-radius:2px;

    }
    width:fit-content;
    height:fit-content;
    `
const PlayPauseCont = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    position:absolute;
    z-index: 3;
    right:10px;
    justify-content:center;
    align-items:center;
    top:-5px;
    width: 30px;
    padding-top:5%;
    height: 100%;
    & button{
        background:#00000000;
        width:30px;
        border:none;
        margin:5px;
        padding:2px;
        height:20px;
        /* padding-bottom:10px; */
        cursor:pointer;

    }
    & svg{
        fill:${vars.MAIN_BLUE};
        opacity:.8;

        transition: .2s;
        :hover{
                opacity: 1 !important;;

            }}
    /* transform: translateY(5%); */
    transition: all 0.2s;
    /* :hover{
               opacity:8;
               transform: translateY(0%);

            } 

    & svg{
        fill: ${vars.MAIN_WHITE};
        transition: .2s;
        :hover{
                fill:${vars.ACCENT_COLOR}
            }
        :active{
            filter:brightness(95%);
        }
    } */
    justify-content:center;`

const DetailsInner = styled.div`
    color:${vars.MAIN_WHITE};
    font-size:1.1rem;
    /* position:absolute; */
   margin-left:20px;
   
    font-weight: 500;
    & div{
        opacity:.8;
        font-size:.9rem;
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

export default function Song(props) {
    const [isBuffering, setIsBuffering] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const [songFile, setSongFile] = useState()
    const [isError, setError] = useState(false)

    useEffect(() => {
        setSongFile(new Audio(props.SongPreview));
        () => {
            songFile.load();

        }

    },
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


            <Image
                width='80px'
                alt={props.AlbumName}

                height='80px'
                imagesrc={props.AlbumCover}
            />
            <DetailsInner>

                {props.SongName}
                <div
                    style={{ marginTop: '10px' }}>
                    <a>
                        {props.SongArtist}
                    </a>
                    <div>{props.AlbumName}</div>

                </div>

            </DetailsInner>



            <PlayPauseCont>
          
                <button>
                </button>
                {(props.isPreview) ?
                    <PlayPause
                        isPlay={!isPlaying}
                        onClick={() => { playSong() }}
                        style={{ marginBottom: '10px' }}
                        size={'30px'}
                    /> : ''}



            </PlayPauseCont>



            {/* <iframe src="https://open.spotify.com/embed/track/0lqAn1YfFVQ3SdoF7tRZO2?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe> */}

        </Wrapper>

    )
}
Song.defaultProps = {
    isPreview: true
}