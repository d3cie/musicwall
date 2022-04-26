import React from 'react'
import styled from 'styled-components'
import Profile from '../compounds/Profile'
import * as vars from '../../vars'

const Wrapper = styled.div`
    width:100wv; 
    /* width:fit-content; */
    background-color: ${vars.DARK_GREY};
    height:fit-content;
    padding:20px;
    display:flex;
    align-items:center;
    justify-content:center;
    `

const Cont = styled.div`
    width:100%;
    padding:20px;
    max-width:${vars.MAX_WIDTH};
    display:flex;
    `
const Name = styled.h1`
    font-weight: 300;
    font-size: 2.2rem;
    color:${vars.MAIN_WHITE};
    line-height: 32px;
    margin: -5px 0 -6px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    `
const DetailsCont = styled.section`
    margin:0 0px 0px 30px;
    padding:20px;
    `
    const ProfileCont = styled.div`
    max-width:200px;
    width:100%;
    `

export default function ProfileBar() {
  return (
    <Wrapper>
        <Cont>
            <ProfileCont>
                <Profile 
                     imagesrc = ''/>
             </ProfileCont>
        <DetailsCont>
        <Name>Decefemz</Name>
        </DetailsCont>
        </Cont>
    </Wrapper>
  )
}
