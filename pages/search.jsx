import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as vars from '../vars'
import Head from 'next/head'
import MagnifyingGlass from '../components/primitives/Icons/MagnifyingGlass'
import { useRouter } from 'next/router'
import SecondaryBox from '../components/primitives/Inputs/SecondaryBox'
import SongSearch from '../components/compounds/Song/SongSearch'
import searchService from '../services/search'
import AlbumSearch from '../components/compounds/Album/AlbumSearch'
import ArtistSearch from '../components/compounds/Artist/ArtistSearch'
import SongSearchDummy from '../components/compounds/Song/SongSearchDummy'
import ArtistSearchDummy from '../components/compounds/Artist/ArtistSearchDummy'
import AlbumSearchDummy from '../components/compounds/Album/AlbumSearchDummy'
import artistsToString from '../utils/artistsToString'
import addwallservice from '../services/addwall'
import PlaySongSpotify from '../components/compounds/Song/PlaySongSpotify'
import SearchChosenListLayout from '../components/layouts/SearchChosenListLayout'
import SearchMainPage from '../components/layouts/SearchMainPage'

const OutterCont = styled.div`
  max-width: ${vars.MAX_WIDTH};
position:relative;
/* padding:20px; */
width:100%;
  display: flex;
  flex-direction:column;

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
  flex-direction:row;

  @media (max-width:1000px) {
    flex-direction:column;

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
  align-items: center;
  /* padding-right:10px; */
  gap:0px;
  margin-top:-5px;

    /* margin-bottom:40px; */

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

  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;


  @media (max-width:1000px) {
    grid-template-columns: 1fr 1fr 1fr;

  }
  @media (max-width:650px) {
    grid-template-columns: 1fr 1fr;

  }

  `

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
       border-bottom:solid 1px ${vars.LIGHT_GREY};
      align-items:center;
      justify-content: center;
      height:fit-content;
      /* padding-bottom:20px; */
    `

const SearchCont = styled.div`
    max-width: ${vars.MAX_WIDTH};
  position:relative;
 ;

  padding:20px;
  width:100%;
  `

const ButtonCont = styled.div`
  display:flex;
  position:absolute;
  right:10px;
  opacity: .9;
  transition: opacity .2s;
  :hover{
    opacity: 1;
  }
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


const dummySongs = [<SongSearchDummy key={1} />, <SongSearchDummy key={2} />, <SongSearchDummy key={3} />, <SongSearchDummy key={4} />, <SongSearchDummy key={5} />]
const dummyArtists = [<ArtistSearchDummy key={1} />, <ArtistSearchDummy key={2} />, <ArtistSearchDummy key={3} />, <ArtistSearchDummy key={4} />, <ArtistSearchDummy key={5} />]
const dummyAlbums = [<AlbumSearchDummy key={1} />, <AlbumSearchDummy key={2} />, <AlbumSearchDummy key={3} />, <AlbumSearchDummy key={4} />, <AlbumSearchDummy key={5} />]

