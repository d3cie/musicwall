import { useRouter } from 'next/router'
import * as vars from '../../../vars'
import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import React from 'react'
import ProfileBar from '../../../components/layouts/ProfileBar'
import Ellipsis from '../../../components/primitives/Animations/Elipsis'
import getuser from '../../../services/getuser'
import Error from 'next/error'
import Head from 'next/head'
import Loading from '../../../components/layouts/Loading'
import getwalls from '../../../services/getwalls'

import { LoginContext } from '../../../pages/_app'
import Walls from '../../../components/layouts/Walls'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast, cssTransition } from 'react-toastify'
import UserPageLoad from '../../../components/loadingsScreens/UserPageLoad'
import { motion } from 'framer-motion'
import PlaySongSpotify from '../../../components/compounds/Song/PlaySongSpotify'

const fade = cssTransition({
  enter: "fade_in",
  exit: "fade_out"
});


const Cont = styled.main`
  background-color: ${vars.LIGHT_GREY};
  display: flex;
  flex-direction: column;
  width:100%;
  min-height:100vh;`



function UserProfile(props) {
  const router = useRouter()
  const pathname = router.asPath
  const [data, setData] = useState(null)
  const [username, setUsername] = useState(null)
  const isLoggedInData = useContext(LoginContext)
  const [populatedWalls, setPopulatedWalls] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { from } = router.query
  const { wall } = router.query
  const [reveal, setReveal] = useState(false)
  const [isloggedinaccount, setIsLoggedInAccount] = useState(false)
  const [profileBarAnimation, setProfileBarAnimmation] = useState(true)
  const [showSpotifySongPlayer, setShowSpotifySongPlayer] = useState(false)
  const [songPlayerId, setSongPlayerId] = useState()
  useEffect(() => {
    setUsername(window.location.pathname.substring(3))
    setIsLoading(true)
    document.querySelector('html,body').style.background = vars.LIGHT_GREY

    async function fetchData() {
      const response = await getuser(window.location.pathname.substring(3))
      setData(response)
      setReveal(true)
      setTimeout(() => setIsLoading(false), 500);

      if (response.profile.walls.length) {
        getwalls(response.profile.walls.reverse()).then((res) => {
          setPopulatedWalls(res)



        }
        )
      } else {
        setPopulatedWalls([])
      }

    }

    fetchData()
    //removed router.aspath and notifs.  Were causing an unnessesary re-render
  }, [pathname, from])

  if (isLoading) return <UserPageLoad loading={reveal} />

  if (data.status != "success") {
    return <Error statusCode={404} />
  }

  function ShowSongPlayer(id) {
    setSongPlayerId(id)
    setShowSpotifySongPlayer(true)
  }

  function spotifySongHandler(id) {
    ShowSongPlayer(id)
  }
  return (
    <>
      <Head>

        <title>Musicwall | @{username}</title>
        <meta name="description" content={`Musicwall page for user (@${username})`} />
        <link rel="icon" href="/logo.png" />
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
      <Cont>

        {
          (showSpotifySongPlayer) ? <PlaySongSpotify closePlayer={() => setShowSpotifySongPlayer(false)} id={songPlayerId} /> : ''
        }
        {/* <PlaySongSpotify/> */}
        <ProfileBar
          profileBarAnimation={profileBarAnimation}
          profile={data.profile}
        />

        <Cont style={{ alignItems: 'center' }}>
          <Walls spotifySongHandler={(id) => spotifySongHandler(id)} scrollto={wall} wallOwner={username} walls={populatedWalls} />
        </Cont>

      </Cont>
    </>

  )
}


export default UserProfile