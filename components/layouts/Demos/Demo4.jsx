import React from 'react';
import styled from 'styled-components'
import * as vars from '../../../vars'
import Album from '../../compounds/Album/AlbumMobile';
import Artist from '../../compounds/Artist/ArtistMobile';
import Song from '../../compounds/Song/SongMobile';

const Wrapper = styled.div`
    width:100%;
    overflow:hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    padding-left:40px;
        padding-right:40px;
    @media (max-width:1250px) {
      padding-right:20px;

        }
          @media (max-width: 850px) {
            padding-right:0px;
            margin-left: -20px;

  }
    `


const Point = styled.div`
      /* position:absolute; */
      width:20px;
      background-color:${vars.MAIN_BLUE};
      /* left:-29px; */
      border-radius: 50%;
      border: solid 4px ${vars.MAIN_WHITE} ;
      /* top:10px; */
      margin-top:5px;
      z-index:10;
      margin-right:10px;
      height:20px;
      `

const TimeStamp = styled.div`
        color:white;
        width:100%; 
        margin-top:0;
        margin:10px;
        margin-inline:0px;
        font-weight: 500;
        text-align: left;
        display: flex;
        text-justify: left;
        `
const Title = styled.div`
            color:white;
            width:100%; 
            margin-top:0;
            font-weight: 500;
            opacity: .8;

            text-align: left;
            display: flex;
            text-justify: left;
            `


const TimeLine = styled.div`
      min-height:100px;
      position:absolute;
      left:8px;
    top:0px;
      height:100%;
      margin-top:20px;
      width:4px;
      background:${vars.MAIN_WHITE};
    `

const TimeStampCont = styled.div`
        width:100%;
        position:relative;
        

        font-size:1.2rem;
        display: flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        height:fit-content;
        `
const DisplayBox = styled.div`
    width:400px;
    position: relative;
    padding:20px;
    padding-left:40px;
    height:fit-content;
    border-radius:4px;
    background-color: ${vars.LIGHT_GREY};
    `



const Demo4 = () => {
    return (
        <Wrapper>
            <DisplayBox>
                <TimeStampCont>
                    <TimeLine />
                    <TimeStamp><Point style={{ backgroundColor: vars.ORANGE }} />Added 2 minutes ago.</TimeStamp>

                    <TimeStamp><Point />Added 1 week ago.</TimeStamp>
                    <TimeStamp><Point />Added 3 months ago.</TimeStamp>
                    <TimeStamp><Point />Added 4 months ago.</TimeStamp>

                </TimeStampCont>

            </DisplayBox>

        </Wrapper>
    );
}

export default Demo4;
