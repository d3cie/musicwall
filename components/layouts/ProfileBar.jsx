import React from 'react'
import styled from 'styled-components'
import Profile from '../compounds/Profile'
import * as vars from '../../vars'
import SecondaryButton from '../primitives/Buttons/SecondaryButton'
import Fire from '../primitives/Icons/Fire'
import Thumbtack from '../primitives/Icons/Thumbtack'
import ReactCountryFlag from "react-country-flag"
import Share from '../primitives/Icons/Share'

const Wrapper = styled.div`
    width:100wv; 
    /* width:fit-content; */
    background-color: ${vars.GREY};
    height:fit-content;
    padding:20px;
    padding-top:20px;
    border-bottom:solid 1px ${vars.LIGHER_GREY};

    display:flex;
    @media (max-width: 500px) {
        padding-inline:10px;
        padding-bottom:40px;

}
    flex-direction:column;
    /* border-bottom:solid 1px ${vars.DARK_GREY}; */
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

    /* width:100%; */
    /* overflow: hidden; */
    /* text-overflow: ellipsis; */
    /* white-space: nowrap; */
    `
const BioMobile = styled.div`
     font-weight: 400;
     width:100%;
    font-size: 1.2rem;
    color:${vars.MAIN_WHITE};
    margin: 20px 0;
    line-height: 1.4rem;
    padding-inline:20px;
    white-space: pre-line;
    @media (min-width: 650px) {
        /* display:none; */
}
@media (max-width: 650px) {
    font-size: 1rem;

       margin:10px 0px;
}
  
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
    
    fill:${vars.ORANGE};
    font-size: 1.1em;
    height:1.6em;
    & b{
        margin-inline:5px;
        ;

    }
    @media (max-width: 650px) {
        font-size: 1.1em;
        margin:2px;

        /* margin-top:-10px; */
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
/* align-items: center;
justify-content: center; */
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

export default function ProfileBar(props) {
    return (
        <Wrapper {...props}>


            <Cont>

                <ProfileCont>
                    <Profile
                        profileImage={props.profileimage} />
                </ProfileCont>
                <DetailsCont>
                    <Name>{props.DisplayName}

                        <ReactCountryFlag
                            countryCode={props.countrycode}
                            svg
                            style={{
                                // padding: '2px',
                                margin: '.5rem 0 0 10px ',
                                borderRadius: '4px',

                                // width: '2.2rem',
                                height: '100%',
                            }}
                            title="US"
                        />

                       
                    </Name>
                    <div id='username'>@{props.username}</div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {/* <PinsCont>
                            <Fire /> <b>436</b>
                        </PinsCont> */}
                        <PinsCont style={{ fill: vars.MAIN_RED }}>
                            <Thumbtack /> <b>40</b>Pins
                        </PinsCont>
                    </div>
                   
                </DetailsCont>
    
            </Cont>

            <Cont>
            <Bio>
                        {props.bio}
                    </Bio>

                  
            </Cont>
            <Cont>
            <ButtonCont>
                {(props.isProf)?
                    <SecondaryButton style={{ marginLeft: '30px' }} onClick = {()=>window.location.href = `/accounts/edit?next=/u/${props.username}`} buttonTitle={'Edit Profile'} />
                :    <SecondaryButton style={{ marginLeft: '30px' }} state={'activ'} buttonTitle={'Pin'} />}
                        <SecondaryButton style={{ border:"none", background:vars.LIGHT_GREY,border:`1px solid ${vars.LIGHER_GREY}`}} buttonTitle={ "Share"} />
                    </ButtonCont>
            </Cont>
        </Wrapper>
    )
}
