import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import * as vars from '../../vars'
import { useRouter } from 'next/router'
import Profile from '../compounds/Profile';
import DualRing from '../primitives/Animations/DualRing';
import ArrowBracket from '../primitives/Icons/ArrowBracket';
import logoutservice from '../../services/logout'
import User from '../primitives/Icons/User';
import Gear from '../primitives/Icons/Gear';
import Thumbtack from '../primitives/Icons/Thumbtack'
import Pencil from '../primitives/Icons/Pencil';


const Wrapper = styled.div`
    width:100%;
        /* padding-right:40px; */
        position: fixed;
        z-index: 90;
        top:60px;
        
        right:0;
        @media (max-width: 650px) {
            height:100%;
  }
`
const Title = styled.h1`
    font-weight: 400;
    font-size: 2em;
    color:${vars.MAIN_WHITE};
    line-height: 32px;
    margin: -5px 0 -6px;
        margin: 10px 0;

    display: flex;
    margin-top:0px;
    margin-bottom:5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    `

const DisplayBox = styled.div`
    width:400px;
    position: relative;
    margin:10px;
    /* padding-left:40px; */
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        height:fit-content;
    position: absolute;
padding-bottom:00px;
        z-index: 30;
        right:0;
    border-radius:4px;
    background-color: ${vars.LIGHT_GREY};
  border:solid 1px ${vars.LIGHER_GREY};
    @media (max-width: 650px) {
        margin:0px;
        border:none;

    width:100%;
    border-radius:0px;
    height: 100%;

  }
  
    `

const ProfileCont = styled.div`
    display:flex;
    align-items: left;
    justify-content: left;
    padding:20px;
    /* margin-bottom: 20px; */
    border-bottom: 1px solid ${vars.LIGHER_GREY};
    flex-direction: row;
    `
const DetailsCont = styled.section`
/* margin:-5px 0px 0px 30px; */
padding:20px;
font-size:25px;

padding-top:0px;
padding-right:0;
color: ${vars.MAIN_WHITE};


`

const Setting = styled.div`
    height:50px;
    width:100%;
    cursor:pointer;
display:flex;
     font-weight: 400;
    font-size: 18px;
    color:${vars.MAIN_WHITE};
  align-items:center;
    text-justify: center;
    padding:15px;
    padding-inline:20px;
    transition: all 0.2s;
    &:hover{
        background: ${vars.LIGHER_GREY};
    }
    & svg{
        fill: ${vars.MAIN_WHITE};
        margin-right:10px;
        opacity:.9;
    }

    /* border-bottom: 1px solid ${vars.LIGHER_GREY}; */

    `
const Username = styled.div`
     color: ${vars.MAIN_WHITE};
    font-size: 16px;
    margin-left:5px;
    `

const Settings = (props) => {

    const [loggingout, setLoggingOut] = useState(false)
    const router = useRouter()
    const ref = useRef()

    useEffect(() => {
        props.close()

        window.addEventListener('mousedown', (e) => {


            if (!ref.current.contains(e.target)
                &&
                !document.querySelector('#navbar').contains(e.target)
            ) {
                props.close()

            }

        })
        // if (concernedElement.contains(event.target)) {
        //     console.log("Clicked Inside");
        //   } else {
        //     console.log("Clicked Outside / Elsewhere");
        //   }

    }, [router.pathname])


    const myPageHandler = () => {
        if (router.asPath == `/u/${props.username}`) {
            props.close()
            props.pinsHandler(false)
            return
        }
        router.push(`/u/${props.username}`)
        props.close()

    }

    const settingsHandler = () => {
        router.push('/accounts/edit')
        props.close()

    }
    const pinsHandler = () => {
        props.pinsHandler(true)
        props.close()
    }
    const logOutHandler = () => {
        setLoggingOut(true)
        logoutservice().then(res => {
            if (res.status == 'success') {

                setLoggingOut(false)
                router.reload(window.location.pathname)

                return
            }
        }
        )
    }
    return (
        <Wrapper ref={ref} id="settings" {...props}>
            {/* <OutsideClickHandler onOutsideClick={() => props.close()}> */}
            <DisplayBox>
                <ProfileCont>
                    <Profile profileImage={props.profileImage} width="90px" height="90px" />
                    <DetailsCont>
                        Account Actions
                        <Username>@{props.username}</Username>
                        <Username>{Math.round((Date.now() - Date.parse(props.since)) / 604800000)} Weeks Old</Username>
                        {/* <Username>Pins <b>{props.pins.length}</b> pages and is pinned by <b>{props.pinned.length || 0}</b> others</Username> */}
                    </DetailsCont>

                </ProfileCont>

                <Setting onClick={() => myPageHandler()} >
                    <User />
                    My Page
                </Setting>

                {/* <Setting  >
                    <Pencil style={{ fill: "#00000000" }} />
                    {'Stickers & Awards W/P'}
                </Setting> */}

                {/* <Setting onClick={() => pinsHandler()}  >
                    <Thumbtack />
                    {'Pins'}
                </Setting> */}

                <Setting onClick={() => settingsHandler()}>
                    <Pencil />
                    Edit Profile
                </Setting>
                {/* 
                <Setting style={{ marginTop: 1, borderTop: `1px solid ${vars.LIGHER_GREY}` }} >
                    <Pencil style={{ fill: "#00000000" }} />
                    Upgrade Account
                </Setting> */}


                <Setting style={{ marginTop: 1, borderTop: `1px solid ${vars.LIGHER_GREY}` }} onClick={() => logOutHandler()}>
                    <ArrowBracket />
                    Log Out
                    <div hidden={!loggingout} style={{ marginTop: 40, position: "absolute", right: -20 }}>
                        <DualRing size={20} />

                    </div>

                </Setting>
                <div
                    style={{ color: "#bbb", borderTop: `1px solid ${vars.LIGHER_GREY}`, textAlign: "center" }}
                ></div>

            </DisplayBox>
            {/* </OutsideClickHandler> */}
        </Wrapper >
    );
}

export default Settings;
