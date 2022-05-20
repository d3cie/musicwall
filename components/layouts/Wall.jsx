
import styled from 'styled-components'
import AlbumMobile from '../compounds/Album/AlbumMobile'
import ArtistMobile from '../compounds/Artist/ArtistMobile'
import SongMobile from '../compounds/Song/SongMobile'
import * as vars from '../../vars'
import getwalls from '../../services/getwalls'
import { useState, useEffect } from 'react'
import WallIcon from '../primitives/Icons/Wall'
import Ellipsis from '../primitives/Animations/Elipsis'
import Plus from '../primitives/Icons/Plus'
const Point = styled.div`
position:absolute;
width:20px;
background-color:${vars.GREY};
left:-29px;
border-radius: 50%;
border: solid 6px ${vars.MAIN_WHITE} ;
top:10px;
height:20px;
`
const NoWallsCont = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
  color: ${vars.MAIN_WHITE};
  font-weight: 400;
  font-size: 1.5rem;

  & a{
    color: ${vars.MAIN_BLUE};
    font-size: 1.1rem;
    margin-top:10px;

  }
& label{
    margin-left:10px;
    text-align:center;
margin-top:10px;
/* opacity: .9; */

    margin-left:0px;

}
& svg{
   border-right:solid 2px ${vars.LIGHER_GREY};
   padding-right:20px;
   margin:10px;
   height:150px;
   fill:${vars.GREY};
   stroke:${vars.LIGHER_GREY};

   border-right:none;
   padding-right:0;
 }
  @media (max-width: 700px) {
    & label{
    margin-left:0px;
}
& svg{
   border-right:none;
   padding-right:0;
  
 }
    flex-direction:column;
        font-size: 1.5rem;

}
flex-direction:column;
        font-size: 1.5rem;
  `


const GettingStarted = styled.div`
max-width: ${vars.MAX_WIDTH};
padding:20px;
margin-top:20px;
width: 100%;
& #objcont{
  padding:20px;
  display: flex;
  overflow:auto;
}
& label{
  padding-left:10px;
  color: ${vars.MAIN_WHITE};
font-weight: 600;
& span{
  color:${vars.ORANGE};
}
}
& ul{
    color: ${vars.MAIN_WHITE};
    font-size: 1.2rem;
    padding-right:20px;
    opacity:.9;
    
    li{
      margin-top:10px;
      line-height:2rem;
    }
}
  & div{

    color: ${vars.MAIN_WHITE};
    font-size: 1.5rem;
    font-weight: 500;
  }`



const TimeStamp = styled.h1`
  color:white;
  max-width:${vars.MAX_WIDTH};
  width:100%; 
  margin-top:0;
  font-weight: 500;
  text-align: left;
  text-justify: left;
  `

const TimeLine = styled.div`
min-height:100px;
position:absolute;
left:-20px;
height:120%;
margin-top:20px;
width:2px;
background:${vars.MAIN_WHITE};
`

const TimeStampCont = styled.div`
  width:100%;
  position:relative;
  display: flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  height:60px;
  `
const GridContInner = styled.div`
  width:fit-content;
  width:100%;
  max-width:${vars.MAX_WIDTH};

  position:relative;
  `

const GridContOutter = styled.section`
  display:flex;
  width:100%;
  flex-direction: row;
  padding:40px;
  position:relative;
  height: fit-content;
  padding-inline:20px;
  @media (max-width: 450px) {
    padding-inline:10px;

  } 
  align-items:center;
  justify-content:center;
  `
const GridCont = styled.div`
/* min-height:60vh; */
/* width:100%; */
/* padding:40px; */
/* width:100%; */
gap: 10px 10px;
margin-top:5px;
padding-bottom:60px;
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
/* min-height:60vh; */
/* width:100%; */
/* padding:40px; */
max-width:${vars.MAX_WIDTH};
gap: 10px 10px;
margin-top:5px;
padding-bottom:60px;
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
@media (max-width: 1000px) {
grid-template-columns: 1fr 1fr 1fr 1fr;

}
@media (max-width: 700px) {
grid-template-columns: 1fr 1fr;

}
`
const Title = styled.div`
color:white;
width:100%; 
margin-top:-10px;
/* margin-left:20px; */

