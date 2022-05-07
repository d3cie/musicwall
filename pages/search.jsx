import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as vars from '../vars'
import Head from 'next/head'

import MagnifyingGlass from '../components/primitives/Icons/MagnifyingGlass'
import { useRouter } from 'next/router'
import SecondaryBox from '../components/primitives/Inputs/SecondaryBox'
import SongSearch from '../components/compounds/Song/SongSearch'
import TopResult from '../components/compounds/TopResultSearch'
import TopResultDummy from '../components/compounds/TopResultSearch/TopResultSearchDummy'

import searchService from '../services/search'
import AlbumSearch from '../components/compounds/Album/AlbumSearch'
import ArtistSearch from '../components/compounds/Artist/ArtistSearch'
import UserSearch from '../components/compounds/User/UserSearch'
import SongSearchDummy from '../components/compounds/Song/SongSearchDummy'
import ArtistSearchDummy from '../components/compounds/Artist/ArtistSearchDummy'
import AlbumSearchDummy from '../components/compounds/Album/AlbumSearchDummy'
import UserSearchDummy from '../components/compounds/User/UserSearchDummy'
import SearchChosenList from '../components/layouts/SearchChosenList'
import SongSearchChosen from '../components/compounds/Song/SongSearchChosen'
import PlaySongSpotify from '../components/compounds/Song/PlaySongSpotify'
const Main = styled.main`
  width:100%;
  overflow-x: hidden;
  min-height:100vh;
  position:relative;
  /* align-items: center; */
background-color:${vars.GREY};
  padding-top:0;
  align-items:center;
  /* justify-content:center; */
  flex-direction: column;
  display: flex;
  `
const SearchContOutter = styled.div`
      background-color:${vars.DARK_GREY};
      width: 100%;
      display: flex;
      border-bottom:solid 1px ${vars.GREY};
      align-items:center;
      justify-content: center;
      height:fit-content;
      /* padding-bottom:20px; */
    `

const SearchCont = styled.div`
    max-width: ${vars.MAX_WIDTH};
  position:relative;


  padding:20px;
  width:100%;
  `
const OutterCont = styled.div`
  max-width: ${vars.MAX_WIDTH};
position:relative;
/* padding:20px; */
width:100%;
  display: flex;
  flex-direction:row;

  @media (max-width:1000px) {
    flex-direction:column;

  }
    `
const Cont = styled.div`
max-width: ${vars.MAX_WIDTH};
position:relative;
padding:20px;
width:100%;
margin-right:-20px;
  display: flex;
  flex-direction:column;

  /* @media (max-width:1000px) {
    flex-direction:column;

  } */
`

const ButtonCont = styled.div`
  display:flex;
  position:absolute;
  right:20px;
  opacity: .9;
  transition: opacity .2s;
  :hover{
    opacity: 1;
  }
`
const Header = styled.h1`
    color:${vars.MAIN_WHITE};
    margin:0;
    margin-inline:20px;
    font-weight: 400;
    font-size:1.8rem;
`

const SearchButton = styled.button`
padding: 5px;
height: 35px;
width:35px;
overflow: hidden;

border-radius: 4px;
padding:8px;
transition: all 0.2s;
border:none;
/* border-radius:4px; */
fill:${vars.MAIN_WHITE};

background-color:${vars.MAIN_BLUE};
margin:3px;
cursor: pointer;
transition: all 0.2s;

:hover{
    background-color:${vars.MAIN_WHITE};
    fill:${vars.MAIN_BLUE};
}

`
const Title = styled.div`
  color:${vars.MAIN_WHITE};
  margin-top:5px;
  font-size:25px;
  margin-bottom:15px;

  font-weight: 500;

  `
const AlbumsCont = styled.div`
  
  width: fit-content; 
  display: grid;
  width:fit-content;
  padding-right:10px;
  gap:0px;
  margin-left:-5px;
    margin-bottom:40px;

  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width:650px) {
    grid-template-columns: 1fr 1fr;

  }
  `
