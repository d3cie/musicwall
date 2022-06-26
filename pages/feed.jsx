import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components'
import Plus from '../components/primitives/Icons/Plus';
import * as vars from '../vars'
import { useRouter } from 'next/router'
import FeedWall from '../components/compounds/Wall/FeedWall';
import getfeedservice from '../services/getfeed';
import DualRing from '../components/primitives/Animations/DualRing'
import { LoginContext } from './_app'
import SecondaryButton from '../components/primitives/Buttons/SecondaryButton';
import PlaySongSpotify from '../components/compounds/Song/PlaySongSpotify';
import Head from 'next/head';


const TopBarContOuter = styled.div`
      background-color:${vars.DARK_GREY};
      width: 100%;
      display: flex;
      border-bottom:solid 1px ${vars.GREY};
       border-bottom:solid 1px ${vars.LIGHT_GREY};
      align-items:center;
      justify-content: center;
      height:fit-content;
      flex-direction:column;
     position:fixed;
     z-index:60;
    top:58px;
    border-bottom:solid 1px ${vars.LIGHER_GREY};

    `

const TopBarCont = styled.div`
    max-width: ${vars.MAX_WIDTH};
  position:relative;
  display: flex;
  padding:20px;
  z-index:90px;
  cursor:pointer;
  transition: all 0.2s;
  width:100%;
  font-weight: 400;

& .active{
    font-weight: 500;
    background-color:${vars.MAIN_BLUE};
    border: 1px solid ${vars.PALE_BLUE};
}
  `

const SortButton = styled.div`
  background-color:${vars.LIGHT_GREY};
  width:fit-content;
  padding:3px;
  padding-inline:8px;
  margin: 5px;
  border-radius: 4px;
  border:solid 1px ${vars.LIGHER_GREY};
  color:${vars.MAIN_WHITE};
  display: flex;

  `

const FeedContOutter = styled.section`
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    flex-direction: column;`

const FeedCont = styled.div`
      max-width: ${vars.MAX_WIDTH};

        position:relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top:140px;
 
`

const Wrapper = styled.div` 
    `

async function getFullItems(data) {
    try {
        const res = await fetch(`/api/v1/walls/getwall`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }
        )


        const result = await res.json()
        return result
    } catch (err) {
        console.log('There has been an error', err)
    }
}

