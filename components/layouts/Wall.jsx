
import styled from 'styled-components'
import AlbumMobile from '../compounds/Album/AlbumMobile'
import ArtistMobile from '../compounds/Artist/ArtistMobile'
import SongMobile from '../compounds/Song/SongMobile'
import * as vars from '../../vars'

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
max-width:${vars.MAX_WIDTH};
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
    return <GridContOutter>
      <GridContInner>
        <TimeLine />

        
        <div>
          <TimeStampCont>
            <TimeStamp><Point />Added These on - 03.12.12</TimeStamp>
          </TimeStampCont>
          <div>
          <Title>SONGS ADDED</Title>

          <GridCont>
            <SongMobile

              SongName='Money Longer'
              AlbumName='LUV. vs the World'
              SongArtist='Lil Uzi Vert'
              SongPreview='https://p.scdn.co/mp3-preview/42f7a2733d854fd5bbddb3d62e7df6a78cfac313?cid=774b29d4f13844c495f206cafdad9c86'
              AlbumCover='https://images.unsplash.com/photo-1498598457418-36ef20772bb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
            />
           

          </GridCont>
          </div>
          
          <div>
          <Title>ALBUMS ADDED</Title>
            {/* <AlbumMobile/> */}
            <GridContAlbum>
                {/* {props.albums.map((album, index)=>{return <AlbumMobile key = {index}/>} )} */}
            </GridContAlbum>
   
          </div>

          <div>
          <Title>ARTISTS ADDED</Title>
            {/* <AlbumMobile/> */}
            <GridContAlbum>
            <ArtistMobile/>

            </GridContAlbum>
   
          </div>

        </div>
      </GridContInner>
    </GridContOutter>
  }
