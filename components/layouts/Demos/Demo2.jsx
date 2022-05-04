import React from 'react';
import styled from 'styled-components'
import * as vars from '../../../vars'
import Album from '../../compounds/Album/AlbumMobile';
import Artist from '../../compounds/Artist/ArtistMobile';
import Song from '../../compounds/Song/SongMobile';
import ProfileBar from '../ProfileBar';

const Wrapper = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    padding-left:40px;
    justify-content: center;
    @media (max-width:1250px) {
      padding-left:20px;

        }
          @media (max-width: 850px) {
            padding-left:0px;

  }
    `

const DisplayBox = styled.div`
    width:fit-content;
    position: relative;
    /* padding:20px; */
    /* padding-left:40px; */
    height:fit-content;
    border-radius:4px;
    overflow: hidden;

    background-color: ${vars.LIGHT_GREY};

    & #profilebar{
        @media (min-width:650px) {
            min-width: 650px;
            width:100%
        }
    }
    `

const ItemCont = styled.div`
        /* margin:15px; */
        margin:10px;
    `
const ItemsCont = styled.div`
    margin-left:30px;
    margin-bottom:40px;

  
    margin-top:-10px;
    `

const Demo2 = () => {
    return (
        <Wrapper>
            <DisplayBox>
                <ProfileBar
                id = "profilebar"
                DisplayName = 'HeyItsFemzy'
                username = 'decefemz'
                bio = {`Hi friends 👋🏽\nWelcome to my wall.  Get ready to feast your ears on the best music planet earth 🌍 has to offer.🤪  `}
                 
                 />
               </DisplayBox>
        </Wrapper>
    );
}

export default Demo2;
