import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as vars from '../vars'
import DualRing from '../components/primitives/Animations/DualRing'
import LeftArrow from '../components/primitives/Icons/LeftArrow'
import { useRouter} from 'next/router'
const Main = styled.main`
  width:100%;
  overflow-x: hidden;
  min-height:100vh;
  position:relative;
  align-items: center;
  justify-content:center;
  background-color:${vars.GREY};
  display: flex;
  `
const Cont = styled.div`
    max-width: ${vars.MAX_WIDTH};
  width:100%;
  `

const ButtonCont = styled.div`
  left:5%;
`
const Header = styled.h1`
    color:${vars.MAIN_WHITE};
    margin:0;
    margin-inline:20px;
    font-weight: 400;
    font-size:1.8rem;
` 

const ExitButton = styled.button`
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
margin:3px;
cursor: pointer;
transition: all 0.2s;

:hover{
    background-color:${vars.MAIN_WHITE};
    fill:${vars.MAIN_BLUE};
}

`

export default function search() {
  const router = useRouter()
  // const [searchResults, setSearchResults] = useState(null);
  // const [loading, isLoading] = useState(true)

  // if(loading)return <Main> <DualRing/> </Main>

  return (
    <Main>
      <Cont>
      <section
      style={{display: 'flex',padding:20, top: '5%', position:'absolute'}}>
      <ButtonCont>
        <ExitButton onClick={()=>{router.back()}}><LeftArrow /></ExitButton>
      </ButtonCont>
      <Header>Search for songs, albums, artist and other users </Header>
      </section>
      </Cont>
    </Main>
  )
}
