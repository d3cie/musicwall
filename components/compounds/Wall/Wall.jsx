import React, { useState, useEffect } from 'react'
import timeStampToHumanTime from '../../../services/timestamptotime'
import Like from '../Like'
import styled from 'styled-components'
import AlbumMobile from '../../compounds/Album/AlbumMobile'
import ArtistMobile from '../../compounds/Artist/ArtistMobile'
import SongMobile from '../../compounds/Song/SongMobile'
import SongSearchChosen from '../../compounds/Song/SongSearchChosen'

import Bin from '../../primitives/Icons/Bin'
import ShareIcon from '../../primitives/Icons/Share'
import * as vars from '../../../vars'
import artistsToString from '../../../utils/artistsToString'
import RightArrow from '../../primitives/Icons/RightArrow'
import ChevronDown from '../../primitives/Icons/Chevrondown'
import ChevronUp from '../../primitives/Icons/ChevronUp'
import SongCondensedView from '../Song/SongCondensedView'
import ArtistCondensedView from '../Artist/ArtistCondensedView'

const Point = styled.div`
position:absolute;
width:20px;
z-index:2;
background-color:${vars.ORANGE};
&.latest{
  background-color:${vars.MAIN_BLUE};
}
left:-29px;
border-radius: 50%;
border: solid 4px ${vars.MAIN_WHITE} ;
top:12px;
height:20px;
`

const TimeStamp = styled.h1`
  color:white;
  max-width:${vars.MAX_WIDTH};
  width:100%; 
  margin-top:0;
  font-weight: 500;
  text-align: left;
  text-justify: left;

    transition: all 0.2s;

    & #condense{
        transition: all 0.2s;

        display:inline;
    fill:${vars.MAIN_WHITE};
    cursor:pointer;
    :hover{
      color:${vars.ORANGE};
            fill:${vars.ORANGE};

    }

  & span{
    margin-right: 10px;
      :hover{
      opacity: 1;
    }
      & svg{
        transform:translateY(3px);

        height:25px;

      }}
  }
`

const TimeLine = styled.div`
min-height:100px;
position:absolute;
left:-20px;
height:140%;
margin-top:20px;
width:2px;
z-index:1;
background:${vars.MAIN_WHITE};
`

const TimeStampCont = styled.div`
  width:100%;
  position:relative;
  display: flex;
  flex-direction:column;
  margin-bottom:10px;
  align-items:center;
  justify-content:center;
  height:60px;
`

const GridContInner = styled.div`
  width:fit-content;
  /* width:100%; */
  min-width:380px;
  @media (max-width:650px) {
    margin-left: 30px;
    width:fit-content;

  }
  /* @media (min-width:650px) {
    margin-left: 100px;

  } */
  @media (min-width:${vars.MAX_WIDTH}) {
    width:100%;
        margin-left: 0px;

  max-width:${vars.MAX_WIDTH};
  }
  position:relative;
`

const GridContOutter = styled.section`
  display:flex;
  scroll-margin-top: 10px;
  width:100%;
  max-width:${vars.MAX_WIDTH};
    /* width:fit-content; */
/* filter:brightness(105%); */
background:${vars.LIGHT_GREY};

transition: all 0.2s;
opacity:1;
@keyframes flash {
  0%{
    opacity: .1;

  }
  50%{
    opacity: .7;
  }
  100%{
   opacity: .1;
  }
}
  flex-direction: row;
  padding:50px;
  padding-bottom:0px;
  position:relative;
  margin-bottom:-40px;
  height: fit-content;
  padding-inline:20px;
  @media (max-width: 450px) {
    padding-inline:10px;
  } 
  align-items:center;
  justify-content:center;
  `
const GridCont = styled.div`
grid-gap: 10px 10px;
margin-top:5px;
min-width: 350px;
width:fit-content;
max-width:${vars.MAX_WIDTH};

padding-bottom:50px;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
@media (max-width: 1000px) {
  grid-template-columns: 1fr 1fr;

}
@media (max-width: 700px) {
  grid-template-columns: 1fr;

}
`

const GridContAlbum = styled.div`
max-width:${vars.MAX_WIDTH};
grid-gap: 10px 10px;
margin-top:5px;
width:fit-content;
min-width: 350px;
padding-bottom:40px;
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
@media (max-width: 1000px) {
grid-template-columns: 1fr 1fr 1fr 1fr;

}
@media (max-width: 700px) {
grid-template-columns: 1fr 1fr;

}
`

const WallActionsCont = styled.div`
  display:inline;
  height:30px;
  margin-left:20px;
  padding:5px;
  padding-top:3px;
  & button{
    transform:translateY(6px);
    background: none;
    border:none;
    opacity:.9;
    fill:${vars.MAIN_WHITE};
    /* padding:2; */
    padding: 0;
    transition: all 0.2s;
    :hover{
      opacity: 1;
      fill:${vars.ORANGE};

    }
 
  }
  & #share{
      height:27px;
      margin-left:10px;
      padding:0;
    }
  & #hearts{
        height:27px;
              padding:0;


    :hover{
      fill:${vars.MAIN_RED};
    }
  }
  `

const CondensedViewCont = styled.div`
     position: relative;
  margin-left:10px;
  z-index:3;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

    display:grid;
    padding:2px;
    border-radius: 2px;
    border:1px solid ${vars.LIGHER_GREY};
    background: ${vars.GREY};
    & #numberOfItems{
        background-color: ${vars.LIGHT_GREY};
        width:40px;
        margin:2px;
                border-radius:2px;

        height:40px;
        line-height:40px;
        text-align:center;
        text-justify: center;
        color:${vars.MAIN_WHITE};
        font-weight: 500;
         }

    `
