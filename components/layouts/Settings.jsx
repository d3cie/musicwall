import React, { useState } from 'react';
import styled from 'styled-components'
import * as vars from '../../vars'
import { useRouter } from 'next/router'
import Profile from '../compounds/Profile';
import DualRing from '../primitives/Animations/DualRing';
import ArrowBracket from '../primitives/Icons/ArrowBracket';
import logoutservice from '../../services/logout'

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
    height:fit-content;
    position: absolute;
padding-bottom:20px;
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

    border-bottom: 1px solid ${vars.LIGHER_GREY};

    `
const Username = styled.div`
     color: ${vars.MAIN_WHITE};
    font-size: 16px;
    margin-left:5px;
    `

const Settings = (props) => {

    const [loggingout, setLoggingOut] = useState(false)
    const router = useRouter()

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
        <Wrapper {...props}>
            <DisplayBox>
                <ProfileCont>
                    <Profile profileImage={props.profileImage} width="90px" height="90px" />
                    <DetailsCont>
                        Account Actions
                        <Username>@{props.username}</Username>
                        <Username>{Math.round((Date.now() - Date.parse(props.since)) / 604800000)} Weeks Old</Username>
                    </DetailsCont>

                </ProfileCont>
                <Setting onClick={() => logOutHandler()}>
                    <ArrowBracket />
                    Log Out
                    <div hidden={!loggingout} style={{ marginTop: 40, position: "absolute", right: -20 }}>
                        <DualRing size={20} />

                    </div>

                </Setting>


            </DisplayBox>
        </Wrapper>
    );
}

export default Settings;