font-weight: 500;
opacity: .8;

text-align: left;
display: flex;
text-justify: left;
position: relative;


`
export default function Wall(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [loggedIn, setIsLoggedIn] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    setIsLoggedIn(props.isloggedinaccount)
    getwalls(props.walls.reverse()).then((res) => {
      setData(res)
      console.log(res)
    })
  }, [props.isloggedinaccount])
  // useEffect(()=>{
  //   getwalls(props.walls).then(

  //   )
  // })
  if (!data) return <div

    style={{
      // position: 'absolute',
      // bottom: 0,
      // left: 0,
      // zIndex: 10,
      display: 'flex',
      flexDirection: 'column-reverse',
      color: vars.MAIN_WHITE,
      // fontWeight: '200',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s'
    }}

  ><Ellipsis color={vars.MAIN_WHITE} /></div>

  const NoWalls = () => {
    return <>
      <NoWallsCont>

        <WallIcon />
        <label>
          No walls added <br />yet.

        </label>
        {/* <a>Goto homepage</a> */}
      </NoWallsCont>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        {(loggedIn) ?
          <GettingStarted>
            <div>
              Getting Started:

            </div>
            <ul style={{ marginBottom: '80px' }}>
              <li>Press the <Plus style={{ background: vars.MAIN_WHITE, padding: 2, borderRadius: '50%', fill: vars.GREY }} width='1.2rem' height='1.2rem' /> button to open up the search page.</li>
              <li>Choose at least 3 songs, an album and an artist to add to a wall and save it.</li>
              <li>Already saved walls are archived on your page as a part of your page history.</li>
              <li>You can add another wall to your wall by clicking the add button after 24 hours of your last wall.</li>
            </ul>


            {/* <div id='objcont'>
          <AddBio />
          <AddPicture />
          <AddWall />
        </div> */}
          </GettingStarted>
          : ''}
      </div>
    </>
  }
  if (props.walls == null) {
    return <NoWalls />
  }

  function displayArtists(artist) {
    let artists;
    let Feat = '';
    for (let i = 0; i < artist.length; i++) {
      const MainArtist = artist[0].artistsName;
      if (i != 0) Feat = ", " + artist[i].artistsName + Feat

      if (artist.length == 1) {
        artists = MainArtist
      }
      else {
        artists = MainArtist + Feat
      }
    }
    return artists
  }

  return <>{data.map((wall, i) => (
    <GridContOutter key={i}>
      <GridContInner>
        <TimeLine />


        <div>
          <TimeStampCont>
            <TimeStamp><Point />Added These on - {wall.since.substring(10, 0)}</TimeStamp>
          </TimeStampCont>
          <div hidden = {!wall?.songs.length}>
            <Title>SONGS ADDED</Title>

            <GridCont>
              {wall?.songs.map((song) => (


                <SongMobile

                  SongName={song.songName}
                  AlbumName={song.albumName}
                  SongArtist={displayArtists(song.artist)}
                  AlbumCover={song.albumArt}
                />
              ))}



            </GridCont>
          </div>

          <div hidden = {!wall?.albums.length}>
            <Title>ALBUMS ADDED</Title>
            <GridContAlbum>
              {wall?.albums.map((album) => (


                <AlbumMobile

                  AlbumName={album.albumName}
                  Artist={displayArtists(album.artist)}
                  AlbumCover={album.albumArt}
                />
              ))}
            </GridContAlbum>

          </div>

          <div hidden = {!wall?.artists.length}>
            <Title>ARTISTS ADDED</Title>
            {/* <AlbumMobile/> */}
            <GridContAlbum>
              {wall?.artists.map((artist) => (


                <ArtistMobile

                  Artist={artist.artistName}
                  ArtistImage={artist.artistImage}
                />
              ))}
            </GridContAlbum>

          </div>

        </div>
      </GridContInner>
    </GridContOutter>
  ))}</>
}
