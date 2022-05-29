import React, { useEffect, useState } from 'react';
import * as vars from '../vars'
import styled from 'styled-components'
import SongSearchDummy from '../components/compounds/Song/SongSearchDummy';
import TopResultDummy from '../components/compounds/TopResultSearch/TopResultSearchDummy';

const Wrapper = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height:90vh;
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
    margin-bottom:15px;
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
        margin-right:0px;
        /* background-color: ${vars.LIGHT_GREY}; */
    }
    `

const topSongsDummies = [
    <TopSongs><label>2. </label><SongSearchDummy showAdd={true} /></TopSongs>,
    <TopSongs><label>3. </label><SongSearchDummy showAdd={true} /></TopSongs>,
    <TopSongs><label>4. </label><SongSearchDummy showAdd={true} /></TopSongs>,
    <TopSongs><label>5. </label><SongSearchDummy showAdd={true} /></TopSongs>
]

const Explore = () => {

    const [topSongs, setTopSongs] = useState(topSongsDummies)

    useEffect(() => {
        document.querySelector('html,body').style.background = vars.GREY

    })

    return <Wrapper>
        <Title style={{ textAlign: 'center' }}>Ooops.  This page, like the rest of this site, is still under construction.  Please come back later. </Title>
    </Wrapper>
    return (
        <Wrapper>
            <Cont>
                <Column>
                    <TopSongsCont>
                        <Title>Todays Top Song</Title>
                        <TopSongsContInner>
                            <TopResultDummy />
                            RUNNER UPS
                            {topSongs}
                        </TopSongsContInner>
                    </TopSongsCont>

                    <TopSongsCont>
                        <Title>Recomended for you</Title>
                        <TopSongsContInner>
                            {topSongs}
                        </TopSongsContInner>
                    </TopSongsCont>

                </Column>
                <Column>

                </Column>

            </Cont>
        </Wrapper>
    );
}

export default Explore;
