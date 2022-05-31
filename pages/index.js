import Head from 'next/head'
import styled from 'styled-components'
import * as vars from '../vars'
import Link from 'next/link'
import PrimaryButton from '../components/primitives/Buttons/PrimaryButton'
import TertiaryButton from '../components/primitives/Buttons/TertiaryButton'
import Logo from '../components/primitives/Logo/Icon'
import Wave from '../components/compounds/Backgrounds/wave1'
import Wave2 from '../components/compounds/Backgrounds/wave2'

import { useRouter } from 'next/router'

import Demo1 from '../components/layouts/Demos/Demo1'
import Demo2 from '../components/layouts/Demos/Demo2'
import Demo3 from '../components/layouts/Demos/Demo3'

import Spotify from '../components/primitives/Icons/Spotify'
import SecondaryButton from '../components/primitives/Buttons/SecondaryButton'
import Demo4 from '../components/layouts/Demos/Demo4'
import Icon from '../components/primitives/Logo/Icon'
import ExpandedLogo from '../components/primitives/Logo'
import { motion } from "framer-motion"
import { useState } from 'react'
const Wrapper = styled.div`
background-color: ${vars.MAIN_WHITE};
  width:100%; 
  display:flex;
  overflow: hidden;
  align-items:center;
flex-direction: column;
  justify-content:center;


  & #waves, #waves2{

@media (min-width:1050px) {
  width:3000px; 
}
@media (min-width:2050px) {
  width:100%; 
}
width:2200px;

}
  `

const HeroCont = styled(motion.section)`
  background-color:${vars.MAIN_BLUE};
  width:100%;
  /* z-index: */
  display:flex;
 
  overflow: hidden;
  position:relative;
  align-items: center;
  /* height: fit-content;
  height:100vh; */
  justify-content:center;
  

  `

const Hero = styled(motion.section)`
  max-width:${vars.MAX_WIDTH};
  width:100%;
  height: fit-content;
  padding-top:100px;
  @media (max-width:650px) {
    min-height: 70vh;
    padding-top:80px;

  }
  display:flex;
  flex-direction: column;
 justify-content:center;
  z-index: 3;
    padding-bottom:100px;
    position: relative;

  `

const LogoCont = styled(motion.div)`
  height:60px;
  top:0;
  left:0;
  position: absolute;
  padding:12px 20px;
  `

const Header = styled.h1`
    color:white;
    padding:20px;
    margin:0;

    text-align: center;
    font-size: 4rem;
    font-weight:700;
   
    @media only screen and (max-width: 800px){
        text-align: left;
    }
    @media only screen and (max-width: 600px){
        font-size: 3.5rem;
    }
    
    & b{
      color:${vars.LIGHER_GREY};
    }
    `
const Para = styled.p`
    color:${vars.MAIN_WHITE};
    padding:20px;
    @media only screen and (max-width: 600px){
        padding-top:0px;
    }
    text-align: center;
    max-width:650px;
     @media only screen and (max-width: 800px){
        text-align: left;
    }
    font-size: 1.5rem;
    line-height:2rem;
    font-weight:400;

      /* & b{
      color:${vars.LIGHER_GREY};
      font-weight:800;

    } */
    `
const ParaCont = styled.div`
  width:100%;
  display: flex;
  align-items:center;
  justify-content: center;
  @media only screen and (max-width: 800px){
        align-items:left;
        justify-content: left;
    }
  `

const OutterCont = styled.section`
  width:100%;
display:flex;
position:relative;
flex-direction: column;
align-items:center;
justify-content: center;
    `

const DescrCont = styled.div`
margin:20px;

padding-left:160px;
  @media (max-width:1250px) {
    padding-left:60px;

      }
        @media (max-width: 850px) {
          padding-left:0px;
          padding-right:0px;

}
text-justify:center;
  `
const Cont = styled.div`
  display:flex;
  margin-top:60px;
  margin-bottom:60px;

  /* height:fit-content; */
  position: relative;
  max-width:${vars.MAX_WIDTH};
  width:100%;
  /* align-items:center; */

  /* justify-content:center; */
  padding:20px;
  flex-direction: row;

  @media (max-width: 850px) {
    flex-direction: column;
   
    &#second{
      flex-direction: column-reverse;

      & #descrcont{
        
          /* padding-right: 200px; */
          padding-left:0;
          /* padding-right:120px; */
      
        }
    }
  }
  `