const Title = styled.div`
color:white;
width:100%; 
margin-top:-10px;
font-weight: 500;
opacity: .8;
text-align: left;
display: flex;
text-justify: left;

position: relative;
`

const condensedContStyle = {
  // backgroundColor: vars.GREY,
  // border: `1px solid ${vars.LIGHER_GREY}`,
  width: 'fit-content',
  marginTop: -20,
  padding: '5px',
  // borderRadius: '4px',
}
export default function Wall(props) {

  const [condenseView, setCondenseView] = useState(props.scrollto ? true : false)
  useEffect(() => {
    if (props?.scrollto)
      if (props.wall.since == props?.scrollto) {
        setCondenseView(false)
        const wall = document.getElementById(props?.scrollto)
        wall.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
        // wall.style.animation = 'flash 1s linear 1'

      }
  }, [])

  if (!props.wall.songs.length && !props.wall.albums.length && !props.wall.artists.length) {
    return
  }

  return (
    <GridContOutter id={props.wall.since} key={props.i}>
      <GridContInner>
        <TimeLine />
        <div>
          <TimeStampCont>

            <TimeStamp><Point className={(props.i == 0) ? 'latest' : ''} />


              {/* <button id='condense' onClick={() => setCondenseView(view => !view)}> */}
              <div onClick={() => { setCondenseView(view => !view) }} id="condense">


                <span>
                  {(condenseView) ? <ChevronDown />
                    : <ChevronUp />}
                </span>

                Added {timeStampToHumanTime(Date.now() - Date.parse(props.wall.since))} ago.
              </div>
              {/* </button> */}

              <WallActionsCont>
                {(props.loggedinname != null) && <Like loggedinname={props.loggedinname} likes={props.wall.likes} wallid={props.wall._id} username={props.wallOwner} />
                }                {/* <button id="share">
                  <ShareIcon />

                </button> */}


              </WallActionsCont>
            </TimeStamp>
          </TimeStampCont>

          <div hidden={condenseView}>
            <div hidden={!props.wall?.songs.length}>
              <Title>SONGS ADDED</Title>

              <GridCont>
                {props.wall?.songs.map((song, j) => (


                  <SongMobile
                    key={j}
                    spotifyID={song.spotifySongID}
                    spotifySongHandler={(id) => props.spotifySongHandler(id)}
                    SongName={song.songName}
                    AlbumName={song.albumName}
                    SongArtist={artistsToString(song.artist)}
                    AlbumCover={song.albumArt}
                  />
                ))}



              </GridCont>
            </div>

            <div hidden={!props.wall?.albums.length}>
              <Title>ALBUMS ADDED</Title>
              <GridContAlbum>
                {props.wall?.albums.map((album, j) => (


                  <AlbumMobile
                    key={j}

                    AlbumName={album.albumName}
                    Artist={artistsToString(album.artist)}
                    AlbumCover={album.albumArt}
                  />
                ))}
              </GridContAlbum>

            </div>

            <div hidden={!props.wall?.artists.length}>
              <Title>ARTISTS ADDED</Title>
              {/* <AlbumMobile/> */}
              <GridContAlbum>
                {props.wall?.artists.map((artist, j) => (


                  <ArtistMobile
                    key={j}

                    Artist={artist.artistName}
                    ArtistImage={artist.artistImage}
                  />
                ))}
              </GridContAlbum>

            </div>
          </div>

          <div style={condensedContStyle} hidden={!condenseView}>
            <div style={{ display: 'flex', width: 'fit-content', marginLeft: 20 }} >
              <div hidden={!props.wall?.songs.length}>
                <CondensedViewCont>
                  {props.wall?.songs.map((song, j) => (
                    (j < 3) ? <SongCondensedView
                      key={j}
                      // style={{ transform: `scale(${(j == props?.wall.songs.length - 1) ? 1 : .9})` }}
                      SongName={song.songName}
                      AlbumCover={song.albumArt}
                    /> : null
                  ))}
                  <div id="numberOfItems" >+{((props.wall?.songs.length - 3) < 0) ? 0 : props.wall?.songs.length - 3}</div>

                </CondensedViewCont>
              </div>

              <div hidden={!props.wall?.albums.length}>
                <CondensedViewCont>
                  {props.wall?.albums.map((artist, j) => (

                    (j < 3) ? <SongCondensedView
                      key={j}
                      // style={{ transform: `scale(${(j == props?.wall.artists.length - 1) ? 1 : .9})` }}
                      SongName={artist.albumName}
                      AlbumCover={artist.albumArt}
                    /> : null
                  ))}
                  <div id="numberOfItems" >+{(props.wall?.albums.length - 3 < 0) ? 0 : props.wall?.albums.length - 3}</div>

                </CondensedViewCont>
              </div>

              <div hidden={!props.wall?.artists.length}>
                <CondensedViewCont>
                  {props.wall?.artists.map((artist, j) => (
                    (j < 3) ? <ArtistCondensedView
                      key={j}
                      // style={{ transform: `scale(${(j == props?.wall.artists.length - 1) ? 1 : .9})` }}

                      SongName={artist.artistName}
                      AlbumCover={artist.artistImage}
                    /> : null
                  ))}
                  <div id="numberOfItems">+{(props.wall?.artists.length - 3 < 0) ? 0 : props.wall?.artists.length}</div>
                </CondensedViewCont>
              </div>
            </div>
          </div>
        </div>
      </GridContInner>
    </GridContOutter>
  )
}