const ArtistsCont = styled.div`
 
  overflow-x: auto;
  padding:0;
  width: fit-content; 
  display: grid;
margin-top:-5px;
margin-bottom:40px;
margin-left:-5px;

  grid-template-columns: 1fr 1fr;


  @media (max-width:1000px) {
    grid-template-columns: 1fr 1fr 1fr;

  }
  @media (max-width:650px) {
    grid-template-columns: 1fr 1fr;

  }

  `
const RevealChosen = styled.button`
  color:${vars.MAIN_BLUE};
  margin-top:20px;
  background:#00000000;
  border:none;
  transition: all 0.2s;
  cursor:pointer;
  padding:5px;
  :hover{
    background-color:${vars.GREY};
  }
  `

const dummyRes = <TopResultDummy />
const dummyUsers = [<UserSearchDummy key={1} />, <UserSearchDummy key={2} />, <UserSearchDummy key={3} />, <UserSearchDummy key={4} />, <UserSearchDummy key={5} />]
const dummySongs = [<SongSearchDummy key={1} />, <SongSearchDummy key={2} />, <SongSearchDummy key={3} />, <SongSearchDummy key={4} />, <SongSearchDummy key={5} />]
const dummyArtists = [<ArtistSearchDummy key={1} />, <ArtistSearchDummy key={2} />, <ArtistSearchDummy key={3} />, <ArtistSearchDummy key={4} />, <ArtistSearchDummy key={5} />]
const dummyAlbums = [<AlbumSearchDummy key={1} />, <AlbumSearchDummy key={2} />, <AlbumSearchDummy key={3} />, <AlbumSearchDummy key={4} />, <AlbumSearchDummy key={5} />]

