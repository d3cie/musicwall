import NavBar from '../components/layouts/NavBar'
import '../styles/globals.css'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import * as vars from '../vars'
import Icon from '../components/primitives/Logo/Icon'
import NextNProgress from "nextjs-progressbar";
import Notifications from '../components/layouts/Notifications'
import Settings from '../components/layouts/Settings'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast, Zoom, cssTransition } from 'react-toastify'
import editimageservice from '../services/editimage'
import PrimaryLoading from '../components/loadingsScreens/PrimaryLoading'
import { motion } from 'framer-motion'
import Pins from '../components/layouts/Pins'
import * as ga from '../utils/ga/'

const fade = cssTransition({
  enter: "fade_in",
  exit: "fade_out"
});



const Cont = styled.div`
    width: 100%;
    height: 100vh;
    overflow:hidden;
    background-color: ${vars.MAIN_BLUE};
      @media (max-width: 600px) {
      background-color: ${vars.GREY};
      height: 110vh;

    }
    display:flex;
    justify-content: center;
    align-items: center;
    `
const FormCont = styled(motion.form)`
    width:fit-content;
    height: fit-content;
    @keyframes fadein {
      from{
        opacity:0;
      }
      to{
        opacity:1;
      }
    }
    background-color: ${vars.GREY};
    padding:20px;
    padding-bottom: 20px;
    padding-top:40px;
    border:solid 1px ${vars.LIGHT_GREY};
    @media (max-width: 600px) {
      border:none;

      transform:scale(1);
      padding:0px;
    }
    border-radius: 4px;
   `

const formVariants = {
  enter: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,

    y: 10
  }
}

export const indexHeader = (
  <React.Fragment>
    <title>Musicwall | Music is Everything</title>
    <meta name="description" content="Musicwall is a site that helps you capture your favorite music at a point in time to look back on later and share with friends!" />

    <meta property="og:url" content="https://www.musicwall.cc/" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Musicwall | Music is Everything" />
    <meta property="og:description" content="Musicwall is a site that helps you capture your favorite music at a point in time to look back on later and share with friends!" />

    <meta property="twitter:domain" content="musicwall.cc" />
    <meta property="twitter:url" content="https://www.musicwall.cc/" />
    <meta name="twitter:title" content="Musicwall | Music is Everything" />
    <meta name="twitter:description" content="Musicwall is a site that helps you capture your favorite music at a point in time to look back on later and share with friends!" />
  </React.Fragment>
)

export const loginHeader = (
  <React.Fragment>
    <title>Musicwall | Login</title>
    <meta name="description" content="Log into your musicwall account to start sharing your fave music!" />


    <meta property="og:title" content="Musicwall | Login" />
    <meta property="og:description" content="Log into your musicwall account to start sharing your fave music!" />

    <meta property="twitter:domain" content="musicwall.cc" />
    <meta property="twitter:url" content="https://www.musicwall.cc/accounts/login" />
    <meta name="twitter:title" content="Musicwall | Login" />
    <meta name="twitter:description" content="Log into your musicwall account to start sharing your fave music!" />
  </React.Fragment>
)

export const signupheader = (
  <React.Fragment>
    <title>Musicwall | Signup</title>
    <meta name="description" content="Sign up for a musicwall account to start sharing your fave music!" />


    <meta property="og:title" content="Musicwall | Login" />
    <meta property="og:description" content="Sign up for a musicwall account to start sharing your fave music!" />

    <meta property="twitter:domain" content="musicwall.cc" />
    <meta property="twitter:url" content="https://www.musicwall.cc/accounts/signup" />
    <meta name="twitter:title" content="Musicwall | Login" />
    <meta name="twitter:description" content="Sign up for a musicwall account to start sharing your fave music!" />
  </React.Fragment>
)

