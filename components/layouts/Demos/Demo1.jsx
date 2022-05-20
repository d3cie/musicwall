import React from 'react';
import styled from 'styled-components'
import * as vars from '../../../vars'
import Album from '../../compounds/Album/AlbumMobile';
import Artist from '../../compounds/Artist/ArtistMobile';
import Song from '../../compounds/Song/SongMobile';

const Wrapper = styled.div`
    width:100%;
        padding-right:40px;
    @media (max-width:1250px) {
      padding-right:20px;

        }
          @media (max-width: 850px) {
            padding-right:0px;

  }
    `


const Point = styled.div`
      /* position:absolute; */
      width:20px;
      background-color:${vars.ORANGE};
      /* left:-29px; */
      border-radius: 50%;
      border: solid 4px ${vars.MAIN_WHITE} ;
      /* top:10px; */
      margin-top:5px;
      margin-right:10px;
      height:20px;
      `

const TimeStamp = styled.div`
        color:white;
        width:100%; 
        margin-top:0;
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
    top:20px;
      height:1030%;
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
        height:60px;
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

const ItemCont = styled.div`
        /* margin:15px; */
        margin:10px;
    `
const ItemsCont = styled.div`
    margin-left:30px;
    margin-bottom:40px;

    & #hiddenAtMobile{
        @media (max-width:1250px) {
            display:none;
        }
    }
    margin-top:-10px;
    `

const Demo1 = () => {
    return (
        <Wrapper>
            <DisplayBox>
                <TimeStampCont>
                    <TimeLine />
                    <TimeStamp><Point />Added These on - 03.12.12</TimeStamp>
                </TimeStampCont>
                <ItemsCont>
                    <Title>ADDED SONGS</Title>
                    <ItemCont>
                        <Song
                            SongName="Ultralight Beam"
                            AlbumName="The Life Of Pablo"
                            SongArtist="Kanye West"
                            AlbumCover='https://i.scdn.co/image/ab67616d00001e022a7db835b912dc5014bd37f4'
                        />
                    </ItemCont>

                    <ItemCont>
                        <Song
                            SongName="RUNNING OUT OF TIME"
                            AlbumName="IGOR"
                            SongArtist="Tyler, The Creator"
                            AlbumCover='https://i.scdn.co/image/ab67616d00001e027005885df706891a3c182a57'
                        />
                    </ItemCont>
                </ItemsCont>

                <ItemsCont>
                    <Title>ADDED ALBUMS</Title>
                    <div style={{ display: 'flex', marginLeft: 5, marginTop: 5, width: '100%' }}>


                        <ItemCont style={{ margin: '5px' }}>
                            <Album
                                AlbumName="2 Alivë"
                                Artist='Yeat'
                                AlbumCover='https://i.scdn.co/image/ab67616d0000b27372b69f1f356613717909d6db'
                            />


                        </ItemCont>

                        <ItemCont style={{ margin: '5px' }}>
                            <Album
                                Artist='Wet Lag'
                                AlbumName='Wet Lag'
                                AlbumCover='https://i.scdn.co/image/ab67616d00001e02ea1126a33b0fb88e79915262'
                            />
                        </ItemCont>

                        <ItemCont id='hiddenAtMobile' style={{ margin: '5px' }}>
                            <Album
                                Artist='Olivia Rodrigo'
                                AlbumName='SOUR'
                                AlbumCover='https://i.scdn.co/image/ab67616d00001e02a91c10fe9472d9bd89802e5a'
                            />
                        </ItemCont>
                    </div>
                </ItemsCont>

            </DisplayBox>
        </Wrapper>
    );
}

export default Demo1;
