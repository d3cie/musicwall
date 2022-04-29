import React from 'react'
import styled from 'styled-components'
import Profile from '../compounds/Profile'
import * as vars from '../../vars'
import SecondaryButton from '../primitives/Buttons/SecondaryButton'
import Fire from '../primitives/Icons/Fire'
import Thumbtack from '../primitives/Icons/Thumbtack'
import ReactCountryFlag from "react-country-flag"

const Wrapper = styled.div`
    width:100wv; 
    /* width:fit-content; */
    background-color: ${vars.DARK_GREY};
    height:fit-content;
    padding:20px;
    display:flex;
    @media (max-width: 500px) {
        padding-inline:0px;
}
    flex-direction:column;
    border-bottom:solid 1px ${vars.DARK_GREY};
    align-items:center;
    justify-content:center;
    
    `

const Cont = styled.div`
    width:100%;
    padding:20px;
    @media (max-width: 650px) {
        margin-bottom:-25px;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    `
const Bio = styled.div`
        font-weight: 100;
    font-size: 1.1rem;
    color:${vars.MAIN_WHITE};
    margin: 20px 0;
    white-space: pre-line;
@media (max-width: 650px) {
    display: none;
}
    /* width:100%; */
    /* overflow: hidden; */
    /* text-overflow: ellipsis; */
    /* white-space: nowrap; */
    `
const BioMobile = styled.div`
     font-weight: 400;
    font-size: 1.2rem;
    color:${vars.MAIN_WHITE};
    margin: 20px 0;
    line-height: 1.4rem;
    padding-inline:20px;
    white-space: pre-line;
    @media (min-width: 650px) {
        display:none;
}
@media (max-width: 650px) {
    font-size: 1rem;

       margin:10px 0px;
}
  
    `

const PinsCont = styled.div`
    font-weight: 400;
    color:${vars.MAIN_WHITE};
    
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
        font-size: 1em;
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
    `
const ProfileCont = styled.div`
    max-width:130px;
    width:100%;
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
        <Wrapper>
            <Cont>
                <ProfileCont>
                    <Profile
                        imagesrc='' />
                </ProfileCont>
                <DetailsCont>
                    <Name>{props.DisplayName} 
                       
                    <ReactCountryFlag
                        countryCode="ZW"
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
                
                    <SecondaryButton style={{ marginLeft: '30px' }} state={'activei'} buttonTitle={'pin'} /></Name>
                    <div style={{ display: 'flex' ,flexDirection:'column'}}>
                        <PinsCont>
                            <Fire /> <b>436</b>
                        </PinsCont>
                        <PinsCont style={{ fill: vars.MAIN_RED }}>
                            <Thumbtack /> <b/>Pinned By<a><b>40</b>Pinned</a><b>40</b> 
                        </PinsCont>
                    </div>
                    <Bio>
                        {props.bio}
                    </Bio>
                </DetailsCont>
            </Cont>
            <BioMobile>
                        {props.bio}
                    </BioMobile>
        </Wrapper>
    )
}