const Feed = () => {
    const router = useRouter()
    const [filter, setFilter] = useState('topwalls')
    const [page, setPage] = useState(0)
    const [feedWalls, setFeedWalls] = useState([])
    const [loading, setLoading] = useState(true)
    const loggedindata = useContext(LoginContext)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [noMorePages, setNoMorePages] = useState(true)
    const [showSpotifySongPlayer, setShowSpotifySongPlayer] = useState(false)
    const [songPlayerId, setSongPlayerId] = useState()


    function ShowSongPlayer(id) {
        setSongPlayerId(id)
        setShowSpotifySongPlayer(true)
    }

    function spotifySongHandler(id) {
        ShowSongPlayer(id)
    }


    const getFeed = async () => {
        let objectsToGet = { songs: [], albums: [], artists: [] }
        let pageFeedWalls = [];
        const data = await getfeedservice(page, filter)

        setButtonLoading(true)
        if (data.status == 'success') {

            data.body.map((user) => {
                if (user.walls.length) {
                    user.walls.map((wall) => {
                        objectsToGet.songs.push(...wall.songs)
                        objectsToGet.albums.push(...wall.albums)
                        objectsToGet.artists.push(...wall.artists)
                    })
                }
            })

            const AllItemsForPage = await getFullItems(objectsToGet)
            setNoMorePages(false)

            if (!data.body.length) { setNoMorePages(true) }
            const mapItemSong = (song) => {
                let returnObj = null;
                for (let i = 0; i < AllItemsForPage.tracks.length; i++) {
                    if (song == AllItemsForPage.tracks[i].spotifySongID) {
                        returnObj = AllItemsForPage.tracks[i]
                        break
                    }

                }

                return returnObj
            }
            const mapItemAlbum = (album) => {
                let returnObj = null;
                for (let i = 0; i < AllItemsForPage.albums.length; i++) {
                    if (album == AllItemsForPage.albums[i].spotifyAlbumID) {
                        returnObj = AllItemsForPage.albums[i]
                        break
                    }

                }
                return returnObj
            }
            const mapItemArtist = (artist) => {
                let returnObj = null;
                for (let i = 0; i < AllItemsForPage.artists.length; i++) {
                    if (artist == AllItemsForPage.artists[i].spotifyArtistID) {
                        returnObj = AllItemsForPage.artists[i]
                        break
                    }

                }
                return returnObj
            }


            pageFeedWalls = data.body.map((user, i) => {
                if (user.walls.length) {
                    return user.walls.map((wall, j) => <FeedWall
                        key={Math.random()}
                        username={user.username}
                        since={wall.since}
                        caption={wall.caption}
                        playSong={(id) => spotifySongHandler(id)}
                        loggedinname={loggedindata.username}
                        likes={wall.likes}
                        id={wall._id}
                        songs={wall.songs.map((song) => mapItemSong(song))}
                        albums={wall.albums.map((album) => mapItemAlbum(album))}
                        artists={wall.artists.map((artist) => mapItemArtist(artist))}
                        displayname={user.displayname}
                        countrycode={user.countrycode}
                        image={user.image}
                    />)
                }
            })
            setLoading(false)
            setFeedWalls(prev => prev.concat(...pageFeedWalls))
            setPage(x => x + 1)
        }
        setButtonLoading(false)
    }

    useEffect(() => {
        document.querySelector('html,body').style.background = vars.GREY
        setFeedWalls([])
        getFeed()

    }, [filter])

    if (loading) { return <div style={{ display: 'flex', background: vars.GREY, alignItems: 'center', height: '90vh', justifyContent: 'center' }}><DualRing /></div> }
    return (
        <Wrapper>
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
                <title>Musicwall | Home</title>
                <meta name="description" content={`See what songs other users are listening to!`} />
                <link rel="icon" href="/logo.png" />
                <meta name="color-scheme" content="light dark"></meta>
                <meta name="theme-color" content={vars.DARK_GREY} />
            </Head>
            {
                (showSpotifySongPlayer) ? <PlaySongSpotify closePlayer={() => setShowSpotifySongPlayer(false)} id={songPlayerId} /> : ''
            }

            <TopBarContOuter>

                <TopBarCont>
                    <SortButton
                        style={{ height: 30, width: 30 }}
                        onClick={() => { router.push('/search') }}
                        className={"active"}>
                        <Plus style={{ alignSelf: 'center' }} />
                    </SortButton>

                    <SortButton
                        onClick={() => { setPage(0); setFilter('topwalls') }}
                        className={(filter == "topwalls") ? 'active' : 'notactive'}>
                        TOP WALLS
                    </SortButton>

                    <SortButton
                        onClick={() => { setPage(0); setFilter('newlyadded') }}
                        className={(filter == "newlyadded") ? 'active' : 'notactive'}>
                        NEWLY ADDED
                    </SortButton>

                    {/* <SortButton
                        onClick={() => { setFilter("pinnedwalls") }}
                        className={(filter == "pinnedwalls") ? 'active' : 'notactive'}>
                        PINNED
                    </SortButton> */}
                </TopBarCont>

                {/* <form method="GET" action="/api/v1/accounts/loginspotify">

                    <SecondaryButton
                        type="submit"
                    // onClick={() => loginspotify(window.location).then(res => console.log(res))}
                    >

                    </SecondaryButton>
                </form> */}

            </TopBarContOuter>
            <FeedContOutter>
                <FeedCont>

                    {feedWalls}
                </FeedCont>
                {(noMorePages) ? '' : <SecondaryButton isWorking={buttonLoading} onClick={() => getFeed()} style={{ width: 'fit-content', marginBottom: "40px", marginTop: '-40px' }} buttonTitle={" MORE ! "} />
                }            </FeedContOutter>
        </Wrapper>
    );
}

export default Feed;
