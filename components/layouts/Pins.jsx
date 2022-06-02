import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import * as vars from '../../vars'
import Profile from '../compounds/Profile'
import { useRouter } from 'next/router'
import SecondaryButton from '../primitives/Buttons/SecondaryButton'
import Plus from '../primitives/Icons/Plus'
import RightArrow from '../primitives/Icons/RightArrow'
import LeftArrow from '../primitives/Icons/LeftArrow'
import getmanyusers from '../../services/getmanyusers'
import DualRing from '../primitives/Animations/DualRing'
import Link from 'next/link'

const Cont = styled.div`
    width: 100%;
    position:fixed;
    left:0;
    top:0;
    padding:20px;
    padding-inline:0;
    padding-top:60px;
    z-index:25;
    height: 100%;
    overflow:hidden;
    background: #000000aa;
    transition: all .2s;
      @media (max-width: 600px) {
      background-color: ${vars.GREY};
      height: 160vh;

    }
    display:flex;
    flex-direction: 'column';
    justify-content: center;
    align-items: center;
    `
const FormCont = styled.div`
    width:fit-content;
    min-width:400px;
    min-height:350px;
    height: fit-content;
    @keyframes fadein {
      from{
        opacity:0;
      }
      to{
        opacity:1;
      }
    }
    background-color: ${vars.GREY};
    /* padding:20px; */
    /* padding-bottom: 20px; */
    /* padding-top:40px; */
    border:solid 1px ${vars.LIGHT_GREY};
    @media (max-width: 600px) {
      border:none;
        width:100%;
        height:100%;
      padding:0px;
    }
    border-radius: 4px;

   `
const TopBar = styled.div`
display:flex;
position:relative;
    background-color: ${vars.DARK_GREY};

/* height:35px; */
align-items:center;
fill:${vars.MAIN_WHITE};
justify-content:center;
padding:10px;
/* padding-right:20px; */
border-bottom: 1px solid ${vars.LIGHT_GREY};
position:relative;
& button{
    background-color: #00000000;
    padding:0;
    margin:0;
    left:20px;
    justify-content:center;
    align-items: center;
    display: flex;
    position: absolute;
    border:none;
    cursor: pointer;
    transition: all .2s;
    :hover{
        fill:${vars.MAIN_BLUE};
    }
}
`

const Title = styled.h2`
margin:0px;
font-size: 1.1rem;
font-weight: 400;
color:${vars.MAIN_WHITE};
`

const Switch = styled.div`
    display:flex;
    border-bottom: 1px solid ${vars.LIGHT_GREY};
    padding:5px;
    background-color: ${vars.DARK_GREY};

    /* padding-inline:10px; */

    & div{
        flex:1;
        padding:5px;
        text-align:center;
        color:${vars.MAIN_WHITE};
        cursor: pointer;
        :hover{
            filter:brightness(105%);
        }
        font-weight:600;
    }
    & .chosen{
        border-radius: 2px;
        border: 1px solid ${vars.PALE_BLUE};

        background-color: ${vars.MAIN_BLUE};
    }
    `

const Details = styled.div`
    margin-left:15px;

    font-weight: 500;

    color:${vars.MAIN_WHITE};
    & div{
        transition: all 0.2s;
        margin-top:-2px;
        cursor:pointer;
        font-weight: 400;
        :hover{
            color:${vars.ORANGE};}
    }

    & span{
        display: inline-block;
        opacity: .8;
    } 
    `

const User = styled.div`
    height:65px;
    /* padding:5px; */
    line-height:20px;
    padding-inline:20px;
  display: flex;
  align-items: center;
    width:100%;
    /* border-top:1px solid ${vars.LIGHER_GREY}; */
    border-bottom:1px solid ${vars.LIGHT_GREY};
    `
const ContInner = styled.div`
    margin-top:10px;
    max-height: 350px;
    overflow-y:scroll;
    background-color: ${vars.GREY};

    @media (max-width: 600px) {
      max-height: 45%;
        height:45%;
        border-bottom: 1px solid ${vars.LIGHT_GREY};
        margin-bottom:20px;
    }
    `
