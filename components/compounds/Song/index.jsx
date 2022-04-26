import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Image from '../../primitives/Image'
import PlayPause from '../../primitives/Toggles/PlayPause'
import * as vars from '../../../vars'
import DualRing from '../../primitives/Animations/DualRing'

const Wrapper = styled.div`
    border-radius:4px;
    overflow:hidden;
    position:relative;
    width:fit-content;
    height:fit-content;
    `
const PlayPauseCont = styled.div`
    display:flex;
    align-items:center;
    position:absolute;
    z-index: 3;
    width: 100%;
    height: 100%;
    opacity:0;
    transform: translateY(5%);
    transition: all 0.2s;
    :hover{
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
    }
    justify-content:center;`

const DetailsInner = styled.div`
    color:${vars.MAIN_WHITE};
    font-size:1.1rem;
    position:absolute;
    bottom:15%;
    left:10%;
    font-weight: 500;
    & div{
        opacity:.8;
        font-size:.9rem;
        
        & a{
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

const Details = styled.div`
    background:linear-gradient(0deg, #00000099, #00000000);
    height:40%;
    position: absolute;
    bottom:0;
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
    z-index: 4;
    opacity:.8;
    padding:5px;
    transition: all .2s;
    cursor:pointer;
    :hover{
        opacity: 1;

    }
    `
const Loading = styled.div`
    width:100%;
    height:100%;
    background-color:#000000aa;
    position:absolute;
    display:flex;
    transition:all .2s;
    flex-direction:column;
    color:${vars.MAIN_WHITE};
    align-items:center;
    justify-content:center;
    z-index:3;`

const Exclamation = (props) => (
    <svg  fill = {vars.MAIN_WHITE} style = {{margin:'20px'}} height = {'40%'} viewBox="0 0 192 512" {...props}>
      <path d="M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z" />
    </svg>
  )

export default function Song(props) {
    const [isBuffering, setIsBuffering] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const [songFile, setSongFile] = useState()
    const [isError, setError] = useState(false)

    useEffect(()=>{
        setSongFile(new Audio(props.SongPreview));
        ()=>{songFile.load();

        }

    },
         [])


    function playSong()
        
    {   
        songFile.addEventListener('ended', ()=>{setIsPlaying(false)})

        if(!isPlaying){
           songFile.play()
           setIsPlaying(true)
            return
        }

        setIsPlaying(false)
        songFile.pause()
        }
        
        
   return (
    <Wrapper>
        <audio id = 'sound' src = {songFile}></audio>
        {(!isBuffering)?<Loading><DualRing/></Loading>:''}
        {(isError)?<Loading><Exclamation />Error Loading Song<a style = {{color: vars.ACCENT_COLOR, cursor: 'pointer'}} onClick = {() =>{playSong(testfile)}}>reload</a></Loading>:''}
        {(props.isPreview)?
            <PlayPauseCont>
            <PlayPause
                  isPlay = {!isPlaying}
                  onClick = {() =>{playSong()}}
                  size = {'60px'}
            />
            </PlayPauseCont>:''
            }
        <Details>
       
            <DetailsInner>
                
                {props.SongName}
                <div>
                    <a>
                        {props.SongArtist}
                    </a>
                    <div>{props.AlbumName}</div>

                </div>

            </DetailsInner>

        </Details>
        {/* <SongProgressBar/> */}

        <Image
        width = '300px'
        alt = {props.AlbumName}
          
        height = '300px'
         imagesrc = {props.AlbumCover}
         />
    </Wrapper>
   
  )
}
Song.defaultProps = {
    isPreview : true
  }