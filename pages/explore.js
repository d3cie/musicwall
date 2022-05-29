import React, { useEffect, useState } from 'react';
import * as vars from '../vars'
import styled from 'styled-components'
import SongSearchDummy from '../components/compounds/Song/SongSearchDummy';
import TopResultDummy from '../components/compounds/TopResultSearch/TopResultSearchDummy';
import getTopSongs from '../services/getTopSongs';
import SongSearch from '../components/compounds/Song/SongSearch';
import artistsToString from '../utils/artistsToString';
import TopResult from '../components/compounds/TopResultSearch';

const Wrapper = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /* padding-top:600px; */
    /* height:90vh; */
    background-color: ${vars.GREY};
    `

const Cont = styled.section`   
    margin-top:20px;

    max-width:${vars.MAX_WIDTH};
    width:100%;
    padding:20px;

    display: flex;
        
    @media (max-width:1000px) {

flex-direction:column;
}
    `
const Title = styled.div`
    color:${vars.MAIN_WHITE};
    margin-top:5px;
    font-size:25px;
    margin-bottom:20px;
    font-weight: 500;
  
    `
const Column = styled.div`
    flex:1;
    display:flex;
        flex-direction: column;
    @media (min-width:1000px) {

        margin-right:20px;
}
    `

const TopSongsCont = styled.section`
    width:100%;
    
    margin-bottom:40px;

    `

const TopSongsContInner = styled.div`
    width:100%;
        color:${vars.MAIN_WHITE};
    margin-top:5px;
    font-size:20px;
    margin-bottom:15px;
    font-weight: 500;
    `
const TopSongs = styled.div`
    display:flex;
    align-items: center;
    & label{
        font-size:20px;
        color:${vars.MAIN_WHITE};
        /* line-height:25px; */
        text-justify: 'center';
        /* text-align: center; */
        height:25px;
        width:25px;
        /* border:solid 1px ${vars.LIGHER_GREY};
        border-radius:50%; */
        margin-right:10px;
        /* background-color: ${vars.LIGHT_GREY}; */
    }
    `
const Pins = styled.div`
    width:100%;
    height:600px; 
    background-color: ${vars.LIGHT_GREY};
    border-radius: 4px;
    `

const topSongsDummies = [
    <TopSongs key={1}><label>2. </label><SongSearchDummy showAdd={true} /></TopSongs>,
    <TopSongs key={2}><label>3. </label><SongSearchDummy showAdd={true} /></TopSongs>,
    <TopSongs key={3}><label>4. </label><SongSearchDummy showAdd={true} /></TopSongs>,
    <TopSongs key={4}><label>5. </label><SongSearchDummy showAdd={true} /></TopSongs>
]


const Explore = () => {

    const [topSongs, setTopSongs] = useState(topSongsDummies)
    const [topSong, setTopSong] = useState(<TopResultDummy />)


    useEffect(() => {
        document.querySelector('html,body').style.background = vars.GREY
        getTopSongs().then((res) => {
            setTopSongs(res.songs.map((song, i) => {
                if (i == 0) {
                    setTopSong(
                        <TopResult
                            AlbumName={song.albumName}
                            AlbumCover={song.albumArt}
                            SongName={song.songName}
                            SongArtist={artistsToString(song.artist)}

                        />
                    )
                    return
                }
                return <TopSongs key={i}><label>{i + 1}. </label>
                    <SongSearch
                        AlbumName={song.albumName}
                        AlbumCover={song.albumArt}
                        SongName={song.songName}
                        SongArtist={artistsToString(song.artist)}
                        showAdd={true} />
                </TopSongs>

            }

            ))
        })
    }, [])

    return <Wrapper>
        <Title style={{ textAlign: 'center' }}>Ooops.  This page, like the rest of this site, is still under construction.  Please come back later. </Title>
    </Wrapper>
    return (
        <Wrapper>
            <Cont>
                <Column style={{ flex: 2 }}>
                    <TopSongsCont>
                        <Title>Todays Top Song</Title>
                        <TopSongsContInner>
                            {topSong}
                            <div style={{ height: 10 }} />
                            RUNNER UPS
                            {topSongs}
                        </TopSongsContInner>
                    </TopSongsCont>
                    <Title>Recomended for you</Title>
                    <TopSongsContInner>
                        <SongSearchDummy />
                        <SongSearchDummy />
                        <SongSearchDummy />
                        <SongSearchDummy />
                        <SongSearchDummy />

                    </TopSongsContInner>


                </Column>
                <Column>
                    <div style={{ marginLeft: 20, marginTop: 55 }}>
                        {/* <Title>Pins</Title> */}

                        <Pins>

                        </Pins>
                        <TopSongsCont>

                        </TopSongsCont>
                    </div>
                </Column>

            </Cont>
        </Wrapper>
    );
}

export default Explore;
