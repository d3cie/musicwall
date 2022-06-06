import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Image from '../../primitives/Image'
import * as vars from '../../../vars'
import PlayPause from '../../primitives/Toggles/PlayPause'
import { getColorFromURL } from 'color-thief-node'

const Wrapper = styled.div`
    border-radius:4px;
    overflow:hidden;
    position:relative;
    /* width:fit-content; */
    border:solid 1px ${vars.LIGHER_GREY};

    /* margin:5px; */
    padding:5px;
    height:fit-content;
    width:172px;
    min-width: 172px;
    margin:5px;
    /* min-height: 300px; */
    background-color:${vars.LIGHT_GREY};
    & div{
        border-radius: 2px;
        overflow:hidden;
    }
    `

const DetailsInner = styled.div`
    color:${vars.MAIN_WHITE};
    font-size:.9rem;
    font-weight: 500;
    text-align: left;
    width:100%;
    padding:5px;
    position:relative;
    overflow:hidden;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap; 
  max-width:150px;

   /* margin-left:20px;
   padding-right:80px;
   max-width:400px */
    & .artcont{
        opacity:.8;
        font-size:.9rem;
        text-align: left;
        & a{
              text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap; 
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

const ButtonCont = styled.div`
    height:35px;
    width:35px;
    z-index:10;
    position:absolute;
    top:15px;
    right: 15px;
    fill: ${vars.MAIN_BLUE};
    background: ${vars.GREY};
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    cursor: pointer;
    padding: 4px;
     padding-left: 8px;
    border-radius: 4px;
    transition: all 0.2s;
    :hover{
        filter:brightness(105%);
        fill:${vars.ORANGE};
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    `
const Details = styled.div`
    /* background:linear-gradient(0deg, #00000099, #00000000); */
    /* background: ${vars.LIGHT_GREY}; */
    /* position: absolute; */
    /* padding-inline:10px; */
    z-index: 4;
    padding-inline:0;
    transition: all .2s;
    text-justify:left;
    `


export default function FeedItem(props) {


    return (
        <Wrapper>
            <div style={{ overflow: "hidden", borderRadius: (props.Type == "ARTISTS") ? "50%" : "2px" }}
            >
                <Image
                    width='160px'
                    alt={props.AlbumName}

                    height='160px'
                    imagesrc={props.AlbumCover}
                />
            </div>


            <Details>

                <DetailsInner>
                    {props.SongName}
                    <div style={{ textAlign: 'center' }}>{(props.Type == "ARTISTS") ? props.Artist : ''}</div>
                    {props.AlbumName}
                    <div className="artcont">
                        <a>
                            {(props.Type == "ARTISTS") ? "" : props.Artist}
                        </a>

                    </div>

                </DetailsInner>
                {(props.Type == "SONGS" ? <ButtonCont onClick={() => props.playSong()} style={{ borderRadius: 4 }}>
                    <PlayPause isPlay={true} size={20} />

                </ButtonCont> : '')}
            </Details>

        </Wrapper>

    )
}
