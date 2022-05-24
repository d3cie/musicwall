import NavBar from '../components/layouts/NavBar'
import '../styles/globals.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import * as vars from '../vars'
import Icon from '../components/primitives/Logo/Icon'
import NextNProgress from "nextjs-progressbar";
import Notifications from '../components/layouts/Notifications'
import Settings from '../components/layouts/Settings'

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
const FormCont = styled.form`
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

export const LoginContext = React.createContext()

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showHideSettings, setShowHideSettings] = useState(false)
  const [loading, setIsLoading] = useState(true)
  const [loggedInData, setLoggedInData] = useState(null)

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
              setIsLoading(false)
            })
          }
        )
      }


      getData()
    }
    , [])

  if (loading) {
    return <div style={{
      background: vars.GREY,
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      position: "fixed",
      zIndex: 50,
      top: 0,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center'

    }}>  <Icon /> </div>
  }

  if (router.pathname == '/') {
    if (loggedInData != null) {
      router.push(`/u/${loggedInData.username}`)
      return
    }
    console.log(loggedInData)

    return <>      {(loading) ? <div style={{
      background: vars.GREY,
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      position: "fixed",
      zIndex: 50,
      top: 0,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center'

    }}>  <Icon /> </div>
      : null}<Component {...pageProps} /></>


  }
  function handleForm(event) { event.preventDefault(); }


  if (router.pathname == '/accounts/login' ||
    router.pathname == '/accounts/edit' ||
    router.pathname == '/accounts/resetpassword' ||
    router.pathname == '/accounts/signup') {

    return <Cont>

      <FormCont onSubmit={(e) => { handleForm(e); return false }} id='form'>
        <Component {...pageProps} />
      </FormCont>
    </Cont>

  }

  return <LoginContext.Provider value={loggedInData}>


    <NavBar showHideSettings={((state) => { setShowNotifications(false); setShowHideSettings(state) })} showHideNotifs={((state) => { setShowHideSettings(false); setShowNotifications(state) })} />
    <div style={{ height: '50px' }} />
    <NextNProgress options={{ showSpinner: false }} height={2} color={vars.MAIN_BLUE} />
    <Notifications hidden={!showNotifications} />
    <Settings since={loggedInData?.since} profileImage={loggedInData?.profileinfo.profileimage} username={loggedInData?.username} hidden={!showHideSettings} />

    <Component {...pageProps} />
  </LoginContext.Provider>
}

export default MyApp