export const LoginContext = React.createContext()

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showHideSettings, setShowHideSettings] = useState(false)
  const [loading, setIsLoading] = useState(true)
  const [loggedInData, setLoggedInData] = useState(null)
  const [profileImageFromEdit, setProfileImageFromEdit] = useState(null)
  const [notificationProfileImages, setNotificationProfileImages] = useState(null)
  const [entryAnimation, setEntryAnimation] = useState(true)
  const [showPins, setShowPins] = useState(false)
  const { token } = router.query

  if (token) {
    window.localStorage.setItem('SPOTIFY_ACCESS_TOKEN', token)
  }
  const setProfileImage = async (image) => {

    toast.loading('Uploading profile image.  Please wait.')
    editimageservice(image).then((res) => {
      setProfileImageFromEdit(null)
      toast.dismiss()

      res.json().then((res) => {


        if (res.status == 'success') {

          toast.success('Profile image uploaded successfully.  Refresh page to see changes.')

          return image
        }
        if (res.status == 'error') {
          toast.error('Profile image not uploaded due to an error. Please try again.')
          return null
        }
      })
    })
      .catch((error) => {
        toast.dismiss()
        toast.error('Profile image not uploaded due to an unexpected error. Please try again.')
        console.log(error)
        return null

      })
    setProfileImageFromEdit(null)
  }

  if (profileImageFromEdit != null) {
    setProfileImage(profileImageFromEdit)
  }

  useEffect(
    () => {
      function getData() {
        const response = fetch('/api/v1/accounts/verifylogin').then((res) => { return res })

        response.then(
          (res) => {
            res.json().then((responsejson) => {
              if (responsejson.status == 'success') {
                setLoggedInData(responsejson.profile)
              }

              setTimeout(() => setIsLoading(false), 2000);

              setTimeout(() => setEntryAnimation(false), 2650);

            })
          }
        )
      }

      getData()


      const handleRouteChange = (url) => {
        ga.pageview(url)
      }
      //When the component is mounted, subscribe to router changes
      //and log those page views
      router.events.on('routeChangeComplete', handleRouteChange)

      // If the component is unmounted, unsubscribe
      // from the event with the `off` method
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }

    }
    , [router.events])



  if (entryAnimation) {
    return <>
      <Head>

        <meta name="google-site-verification" content="jpuBKEsMBEa6nVthIvoHTD-6gZt-m2oq-n2N0o3ylYc" />
        <meta name="facebook-domain-verification" content="khekl965c2wmnqhvxk2c835wf40e7n" />

        <meta property="og:url" content="https://www.musicwall.cc/" />
        <meta property="og:type" content="website" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>

        <meta name="twitter:image" content="https://www.musicwall.cc/opengraphimage.png" />
        <meta property="og:image" content="/opengraphimage.png" />
        <meta name="twitter:card" content="summary_large_image" />

        {(router.pathname == "/") ? indexHeader : null}
        {(router.pathname == "/accounts/login") ? loginHeader : null}
        {(router.pathname == "/accounts/signup") ? signupheader : null}


        {(router.pathname != "/") || (router.pathname != "/accounts/login" || router.pathname != "/accounts/signup") ? indexHeader : null}
        <link rel="icon" href="/logo.png" />
        <meta name="theme-color" content={vars.GREY} />
      </Head>
      <PrimaryLoading to={router.pathname} loading={loading} />
    </>
  }

  if (router.pathname == '/') {
    if (loggedInData != null) {
      router.push(`/feed`)
      return
    }

    return <>
      <Component {...pageProps} /></>
  }


  if (loggedInData == null) {
    if (router.pathname == '/accounts/edit') {
      router.push('/accounts/login?next=/accounts/edit')
      return
    }
    if (router.pathname == '/search') {
      router.push('/accounts/login?next=/search')
      return
    }
    if (router.pathname == '/explore') {
      router.push('/accounts/login?next=/explore')
      return
    }
    if (router.pathname == '/feed') {
      router.push('/accounts/login?next=/feed')
      return
    }
  }



  const pinsHandler = (state) => {

    document.querySelector('html,body').style.overflowY = state ? "hidden" : "scroll"
    setShowPins(state)

    return
  }


  function handleForm(event) { event.preventDefault(); }



  if (router.pathname == '/accounts/login' ||
    router.pathname == '/accounts/resetpassword' ||
    router.pathname == '/accounts/signup') {

    return <LoginContext.Provider value={loggedInData}>


      <Cont>

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


        <FormCont
          variants={formVariants}
          initial={'exit'}
          animate={'enter'}
          key={router.asPath}
          transition={{ duration: .2 }}
          onSubmit={(e) => { handleForm(e); return false }} id='form'>
          <Component  {...pageProps} />
        </FormCont>
      </Cont>
    </LoginContext.Provider>


  }

  return <LoginContext.Provider value={loggedInData}>

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

    <NavBar showHideSettings={((state) => { setShowNotifications(false); setShowHideSettings(state) })} showHideNotifs={((state) => { setShowHideSettings(false); setShowNotifications(state) })} />
    <div style={{ height: '50px' }} />
    <NextNProgress options={{ showSpinner: false }} height={2} color={vars.MAIN_BLUE} />
    {loggedInData && <>
      {showNotifications && <Notifications notificationProfileImages={notificationProfileImages} getProfileImages={() => getProfileImages()} />}
      <div hidden={!showPins}> <Pins
        onerror={(err) => toast.error(err)}
        pins={loggedInData?.pins}
        infotoast={(info) => { toast.info(info) }}
        pinnedby={loggedInData?.pinnedby} isclosed={showPins} close={() => pinsHandler(false)} username={loggedInData?.username} /></div>
      <Settings pinsHandler={pinsHandler} close={() => setShowHideSettings(false)} pins={loggedInData?.pins} pinned={loggedInData?.pinnedby} since={loggedInData?.since} profileImage={loggedInData?.profileinfo.profileimage} username={loggedInData?.username} hidden={!showHideSettings} />
    </>}
    <Component setProfileImage={setProfileImageFromEdit}  {...pageProps} />
  </LoginContext.Provider>
}

export default MyApp
