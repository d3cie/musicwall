import React, { useState } from 'react'
import styled from 'styled-components'
import Image from '../../primitives/Image'
import PlayPause from '../../primitives/Toggles/PlayPause'
import * as vars from '../../../vars'


const Wrapper = styled.div`
    border-radius:4px;
    overflow:hidden;
    padding:5px;
    /* padding-right:40px; */
    width: 330px;
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
    /* width:fit-content; */
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
    transition: all 0.2s;
    justify-content:center;`

const DetailsInner = styled.div`
    color:${vars.MAIN_WHITE};
    font-size:1.1rem;
   margin-left:20px;
   overflow:hidden;
   width:150px;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap; 
   overflow:hidden;
    font-weight: 500;
    & div{
        opacity:.8;
        font-size:.9rem;
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

export default function Song(props) {
    const [isPlaying, setIsPlaying] = useState(false)


    return (
        <Wrapper>
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
                <PlayPause
                    isPlay={!isPlaying}
                    onClick={() => { playSong() }}
                    style={{ marginBottom: '10px' }}
                    size={'30px'}
                />
            </PlayPauseCont>
        </Wrapper>

    )
}