const LoadingCont = styled.div`
    display: flex;
    height:100%;
    @media (max-width: 600px) {
      max-height: 100%;
      height:80vh;

        
    }
    min-height: 250px;
    align-items: center;
    justify-content: center;
    `

export default function Pins(props) {
    const router = useRouter()
    const ref = useRef()
    const [pins, setPins] = useState([])
    const [switchState, setSwitchState] = useState(true)
    const [pinnedby, setPinnedBy] = useState([])
    const [loading, setLoading] = useState(true)

    const handleShare = () => {

        if (navigator.share) {
            navigator.share({
                title: `Hey!  Pin me on Musicwall (@${props.username}) to see my favorite music!`,
                url: `https://www.musicwall.cc/u/${username}`
            })
        } else {
            writeText(`https://www.musicwall.cc/u/${username}`)
            props.infotoast("Link copied to clipboard")

        }
    }

    const onRouteToPage = () => {
        props.close()
    }
    useEffect(() => {

        let userstoget = [];
        userstoget.push(
            ...props.pins.map(({ username }) => username),
            ...props.pinnedby.map(({ username }) => username)
        )
        userstoget = userstoget.filter((v, i, a) => a.findIndex(v2 => (v2 === v)) === i)

        if (userstoget.length) {
            getmanyusers(userstoget).then((res) => {
                setLoading(false)

                if (res.status == 'success') {
                    if (props.pins.length) {
                        setPins(
                            props.pins.map(({ username }, key) => {
                                for (let i = 0; i < res.body.length; i++) {
                                    if (res.body[i].username == username) {
                                        return <User key={key}>
                                            <Profile profileImage={res.body[i].image} padding={2} height={'40px'} width={'40px'} />
                                            <Details>
                                                {res.body[i].displayname}
                                                <Link href={`/u/${username}`}><div
                                                    onClick={() => onRouteToPage()}


                                                >@{res.body[i].username}</div></Link>
                                            </Details>
                                        </User>
                                    }

                                }
                            })
                        )
                    }
                    if (props.pinnedby.length) {
                        setPinnedBy(
                            props.pinnedby.map(({ username }, key) => {
                                for (let i = 0; i < res.body.length; i++) {
                                    if (res.body[i].username == username) {
                                        return <User key={key}>
                                            <Profile profileImage={res.body[i].image} padding={2} height={'40px'} width={'40px'} />
                                            <Details>
                                                {res.body[i].displayname}
                                                <Link href={`/u/${username}`}><div
                                                    onClick={() => onRouteToPage()}
                                                >@{res.body[i].username}</div></Link>
                                            </Details>
                                        </User>
                                    }

                                }
                            })
                        )
                    }
                }
                else {
                    props.onerror(`An error occured while loading(${res.error}).  Please try again.`)
                }


            }
            )

        } else {
            setLoading(false)
        }

        // props.close()
        // document.querySelector('html,body').overflowY = 'hidden'



    }, [router.pathname])

    return <Cont {...props}>
        <FormCont ref={ref}>
            <TopBar>
                <button onClick={() => props.close()}>
                    <LeftArrow height={'20px'} />
                </button>

                <Title>
                    {(switchState) ?
                        "People who have pinned you"
                        : "People you have pinned"}
                </Title>
            </TopBar>
            <Switch>
                <div onClick={() => { setSwitchState(true) }} className={(switchState) ? 'chosen' : ''} >Pinned by</div>
                <div onClick={() => { setSwitchState(false) }} className={(switchState) ? '' : 'chosen'} >Pins</div>
            </Switch>
            <div
                style={{ display: 'flex', marginTop: 20, flexDirection: 'column', alignItems: 'center' }}
            >
                {(!pinnedby.length && !loading && switchState) ? <Title>You have not been pinned by anyone yet.</Title> : ''}
                {(!pins.length && !loading && !switchState) ? <Title>You have not pinned anyone yet.</Title> : ''}

            </div>
            {
                (!loading) ? <ContInner>
                    {!switchState ? pins : pinnedby}

                </ContInner> : <LoadingCont><DualRing /></LoadingCont>

            }
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SecondaryButton onClick={() => handleShare()} style={{ width: '350px' }} buttonTitle={'Invite Friends'} />
            </div>
        </FormCont>
    </Cont>

}