const ButtonCont = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;`



const DescrTitle = styled.h2`
  font-size: 3rem;
  color:${vars.DARK_GREY};
 
 
  `
const Descr = styled.p`
  font-size:1.5rem;
  `

const variants = {
  enter: {
    height: 'fit-content',
  },
  exit: {
    height: '150vh',
  },
}

const logovariant = {
  enter: {
    opacity: 0,
  },
  exit: {
    opacity: 1,
  }
}
const heroMainVariant = {
  enter: {
    opacity: 0,
    y: 10
  },
  exit: {
    opacity: 1,
    y: 0
  }
}
export default function Welcome() {

  const [heroAnimation, setHeroAnimation] = useState(true)
  const router = useRouter()
  const goToAuthenticateHandler = (link) => {
    setHeroAnimation(false)
    setTimeout(() => router.push(link), 1000)
  }
  return (

    <Wrapper>
      <Head>
        <title>Musicwall | Music is Everything</title>
        <meta name="description" content="Musicwall is a site that helps you capture your favorite music at a point in time to look back on later and share with friends!" />

        <meta property="og:url" content="https://www.musicwall.cc/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Musicwall | Music is Everything" />
        <meta property="og:description" content="Musicwall is a site that helps you capture your favorite music at a point in time to look back on later and share with friends!" />
        <meta property="og:image" content="/opengraphimage.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="musicwall.cc" />
        <meta property="twitter:url" content="https://www.musicwall.cc/" />
        <meta name="twitter:title" content="Musicwall | Music is Everything" />
        <meta name="twitter:description" content="Musicwall is a site that helps you capture your favorite music at a point in time to look back on later and share with friends!" />
        <meta name="twitter:image" content="/opengraphimage.png" />

        <link rel="icon" href="/logo.png" />
        <meta name="theme-color" content={vars.MAIN_BLUE} />
      </Head>

      <HeroCont
        className="animatedbg"
        animate={heroAnimation ? "enter" : "exit"}
        variants={variants}
        // transition={"easeInOut"}
        transition={{ duration: .4 }}
        initial={{ height: '150vh' }}
      >

        <LogoCont
          variants={logovariant}
          animate={!heroAnimation ? "enter" : "exit"}
          initial={'enter'}

        >
          <Logo />
        </LogoCont>

        <Hero
          variants={heroMainVariant}
          transition={{ delay: .3 }}

          animate={!heroAnimation ? "enter" : "exit"}
          initial={'enter'}

        >


          <Header>Music is <b>Everything!</b></Header>
          <ParaCont>
            <Para>
              ...And everything is music! Thats why we are here, to help you share
              your favourite <b>everything</b> with friends and family and the rest of the world.


            </Para>
          </ParaCont>
          <ButtonCont >

            <PrimaryButton onClick={() => { goToAuthenticateHandler('/accounts/login') }} style={{ background: vars.LIGHT_GREY, borderRadius: 4, borderColor: vars.LIGHER_GREY, color: 'white' }} buttonTitle={'LOG IN'}></PrimaryButton>

          </ButtonCont>

          <ButtonCont style={{ marginTop: '50px' }}>
            <TertiaryButton onClick={() => { goToAuthenticateHandler('/accounts/signup') }} style={{ background: '#ffffff00', border: 'none', color: vars.GREY }} buttonTitle={'Dont have an account?'} />
          </ButtonCont>
        </Hero>
      </HeroCont>

      <OutterCont>

        <Cont  >

          <Demo1 />
          <DescrCont>
            <DescrTitle style={{ textAlign: 'right' }} >Show off your fave music at a point in time to friends!</DescrTitle>
            <Descr style={{ textAlign: 'right' }}>
              Select artists, songs and/or albums from the extensive list provided
              by Spotify <Spotify style={{ transform: 'translateY(5px)' }} width="25px" /> to put up on
              your wall.
            </Descr>
          </DescrCont>
        </Cont>
      </OutterCont>


      <OutterCont style={{ background: '#eee' }}>

        <Cont id='second'>
          <DescrCont id='descrcont' style={{ paddingLeft: '0', minWidth: '55%' }}>
            <DescrTitle>Keep a history of music you love.</DescrTitle>
            <Descr>
              Music you have selected previously is kept on your page
              for you and your friends to revisit later and take a trip down memory lane!
            </Descr>
          </DescrCont>
          <div style={{ marginTop: 0 }}>


            <Demo4 />
          </div>
        </Cont>



      </OutterCont>


      <OutterCont style={{ background: '#eee' }}>

        <Cont style={{ flexDirection: 'column' }}>
          <Demo2 />

          <DescrCont id='descrcont' style={{ paddingLeft: '0', textAlign: 'center' }}>
            <DescrTitle>Customize your wall however you like.</DescrTitle>
            <Descr>
              Set a display name, country, bio, profile picture to add
              even more uniqueness to your wall.
            </Descr>
          </DescrCont>


        </Cont>



      </OutterCont>

      <OutterCont>

        <Cont style={{ flexDirection: 'column' }}>
          <Demo3 />

          <DescrCont id='descrcont' style={{ paddingLeft: '0', textAlign: 'center' }} >
            <DescrTitle >Share your walls to your favourite social platforms for everyone else to see!</DescrTitle>
            {/* <Descr>Send and post your pages and walls to the platforms below and more.</Descr> */}
          </DescrCont>


        </Cont>
        <div style={{ display: 'flex', marginTop: -20, marginBottom: 80, alignItems: 'center', justifyContent: 'center' }}>
          <PrimaryButton onClick={() => { location.href = '/accounts/signup' }} style={{ fontSize: '1rem', width: '350px', marginLeft: 20, marginTop: 0, padding: '20px 20px' }} buttonTitle={'CONVINCED? GET STARTED NOW'} />


        </div>
      </OutterCont>
      <footer style={{ height: 80, paddingBottom: 15, width: '100%', padding: 10, background: vars.GREY }}>
        <section style={{ height: '100%', opacity: .9, alignItems: 'center', display: 'flex', width: '100%' }}>
          <ExpandedLogo style={{ height: 40 }} />

          <div style={{ height: '100%', textAlign: 'right', padding: 15, width: '100%', textJustify: 'center', alignSelf: 'center', color: vars.MAIN_WHITE }}>

            2022-2022 Musicwall.
          </div>
        </section>

      </footer>
    </Wrapper >




  )
}
