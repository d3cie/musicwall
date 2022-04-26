import React, {useState, useEffect} from 'react'
import * as vars from '../../vars'
import styled from 'styled-components'
import Logo from '../primitives/Logo/Icon'
import Compass from '../primitives/Icons/Compass'
import Profile from '../compounds/Profile'
import SearchBox from '../primitives/Inputs/SearchBox'
import {useRouter} from 'next/router'

const Wrapper = styled.div`
    width:100%; 
    background-color: ${vars.DARK_GREY};
    height:60px;
    /* padding:20px; */
    display:flex;
    overflow: hidden;
    align-items:center;
    justify-content:center;`
    

const Cont = styled.div`
    max-width:${vars.MAX_WIDTH};
    width:100%;

    display:flex;
    `
const LogoCont = styled.div`
    height:60px;
        transition: all 0.2s;

    padding:12px 20px;
    `
const Navigation = styled.nav`
    height:60px;
    padding:12px 20px;
    flex:3;
    display: flex;
        color:#00000000;
    font-size:.0rem;
    align-items: center;
    justify-content: flex-end;
    `
const NavBut = styled.button`
    height:100%;
    background-color:#00000000;
    border:none;

    @keyframes fadeOut {
        from { opacity:1; transform: translateX(0);}
        to { opacity:0; transform: translateX(20px);}
    }
    @keyframes fadeIn {
        to { opacity:1; transform: translateX(0);}
        from { opacity:0; transform: translateX(20px);}
    }

    margin-inline:8px;
`
const SearchBarCont = styled.div`
    height:60px;
    /* padding:12px 20px; */
    flex:1;
    display: flex;
    @media (min-width: 400px) {
        @keyframes fadeO {
        from {transform: translateX(0);}
        to { transform: translateX(100px);
}
    }
    @keyframes fadeI {
        to { transform: translateX(-0px);
}
        from { transform: translateX(100px);
}
    }
    }
  
    align-items: center;
    transition: all 0.2s;
    /* position:absolute; */
    /* margin-right:20px; */
    justify-content: flex-end;
    `

const ProfileCont = styled.div`
    display:flex;
    align-items: center;
    /* aspect-ratio: 1/1; */
    height: 100%;
    justify-content: center;
   
    @keyframes fadeOut {
        from { opacity:1; transform: translateX(0);}
        to { opacity:0; transform: translateX(20px);}
    }
    @keyframes fadeIn {
        to { opacity:1; transform: translateX(0);}
        from { opacity:0; transform: translateX(20px);}
    }`



export default function NavBar() {
    const [isSearching, setIsSearching] = useState(null)
    const [timeOut, setTimeOut] = useState(true)
    // useEffect(()=>{
    //     window.addEventListener('searched', ()=>{setIsSearching(true)})
    // }
    //     ,{})

    // function setIsSearchingState(state){
    //     setIsSearching(state)
    // }

  return (
      <Wrapper>
            <Cont>
                <LogoCont>

                   
                    <Logo/>

                </LogoCont>

                <Navigation>
                    <SearchBarCont
                    style = {{ animation: (isSearching != null)?(isSearching)?'fadeO .2s ease-in-out forwards': 'fadeI .2s ease-in-out forwards':'' }}

                    >
                    <SearchBox
                    searchButtonOnClick = {()=>{
                        if(!isSearching){
                            setIsSearching(true)}
                        if(isSearching){
                          
                            setIsSearching(false)
                        }
                    }}
                    isExpanded = {isSearching}/>
                </SearchBarCont
                
                >
         
                {/* setTimeout(()=>{return ''}, 200 ) */}
                    {/* {(isSearching)? '' :  */}
                    <NavBut 
                   
                    style = {{ animation: (isSearching != null)?(isSearching)?'fadeOut .2s ease-in-out forwards': 'fadeIn .2s ease-in-out forwards':'' }}>

                        <Compass/>

                    </NavBut>
                    {/* } */}

                    {/* {(isSearching)? '':  */}

                        <ProfileCont

                                            style = {{ animation: (isSearching != null)?(isSearching)?'fadeOut .2s ease-in-out forwards': 'fadeIn .2s ease-in-out forwards':'' }}
                                            >
                        <Profile
                        padding = "2px"
                        height = "32.5px"
                        width = '32.5px'/>
                        </ProfileCont>
                        {/* } */}
                </Navigation>
                
            </Cont>
      </Wrapper>
    
  )
}
