import NavBar from '../components/layouts/NavBar'
import '../styles/globals.css'
import React,{useState, useEffect, useContext} from 'react'
import {useRouter} from 'next/router'
import styled from 'styled-components'
import * as vars from '../vars'
import EditImage from '../components/compounds/EditImage'
import Icon from '../components/primitives/Logo/Icon'
import NextNProgress from "nextjs-progressbar";

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
    /* animation: fadein 0.2s ease-in-out forwards; */
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
 

//this is a note to anyone reading this code base in the future 
//i decided to use inline styles cause for some reason styled-components
//was taking a second to load.

if(loading)return<div style = {{background:vars.GREY,
  width: '100%',
  height: '100vh',
  overflow:'hidden',
  display:'flex',
  justifyContent: 'center',
  alignItems: 'center'

}}>
 
  
   <Icon/> </div>

if (router.pathname == '/'){
  return <Component {...pageProps} />
}
function handleForm(event) { event.preventDefault(); } 


  if (router.pathname == '/accounts/login' ||
    router.pathname == '/accounts/edit' ||
      router.pathname ==  '/accounts/signup'){

    return <Cont>
     
      <FormCont onSubmit={(e)=>{handleForm(e);return false}} id = 'form'>
      <Component {...pageProps} />
      </FormCont>
      </Cont>

  }

  return <LoginContext.Provider value = {loggedInData}><NavBar/><div style = {{height: '50px'}}/><NextNProgress options={{ showSpinner: false }} height={2} color={vars.MAIN_BLUE} /><Component {...pageProps} /></LoginContext.Provider> 
}

export default MyApp
