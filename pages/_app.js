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
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast, Zoom, cssTransition } from 'react-toastify'
import editimageservice from '../services/editimage'

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
  const imageUploadingToast = (item) => {
    toast.info(`Profile image uploading.  Please be patient.`)
  }

  const router = useRouter()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showHideSettings, setShowHideSettings] = useState(false)
  const [loading, setIsLoading] = useState(true)
  const [loggedInData, setLoggedInData] = useState(null)
  const [profileImageFromEdit, setProfileImageFromEdit] = useState(null)



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
    router.pathname == '/accounts/resetpassword' ||
    router.pathname == '/accounts/signup') {

    return <LoginContext.Provider value={loggedInData}><Cont>

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


      <FormCont onSubmit={(e) => { handleForm(e); return false }} id='form'>
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

    <NavBar showHideSettings={((state) => { console.log(state); setShowNotifications(false); setShowHideSettings(state) })} showHideNotifs={((state) => { setShowHideSettings(false); setShowNotifications(state) })} />
    <div style={{ height: '50px' }} />
    <NextNProgress options={{ showSpinner: false }} height={2} color={vars.MAIN_BLUE} />
    <Notifications hidden={!showNotifications} />

    <Settings close={() => setShowHideSettings(false)} since={loggedInData?.since} profileImage={loggedInData?.profileinfo.profileimage} username={loggedInData?.username} hidden={!showHideSettings} />

    <Component setProfileImage={setProfileImageFromEdit}  {...pageProps} />
  </LoginContext.Provider>
}

export default MyApp
