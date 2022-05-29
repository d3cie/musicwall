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

    /* & #profilebar{
        @media (min-width:650px) {
            min-width: 650px;
            width:100%
        }
    } */
    `
function fakePins() {
    let follows = [];
    for (let i = 0; i < 46; i++) {
        follows.push('')
    }
    return follows
}

const Demo2 = () => {
    return (
        <Wrapper>
            <DisplayBox>
                <ProfileBar
                    demo={true}
                    profileBarAnimation={true}
                    profile={
                        {
                            since: '2021-11-26T12:02:10.767Z',
                            username: 'decefemz',

                            profileinfo: {
                                displayname: 'HeyItsFemzy',
                                bio: `Hi friends 👋🏽\nWelcome to my wall.  Get ready to feast your ears on the best music planet earth 🌍 has to offer.🤪  `
                            },
                            pins: [],
                            pinnedby: [...fakePins()]
                        }
                    }
                    id="profilebar"


                />
            </DisplayBox>
        </Wrapper>
    );
}

export default Demo2;
