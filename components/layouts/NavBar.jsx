import React, { useState, useEffect, useContext } from 'react'
import * as vars from '../../vars'
import styled from 'styled-components'
import Logo from '../primitives/Logo/Icon'
import Compass from '../primitives/Icons/Compass'
import Profile from '../compounds/Profile'
import SearchBox from '../primitives/Inputs/SearchBox'
import { useRouter } from 'next/router'
import { LoginContext } from '../../pages/_app'
import SecondaryButton from '../primitives/Buttons/SecondaryButton'
import TertiaryButton from '../primitives/Buttons/TertiaryButton'
import MagnifyingGlass from '../primitives/Icons/MagnifyingGlass'
import Plus from '../primitives/Icons/Plus'
import House from '../primitives/Icons/House'
import Bell from '../primitives/Icons/Bell'
import Notifications from './Notifications'
import { motion } from 'framer-motion'
import Link from 'next/link'


const Wrapper = styled(motion.div)`
    width:100%; 
    background-color: ${vars.DARK_GREY};
    height:60px;
    /* padding:20px; */
    display:flex;
    position: fixed;
    border-bottom:solid 1px ${vars.LIGHER_GREY};
    overflow: hidden;
    margin-bottom: -1px;
    z-index: 30;
    align-items:center;
    justify-content:center;`


const Cont = styled.div`
    /* max-width:${vars.MAX_WIDTH}; */
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
    /* flex:3; */
    width:100%;
    display: flex;
        color:#00000000;
    font-size:.0rem;
    align-items: center;
    justify-content: flex-end;
    `
const NavBut = styled.button`
    height:34px;
    background-color:${vars.MAIN_WHITE};
       fill:${vars.GREY};
    border-radius:50%;
    display: flex;
    width:34px;
    margin-inline:5px!important;
    align-items: center;
    justify-content: center;
    border:none;
    padding:0;
    transition: all 0.2s;
    :hover{
        filter:brightness(105%);
    }
    
    cursor: pointer;


    @keyframes fadeOut {
        from { opacity:1; transform: translateX(0);}
        to { opacity:0; transform: translateX(20px);}
    }
    @keyframes fadeIn {
        to { opacity:1; transform: translateX(0);}
        from { opacity:0; transform: translateX(20px);}
    }

    margin-inline:4px;
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
    margin-left: 4px;
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


const navbarVariants = {
    enter: {
        opacity: 1,
        y: 0
    },
    exit: {
        opacity: 0,

        y: -10
    }
}

export default function NavBar(props) {

    const isLogged = useContext(LoginContext)

    const router = useRouter()


    return (
        <Wrapper
            id="navbar"
            variants={navbarVariants}
            initial={'exit'}
            animate={'enter'}
        >
            <Cont>
                <Link href={'/'}>
                    <LogoCont>
                        <Logo />
                    </LogoCont>
                </Link>
                {(isLogged != null) ?
                    <Navigation>
                        {/* <NavBut

                            onClick={() => { router.push('/explore') }}>
                            <Compass />
                        </NavBut> */}
                        {/* <NavBut
                            onClick={() => props.showHideNotifs(showHideNotifsPrev => !showHideNotifsPrev)}
                            style={{ padding: '7px', background: vars.MAIN_WHITE }}>
                            <Bell style={{ fill: vars.DARK_GREY }} />
                        </NavBut> */}

                        <NavBut
                            onClick={() => router.push('/search')}
                            style={{ padding: '5px', background: vars.MAIN_WHITE }}>
                            <Plus style={{ fill: vars.DARK_GREY }} />
                        </NavBut>

                        <ProfileCont
                            id="profileimage"
                            onClick={() => props.showHideSettings(showHideSettings => !showHideSettings)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Profile
                                padding="2px"
                                profileImage={isLogged.profileinfo.profileimage}
                                height="32.5px"
                                width='32.5px' />
                        </ProfileCont>
                        {/* } */}

                    </Navigation>
                    : <Navigation>

                        <SecondaryButton onClick={() => { router.push(`/accounts/login?next=${router.asPath}`) }} style={{ width: 'fit-content', padding: '18px 20px' }} buttonTitle={'Log In'} />
                        <TertiaryButton onClick={() => router.push(`/accounts/signup`)} buttonTitle={'Sign up'} />
                    </Navigation>}

            </Cont>
        </Wrapper>

    )
}
