import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import Profile from '../compounds/Profile'
import * as vars from '../../vars'
import SecondaryButton from '../primitives/Buttons/SecondaryButton'
import Fire from '../primitives/Icons/Fire'
import { LoginContext } from '../../pages/_app'
import Thumbtack from '../primitives/Icons/Thumbtack'
import ReactCountryFlag from "react-country-flag"
import pinuserservice from '../../services/pinuser'
import unpinuserservice from '../../services/unpinuser'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const Wrapper = styled(motion.div)`
    width:100wv; 
    /* width:fit-content; */
    background-color: ${vars.GREY};
    height:fit-content;
    /* min-height: 350px; */
    padding-inline:20px;
    /* padding-top:20px; */

    border-bottom:solid 1px ${vars.LIGHER_GREY};

    display:flex;
    @media (max-width: 500px) {
        padding-inline:10px;
        /* padding-bottom:30px; */

}
    flex-direction:column;
    align-items:center;
    justify-content:center;
    `
const Cont = styled.div`
    width:100%;
    position: relative;
    padding:20px;
    padding-bottom:0px;
    @media (max-width: 650px) {
        /* margin-bottom:-25px; */
        padding-inline:5px;

}
    max-width:${vars.MAX_WIDTH};
    display:flex;
    `
const Name = styled.h1`
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
const Bio = styled.div`
        font-weight: 400;
    font-size: 1.1rem;
    color:${vars.MAIN_WHITE};
    white-space: pre-line;
    padding-right: 20px;
    margin-left: 10px;
    margin-top:-20px;
    `
const PinsCont = styled.div`
    font-weight: 400;
    color:${vars.MAIN_WHITE};
    border:1px ${vars.LIGHT_GREY} solid;
    padding:2px;
    background-color:${vars.LIGHT_GREY};
    border-radius: 4px;
    padding:3px;
    margin:5px;
    /* border:solid 2px ${vars.GREY}; */
    padding-inline:10px;
    display:flex;
    align-items:center;
    width:fit-content;
    
    fill:${vars.YELLOW};
    font-size: 1.1em;
    height:1.6em;
    & b{
        margin-inline:5px;
        ;

    }
    @media (max-width: 650px) {
        font-size: 1.1em;
        margin:2px;
    }
    `
const DetailsCont = styled.section`
    margin:-5px 0px 0px 30px;
    padding:20px;
    font-size:16px;
    @media (max-width: 650px) {
        font-size:14px}
    padding-top:0px;
    padding-right:0;

    & #username{
        color: ${vars.MAIN_WHITE};
        font-size: 1.2em;
        margin-bottom:15px;
    }
    `
const ButtonCont = styled.div`
width: 100%;
display: flex;
margin-left:-20px;
margin-bottom:20px;
    `
const ProfileCont = styled.div`
    max-width:130px;
    width:100%;
    transform:scale(.8);
    max-width: 100px;
        margin-top:-10px;
    @media (max-width: 650px) {
        transform:scale(.8);
        max-width: 100px;
        margin-top:-10px;
}
@media (max-width: 500px) {
        transform:scale(.7);
        max-width: 70px;
        margin-top:-18px;
}
    `

const variants = {
    enter: {
        height: 'fit-content',
    },
    exit: {
        height: '150vh',
    },
}
const Contvariants = {
    enter: {
        opacity: 1
    },
    exit: {
        opacity: 0
    },
}

export default function ProfileBar(props) {
    const isLogged = useContext(LoginContext)
    const [isUserPinnedState, setIsUserPinnedState] = useState(false)
    const [isWorkingOnPin, setIsWorkingOnPin] = useState(false)

    const router = useRouter()

    function isUserPinned() {
        props.profile.pinnedby.map(({ username }) => { if (username == isLogged?.username) setIsUserPinnedState(true) })
    }
    useEffect(() => {
        isUserPinned()
    }, [])

    function pinUser(username) {
        if (!props.demo) {


            setIsWorkingOnPin(true)
            if (!isWorkingOnPin) {
                pinuserservice(username).then((res) => {
                    if (res.status == 'success') {
                        setIsWorkingOnPin(false)
                        setIsUserPinnedState(true)
                        return
                    }
                    setIsWorkingOnPin(false)
                })
            }
        }
    }
    function unpinUser(username) {
        if (!props.demo) {

            setIsWorkingOnPin(true)
            if (!isWorkingOnPin) {
                unpinuserservice(username).then((res) => {
                    if (res.status == 'success') {
                        setIsWorkingOnPin(false)
                        setIsUserPinnedState(false)
                        return
                    }
                    setIsWorkingOnPin(false)
                })
            }
        }
    }

    return (
        <Wrapper
            animate={props.profileBarAnimation ? "enter" : "exit"}
            variants={variants}
            transition={{ duration: .3, type: 'easeInOut' }}
            // transition={'ease-in-out'}
            initial={{ height: '150vh' }}
            {...props}>

            <motion.div
                animate={props.profileBarAnimation ? "enter" : "exit"}
                variants={Contvariants}
                // transition={"easeInOut"}
                style={{ width: '100%', marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
                transition={{ delay: .1, type: 'easeInOut' }}
                initial={{ opacity: 0 }}
            >


                <Cont >

                    <ProfileCont>
                        <Profile
                            profileImage={props.profile.profileinfo.profileimage} />
                    </ProfileCont>
                    <DetailsCont>
                        <Name>{props.profile.profileinfo.displayname || props.profile.username}

                            <ReactCountryFlag
                                countryCode={props.profile.profileinfo.countrycode}
                                svg
                                style={{
                                    margin: '.5rem 0 0 10px ',
                                    borderRadius: '4px',
                                    height: '100%',
                                }}
                                title="US"
                            />


                        </Name>
                        <div id='username'>@{props.profile.username}</div>

                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {/* <PinsCont>
                            <Fire /> <b>{props.profile.points || 0}</b> Points
                        </PinsCont> */}
                            <PinsCont style={{ fill: vars.MAIN_RED }}>
                                <Thumbtack /> <b></b>Pinned by<b>{props.profile.pinnedby.length}</b>others
                            </PinsCont>
                        </div>
                        <PinsCont style={{ fill: vars.MAIN_RED }}>
                            <b>{Math.round((Date.now() - Date.parse(props.profile.since)) / 604800000)}</b>Weeks Old
                        </PinsCont>
                    </DetailsCont>

                </Cont>

                <Cont>
                    <Bio>
                        {props.profile.profileinfo.bio}
                    </Bio>


                </Cont>
                <Cont>
                    <ButtonCont>
                        {((props.demo ? { username: props.profile.username } : isLogged?.username) == props.profile.username) ?
                            <SecondaryButton style={{ marginLeft: '30px', width: 'fit-content' }} onClick={() => router.push(`/accounts/edit`)} buttonTitle={'Edit Profile'} />
                            : <SecondaryButton buttonwidth={'80px'} style={{ marginLeft: '30px' }} onClick={() => { (!isUserPinnedState) ? pinUser(props.profile.username) : unpinUser(username) }} isWorking={isWorkingOnPin} state={(isUserPinnedState) ? 'active' : 'a'} buttonTitle={(isUserPinnedState) ? 'Pined' : 'Pin'} />}
                        <SecondaryButton style={{ border: "none", background: vars.LIGHT_GREY, border: `1px solid ${vars.LIGHER_GREY}` }} buttonTitle={"Share"} />
                    </ButtonCont>
                </Cont>
            </motion.div>
        </Wrapper>
    )
}