export default function Search() {
  const router = useRouter()

  const [showMain, setShowMain] = useState(false)
  const [songsContent, setSongsContent] = useState()
  const [artistsContent, setArtistsContent] = useState()
  const [albumsContent, setAlbumsContent] = useState()
  const [showSpotifySongPlayer, setShowSpotifySongPlayer] = useState(false)
  const [songPlayerId, setSongPlayerId] = useState()
  const [errorMsg, setErrorMsg] = useState(null)
  const [isWorking, setIsWorking] = useState(false)

  const [chosenSongsObj, setChosenSongsObj] = useState([])
  const [chosenAlbumsObj, setChosenAlbumsObj] = useState([])
  const [chosenArtistsObj, setChosenArtistsObj] = useState([])

  const addSong = (image, id) => {
    setChosenSongsObj(prevArray => [...prevArray, { id, image }])
  }

  const addAlbum = (image, id) => {
    setChosenAlbumsObj(prevArray => [...prevArray, { id, image }])
  }

  const addArtist = (image, id) => {
    setChosenArtistsObj(prevArray => [...prevArray, { id, image }])

  }
  const removeSong = (id) => {
    setChosenSongsObj(songs => songs.filter(song => song.id !== id))
  }

  const removeAlbum = (id) => {
    setChosenAlbumsObj(albums => albums.filter(album => album.id !== id))
  }
  const removeArtist = (id) => {

    setChosenArtistsObj(artists => artists.filter(artist => artist.id !== id))

  }
  const SearchQuery = (e) => {
    e.preventDefault();
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
        const artists = artistsToString(currentElement.artist)
        function isAlreadyChosen() {
          for (let j = 0; j < chosenSongsObj.length; j++) {
            if (chosenSongsObj[j]?.id == currentElement.spotifySongID) {
              return true
            }
          }
        }
        songs.push(
          <SongSearch
            key={index}
            onPlay={() => { ShowSongPlayer(currentElement.spotifySongID) }}
            isSongChosen={() => isAlreadyChosen()}
            addSong={() => addSong(currentElement.albumArt, currentElement.spotifySongID)}
            removeSong={() => removeSong(currentElement.spotifySongID)}
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

        artistsToString(currentElement.artist)

        function isAlreadyChosen() {
          for (let j = 0; j < chosenAlbumsObj.length; j++) {
            if (chosenAlbumsObj[j]?.id == currentElement.spotifySongID) {
              return true
            }
          }
        }
        albums.push(
          <AlbumSearch
            addAlbum={() => addAlbum(currentElement.albumArt, currentElement.spotifyAlbumID)}
            removeAlbum={() => removeAlbum(currentElement.spotifyAlbumID)}
            key={index}
            isAlbumChosen={() => isAlreadyChosen()}
            AlbumName={currentElement.albumName}
            AlbumCover={currentElement.albumArt}
            Artist={artists}
          />
        )
      })

      res.artists.map((currentElement, index) => {
        function isAlreadyChosen() {
          for (let j = 0; j < chosenArtistsObj.length; j++) {
            if (chosenArtistsObj[j]?.id == currentElement.spotifyArtistID) {
              return true
            }
          }
        }

        artists.push(
          <ArtistSearch
            key={index}
            isArtistChosen={() => isAlreadyChosen()}

            addArtist={() => addArtist(currentElement.artistImage, currentElement.spotifyArtistId)}
            removeArtist={() => removeArtist(currentElement.spotifyArtistId)}


            ArtistImage={currentElement.artistImage}
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
  async function save() {
    setErrorMsg()
    setIsWorking(true)
    const response = await addwallservice(chosenSongsObj.map(({ id }) => { return id }), chosenAlbumsObj.map(({ id }) => { return id }), chosenArtistsObj.map(({ id }) => { return id }))

    if (!response.error) {
      const result = await response.json()

      if (result.status == 'error') {
        setErrorMsg(result.error)
        setIsWorking(false)
        return
      }

      if (result.status == 'success') {
        setIsWorking(false)
        if (next) {
          // window.location.href = `u/${username}`
          alert('added')
        }
      }
    } else {
      setIsWorking(false)
      setErrorMsg(response.error)
    }
    return

  }

  function ShowSongPlayer(id) {
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
        <meta name="theme-color" content={vars.DARK_GREY} />
      </Head>
      <SearchContOutter>
        {
          (showSpotifySongPlayer) ? <PlaySongSpotify closePlayer={() => setShowSpotifySongPlayer(false)} id={songPlayerId} /> : ''
        }

        <SearchCont >
          <div style={{ position: 'fixed', zIndex: 60, padding: '20px', top: 58, borderBottom: `solid 1px ${vars.LIGHT_GREY}`, background: vars.DARK_GREY, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            {/* <div style = {{ width:'100%',maxWidth:vars.MAX_WIDTH}}> */}
            <form onSubmit={(e) => { SearchQuery(e); return false }}

              style={{ display: 'flex', position: 'relative', maxWidth: vars.MAX_WIDTH, background: vars.DARK_GREY, width: '100%' }}>

              <SecondaryBox id='searchBox' placeholder={'Search...'} />
              <ButtonCont>
                <SearchButton style={{ backgroundColor: '#00000000' }} type="submit">< MagnifyingGlass style={{ fill: vars.MAIN_WHITE }} />
                </SearchButton>

              </ButtonCont>

            </form>
          </div>
          <div style={{ height: '30px' }} />

          <SearchChosenListLayout
            isWorking={isWorking}
            save={save}
            removeArtist={() => removeArtist}
            removeAlbum={() => removeAlbum}
            removeSong={() => removeSong}
            chosenSongsObj={chosenSongsObj}
            chosenAlbumsObj={chosenAlbumsObj}
            chosenArtistsObj={chosenArtistsObj}
          />

        </SearchCont>
      </SearchContOutter>

      {showMain && <SearchMainPage
        songsContent={songsContent}
        albumsContent={albumsContent}
        artistsContent={artistsContent}
      />}

    </Main>
  )
}