export default function Search() {
  const router = useRouter()

  const [showMain, setShowMain] = useState(false)
  const [topResultContent, setTopResultContent] = useState()
  const [usersContent, setUsersContent] = useState()
  const [songsContent, setSongsContent] = useState()
  const [artistsContent, setArtistsContent] = useState()
  const [albumsContent, setAlbumsContent] = useState()
  const [showChosen, setShowChosen] = useState(true)
  
  const [chosenSongsUpdate, setChosenSongsUpdate] = useState()

  const [showSpotifySongPlayer, setShowSpotifySongPlayer] = useState(false)
  const [songPlayerId, setSongPlayerId] = useState()

  //so,for some reason my code needs this state neh, and its not really clear, this file is
  //already large im not going to bother finding out why but eh

  // const [chosenSongs, setChosenSongs] = useState([])
  const [chosenSongsObj, setChosenSongsObj] = useState([])

  const addSong = (image, id)=>{
      var tempSongsArrayObj = chosenSongsObj

      tempSongsArrayObj.push({id, image})
      setChosenSongsObj(tempSongsArrayObj)

      setChosenSongsUpdate(JSON.stringify(tempSongsArrayObj))

  }
  const removeSong = (id)=>{

    const songsarr = chosenSongsObj;

    for (var i = songsarr.length - 1; i >= 0; --i) {
      if (songsarr[i].id == id) {
          songsarr.splice(i,1);
      }

      setChosenSongsObj(songsarr)
      setChosenSongsUpdate(JSON.stringify(songsarr))

  }

  }

  const SearchQuery = (e) => {
    e.preventDefault();
    setTopResultContent(dummyRes)
    setUsersContent(dummyUsers)
    setSongsContent(dummySongs)
    setArtistsContent(dummyArtists)
    setAlbumsContent(dummyAlbums)
    setShowMain(true)
    const query = document.getElementById('searchBox').value
    searchService(query).then((res) => {

      let songs = [];
      let albums = [];
      let artists = [];

      res.tracks.map((currentElement, index) => {
        let artists;
        let Feat = '';
        for (let i = 0; i < currentElement.artist.length; i++) {
          const MainArtist = currentElement.artist[0].artistsName;
          if (i != 0) Feat = ", " + currentElement.artist[i].artistsName + Feat

          if (currentElement.artist.length == 1) {
            artists = MainArtist
          }
          else {
            artists = MainArtist + Feat
          }
        }
        function isAlreadyChosen(){
        for (let j = 0; j < chosenSongsObj.length; j++) {
          if(chosenSongsObj[j]?.id == currentElement.spotifySongID){
            return true
          } 
        }}
        songs.push(
          <SongSearch
            SongPreview={currentElement.songPreview}
            key={index}
            onPlay = {()=>{ShowSongPlayer(currentElement.spotifySongID)}}
            isSongChosen = {()=>isAlreadyChosen()}
            addSong = {()=>addSong(currentElement.albumArt, currentElement.spotifySongID)}
            removeSong = {()=>removeSong(currentElement.spotifySongID)}
            SongName={currentElement.songName}
            AlbumCover={currentElement.albumArt}
            AlbumName={currentElement.albumName}
            SongArtist={artists}

          />
        )
      })

      res.albums.map((currentElement, index) => {
        let artists;
        let Feat = '';
        for (let i = 0; i < currentElement.artist.length; i++) {
          const MainArtist = currentElement.artist[0].artistsName;
          if (i != 0) Feat = ", " + currentElement.artist[i].artistsName + Feat

          if (currentElement.artist.length == 1) {
            artists = MainArtist
          }
          else {
            artists = MainArtist + Feat
          }
        }
        albums.push(
          <AlbumSearch
            key={index}
            AlbumName={currentElement.albumName}
            AlbumCover={currentElement.albumArt}
            Artist={artists}
          />
        )
      })

      res.artists.map((currentElement, index) => {
       
        artists.push(
          <ArtistSearch
            key={index}
            ArtistImage = {currentElement.artistImage}
            Artist={currentElement.artistName}
            AlbumCover={currentElement.albumArt}
            
          />
        )
      })
      setArtistsContent(artists)
      setSongsContent(songs)
      setAlbumsContent(albums)
    })
  }


  function ShowSongPlayer(id){
    setSongPlayerId(id)
    setShowSpotifySongPlayer(true)
  }
  return (
    <Main>

       <Head>
        <title>Musicwall | Search</title>
        <meta name="description" content="Search musicwall for your favourite music and artists" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="color-scheme" content="light dark"></meta>
        <meta name="theme-color" content= {vars.DARK_GREY} />
      </Head>
      <SearchContOutter>
        {
            (showSpotifySongPlayer)?<PlaySongSpotify closePlayer = {()=>setShowSpotifySongPlayer(false)} id = {songPlayerId} />:''
        }

        <SearchCont>
          <form onSubmit={(e)=>{SearchQuery(e);return false}}
            style={{ display: 'flex', background: vars.DARK_GREY, width: '100%' }}>
            <SecondaryBox id='searchBox' placeholder={'Search...'} />
            <ButtonCont>
              <SearchButton style ={{backgroundColor:'#00000000'}} type="submit">< MagnifyingGlass style ={{fill: vars.MAIN_WHITE}}/>
              </SearchButton>

            </ButtonCont>
          </form>

          {(!(chosenSongsObj.length < 1))? 
          <>
      {(!(chosenSongsObj.length < 1))? 

        <SearchChosenList >
          {/* {chosenSongsObj.map((currentElement, index)=><img key ={index} src ={currentElement.image}/>)} */}
        {chosenSongsObj.map((current, index)=><SongSearchChosen key ={index} AlbumCover ={current.image}/>)    }
        </SearchChosenList>
      :''}
       </>
      :<h1 style={{ color: vars.MAIN_WHITE }}>Search and add a song, artist or album to add to your wall.</h1> }

        </SearchCont>
      </SearchContOutter>
     

      {(showMain) ?
        <OutterCont>
          <Cont>
            <div>
              <Title style = {{marginTop:'11px'}} >Songs</Title>
              <div style = {{marginBottom:'60px'}}>
                {songsContent}
              </div>
            </div>
            <div>

              <div >
                <Title >Albums</Title>
                <AlbumsCont >
                  {albumsContent}
                </AlbumsCont>
              </div>
            </div>
          </Cont>

          <Cont>
            <div>
              <div style={{ margin: '10px', width: '100%' }} >

                <Title>Artists</Title>
                <ArtistsCont >
                  {artistsContent}
                </ArtistsCont>
              </div>
            </div>

          </Cont>

        </OutterCont>
        : ''}
    </Main>
  )
}
