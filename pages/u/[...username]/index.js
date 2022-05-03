import { useRouter } from 'next/router'
import * as vars from '../../../vars'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import React from 'react'
import ProfileBar from '../../../components/layouts/ProfileBar'
import Music from '../../../components/primitives/Icons/Music'
import Album from '../../../components/primitives/Icons/Album'
import Artist from '../../../components/primitives/Icons/Artist'
import Link from 'next/link'
import Song from '../../../components/compounds/Song'
import SongMobile from '../../../components/compounds/Song/SongMobile'
import Ellipsis from '../../../components/primitives/Animations/Elipsis'
import DualRing from '../../../components/primitives/Animations/DualRing'
import getuser from '../../../services/getuser'
import Error from 'next/error'
import Head from 'next/head'

const Cont = styled.main`
  /* background-color:${vars.GREY}; */
  background-color: ${vars.LIGHT_GREY};

  width:100%;
  height:100vh;`

const CategoryCont = styled.nav`
    background: ${vars.GREY};
    width:100%;
    display:flex;
    flex-direction:row;
    align-items:center;
    padding-top:5px;
    justify-content:center;

    `
const Category = styled.a`
    color:${vars.MAIN_WHITE};
    padding:10px 30px;
    display: flex;
    height:40px;
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
    transition: all 0.2s;
    cursor:pointer;
    & svg{
      fill:${vars.PALE_BLUE};
      margin-right: 10px;
    }
    &.active{
      cursor: default;
      /* color:${vars.MAIN_BLUE}; */
      background-color: ${vars.LIGHT_GREY};
      & svg{
      fill:${vars.MAIN_WHITE};}

    }
    `
const Point = styled.div`
  position:absolute;
  width:20px;
  background-color:${vars.GREY};
  left:-29px;
  border-radius: 50%;
  border: solid 6px ${vars.MAIN_WHITE} ;
  top:10px;
  height:20px;
  `

const TimeStamp = styled.h1`
    color:white;
    max-width:${vars.MAX_WIDTH};
    width:100%; 
    margin-top:0;
    font-weight: 500;
    text-align: left;
    text-justify: left;
    `

const TimeLine = styled.div`
  min-height:100px;
  position:absolute;
  left:-20px;
  height:100%;
  margin-top:20px;
  width:2px;
  background:${vars.MAIN_WHITE};
`

const TimeStampCont = styled.div`
    width:100%;
    position:relative;
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height:60px;
    `
const GridContInner = styled.div`
    width:fit-content;
    position:relative;
    `

const GridContOutter = styled.section`
    display:flex;
    width:100%;
    flex-direction: row;
    padding:40px;
    position:relative;
    height: fit-content;
    padding-inline:20px;
    @media (max-width: 450px) {
      padding-inline:10px;

    } 
    align-items:center;
    justify-content:center;
    `
const GridCont = styled.div`
  /* min-height:60vh; */
  /* width:100%; */
  /* padding:40px; */
  max-width:${vars.MAX_WIDTH};
  gap: 20px 20px;
  padding-bottom:60px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
    gap: 5px 5px;

  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;

  }
  `

export default function UserProfile() {
  const router = useRouter()
  const pathname = router.asPath
  const [data, setData] = useState(null)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    setUsername(window.location.pathname.substring(3))
    async function fetchData() {
      const response = getuser(window.location.pathname.substring(3))
      setData(await response)
      console.log(await response)
    }
    fetchData()

  }, [])


  function SongLayout() {

    return <GridContOutter>
      <GridContInner>
        <TimeLine />

        <div>
          <TimeStampCont>
            <TimeStamp><Point />Added These on - 03.12.12</TimeStamp>
          </TimeStampCont>
          <GridCont>
            <SongMobile

              SongName='Money Longer'
              AlbumName='LUV. vs the World'
              SongArtist='Lil Uzi Vert'
              SongPreview='https://p.scdn.co/mp3-preview/42f7a2733d854fd5bbddb3d62e7df6a78cfac313?cid=774b29d4f13844c495f206cafdad9c86'
              AlbumCover='https://images.unsplash.com/photo-1498598457418-36ef20772bb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
            />
  <SongMobile

SongName='Money Longer'
AlbumName='LUV. vs the World'
SongArtist='Lil Uzi Vert'
SongPreview='https://p.scdn.co/mp3-preview/42f7a2733d854fd5bbddb3d62e7df6a78cfac313?cid=774b29d4f13844c495f206cafdad9c86'
AlbumCover='https://images.unsplash.com/photo-1498598457418-36ef20772bb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
/>

          </GridCont>
        </div>
      </GridContInner>
    </GridContOutter>
  }

  if (!data) return <Cont

    style={{
      position: 'absolute',
      top: 0,
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column-reverse',
      color: vars.MAIN_WHITE,
      fontWeight: '200',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s'
    }}

  ><Ellipsis color={vars.MAIN_WHITE} /></Cont>

    if (data.status != "success"){
      return <Error statusCode = {404}/>
    }

  return (
    <> 
       <Head>
        <title>Music Wall page for @{username}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="color-scheme" content="light dark"></meta>
        <meta name="theme-color" content= {vars.DARK_GREY} />
      </Head>

       <Cont>
      <ProfileBar
      bio = {data.profile.profileinfo.bio}
      username = {data.profile.username}
        DisplayName = {data.profile.profileinfo.displayname}
      />
    
      <SongLayout />
    </Cont>
    </>

  )
}































  {/* <CategoryCont>
        <Link href={`/u/${username}/songs`}>

          <Category className={(pathname == `/u/${username}/songs`) ? 'active' : 'normal'}>
            <Music />Songs
          </Category>
        </Link>

        <Link href={`/u/${username}/albums`} >
          <Category className={(pathname == `/u/${username}/albums`) ? 'active' : 'normal'}>
            <Album />Albums
          </Category>
        </Link>

        <Link href={`/u/${username}/artists`}>
          <Category className={(pathname == `/u/${username}/artists`) ? 'active' : 'normal'}>
            <Artist /> Artists
          </Category>
        </Link>
      </CategoryCont> */}