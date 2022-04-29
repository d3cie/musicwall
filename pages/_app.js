import NavBar from '../components/layouts/NavBar'
import '../styles/globals.css'
import React,{useState, useEffect, useContext} from 'react'
import {useRouter} from 'next/router'
import styled from 'styled-components'
import * as vars from '../vars'
import EditImage from '../components/compounds/EditImage'
import Icon from '../components/primitives/Logo/Icon'

const Cont = styled.div`
    width: 100%;
    height: 100vh;
    overflow:hidden;
    background-color: ${vars.MAIN_BLUE};

      @media (max-width: 600px) {
      background-color: ${vars.GREY};

    }
    
    display:flex;
    justify-content: center;
    align-items: center;
    `

const FormCont = styled.main`
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
    /* animation: fadein 0.2s ease-in-out forwards; */
    background-color: ${vars.GREY};
    padding:20px;
    padding-bottom: 20px;
    padding-top:40px;
    @media (max-width: 350px) {
      transform:scale(.8);

    }
    border-radius: 4px;
    /* transition: all 0.2s; */

  `

export const LoginContext = React.createContext()

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setIsLoading] =  useState(true)
  const [loggedInData, setLoggedInData] = useState(null)
    
  useEffect(
    ()=>{
      async function getData(){
      const response = await fetch('/api/v1/accounts/verifylogin').then((res)=>{return res})
      const responsejson = await response.json()
      if (responsejson.status == 'success'){
        setLoggedInData(responsejson.profile)
      }
      setIsLoading(false)
    }
   getData()

  }
    ,[])
 

if(loading)return<div style = {{background:vars.GREY,
  width: '100%',
  height: '100vh',
  overflow:'hidden',
  display:'flex',
  justifyContent: 'center',
  alignItems: 'center'

}}> <Icon/> </div>

  if (router.pathname == '/accounts/login' ||
  router.pathname == '/accounts/edit' ||
      router.pathname ==  '/accounts/signup'){

    return <Cont>
      <FormCont onsubmit="return false" id = 'form'>
      <Component {...pageProps} />
      </FormCont>
      </Cont>

  }

  return <LoginContext.Provider value = {loggedInData}><NavBar/><Component {...pageProps} /></LoginContext.Provider> 
}

export default MyApp
