import React, { useEffect, useContext, useState } from 'react'
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
import ErrorScreen from '../components/layouts/ErrorScreen'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast, Zoom, cssTransition } from 'react-toastify'
import { LoginContext } from "./_app"
import * as ga from '../utils/ga'

const fade = cssTransition({
  enter: "fade_in",
  exit: "fade_out"
});

const Main = styled.main`
  width:100%;
  overflow-x: hidden;
  min-height:120vh;
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
  padding-bottom:0px;
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
margin:4px;
cursor: pointer;
transition: all 0.2s;

:hover{
    background-color:${vars.MAIN_WHITE};
    fill:${vars.MAIN_BLUE};
}

`
export const LimitContext = React.createContext()

const dummySongs = [<SongSearchDummy key={1} />, <SongSearchDummy key={2} />, <SongSearchDummy key={3} />, <SongSearchDummy key={4} />, <SongSearchDummy key={5} />]
const dummyArtists = [<ArtistSearchDummy key={1} />, <ArtistSearchDummy key={2} />, <ArtistSearchDummy key={3} />, <ArtistSearchDummy key={4} />, <ArtistSearchDummy key={5} />]
const dummyAlbums = [<AlbumSearchDummy key={1} />, <AlbumSearchDummy key={2} />, <AlbumSearchDummy key={3} />, <AlbumSearchDummy key={4} />, <AlbumSearchDummy key={5} />]

export default function Search() {

  const ITEMS_CHOSEN_LIMIT = 5
  const router = useRouter()
  const LoggedInUser = useContext(LoginContext)
  const [showMain, setShowMain] = useState(false)
  const [songsContent, setSongsContent] = useState()
  const [artistsContent, setArtistsContent] = useState()
  const [albumsContent, setAlbumsContent] = useState()
  const [showSpotifySongPlayer, setShowSpotifySongPlayer] = useState(false)
  const [songPlayerId, setSongPlayerId] = useState()
  const [errorMsg, setErrorMsg] = useState(null)

  const [showErr, setShowErr] = useState(false)

  const [isWorking, setIsWorking] = useState(false)
  const [previousQuery, setPreviousQuery] = useState()
  const [chosenSongsObj, setChosenSongsObj] = useState([])
  const [chosenAlbumsObj, setChosenAlbumsObj] = useState([])
  const [chosenArtistsObj, setChosenArtistsObj] = useState([])
  const [resState, setRes] = useState(null)
  const [canAddMoreSongs, setCanAddMoreSongs] = useState(true)
  let event = new Event("songlimitreached");

  const notifyWhenLimitReached = (item) => {
    toast.info(`Oops!  You no longer have space for ${item} on this wall.  \n Remove some ${item} from your chosen list or save what you have added already.`)
  }
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
    setCanAddMoreSongs(chosenSongsObj.length > ITEMS_CHOSEN_LIMIT)

  }
  const removeAlbum = (id) => {
    setChosenAlbumsObj(albums => albums.filter(album => album.id !== id))
  }
  const removeArtist = (id) => {
    setChosenArtistsObj(artists => artists.filter(artist => artist.id !== id))
  }


  const SearchQuery = (e) => {
    e.preventDefault();

    const query = document.getElementById('searchBox').value

    ga.event({
      action: "search",
      params: {
        search_term: query
      }
    })


    if (query == previousQuery) { return }
    setPreviousQuery(query)

    setShowErr(false)
    setSongsContent(dummySongs)
    setArtistsContent(dummyArtists)
    setAlbumsContent(dummyAlbums)
    setShowMain(true)

    searchService(query).then((res) => {

      let songs = [];
      let albums = [];
      let artists = [];

      if (res?.error) {
        setPreviousQuery()
        setShowErr(true)
        setErrorMsg(res.error)
        return
      }


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
            notify={notifyWhenLimitReached}
            Limit={ITEMS_CHOSEN_LIMIT}
            canBeAdded={chosenSongsObj.length > ITEMS_CHOSEN_LIMIT}
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
        const artists = artistsToString(currentElement.artist)





        function isAlreadyChosen() {
          for (let j = 0; j < chosenAlbumsObj.length; j++) {
            if (chosenAlbumsObj[j]?.id == currentElement.spotifySongID) {
              return true
            }
          }
        }
        albums.push(
          <AlbumSearch
            canBeAdded={chosenAlbumsObj.length < ITEMS_CHOSEN_LIMIT}
            Limit={ITEMS_CHOSEN_LIMIT}
            notify={notifyWhenLimitReached}

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
            canBeAdded={chosenArtistsObj.length < ITEMS_CHOSEN_LIMIT}
            Limit={ITEMS_CHOSEN_LIMIT}
            notify={notifyWhenLimitReached}

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

  async function save(caption) {
    setIsWorking(true)
    setShowErr(false)
    const response = await addwallservice(chosenSongsObj.map(({ id }) => { return id }),
      chosenAlbumsObj.map(({ id }) => { return id }),
      chosenArtistsObj.map(({ id }) => { return id }),
      caption
    )
    setIsWorking(false)
    if (response.error) {
      setErrorMsg(response.error)
      setShowErr(true)
      return
    }
    const Message = "Wall added succesfully."
    router.push(`u/${LoggedInUser.username}`)

  }

  function ShowSongPlayer(id) {
    setSongPlayerId(id)
    setShowSpotifySongPlayer(true)
  }

  return (
    <LimitContext.Provider value={{ songs: chosenSongsObj.length, albums: chosenAlbumsObj.length, artists: chosenArtistsObj.length }}>

      <Main>

        <Head>
          <title>Musicwall | Search</title>
          <meta name="description" content="Search musicwall for your favourite music and artists" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="color-scheme" content="light dark"></meta>
          <meta name="theme-color" content={vars.DARK_GREY} />
        </Head>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          transition={fade}
          theme={'colored'}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <SearchContOutter>
          {
            (showSpotifySongPlayer) ? <PlaySongSpotify closePlayer={() => setShowSpotifySongPlayer(false)} id={songPlayerId} /> : ''
          }

          <SearchCont >
            <div style={{ position: 'fixed', zIndex: 20, padding: '20px', top: 58, background: vars.DARK_GREY, left: 0, borderBottom: `solid 1px ${vars.LIGHT_GREY}`, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              {/* <div style = {{ width:'100%',maxWidth:vars.MAX_WIDTH}}> */}
              <form onSubmit={(e) => { SearchQuery(e); return false }}

                style={{ display: 'flex', position: 'relative', maxWidth: vars.MAX_WIDTH, background: vars.DARK_GREY, width: '100%' }}>

                <SecondaryBox id='searchBox' placeholder={'Search for a song,album or artist...'} />
                <ButtonCont>
                  <SearchButton style={{ backgroundColor: '#00000000' }} type="submit">< MagnifyingGlass style={{ fill: vars.MAIN_WHITE }} />

                  </SearchButton>

                </ButtonCont>

              </form>
            </div>

            <div style={{ height: '30px' }} />

            <SearchChosenListLayout
              limit={ITEMS_CHOSEN_LIMIT}
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

        {showErr && <ErrorScreen errorMsg={errorMsg} />}
        {showMain && !showErr && <SearchMainPage
          songsContent={songsContent}
          albumsContent={albumsContent}
          artistsContent={artistsContent}
        />}

      </Main>
    </LimitContext.Provider>
  )
}
